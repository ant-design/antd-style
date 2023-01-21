import { render } from '@testing-library/react';
import { Emotion, sheet, StyleProvider } from 'antd-style';

describe('StyledProvider', () => {
  it('设置不同的 prefix', () => {
    let emotion = {} as Emotion;
    const App = () => {
      return (
        <StyleProvider prefix={'test'} getEmotionInstance={(e) => (emotion = e)}>
          123
        </StyleProvider>
      );
    };

    render(<App />);

    // antd-style 默认的 前缀为 ant-css
    expect(sheet.key).toEqual('ant-css');
    expect(sheet.isSpeedy).toEqual(false);

    expect(emotion.sheet.key).toEqual('test');
    expect(emotion.sheet.isSpeedy).toEqual(false);
  });

  it('设置 speedy 属性', () => {
    let emotion = {} as Emotion;
    const App = () => {
      return (
        <StyleProvider prefix={'a'} speedy getEmotionInstance={(e) => (emotion = e)}>
          123
        </StyleProvider>
      );
    };
    render(<App />);

    expect(emotion.sheet.isSpeedy).toEqual(true);
  });
});
