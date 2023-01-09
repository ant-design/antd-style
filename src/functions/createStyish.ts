import { ReturnStyleToUse } from '@/types';
import { createStyles, StyleOrGetStyleFn } from './createStyles';

/**
 * 业务应用中创建复合通用样式的进阶
 */
export function createStylish<Props, Obj>(cssStyleOrGetCssStyleFn: StyleOrGetStyleFn<Props, Obj>) {
  const useStyles = createStyles(cssStyleOrGetCssStyleFn);

  return (props?: Props): ReturnStyleToUse<Obj> => {
    const { styles } = useStyles(props);

    return styles;
  };
}
