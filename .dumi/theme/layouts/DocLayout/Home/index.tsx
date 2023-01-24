import { memo, type FC } from 'react';

import Features from 'dumi/theme/slots/Features';
import Footer from 'dumi/theme/slots/Footer';
import Hero from 'dumi/theme/slots/Hero';

const Home: FC = memo(() => {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
});

export default Home;
