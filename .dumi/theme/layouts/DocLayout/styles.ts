import { createGlobalStyle } from 'antd-style';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(p) => p.theme.colorBgLayout};
  }

  @font-face {
    font-weight: normal;
    font-family: AliPuHui;
    src: url('//at.alicdn.com/t/webfont_exesdog9toj.woff2') format('woff2'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.woff') format('woff'),
      /* chrome、firefox */ url('//at.alicdn.com/t/webfont_exesdog9toj.ttf')
    format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  }

  @font-face {
    font-weight: bold;
    font-family: AliPuHui;
    src: url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2')
    format('woff2'),
    url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff')
    format('woff');
  }
`;
