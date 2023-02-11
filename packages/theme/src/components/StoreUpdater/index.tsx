import { useLocation } from '@@/exports';
import { useNavData, useRouteMeta, useSidebarData, useSiteData } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, useEffect } from 'react';
import { useSiteStore } from '../../store/useSiteStore';

const homeNav = {
  title: '首页',
  link: '/',
  activePath: '/',
};
export const StoreUpdater = memo(() => {
  const siteData = useSiteData();
  const sidebar = useSidebarData();
  const routeMeta = useRouteMeta();
  const navData = useNavData();
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setLoading, ...data } = siteData;

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      siteData: { setLoading: _, ...prevData },
    } = useSiteStore.getState();

    if (isEqual(data, prevData)) return;

    useSiteStore.setState({ siteData });
  }, [siteData]);

  useEffect(() => {
    useSiteStore.setState({ sidebar });
  }, [sidebar]);

  useEffect(() => {
    useSiteStore.setState({ routeMeta });
  }, [routeMeta]);

  useEffect(() => {
    useSiteStore.setState({ navData: [homeNav, ...navData] });
  }, [navData]);

  useEffect(() => {
    useSiteStore.setState({ location });
  }, [location]);

  return null;
});
