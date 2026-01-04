import { getAntdToken } from 'antd-style';

describe('getAntdToken', () => {
  it('should return antd token values', () => {
    const token = getAntdToken({ appearance: 'light' });

    expect(typeof token.colorPrimary).toBe('string');
    expect(token.colorPrimary.length).toBeGreaterThan(0);
  });

  it('should return different token values for light/dark', () => {
    const light = getAntdToken({ appearance: 'light' });
    const dark = getAntdToken({ appearance: 'dark' });

    // Background/text base tokens are expected to differ between algorithms.
    expect(light.colorBgBase).not.toEqual(dark.colorBgBase);
    expect(light.colorTextBase).not.toEqual(dark.colorTextBase);
  });

  it('should accept ThemeProvider-like theme getter', () => {
    const light = getAntdToken({
      appearance: 'light',
      theme: (appearance) =>
        appearance === 'dark' ? undefined : { token: { colorPrimary: '#ff0000' } },
    });

    expect(light.colorPrimary).toEqual('#ff0000');
  });
});
