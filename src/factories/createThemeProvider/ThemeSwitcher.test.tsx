import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';

import { ThemeModeContext } from '@/context';
import { useTheme } from '@/functions';
import { useThemeMode } from '@/hooks';
import { ThemeContextState } from '@/types';
import ThemeSwitcher, { ThemeSwitcherProps } from './ThemeSwitcher';

const mockUseTheme = {
  appearance: 'light',
  themeMode: 'light',
} as ThemeContextState;

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

const Component = (props: Partial<ThemeSwitcherProps>) => (
  <ThemeModeContext.Provider value={mockUseTheme}>
    <ThemeSwitcher {...props} useTheme={useTheme}>
      <MockedChild />
    </ThemeSwitcher>
  </ThemeModeContext.Provider>
);

describe('<ThemeSwitcher />', () => {
  it('should render the child component', () => {
    const { getByText } = render(<Component />);
    expect(getByText('Mocked Child')).toBeInTheDocument();
  });

  it('should render with default appearance', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toHaveStyle('background-color: #fff');
  });

  it.skip('should render with dark appearance', () => {
    const { container } = render(<Component appearance={'dark'} />);

    expect(container.firstChild).toHaveStyle('background-color: #000');
  });

  it('should render with light theme mode', () => {
    const { container } = render(<Component themeMode={'light'} />);

    expect(container.firstChild).toHaveStyle('background-color: #fff');
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
