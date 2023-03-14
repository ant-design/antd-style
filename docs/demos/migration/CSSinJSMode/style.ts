import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  container: {
    background: token.colorBgLayout,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSearch: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  input: {
    width: '0',
    minWidth: '0',
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: '0',
    transition: 'width 0.3s, margin-left 0.3s',
    input: { boxShadow: 'none !important' },
  },
  show: { width: '210px', marginLeft: '8px' },
}));
