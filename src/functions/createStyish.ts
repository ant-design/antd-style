import { createStyles, CssStyleOrGetCssStyleFn } from './createStyles';

/**
 * 业务应用中创建复合通用样式的进阶
 */
export function createStylish<Props, Key extends string>(
  cssStyleOrGetCssStyleFn: CssStyleOrGetCssStyleFn<Props, Key>,
) {
  const useStyles = createStyles(cssStyleOrGetCssStyleFn);

  return (props?: Props): Record<Key, string> => {
    const { styles } = useStyles(props);

    return styles;
  };
}
