import isEqual from 'fast-deep-equal';
import { memo, useState, type FC } from 'react';
import { Flexbox } from 'react-layout-kit';

import LangSwitch from 'dumi/theme-default/slots/LangSwitch';

import Logo from 'dumi/theme/slots/Logo';
import Navbar from 'dumi/theme/slots/Navbar';
import SearchBar from 'dumi/theme/slots/SearchBar';

import ColorSwitch from '../../components/ThemeSwitch';

import { GithubFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useSiteStore } from '../../store/useSiteStore';
import { useStyle } from './style';

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const frontmatter = useSiteStore((s) => s.routeMeta.frontmatter, isEqual);
  const repoUrl = useSiteStore((s) => s.siteData.themeConfig?.repoUrl);

  const { styles } = useStyle();

  return (
    frontmatter && (
      <div
        className={styles.header}
        data-static={Boolean(frontmatter.hero) || undefined}
        data-mobile-active={showMenu || undefined}
        onClick={() => setShowMenu(false)}
      >
        <Flexbox horizontal distribution={'space-between'} className={styles.content}>
          <Flexbox gap={48} horizontal className={styles.left}>
            <Logo />
          </Flexbox>

          <Flexbox style={{ marginLeft: 48, alignSelf: 'end' }}>
            <Navbar />
          </Flexbox>
          <section className={styles.right}>
            <div />
            <Flexbox
              gap={16}
              horizontal
              align={'center'}
              className="dumi-default-header-right-aside"
            >
              <SearchBar />
              <LangSwitch />
              <a href={repoUrl} target={'_blank'}>
                <Button icon={<GithubFilled />} />
              </a>
              <ColorSwitch />
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
    )
  );
};

export default memo(Header);
