import createEmotion from '@emotion/css/create-instance';

import { pushCompiledExtractChunk } from './compiledCollector';
import { createStyleId } from './styleId';

interface BabelPluginOptions {
  collectStatic?: boolean;
  emotionKey?: string;
  /**
   * Prefix used to resolve cssVar.xxx interpolations in static collection.
   * @default 'ant'
   */
  cssVarPrefix?: string;
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

interface StaticCollectContext {
  cssTagIdentifier: string;
  cssVarIdentifier?: string;
  cssVarPrefix: string;
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
): StaticCollectContext | undefined => {
  const cssTagIdentifier = getObjectPatternBindingName(t, stylesFnNode, 'css');
  if (!cssTagIdentifier) return undefined;

  const cssVarIdentifier = getObjectPatternBindingName(t, stylesFnNode, 'cssVar');

  return {
    cssTagIdentifier,
    cssVarIdentifier,
    cssVarPrefix,
  };
};

const getObjectExpressionFromReturn = (t: any, stylesFnNode: any) => {
  if (
    (t.isArrowFunctionExpression(stylesFnNode) || t.isFunctionExpression(stylesFnNode)) &&
    t.isObjectExpression(stylesFnNode.body)
  ) {
    return stylesFnNode.body;
  }

  if (
    (t.isArrowFunctionExpression(stylesFnNode) || t.isFunctionExpression(stylesFnNode)) &&
    t.isBlockStatement(stylesFnNode.body)
  ) {
    for (const statement of stylesFnNode.body.body) {
      if (!t.isReturnStatement(statement)) continue;
      if (!statement.argument || !t.isObjectExpression(statement.argument)) continue;
      return statement.argument;
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

const resolveTemplateExpression = (
  t: any,
  expression: any,
  context: StaticCollectContext,
): string | undefined => {
  if (t.isStringLiteral(expression)) return expression.value;
  if (t.isNumericLiteral(expression)) return String(expression.value);
  if (t.isBooleanLiteral(expression)) return String(expression.value);
  if (t.isNullLiteral(expression)) return 'null';

  if (t.isTemplateLiteral(expression)) {
    if (expression.expressions.length > 0) return undefined;

    return expression.quasis.map((quasi: any) => quasi.value.cooked ?? quasi.value.raw).join('');
  }

  const isOptionalMemberExpression =
    typeof t.isOptionalMemberExpression === 'function' && t.isOptionalMemberExpression(expression);

  if (t.isMemberExpression(expression) || isOptionalMemberExpression) {
    if (!context.cssVarIdentifier) return undefined;

    const objectName = t.isIdentifier(expression.object) ? expression.object.name : undefined;
    if (objectName !== context.cssVarIdentifier) return undefined;

    const propertyName = getMemberPropertyName(t, expression);
    if (!propertyName) return undefined;

    return resolveCssVarInterpolation(propertyName, context.cssVarPrefix);
  }

  return undefined;
};

const buildCssSourceFromTemplate = (
  t: any,
  quasi: any,
  context: StaticCollectContext,
): string | undefined => {
  let cssSource = '';

  for (let i = 0; i < quasi.quasis.length; i += 1) {
    const quasiNode = quasi.quasis[i];
    cssSource += quasiNode.value.cooked ?? quasiNode.value.raw;

    if (i >= quasi.expressions.length) continue;

    const expression = quasi.expressions[i];
    const resolved = resolveTemplateExpression(t, expression, context);
    if (typeof resolved !== 'string') return undefined;

    cssSource += resolved;
  }

  return cssSource;
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

const collectStaticChunk = (
  t: any,
  callPath: any,
  styleId: string,
  emotionKey: string,
  cssVarPrefix: string,
): boolean => {
  const stylesFnNode = callPath.node.arguments[0];
  if (!stylesFnNode) return false;

  const context = getStaticCollectContext(t, stylesFnNode, cssVarPrefix);
  if (!context) return false;

  const returnedObject = getObjectExpressionFromReturn(t, stylesFnNode);
  if (!returnedObject) return false;

  const collector = getEmotionCollector(emotionKey);

  const styles: Record<string, string> = {};
  const cssParts: string[] = [];
  const cssSeen = new Set<string>();

  for (const property of returnedObject.properties) {
    if (!t.isObjectProperty(property)) return false;

    const key =
      t.isIdentifier(property.key) || t.isStringLiteral(property.key)
        ? property.key.name || property.key.value
        : undefined;
    if (!key) return false;

    if (!t.isTaggedTemplateExpression(property.value)) return false;
    if (
      !t.isIdentifier(property.value.tag) ||
      property.value.tag.name !== context.cssTagIdentifier
    ) {
      return false;
    }

    const cssSource = buildCssSourceFromTemplate(t, property.value.quasi, context);
    if (!cssSource || !cssSource.trim()) return false;

    const className = collector.css(cssSource);
    const hash = className.startsWith(`${emotionKey}-`)
      ? className.slice(emotionKey.length + 1)
      : undefined;
    if (!hash) return false;

    const cssText = collector.cache.inserted?.[hash];
    if (typeof cssText !== 'string' || !cssText.trim()) return false;

    styles[key] = className;

    if (!cssSeen.has(cssText)) {
      cssSeen.add(cssText);
      cssParts.push(cssText);
    }
  }

  if (Object.keys(styles).length === 0) return false;

  pushCompiledExtractChunk({
    cssText: cssParts.join('\n'),
    order: staticChunkOrder++,
    styleId,
    styles,
  });

  return true;
};

/**
 * Experimental Babel plugin:
 * injects `{ styleId: "..." }` as second argument for
 * `createStaticStyles(stylesFn)` calls imported from `antd-style`.
 *
 * With `collectStatic: true`, it also performs a strict static collection pass:
 * - only supports object-literal returns
 * - supports plain template literals and limited `cssVar.xxx` interpolations
 * - unsupported callsites are skipped and should fallback at runtime
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
      let callIndex = 0;

      for (const nodePath of pathNode.get('body')) {
        if (!nodePath.isImportDeclaration()) continue;
        if (nodePath.node.source.value !== 'antd-style') continue;

        for (const specifier of nodePath.node.specifiers) {
          if (
            t.isImportSpecifier(specifier) &&
            t.isIdentifier(specifier.imported) &&
            specifier.imported.name === 'createStaticStyles'
          ) {
            localNames.add(specifier.local.name);
          }
        }
      }

      if (localNames.size === 0) return;

      pathNode.traverse({
        CallExpression(callPath: any) {
          const callee = callPath.node.callee;
          if (!t.isIdentifier(callee) || !localNames.has(callee.name)) return;

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
            collectStaticChunk(t, callPath, styleId, emotionKey, cssVarPrefix);
          } catch {
            // static collection is best-effort; fallback path remains runtime safe
          }
        },
      });
    },
  },
});

export default babelInjectStyleId;
