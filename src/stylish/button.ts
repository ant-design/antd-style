import { GetAntdStylish } from '@/types';

export const createAntdStylish: GetAntdStylish = ({ css, token }) => {
  return {
    buttonDefaultHover: css({
      backgroundColor: token.colorBgContainer,
      border: `1px solid ${token.colorBorder}`,
      cursor: 'pointer',
      ':hover': {
        color: token.colorPrimaryHover,
        borderColor: token.colorPrimaryHover,
      },

      ':active': {
        color: token.colorPrimaryActive,
        borderColor: token.colorPrimaryActive,
      },
    }),
  };
};
