import createEmotion from '@emotion/css/create-instance';

import { responsive as staticResponsiveMap } from '@/factories/createStaticStyles/responsive';

import { pushCompiledExtractChunk } from './compiledCollector';
import { createStyleId } from './styleId';

interface ImportBindingMeta {
  imported: string;
  local: string;
  source: string;
  type: 'default' | 'named' | 'namespace';
  property?: string;
}

interface BabelPluginOptions {
  collectStatic?: boolean;
  emotionKey?: string;
  /**
   * Prefix used to resolve cssVar.xxx interpolations in static collection.
   * @default 'ant'
   */
  cssVarPrefix?: string;
  /**
   * Enable replacing collected createStaticStyles runtime function with pre-resolved class map.
   * @default false
   */
  pruneRuntimeStyles?: boolean;
  /**
   * Optional resolver for imported values used in static expression evaluation.
   */
  resolveImportedValue?: (meta: ImportBindingMeta) => string | number | boolean | undefined;
  rootDir?: string;
  salt?: string;
}

interface BabelState {
  file?: {
    opts?: {
      filename?: string;
    };
  };
  opts?: BabelPluginOptions;
}

interface ImportedStaticNames {
  cssVar: Set<string>;
  cx: Set<string>;
  keyframes: Set<string>;
  responsive: Set<string>;
}

interface StaticCollectContext {
  cssTagIdentifier: string;
  cssVarIdentifiers: Set<string>;
  cssVarPrefix: string;
  cxIdentifiers: Set<string>;
  keyframesIdentifiers: Set<string>;
  responsiveIdentifiers: Set<string>;
  resolveImportedValue?: (meta: ImportBindingMeta) => string | number | boolean | undefined;
}

interface CollectedStyleValue {
  className: string;
  cssTexts: string[];
}

interface ResolvedTemplateExpression {
  cssTexts: string[];
  text: string;
}

let staticChunkOrder = 0;

const emotionCollectors = new Map<string, ReturnType<typeof createEmotion>>();

export const resetStaticCollectState = () => {
  staticChunkOrder = 0;
  emotionCollectors.clear();
};

const getEmotionCollector = (key: string) => {
  const cached = emotionCollectors.get(key);
  if (cached) return cached;

  const created = createEmotion({ key });
  emotionCollectors.set(key, created);
  return created;
};

