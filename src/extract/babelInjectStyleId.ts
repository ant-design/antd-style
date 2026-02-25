import { createStyleId } from './styleId';

interface BabelState {
  file?: {
    opts?: {
      filename?: string;
    };
  };
}

/**
 * Experimental Babel plugin:
 * injects `{ styleId: "..." }` as second argument for
 * `createStaticStyles(stylesFn)` calls imported from `antd-style`.
 *
 * NOTE: This plugin only annotates callsites; CSS extraction/emit is handled
 * by bundler-side plugins in later stages.
 */
export const babelInjectStyleId = ({ types: t }: any) => ({
  name: 'antd-style-babel-inject-style-id',
  visitor: {
    Program(path: any, state: BabelState) {
      const filename = state.file?.opts?.filename || 'unknown';
      const localNames = new Set<string>();
      let callIndex = 0;

      for (const nodePath of path.get('body')) {
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

      path.traverse({
        CallExpression(callPath: any) {
          const callee = callPath.node.callee;
          if (!t.isIdentifier(callee) || !localNames.has(callee.name)) return;

          // skip if options already provided
          if (callPath.node.arguments.length >= 2) return;

          const styleId = createStyleId(`${filename}#${callIndex++}`);
          callPath.node.arguments.push(
            t.objectExpression([
              t.objectProperty(t.identifier('styleId'), t.stringLiteral(styleId)),
            ]),
          );
        },
      });
    },
  },
});

export default babelInjectStyleId;
