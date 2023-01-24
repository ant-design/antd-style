import { Helmet, useLocation, useOutlet } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import Content from 'dumi/theme/slots/Content';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Toc from 'dumi/theme/slots/Toc';

import { ApiHeader } from '../../components/ApiHeader';

import { useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './styles';

const Docs: FC = memo(() => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual);
  const { styles, theme } = useStyles();

  const isApiPage = pathname.startsWith('/api');

  return (
    <div className={styles.layout}>
      <Helmet>{fm.title && <title> {fm.title} - Ant Design Style</title>}</Helmet>
      <Header />
      <Sidebar />
      {isApiPage ? (
        <Flexbox style={{ gridArea: 'title' }}>
          <Center>
            <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%' }}>
              <Flexbox padding={'0 48px'}>
                <ApiHeader title={fm.title} description={fm.description} />
              </Flexbox>
            </Flexbox>
          </Center>
        </Flexbox>
      ) : null}
      <Flexbox style={{ zIndex: 10, gridArea: 'main', margin: 24, marginBottom: 48 }}>
        <Center width={'100%'}>
          <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%', margin: '0 24px' }}>
            <Flexbox horizontal>
              <Content>{outlet}</Content>
            </Flexbox>
          </Flexbox>
        </Center>
      </Flexbox>

      <div className={styles.toc} style={{ gridArea: 'toc' }}>
        <h4>Table of Contents</h4>
        <Toc />
      </div>

      <Footer />
    </div>
  );
});

export default Docs;
