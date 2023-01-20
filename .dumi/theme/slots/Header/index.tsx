import { useRouteMeta, useSiteData } from 'dumi';
import { useState, type FC } from 'react';
import { Flexbox } from 'react-layout-kit';

import LangSwitch from 'dumi/theme-default/slots/LangSwitch';
import Logo from 'dumi/theme-default/slots/Logo';
import Navbar from 'dumi/theme-default/slots/Navbar';
import SearchBar from 'dumi/theme-default/slots/SearchBar';

import ColorSwitch from '../../components/ThemeSwitch';

import { useStyle } from './style';

const Header: FC = () => {
  const { frontmatter } = useRouteMeta();
  const [showMenu, setShowMenu] = useState(false);
  const { themeConfig } = useSiteData();

  const { styles } = useStyle();
  return (
    <div
      className={styles.header}
      data-static={Boolean(frontmatter.hero) || undefined}
      data-mobile-active={showMenu || undefined}
      onClick={() => setShowMenu(false)}
    >
      <Flexbox horizontal distribution={'space-between'} className={styles.content}>
        <Flexbox gap={48} horizontal className={styles.left}>
          <Logo />
          <Navbar />
        </Flexbox>
        <section className={styles.right}>
          <div />
          <Flexbox horizontal align={'center'} className="dumi-default-header-right-aside">
            <SearchBar />
            <LangSwitch />
            {themeConfig.prefersColor.switch && <ColorSwitch />}
          </Flexbox>
        </section>
        {/*<button*/}
        {/*  type="button"*/}
        {/*  className="dumi-default-header-menu-btn"*/}
        {/*  onClick={(ev) => {*/}
        {/*    ev.stopPropagation();*/}
        {/*    setShowMenu((v) => !v);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  /!*{showMenu ? <IconClose /> : <IconMenu />}*!/*/}
        {/*</button>*/}
      </Flexbox>
    </div>
  );
};

export default Header;
