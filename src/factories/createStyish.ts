import { BaseReturnType, ReturnStyleToUse } from '@/types';
import { StyleOrGetStyleFn } from './createStyles/types';

// FIXME: 需要考虑如何将 createStylish 和 ThemeProvider 中的 customStylish 方法整合在一起，现在是割裂的两个方法

/**
 * 业务应用中创建复合通用样式的进阶
 */
export const createStylishFactory =
  (createStyles: any) =>
  <Props, Styles extends BaseReturnType>(
    cssStyleOrGetCssStyleFn: StyleOrGetStyleFn<Styles, Props>,
  ): ((props?: Props) => ReturnStyleToUse<Styles>) => {
    const useStyles = createStyles(cssStyleOrGetCssStyleFn);

    return (props?: Props): ReturnStyleToUse<Styles> => {
      const { styles } = useStyles(props);

      return styles;
    };
  };
