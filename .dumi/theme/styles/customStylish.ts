import { GetCustomStylish } from 'antd-style';
import chroma from 'chroma-js';

declare module 'antd-style' {
  interface CustomStylish extends SiteStylish {}
}

export interface SiteStylish {
  clickableText: string;
  resetLinkColor: string;
  heroGradient: string;
  heroTextShadow: string;
  heroGradientFlow: string;
}

export const getCustomStylish: GetCustomStylish<SiteStylish> = ({ css, token, isDarkMode }) => {
  const color1 = token.blue;
  const color2 = isDarkMode ? token.pink : token.cyan;
  const color3 = token.purple;

  return {
    clickableText: css`
      cursor: pointer;
      color: ${token.colorTextSecondary};

      &:hover {
        color: ${token.colorText};
      }
    `,
    resetLinkColor: css`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `,

    heroButtonGradient: css`
      background: linear-gradient(90deg, ${color1} 0%, ${color2} 100%);
    `,
    heroGradient: css`
      background-image: radial-gradient(at 80% 20%, ${color1} 0%, ${color2} 80%, ${color3} 130%);
      background-size: 300% 300%;
    `,
    heroGradientFlow: css`
      animation: flow 5s ease infinite;

      @keyframes flow {
        0% {
          background-position: 0% 0%;
        }

        50% {
          background-position: 100% 100%;
        }

        100% {
          background-position: 0% 0%;
        }
      }
    `,

    heroTextShadow: css`
      text-shadow: 0 8px 20px ${chroma(color2).alpha(0.2).hex()},
        0 8px 60px ${chroma(color3).alpha(0.2).hex()},
        0 8px 80px
          ${chroma(isDarkMode ? token.cyan : token.blue)
            .alpha(isDarkMode ? 0.2 : 0.6)
            .hex()};
    `,
  };
};
