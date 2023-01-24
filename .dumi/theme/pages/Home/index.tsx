import { Helmet } from 'dumi';
import { memo, type FC } from 'react';

import Features from 'dumi/theme/slots/Features';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Hero from 'dumi/theme/slots/Hero';

const Home: FC = memo(() => {
  return (
    <div>
      <Helmet>
        <title>Ant Design Style - 应用级 CSS in JS 解决方案</title>
      </Helmet>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
});

export default Home;
