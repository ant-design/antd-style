import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';

import {
  AppearanceContext,
  BrowserPrefersContext,
  ThemeActionContext,
  ThemeModeValueContext,
} from '@/context';
import { useTheme } from '@/functions';
import { useThemeMode } from '@/hooks';
import ThemeSwitcher, { ThemeSwitcherProps } from './ThemeSwitcher';

const MockedChild = () => {
  const theme = useTheme();
  const { setThemeMode, setAppearance } = useThemeMode();
  return (
    <div style={{ background: theme.colorBgContainer }}>
      Mocked Child
      <div
        onClick={() => {
          setAppearance('dark');
        }}
      >
        switch-dark
      </div>
      <div
        onClick={() => {
          setThemeMode('dark');
        }}
      >
        theme-mode-dark
      </div>
    </div>
  );
};

const noop = () => {};

const Component = (props: Partial<ThemeSwitcherProps>) => (
  <ThemeModeValueContext.Provider value="light">
    <AppearanceContext.Provider value="light">
      <BrowserPrefersContext.Provider value="light">
        <ThemeActionContext.Provider value={{ setThemeMode: noop, setAppearance: noop }}>
          <ThemeSwitcher {...props} useTheme={useTheme}>
            <MockedChild />
          </ThemeSwitcher>
        </ThemeActionContext.Provider>
      </BrowserPrefersContext.Provider>
    </AppearanceContext.Provider>
  </ThemeModeValueContext.Provider>
);

describe('<ThemeSwitcher />', () => {
  it('should render the child component', () => {
    const { getByText } = render(<Component />);
    expect(getByText('Mocked Child')).toBeInTheDocument();
  });

  it('should render with default appearance', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toHaveStyle('background-color: #ffffff');
  });

  it.skip('should render with dark appearance', () => {
    const { container } = render(<Component appearance={'dark'} />);

    expect(container.firstChild).toHaveStyle('background-color: #000');
  });

  it('should render with light theme mode', () => {
    const { container } = render(<Component themeMode={'light'} />);

    expect(container.firstChild).toHaveStyle('background-color: #ffffff');
  });

  it.skip('should render with dark theme mode', () => {
    const { container } = render(<Component themeMode={'dark'} />);

    expect(container.firstChild).toHaveStyle('background-color: #000');
  });

  it('should call onAppearanceChange when appearance is changed', () => {
    const onAppearanceChange = vi.fn();
    const { getByText } = render(<Component onAppearanceChange={onAppearanceChange} />);

    const switchElement = getByText('switch-dark');
    fireEvent.click(switchElement);
    expect(onAppearanceChange).toHaveBeenCalledWith('dark');
  });

  it('should call onThemeModeChange when theme mode is changed', () => {
    const onThemeModeChange = vi.fn();
    const { getByText } = render(<Component onThemeModeChange={onThemeModeChange} />);

    const radioElement = getByText('theme-mode-dark');
    fireEvent.click(radioElement);
    expect(onThemeModeChange).toHaveBeenCalledWith('dark');
  });
});
