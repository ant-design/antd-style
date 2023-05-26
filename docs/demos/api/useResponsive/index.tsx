/**
 * compact: true
 */
import { Divider, Tooltip } from 'antd';
import { Breakpoint, ThemeProvider, useResponsive, useTheme } from 'antd-style';
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

  const breakpointsValues: Record<Breakpoint, number> = {
    xs: theme.screenXSMax,
    sm: theme.screenSMMax,
    md: theme.screenMDMax,
    lg: theme.screenLGMax,
    xl: theme.screenXLMax,
    xxl: theme.screenXXLMin,
  };

  const breakpointsQuery: Record<Breakpoint, string> = {
    xs: `@media (max-width: ${breakpointsValues.xs}px)`,
    sm: `@media (max-width: ${breakpointsValues.sm}px)`,
    md: `@media (max-width: ${breakpointsValues.md}px)`,
    lg: `@media (max-width: ${breakpointsValues.lg}px)`,
    xl: `@media (max-width: ${breakpointsValues.xl}px)`,
    xxl: `@media (min-width: ${breakpointsValues.xxl}px)`,
  };

  return (
    <Flexbox gap={12}>
      <Label>媒体断点查询</Label>
      <Flexbox horizontal gap={8}>
        {Object.entries(breakPoints).map(([key, value]) => {
          const breakpointValue = breakpointsValues[key as Breakpoint];

          return (
            <Tooltip key={key} title={breakpointsQuery[key as Breakpoint]}>
              <DisplayTag
                active={value}
                color={'blue'}
                title={key}
                value={`${breakpointValue}px`}
              />
            </Tooltip>
          );
        })}
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
