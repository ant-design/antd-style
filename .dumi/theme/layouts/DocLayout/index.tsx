import animateScrollTo from 'animated-scroll-to';
import { Helmet, useIntl, useLocation, useOutlet, useRouteMeta, useSiteData } from 'dumi';
import Features from 'dumi/theme-original/slots/Features';
import Footer from 'dumi/theme-original/slots/Footer';
import Header from 'dumi/theme-original/slots/Header';
import Hero from 'dumi/theme-original/slots/Hero';
import Toc from 'dumi/theme-original/slots/Toc';

import Content from 'dumi/theme/slots/Content';
import Sidebar from 'dumi/theme/slots/Sidebar';

import { useEffect, useState, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { ApiHeader } from '../../components/ApiHeader';
import Provider from '../../components/Provider';

import { GlobalStyle, useStyles } from './styles';

const DocLayout: FC = () => {
  const intl = useIntl();
  const outlet = useOutlet();
  const { hash, pathname } = useLocation();
  const { loading } = useSiteData();
  const [showSidebar, setShowSidebar] = useState(false);
  const { frontmatter: fm } = useRouteMeta();

  const isApiPage = pathname.startsWith('/api');

  const { styles } = useStyles();
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
        {fm.title && <title>{fm.title}</title>}
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
            <Flexbox style={{ marginRight: 176 }}>
              <Center>
                <Flexbox style={{ maxWidth: 1152, width: '100%' }}>
                  <Flexbox padding={'0 48px'}>
                    <ApiHeader title={fm.title} description={fm.description} />
                  </Flexbox>
                </Flexbox>
              </Center>
            </Flexbox>
          ) : null}
          <Flexbox horizontal width={'100%'}>
            <Center width={'100%'}>
              <Flexbox style={{ maxWidth: 1152, width: '100%' }}>
                <Flexbox horizontal>
                  <Content>{outlet}</Content>
                </Flexbox>
                <Footer />
              </Flexbox>
            </Center>
            <div className={styles.tocWrapper}>
              <h4>Table of Contents</h4>
              <Toc />
            </div>
          </Flexbox>
        </Flexbox>
      </main>
    </div>
  );
};

export default () => (
  <Provider>
    <DocLayout />
  </Provider>
);
