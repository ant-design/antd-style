import { ReturnStyleToUse } from '@/types';
import { createStyles, StyleOrGetStyleFn } from './createStyles';

/**
 * 业务应用中创建复合通用样式的进阶
 */
export function createStylish<Props, Styles>(
  cssStyleOrGetCssStyleFn: StyleOrGetStyleFn<Props, Styles>,
) {
  // FIXME :类型定义
  // @ts-ignore
  const useStyles = createStyles(cssStyleOrGetCssStyleFn);

  return (props?: Props): ReturnStyleToUse<Styles> => {
    const { styles } = useStyles(props);

    // FIXME :类型定义
    // @ts-ignore
    return styles;
  };
}
