import animateScrollTo from 'animated-scroll-to';
import { Helmet, useIntl, useLocation, useOutlet, useSiteData } from 'dumi';
import { memo, StrictMode, useEffect, useState, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import Features from 'dumi/theme-original/slots/Features';

import Content from 'dumi/theme/slots/Content';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Hero from 'dumi/theme/slots/Hero';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Toc from 'dumi/theme/slots/Toc';

import { ApiHeader } from '../../components/ApiHeader';
import SiteProvider from '../../components/SiteProvider';

import isEqual from 'fast-deep-equal';
import { StoreUpdater } from '../../components/StoreUpdater';
import { useSiteStore } from '../../store/useSiteStore';
import { GlobalStyle, useStyles } from './styles';

const DocLayout: FC = memo(() => {
  const intl = useIntl();
  const outlet = useOutlet();
  const { hash, pathname } = useLocation();
  const { loading } = useSiteData();
  const [showSidebar, setShowSidebar] = useState(false);
  const fm = useSiteStore((s) => s.routeMeta.frontmatter || {}, isEqual);

  const isApiPage = pathname.startsWith('/api');

  const { styles, theme } = useStyles();
  // handle hash change or visit page hash after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '');

    if (id) {
      setTimeout(() => {
        const elm = document.getElementById(decodeURIComponent(id));

        if (elm) {
          // animated-scroll-to instead of native scroll
          animateScrollTo(elm.offsetTop - 80, {
            maxDuration: 300,
          });
        }
      }, 1);
    }
  }, [loading, hash]);

  return (
    <div
      className={styles.layout}
      data-mobile-sidebar-active={showSidebar || undefined}
      onClick={() => setShowSidebar(false)}
    >
      <GlobalStyle />
      <Helmet>
        <html lang={intl.locale.replace(/-.+$/, '')} />
        {fm.title && <title>{fm.title} - Antd Style</title>}
        {fm.title && <meta property="og:title" content={fm.title} />}
        {fm.description && <meta name="description" content={fm.description} />}
        {fm.description && <meta property="og:description" content={fm.description} />}
        {fm.keywords && <meta name="keywords" content={fm.keywords.join(',')} />}
        {fm.keywords && <meta property="og:keywords" content={fm.keywords.join(',')} />}
      </Helmet>
      <Header />
      <Hero />
      <Features />
      <main>
        <Sidebar />
        <Flexbox width={'100%'}>
          {isApiPage ? (
            <Flexbox style={{ marginRight: theme.tocWidth }}>
              <Center>
                <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%' }}>
                  <Flexbox padding={'0 48px'}>
                    <ApiHeader title={fm.title} description={fm.description} />
                  </Flexbox>
                </Flexbox>
              </Center>
            </Flexbox>
          ) : null}
          <Flexbox horizontal width={'100%'} style={{ zIndex: 10 }}>
            <Center width={'100%'}>
              <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%', margin: '0 24px' }}>
                <Flexbox horizontal>
                  <Content>{outlet}</Content>
                </Flexbox>
                <Footer />
              </Flexbox>
            </Center>
            {
              // 如果是首页就不显示 ToC
              fm.hero ? null : (
                <div className={styles.tocWrapper}>
                  <h4>Table of Contents</h4>
                  <Toc />
                </div>
              )
            }
          </Flexbox>
        </Flexbox>
      </main>
    </div>
  );
});

export default () => (
  <StrictMode>
    <SiteProvider>
      <StoreUpdater />
      <DocLayout />
    </SiteProvider>
  </StrictMode>
);
