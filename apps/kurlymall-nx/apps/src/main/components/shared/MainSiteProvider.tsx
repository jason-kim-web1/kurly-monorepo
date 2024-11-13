import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { initializeMainSite } from '../../slice';
import { MainSite } from '../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../shared/store';
import AmplitudeMainSite from './AmplitudeMainSite';
import { USER_MENU_PATH } from '../../../shared/constant/common-path';
import { parseQueryString } from '../../../shared/utils/parseQueryString';
interface Props {
  children: ReactNode;
  site?: MainSite;
  fallback?: JSX.Element;
}

export default function MainSiteProvider({ children, site, fallback = <></> }: Props) {
  const dispatch = useDispatch();
  const { site: prevSite } = useAppSelector(({ main }) => ({ site: main.site }));

  const [isReady, setIsReady] = useState(false);

  const { asPath, isReady: routerReady, reload, query } = useRouter();
  const isMain = asPath.startsWith(USER_MENU_PATH.home.uri);
  const currentSite = parseQueryString(query).site;

  const siteConverter = useMemo(
    () => (prevSite !== 'BEAUTY' && currentSite === 'beauty' ? 'BEAUTY' : site),
    [prevSite, currentSite, site],
  );

  useEffect(() => {
    if (isReady || !routerReady) {
      return;
    }

    dispatch(initializeMainSite(prevSite, siteConverter || prevSite, isMain));
    setIsReady(true);
  }, [dispatch, isMain, isReady, prevSite, routerReady, siteConverter]);

  useEffect(() => {
    const handleAddressChanged = async (e: MessageEvent) => {
      if (e.data.source !== 'addressChanged') {
        return;
      }

      reload();
    };

    window.addEventListener('message', handleAddressChanged);

    return () => window.removeEventListener('message', handleAddressChanged);
  }, [reload]);

  if (!isReady) {
    return fallback;
  }

  return <AmplitudeMainSite isMain={isMain}>{children}</AmplitudeMainSite>;
}
