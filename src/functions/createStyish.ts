import { ReturnStyleToUse, StyleInputType } from '@/types';
import { createStyles, StyleOrGetStyleFn } from './createStyles';

/**
 * 业务应用中创建复合通用样式的进阶
 */
export function createStylish<Props, Styles extends StyleInputType>(
  cssStyleOrGetCssStyleFn: StyleOrGetStyleFn<Styles, Props>,
) {
  const useStyles = createStyles(cssStyleOrGetCssStyleFn);

  return (props?: Props): ReturnStyleToUse<Styles> => {
    const { styles } = useStyles(props);

    return styles;
  };
}
