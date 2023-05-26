import { getRegisteredStyles, RegisteredCache } from '@emotion/utils';

/* c8 ignore start */
/**
 * 判断是否是 ReactCss 的编译产物
 * @param params
 */
export const isReactCssResult = (params: any) =>
  typeof params === 'object' && 'styles' in params && 'name' in params && 'toString' in params;

// copied from https://github.com/emotion-js/emotion/blob/main/packages/css/src/create-instance.js#L125
export const classnames = (args: any) => {
  let cls = '';
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg === null) continue;

    let toAdd;
    switch (typeof arg) {
      case 'boolean':
        break;
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg);
        } else {
          toAdd = '';
          for (const k in arg) {
            if (arg[k] && k) {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              toAdd && (toAdd += ' ');
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      cls && (cls += ' ');
      cls += toAdd;
    }
  }
  return cls;
};

// copied from https://github.com/emotion-js/emotion/blob/main/packages/css/src/create-instance.js#LL17C62-L17C62
export const mergeCSS = (registered: RegisteredCache, css: any, className: string) => {
  const registeredStyles: string[] = [];
  const rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
};
/* c8 ignore end */