const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])(\d)/g, '$1-$2')
    .replace(/(\d)([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const resolveCssVarInterpolation = (tokenName: string, prefix = 'ant') => {
  const kebab = toKebabCase(tokenName);
  if (!kebab) return undefined;

  if (prefix !== 'ant') {
    return `var(--${prefix}-${kebab}, var(--ant-${kebab}))`;
  }

  return `var(--${prefix}-${kebab})`;
};

const resolveResponsiveInterpolation = (tokenName: string): string | undefined => {
  return staticResponsiveMap[tokenName as keyof typeof staticResponsiveMap];
};

const unwrapParenthesizedExpression = (t: any, node: any): any => {
  let current = node;
  while (current && t.isParenthesizedExpression(current)) {
    current = current.expression;
  }
  return current;
};

const getObjectPatternBindingName = (t: any, stylesFnNode: any, propertyName: string) => {
  const firstParam = stylesFnNode?.params?.[0];
  if (!firstParam || !t.isObjectPattern(firstParam)) return undefined;

  for (const property of firstParam.properties) {
    if (!t.isObjectProperty(property)) continue;

    const keyName =
      t.isIdentifier(property.key) || t.isStringLiteral(property.key)
        ? property.key.name || property.key.value
        : undefined;

    if (keyName !== propertyName) continue;

    if (t.isIdentifier(property.value)) return property.value.name;

    if (t.isAssignmentPattern(property.value) && t.isIdentifier(property.value.left)) {
      return property.value.left.name;
    }
  }

  return undefined;
};

const getStaticCollectContext = (
  t: any,
  stylesFnNode: any,
  cssVarPrefix: string,
  importedNames: ImportedStaticNames,
  resolveImportedValue?: (meta: ImportBindingMeta) => string | number | boolean | undefined,
): StaticCollectContext | undefined => {
  const cssTagIdentifier = getObjectPatternBindingName(t, stylesFnNode, 'css');
  if (!cssTagIdentifier) return undefined;

  const cssVarIdentifiers = new Set(importedNames.cssVar);
  const responsiveIdentifiers = new Set(importedNames.responsive);
  const cxIdentifiers = new Set(importedNames.cx);
  const keyframesIdentifiers = new Set(importedNames.keyframes);

  const cssVarIdentifier = getObjectPatternBindingName(t, stylesFnNode, 'cssVar');
  if (cssVarIdentifier) cssVarIdentifiers.add(cssVarIdentifier);

  const responsiveIdentifier = getObjectPatternBindingName(t, stylesFnNode, 'responsive');
  if (responsiveIdentifier) responsiveIdentifiers.add(responsiveIdentifier);

  const cxIdentifier = getObjectPatternBindingName(t, stylesFnNode, 'cx');
  if (cxIdentifier) cxIdentifiers.add(cxIdentifier);

  return {
    cssTagIdentifier,
    cssVarIdentifiers,
    cssVarPrefix,
    cxIdentifiers,
    keyframesIdentifiers,
    responsiveIdentifiers,
    resolveImportedValue,
  };
};

const getReturnedExpressionFromStylesFn = (t: any, stylesFnNode: any) => {
  if (
    (t.isArrowFunctionExpression(stylesFnNode) || t.isFunctionExpression(stylesFnNode)) &&
    stylesFnNode.body
  ) {
    const body = unwrapParenthesizedExpression(t, stylesFnNode.body);
    if (!body) return undefined;

    if (!t.isBlockStatement(body)) return body;

    for (const statement of body.body) {
      if (!t.isReturnStatement(statement)) continue;
      if (!statement.argument) continue;

      const returned = unwrapParenthesizedExpression(t, statement.argument);
      if (returned) return returned;
    }
  }

  return undefined;
};

const getMemberPropertyName = (t: any, expression: any): string | undefined => {
  if (t.isIdentifier(expression.property) && !expression.computed) {
    return expression.property.name;
  }

  if (t.isStringLiteral(expression.property)) {
    return expression.property.value;
  }

  if (expression.computed && t.isTemplateLiteral(expression.property)) {
    if (expression.property.expressions.length > 0 || expression.property.quasis.length !== 1) {
      return undefined;
    }

    return expression.property.quasis[0].value.cooked ?? expression.property.quasis[0].value.raw;
  }

  return undefined;
};

const getBindingInitializer = (callPath: any, name: string) => {
  const binding = callPath?.scope?.getBinding?.(name);
  if (binding && binding.constant && binding.path?.isVariableDeclarator?.()) {
    return binding.path.node.init;
  }

  const stylesFnNode = callPath?.node?.arguments?.[0];
  if (!stylesFnNode?.body?.body || !Array.isArray(stylesFnNode.body.body)) return undefined;

  for (const statement of stylesFnNode.body.body) {
    if (
      !statement ||
      statement.type !== 'VariableDeclaration' ||
      !Array.isArray(statement.declarations)
    ) {
      continue;
    }

    for (const declaration of statement.declarations) {
      if (!declaration?.id || declaration.id.type !== 'Identifier') continue;
      if (declaration.id.name !== name) continue;
      if (!declaration.init) return undefined;

      return declaration.init;
    }
  }

  return undefined;
};

const getImportBindingMeta = (callPath: any, localName: string): ImportBindingMeta | undefined => {
  const binding = callPath?.scope?.getBinding?.(localName);
  if (!binding?.path) return undefined;

  const bindingPath = binding.path;
  const parent = bindingPath.parentPath?.node;
  if (!parent?.source || typeof parent.source.value !== 'string') return undefined;

  if (bindingPath.isImportSpecifier?.()) {
    const importedNode = bindingPath.node.imported;
    const imported = importedNode?.name || importedNode?.value?.toString?.() || 'default';
    return {
      imported,
      local: localName,
      source: parent.source.value,
      type: 'named',
    };
  }

  if (bindingPath.isImportDefaultSpecifier?.()) {
    return {
      imported: 'default',
      local: localName,
      source: parent.source.value,
      type: 'default',
    };
  }

  if (bindingPath.isImportNamespaceSpecifier?.()) {
    return {
      imported: '*',
      local: localName,
      source: parent.source.value,
      type: 'namespace',
    };
  }

  return undefined;
};

const evaluateBinaryExpression = (operator: string, left: any, right: any) => {
  switch (operator) {
    case '+': {
      return left + right;
    }
    case '-': {
      return left - right;
    }
    case '*': {
      return left * right;
    }
    case '/': {
      return left / right;
    }
    case '%': {
      return left % right;
    }
    case '**': {
      return left ** right;
    }
    case '===': {
      return left === right;
    }
    case '!==': {
      return left !== right;
    }
    case '<': {
      return left < right;
    }
    case '<=': {
      return left <= right;
    }
    case '>': {
      return left > right;
    }
    case '>=': {
      return left >= right;
    }
    default: {
      return undefined;
    }
  }
};

const evaluateUnaryExpression = (operator: string, value: any) => {
  switch (operator) {
    case '+': {
      return +value;
    }
    case '-': {
      return -value;
    }
    case '!': {
      return !value;
    }
    case '~': {
      return ~value;
    }
    default: {
      return undefined;
    }
  }
};

const evaluateLogicalExpression = (
  operator: string,
  left: any,
  resolveRight: () => any,
): any | undefined => {
  switch (operator) {
    case '&&': {
      if (!left) return left;
      return resolveRight();
    }
    case '||': {
      if (left) return left;
      return resolveRight();
    }
    case '??': {
      if (left !== null && left !== undefined) return left;
      return resolveRight();
    }
    default: {
      return undefined;
    }
  }
};

const resolveStaticExpression = (
  t: any,
  expression: any,
  context: StaticCollectContext,
  callPath: any,
  visiting = new Set<string>(),
): any | undefined => {
  const node = unwrapParenthesizedExpression(t, expression);
  if (!node) return undefined;

  if (t.isStringLiteral(node)) return node.value;
  if (t.isNumericLiteral(node)) return node.value;
  if (t.isBooleanLiteral(node)) return node.value;
  if (t.isNullLiteral(node)) return null;
  if (t.isBigIntLiteral(node)) {
    try {
      return Number(node.value);
    } catch {
      return undefined;
    }
  }

  if (t.isTemplateLiteral(node)) {
    let text = '';

    for (let i = 0; i < node.quasis.length; i += 1) {
      text += node.quasis[i].value.cooked ?? node.quasis[i].value.raw;

      if (i >= node.expressions.length) continue;

      const resolved = resolveStaticExpression(t, node.expressions[i], context, callPath, visiting);
      if (resolved === undefined || typeof resolved === 'object') return undefined;
      text += String(resolved);
    }

    return text;
  }

  if (t.isIdentifier(node)) {
    if (node.name === 'undefined') return undefined;

    if (
      context.cssVarIdentifiers.has(node.name) ||
      context.responsiveIdentifiers.has(node.name) ||
      context.cxIdentifiers.has(node.name)
    ) {
      return undefined;
    }

    const importMeta = getImportBindingMeta(callPath, node.name);
    if (importMeta && typeof context.resolveImportedValue === 'function') {
      const resolvedImportValue = context.resolveImportedValue(importMeta);
      if (resolvedImportValue !== undefined) return resolvedImportValue;
    }

    if (visiting.has(node.name)) return undefined;

    const initializer = getBindingInitializer(callPath, node.name);
    if (!initializer) return undefined;

    visiting.add(node.name);
    const resolved = resolveStaticExpression(t, initializer, context, callPath, visiting);
    visiting.delete(node.name);

    return resolved;
  }

  const isOptionalMemberExpression =
    typeof t.isOptionalMemberExpression === 'function' && t.isOptionalMemberExpression(node);

  if (t.isMemberExpression(node) || isOptionalMemberExpression) {
    const object = unwrapParenthesizedExpression(t, node.object);
    const objectName = t.isIdentifier(object) ? object.name : undefined;

    const propertyName = getMemberPropertyName(t, node);
    if (!propertyName) return undefined;

    if (objectName && context.cssVarIdentifiers.has(objectName)) {
      return resolveCssVarInterpolation(propertyName, context.cssVarPrefix);
    }

    if (objectName && context.responsiveIdentifiers.has(objectName)) {
      return resolveResponsiveInterpolation(propertyName);
    }

    if (objectName) {
      const importObjectMeta = getImportBindingMeta(callPath, objectName);
      if (importObjectMeta && typeof context.resolveImportedValue === 'function') {
        const resolvedImportMember = context.resolveImportedValue({
          ...importObjectMeta,
          property: propertyName,
        });

        if (resolvedImportMember !== undefined) return resolvedImportMember;
      }
    }

    const resolvedObject = resolveStaticExpression(t, object, context, callPath, visiting);
    if (!resolvedObject || typeof resolvedObject !== 'object') return undefined;

    return (resolvedObject as any)[propertyName];
  }

  if (t.isObjectExpression(node)) {
    const result: Record<string, any> = {};

    for (const property of node.properties) {
      if (!t.isObjectProperty(property)) return undefined;

      const key =
        t.isIdentifier(property.key) || t.isStringLiteral(property.key)
          ? property.key.name || property.key.value
          : undefined;
      if (!key) return undefined;

      const value = resolveStaticExpression(t, property.value, context, callPath, visiting);
      if (value === undefined) return undefined;

      result[key] = value;
    }

    return result;
  }

  if (t.isArrayExpression(node)) {
    const result: any[] = [];

    for (const element of node.elements) {
      if (!element || t.isSpreadElement(element)) return undefined;

      const value = resolveStaticExpression(t, element, context, callPath, visiting);
      if (value === undefined) return undefined;

      result.push(value);
    }

    return result;
  }

  if (t.isConditionalExpression(node)) {
    const test = resolveStaticExpression(t, node.test, context, callPath, visiting);
    if (test === undefined) return undefined;

    return test
      ? resolveStaticExpression(t, node.consequent, context, callPath, visiting)
      : resolveStaticExpression(t, node.alternate, context, callPath, visiting);
  }

  if (t.isLogicalExpression(node)) {
    const left = resolveStaticExpression(t, node.left, context, callPath, visiting);
    if (left === undefined) return undefined;

    return evaluateLogicalExpression(node.operator, left, () =>
      resolveStaticExpression(t, node.right, context, callPath, visiting),
    );
  }

  if (t.isUnaryExpression(node)) {
    const value = resolveStaticExpression(t, node.argument, context, callPath, visiting);
    if (value === undefined) return undefined;

    return evaluateUnaryExpression(node.operator, value);
  }

  if (t.isBinaryExpression(node)) {
    const left = resolveStaticExpression(t, node.left, context, callPath, visiting);
    if (left === undefined) return undefined;

    const right = resolveStaticExpression(t, node.right, context, callPath, visiting);
    if (right === undefined) return undefined;

    return evaluateBinaryExpression(node.operator, left, right);
  }

  return undefined;
};

function collectKeyframesTaggedTemplate(
  t: any,
  taggedTemplate: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
): ResolvedTemplateExpression | undefined {
  if (
    !t.isIdentifier(taggedTemplate.tag) ||
    !context.keyframesIdentifiers.has(taggedTemplate.tag.name)
  ) {
    return undefined;
  }

  // Mutual recursion is intentional here: keyframes can contain nested template interpolations.
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const built = buildCssSourceFromTemplate(t, taggedTemplate.quasi, context, callPath, collector);
  if (!built || !built.cssSource || !built.cssSource.trim()) return undefined;

  const animationName = collector.keyframes(built.cssSource);
  const hash = animationName.startsWith('animation-')
    ? animationName.slice('animation-'.length)
    : undefined;
  if (!hash) return undefined;

  const cssText = collector.cache.inserted?.[hash];
  const cssTexts = [...(built.cssTexts || [])];
  if (typeof cssText === 'string' && cssText.trim()) cssTexts.push(cssText);

  return {
    cssTexts,
    text: animationName,
  };
}

function collectKeyframesFromExpression(
  t: any,
  expression: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
  visiting = new Set<string>(),
): ResolvedTemplateExpression | undefined {
  const node = unwrapParenthesizedExpression(t, expression);
  if (!node) return undefined;

  if (t.isTaggedTemplateExpression(node)) {
    return collectKeyframesTaggedTemplate(t, node, context, callPath, collector);
  }

  if (t.isIdentifier(node)) {
    if (visiting.has(node.name)) return undefined;

    const initializer = getBindingInitializer(callPath, node.name);
    if (!initializer) return undefined;

    visiting.add(node.name);
    const resolved = collectKeyframesFromExpression(
      t,
      initializer,
      context,
      callPath,
      collector,
      visiting,
    );
    visiting.delete(node.name);

    return resolved;
  }

  if (t.isConditionalExpression(node)) {
    const test = resolveStaticExpression(t, node.test, context, callPath, visiting);
    if (test === undefined) return undefined;

    return collectKeyframesFromExpression(
      t,
      test ? node.consequent : node.alternate,
      context,
      callPath,
      collector,
      visiting,
    );
  }

  return undefined;
}

function resolveTemplateExpression(
  t: any,
  expression: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
): ResolvedTemplateExpression | undefined {
  const keyframesResolved = collectKeyframesFromExpression(
    t,
    expression,
    context,
    callPath,
    collector,
  );
  if (keyframesResolved) return keyframesResolved;

  const resolved = resolveStaticExpression(t, expression, context, callPath);
  if (resolved === undefined || typeof resolved === 'object') return undefined;

  return {
    cssTexts: [],
    text: String(resolved),
  };
}

function buildCssSourceFromTemplate(
  t: any,
  quasi: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
): { cssSource: string; cssTexts: string[] } | undefined {
  let cssSource = '';
  const cssTexts: string[] = [];

  for (let i = 0; i < quasi.quasis.length; i += 1) {
    const quasiNode = quasi.quasis[i];
    cssSource += quasiNode.value.cooked ?? quasiNode.value.raw;

    if (i >= quasi.expressions.length) continue;

    const expression = quasi.expressions[i];
    const resolved = resolveTemplateExpression(t, expression, context, callPath, collector);
    if (!resolved || typeof resolved.text !== 'string') return undefined;

    cssSource += resolved.text;

    if (Array.isArray(resolved.cssTexts) && resolved.cssTexts.length > 0) {
      cssTexts.push(...resolved.cssTexts);
    }
  }

  return {
    cssSource,
    cssTexts,
  };
}

const collectCssTaggedTemplate = (
  t: any,
  taggedTemplate: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
): CollectedStyleValue | undefined => {
  if (!t.isIdentifier(taggedTemplate.tag) || taggedTemplate.tag.name !== context.cssTagIdentifier) {
    return undefined;
  }

  const built = buildCssSourceFromTemplate(t, taggedTemplate.quasi, context, callPath, collector);
  if (!built) return undefined;

  const className = collector.css(built.cssSource || '');
  const hash = className.startsWith(`${collector.cache.key}-`)
    ? className.slice(collector.cache.key.length + 1)
    : undefined;
  if (!hash) return undefined;

  const cssText = collector.cache.inserted?.[hash];
  const cssTexts = [...(built.cssTexts || [])];
  if (typeof cssText === 'string' && cssText.trim()) cssTexts.push(cssText);

  return {
    className,
    cssTexts,
  };
};

const appendClassValue = (value: any, classNames: string[]): boolean => {
  if (value === null || value === undefined || value === false) return true;

  if (typeof value === 'string') {
    if (value.trim()) classNames.push(value.trim());
    return true;
  }

  if (typeof value === 'number') {
    if (!Number.isNaN(value) && value !== 0) classNames.push(String(value));
    return true;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      if (!appendClassValue(item, classNames)) return false;
    }
    return true;
  }

  if (typeof value === 'object') {
    for (const [className, enabled] of Object.entries(value)) {
      if (enabled) classNames.push(className);
    }
    return true;
  }

  return false;
};

const collectCxCallExpression = (
  t: any,
  callExpression: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
  visiting = new Set<string>(),
): CollectedStyleValue | undefined => {
  if (
    !t.isIdentifier(callExpression.callee) ||
    !context.cxIdentifiers.has(callExpression.callee.name)
  ) {
    return undefined;
  }

  const classNames: string[] = [];
  const cssTexts: string[] = [];

  for (const argument of callExpression.arguments) {
    if (t.isSpreadElement(argument)) return undefined;

    const arg = unwrapParenthesizedExpression(t, argument);

    if (t.isTaggedTemplateExpression(arg)) {
      const collected = collectCssTaggedTemplate(t, arg, context, callPath, collector);
      if (!collected) return undefined;

      classNames.push(collected.className);
      cssTexts.push(...collected.cssTexts);
      continue;
    }

    if (t.isCallExpression(arg)) {
      const nested = collectCxCallExpression(t, arg, context, callPath, collector, visiting);
      if (!nested) return undefined;

      classNames.push(nested.className);
      cssTexts.push(...nested.cssTexts);
      continue;
    }

    if (t.isIdentifier(arg) && visiting.has(arg.name)) return undefined;

    const resolved = resolveStaticExpression(t, arg, context, callPath, visiting);
    if (resolved === undefined) return undefined;

    if (!appendClassValue(resolved, classNames)) return undefined;
  }

  return {
    className: classNames.filter(Boolean).join(' '),
    cssTexts,
  };
};

const collectStyleValue = (
  t: any,
  valueNode: any,
  context: StaticCollectContext,
  callPath: any,
  collector: ReturnType<typeof createEmotion>,
  visiting = new Set<string>(),
): CollectedStyleValue | undefined => {
  const value = unwrapParenthesizedExpression(t, valueNode);

  if (t.isTaggedTemplateExpression(value)) {
    return collectCssTaggedTemplate(t, value, context, callPath, collector);
  }

  if (t.isCallExpression(value)) {
    return collectCxCallExpression(t, value, context, callPath, collector, visiting);
  }

  if (t.isConditionalExpression(value)) {
    const test = resolveStaticExpression(t, value.test, context, callPath, visiting);
    if (test === undefined) return undefined;

    return collectStyleValue(
      t,
      test ? value.consequent : value.alternate,
      context,
      callPath,
      collector,
      visiting,
    );
  }

  if (t.isIdentifier(value)) {
    if (visiting.has(value.name)) return undefined;

    const initializer = getBindingInitializer(callPath, value.name);
    if (initializer) {
      visiting.add(value.name);
      const resolved = collectStyleValue(t, initializer, context, callPath, collector, visiting);
      visiting.delete(value.name);
      if (resolved) return resolved;
    }
  }

  const resolved = resolveStaticExpression(t, value, context, callPath, visiting);
  if (resolved === undefined) return undefined;

  const classNames: string[] = [];
  if (!appendClassValue(resolved, classNames)) return undefined;

  const className = classNames.filter(Boolean).join(' ');
  if (!className) return undefined;

  return {
    className,
    cssTexts: [],
  };
};

const getStyleIdFromOptions = (t: any, optionsNode: any): string | undefined => {
  if (!optionsNode || !t.isObjectExpression(optionsNode)) return undefined;

  for (const property of optionsNode.properties) {
    if (!t.isObjectProperty(property)) continue;
    if (!t.isIdentifier(property.key) || property.key.name !== 'styleId') continue;
    if (t.isStringLiteral(property.value)) return property.value.value;
  }

  return undefined;
};

const createPrunedStylesFnNode = (t: any, styles: Record<string, string> | string) => {
  if (typeof styles === 'string') {
    return t.arrowFunctionExpression([], t.stringLiteral(styles));
  }

  if (!styles || typeof styles !== 'object') return undefined;

  const properties = Object.entries(styles)
    .map(([key, value]) => {
      if (typeof value !== 'string') return undefined;

      return t.objectProperty(t.identifier(key), t.stringLiteral(value));
    })
    .filter(Boolean);

  if (properties.length === 0) return undefined;

  return t.arrowFunctionExpression([], t.objectExpression(properties));
};

const collectStaticChunk = (
  t: any,
  callPath: any,
  styleId: string,
  emotionKey: string,
  cssVarPrefix: string,
  importedNames: ImportedStaticNames,
  resolveImportedValue?: (meta: ImportBindingMeta) => string | number | boolean | undefined,
): Record<string, string> | string | undefined => {
  const stylesFnNode = callPath.node.arguments[0];
  if (!stylesFnNode) return undefined;

  const context = getStaticCollectContext(
    t,
    stylesFnNode,
    cssVarPrefix,
    importedNames,
    resolveImportedValue,
  );
  if (!context) return undefined;

  const returned = getReturnedExpressionFromStylesFn(t, stylesFnNode);
  if (!returned) return undefined;

  const collector = getEmotionCollector(emotionKey);

  const cssParts: string[] = [];
  const cssSeen = new Set<string>();

  const pushCssTexts = (texts: string[]) => {
    for (const cssText of texts) {
      if (!cssText || !cssText.trim()) continue;
      if (cssSeen.has(cssText)) continue;
      cssSeen.add(cssText);
      cssParts.push(cssText);
    }
  };

  if (t.isObjectExpression(returned)) {
    const styles: Record<string, string> = {};

    if (returned.properties.length === 0) return undefined;

    for (const property of returned.properties) {
      if (!t.isObjectProperty(property)) return undefined;

      const key =
        t.isIdentifier(property.key) || t.isStringLiteral(property.key)
          ? property.key.name || property.key.value
          : undefined;
      if (!key) return undefined;

      const collected = collectStyleValue(t, property.value, context, callPath, collector);
      if (!collected || !collected.className) return undefined;

      styles[key] = collected.className;
      pushCssTexts(collected.cssTexts);
    }

    if (Object.keys(styles).length === 0) return undefined;

    pushCompiledExtractChunk({
      cssText: cssParts.join('\n'),
      order: staticChunkOrder++,
      styleId,
      styles,
    });

    return styles;
  }

  const collected = collectStyleValue(t, returned, context, callPath, collector);
  if (!collected || !collected.className) return undefined;

  pushCssTexts(collected.cssTexts);

  pushCompiledExtractChunk({
    cssText: cssParts.join('\n'),
    order: staticChunkOrder++,
    styleId,
    styles: collected.className,
  });

  return collected.className;
};

/**
 * Experimental Babel plugin:
 * injects `{ styleId: "..." }` as second argument for
 * `createStaticStyles(stylesFn)` calls imported from `antd-style`.
 *
 * With `collectStatic: true`, it also performs a best-effort static collection pass.
 * Unsupported callsites are skipped and will safely fallback to runtime generation.
 */
export const babelInjectStyleId = ({ types: t }: any) => ({
  name: 'antd-style-babel-inject-style-id',
  visitor: {
    Program(pathNode: any, state: BabelState) {
      const filename = state.file?.opts?.filename || 'unknown';
      const {
        collectStatic = false,
        emotionKey = 'acss',
        cssVarPrefix = 'ant',
        pruneRuntimeStyles = false,
        resolveImportedValue,
        rootDir,
        salt,
      } = state.opts || {};

      const normalizedFile = filename.replace(/\\/g, '/');
      const normalizedRoot = rootDir?.replace(/\\/g, '/');
      const normalizedRootWithSlash = normalizedRoot?.endsWith('/')
        ? normalizedRoot
        : normalizedRoot
        ? `${normalizedRoot}/`
        : undefined;
      const relativeFile =
        normalizedRootWithSlash && normalizedFile.startsWith(normalizedRootWithSlash)
          ? normalizedFile.slice(normalizedRootWithSlash.length)
          : normalizedFile;

      const localNames = new Set<string>();
      const importedNames: ImportedStaticNames = {
        cssVar: new Set<string>(),
        cx: new Set<string>(),
        keyframes: new Set<string>(),
        responsive: new Set<string>(),
      };

      let callIndex = 0;
      let fileCallsiteCount = 0;
      let fileCollectedCount = 0;
      let filePruneCount = 0;

      for (const nodePath of pathNode.get('body')) {
        if (!nodePath.isImportDeclaration()) continue;
        if (nodePath.node.source.value !== 'antd-style') continue;

        for (const specifier of nodePath.node.specifiers) {
          if (!t.isImportSpecifier(specifier) || !t.isIdentifier(specifier.imported)) continue;

          const importedName = specifier.imported.name;
          const localName = specifier.local.name;

          if (importedName === 'createStaticStyles') localNames.add(localName);
          if (importedName === 'cssVar') importedNames.cssVar.add(localName);
          if (importedName === 'responsive') importedNames.responsive.add(localName);
          if (importedName === 'cx') importedNames.cx.add(localName);
          if (importedName === 'keyframes') importedNames.keyframes.add(localName);
        }
      }

      if (localNames.size === 0) return;

      pathNode.traverse({
        CallExpression(callPath: any) {
          const callee = callPath.node.callee;
          if (!t.isIdentifier(callee) || !localNames.has(callee.name)) return;

          fileCallsiteCount += 1;

          if (callPath.node.arguments.length === 0) return;

          if (callPath.node.arguments.length < 2) {
            const injectedStyleId = createStyleId(`${relativeFile}#${callIndex++}`, { salt });
            callPath.node.arguments.push(
              t.objectExpression([
                t.objectProperty(t.identifier('styleId'), t.stringLiteral(injectedStyleId)),
              ]),
            );
          }

          if (!collectStatic) return;

          const styleId = getStyleIdFromOptions(t, callPath.node.arguments[1]);
          if (!styleId) return;

          try {
            const collectedStyles = collectStaticChunk(
              t,
              callPath,
              styleId,
              emotionKey,
              cssVarPrefix,
              importedNames,
              resolveImportedValue,
            );

            if (collectedStyles !== undefined) {
              fileCollectedCount += 1;
            }

            if (pruneRuntimeStyles && collectedStyles !== undefined) {
              const prunedStylesFnNode = createPrunedStylesFnNode(t, collectedStyles);
              if (prunedStylesFnNode) {
                callPath.node.arguments[0] = prunedStylesFnNode;
                filePruneCount += 1;
              }
            }
          } catch {
            // static collection is best-effort; fallback path remains runtime safe
          }
        },
      });

      if (
        typeof process !== 'undefined' &&
        process.env.ANTD_STYLE_EXTRACT_PRUNE_DEBUG === '1' &&
        fileCallsiteCount > 0
      ) {
        console.info(
          `[antd-style prune stats] ${relativeFile}: total=${fileCallsiteCount} collected=${fileCollectedCount} pruned=${filePruneCount}`,
        );
      }
    },
  },
});

export default babelInjectStyleId;
