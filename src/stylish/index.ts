import { useToken } from '@/useToken';
import { css } from '@emotion/css';
import { transparentize } from 'polished';
import { useMemo } from 'react';

export interface AntdStylish {
  defaultButton: string;

  textInfo: string;
  textDefault: string;

  containerBgHover: string;
  containerBgL2: string;

  dataInputContainer: string;
  dataInputContainerFocused: string;
  backgroundBlur: string;
}

/**
 * 一组统一封装好的 antd 标准样式
 */
export const useInternalStylish = (): AntdStylish => {
  const token = useToken();

  return useMemo(() => {
    const containerBgHover = css`
      cursor: pointer;
      transition: 150ms background-color ease-in-out;
      &:hover {
        background: ${token.colorFillQuaternary};
      }
    `;
    const dataInputContainerHover = css`
      color: ${token.colorText};
      background-color: ${token.colorFillTertiary};
      border-color: transparent;
    `;
    const dataInputContainerFocused = css`
      color: ${token.colorText} !important;
      background-color: ${token.colorFillQuaternary} !important;
      border-color: ${token.colorPrimary} !important;
      box-shadow: none;
    `;

    const defaultButtonBase = css`
      color: ${token.colorTextSecondary};
      background: ${token.colorFillQuaternary};
      border-color: transparent;
    `;

    return {
      defaultButton: css`
        ${defaultButtonBase};

        &:hover {
          color: ${token.colorText} !important;
          background: ${token.colorFillSecondary} !important;
          border-color: transparent !important;
        }
        &:focus {
          ${defaultButtonBase};
          border-color: ${token.colorPrimary} !important;
        }
      `,

      textInfo: css`
        color: ${token.colorTextSecondary};
        &:hover {
          color: ${token.colorText};
        }
      `,
      textDefault: css`
        color: ${token.colorTextSecondary};
      `,

      containerBgHover: css`
        cursor: pointer;
        transition: 150ms background-color ease-in-out;

        &:hover {
          background: ${token.colorFillQuaternary};
        }
      `,
      containerBgL2: css`
        ${containerBgHover};
        border-radius: 4px;
        background: ${token.colorFillQuaternary};

        &:hover {
          background: ${token.colorFillTertiary};
        }
      `,
      dataInputContainerFocused,
      dataInputContainer: css`
        &:hover {
          ${dataInputContainerHover}
        }
        &:focus {
          ${dataInputContainerFocused}
        }
      `,

      backgroundBlur: css`
        background: ${transparentize(0.4)(token.colorBgElevated)};
        backdrop-filter: blur(10px);
      `,
    };
  }, [token]);
};
