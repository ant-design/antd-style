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
  component: FC;
}
interface Usage {
  name: string;
  cases: Case[];
}

export const TestCases: Usage[] = [
  {
    name: 'Pure CSS',
    cases: [
      { name: 'Pure CSS', component: PureCss },
      { name: 'CSS Modules', component: CSSModules },
    ],
  },
  {
    name: 'antd-style',
    cases: [
      { name: 'AntdStyleStatic', component: AntdStyleStatic },
      { name: 'AntdStyleFunc', component: AntdStyleFunc },
      { name: 'AntdStyleTokens', component: AntdStyleTokens },
      { name: 'AntdStyleProps', component: AntdStyleProps },
    ],
  },
  {
    name: 'Emotion',
    cases: [
      { name: 'EmotionCSS', component: EmotionCSS },
      { name: 'EmotionStyled', component: EmotionStyled },
      { name: 'EmotionReact', component: EmotionReact },
    ],
  },
  {
    name: 'StyledComponents',
    cases: [
      { name: 'StyledComponents', component: StyledComponents },
      { name: 'StyledComponentsTheme', component: StyledComponentsTheme },
    ],
  },
  {
    name: 'Material UI V4',
    cases: [
      { name: 'MUIStatic', component: MUIStatic },
      { name: 'MuiStyled', component: MuiStyled },
      { name: 'MUI Box', component: MuiBox },
      { name: 'MuiStyledTheme', component: MuiStyledTheme },
    ],
  },
];
