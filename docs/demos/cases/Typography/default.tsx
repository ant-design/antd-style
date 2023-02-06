/**
 * iframe: 500
 */
import { App } from 'antd';
import { styled, ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

import { GroupCollapse, GroupTitle, SubTitle, Title } from '../../common/Typography';

const Wrapper = styled(App)`
  color: ${(p) => p.theme.colorTextLabel};
`;

export default () => {
  return (
    <ThemeProvider themeMode={'auto'} prefixCls={'typography'}>
      <Wrapper>
        <Flexbox gap={24} padding={24}>
          Title
          <Title name={'默认标题'} />
          SubTitle
          <SubTitle name={'子标题'} />
          GroupTitle
          <GroupTitle name={'分组标题'} />
          GroupCollapse
          <GroupCollapse name={'可折叠分组标题'}>可折叠内容</GroupCollapse>
        </Flexbox>
      </Wrapper>
    </ThemeProvider>
  );
};
