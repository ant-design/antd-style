/**
 * compact: true
 */
import { Divider } from 'antd';
import { Theme, ThemeProvider, useResponsive, useTheme } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

import { DisplayTag } from './DisplayTag';
import { Container, Label } from './style';

const Demo = () => {
  const responsive = useResponsive();
  const theme = useTheme();

  const breakPoints = {
    xs: responsive.xs,
    sm: responsive.sm,
    md: responsive.md,
    lg: responsive.lg,
    xl: responsive.xl,
    xxl: responsive.xxl,
  };

  const devices = {
    mobile: { refers: 'xs', active: responsive.mobile },
    tablet: { refers: 'md', active: responsive.tablet },
    laptop: { refers: 'xl', active: responsive.laptop },
    desktop: { refers: 'xxl', active: responsive.desktop },
  };

  return (
    <Flexbox gap={12}>
      <Label>媒体断点查询</Label>
      <Flexbox horizontal gap={8}>
        {Object.entries(breakPoints).map(([key, value]) => (
          <DisplayTag
            key={key}
            active={value}
            color={'blue'}
            title={key}
            value={`${theme[`screen${key.toUpperCase()}` as keyof Theme]}px`}
          />
        ))}
      </Flexbox>
      <Label>设备与断点映射关系</Label>
      <Flexbox horizontal gap={8}>
        {Object.entries(devices).map(([key, value]) => (
          <DisplayTag
            key={key}
            active={value.active}
            color={'green'}
            title={key}
            value={value.refers}
          />
        ))}
      </Flexbox>
    </Flexbox>
  );
};

export default () => {
  return (
    <Container>
      <Demo />
      <Divider />
      <ThemeProvider>
        <Demo />
      </ThemeProvider>
    </Container>
  );
};
