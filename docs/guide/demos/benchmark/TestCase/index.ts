import { FC } from 'react';

import AntdStyleFunc from './AntdStyleFunc';
import AntdStyleProps from './AntdStyleProps';
import AntdStyleStatic from './AntdStyleStatic';

import EmotionCSS from './EmotionCSS';
import EmotionReact from './EmotionReact';
import EmotionStyled from './EmotionStyled';

import MuiBox from './MuiBox';
import MUIStatic from './MuiStatic';
import MuiStyled from './MuiStyled';
import MuiStyledTheme from './MuiStyledTheme';

import CSSModules from './CSSModules';
import PureCss from './PureCSS';

import AntdStyleTokens from './AntdStyleTokens';
import StyledComponents from './StyledComponents';
import StyledComponentsTheme from './StyledComponentsTheme';

interface Case {
  name: string;
  path?: string;
  component: FC;
}
interface Usage {
  name: string;
  cases: Case[];
}

export const demoPathPrefix =
  'https://github.com/ant-design/antd-style/tree/master/docs/guide/demos/benchmark/TestCase';

export const TestCases: Usage[] = [
  {
    name: 'Pure CSS',
    cases: [
      { name: 'Pure CSS', component: PureCss, path: '/PureCSS/index.tsx' },
      { name: 'CSS Modules', component: CSSModules, path: '/CSSModules/index.tsx' },
    ],
  },
  {
    name: 'antd-style',
    cases: [
      {
        name: 'createStyles Static',
        component: AntdStyleStatic,
        path: '/AntdStyleStatic/index.tsx',
      },
      { name: 'createStyles Function', component: AntdStyleFunc, path: '/AntdStyleFunc/index.tsx' },
      {
        name: 'createStyles Tokens',
        component: AntdStyleTokens,
        path: '/AntdStyleTokens/index.tsx',
      },
      { name: 'createStyles Props', component: AntdStyleProps, path: '/AntdStyleProps/index.tsx' },
    ],
  },
  {
    name: 'Emotion',
    cases: [
      { name: 'Emotion CSS', component: EmotionCSS, path: '/EmotionCSS/index.tsx' },
      { name: 'Emotion Styled', component: EmotionStyled, path: '/EmotionCSS/index.tsx' },
      { name: 'Emotion React CSS', component: EmotionReact, path: '/EmotionReact/index.tsx' },
    ],
  },
  {
    name: 'StyledComponents',
    cases: [
      {
        name: 'StyledComponents',
        component: StyledComponents,
        path: '/StyledComponents/index.tsx',
      },
      {
        name: 'StyledComponentsTheme',
        component: StyledComponentsTheme,
        path: '/StyledComponentsTheme/index.tsx',
      },
    ],
  },
  {
    name: 'Material UI V4',
    cases: [
      { name: 'MUI Static', component: MUIStatic, path: '/MuiStatic/index.tsx' },
      { name: 'MUI Styled', component: MuiStyled, path: '/MuiStyled/index.tsx' },
      { name: 'MUI Box', component: MuiBox, path: '/MuiBox/index.tsx' },
      { name: 'MuiStyledTheme', component: MuiStyledTheme, path: '/MuiStyledTheme/index.tsx' },
    ],
  },
];
