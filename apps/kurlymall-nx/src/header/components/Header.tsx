import styled from '@emotion/styled';
import { startsWith } from 'lodash';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { useIntersectionObserver } from 'react-intersection-observer-hook';

import { useAppSelector } from '../../shared/store';
import { loadCategories, resetCategories } from '../../shared/reducers/category';

import TopBannerContainer from '../containers/TopBannerContainer';
import TopHeader from './TopHeader';
import GlobalNavigationBar from './GlobalNavigationBar';

import { marketEventName, beautyEventName } from '../../shared/amplitude/events/main-menu/event-names.constant';
import { amplitudeService } from '../../shared/amplitude';
import { SelectSubTab } from '../../shared/amplitude/events';
import useMainNavigation from '../../main/hooks/useMainNavigation';

const Gutter = styled.div<{ hidden: boolean }>`
  min-height: 56px;
  ${({ hidden }) =>
    hidden && {
      display: 'none',
    }}
`;

const options = {
  rootMargin: '-57px 0px 0px 0px',
  threshold: 0,
};

interface Props {
  sword?: string;
}

export default function Header({ sword }: Props) {
  const [siteChange, setSiteChange] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const site = useAppSelector(({ main }) => main.site);

  const { navigationOptions } = useMainNavigation();

  const [sticky, setStickey] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [headerRef, headerEntry] = useIntersectionObserver(options);
  const [gutterRef, gutterEntry] = useIntersectionObserver(options);

  const handleMainMenuClick = (id: number) => {
    if (id === activeId) {
      return;
    }
    const siteEventName = site === 'MARKET' ? marketEventName : beautyEventName;
    const eventName = siteEventName[id];
    amplitudeService.logEvent(new SelectSubTab({ eventName }));
  };

  useEffect(() => {
    if (headerEntry.entry && !headerEntry.entry.isIntersecting) {
      setStickey(true);
    }
  }, [headerEntry.entry?.isIntersecting]);

  useEffect(() => {
    if (gutterEntry.entry && gutterEntry.entry.isIntersecting) {
      setStickey(false);
    }
  }, [gutterEntry.entry?.isIntersecting]);

  useEffect(() => {
    if (!hasSession) {
      return;
    }

    if (site !== siteChange) {
      setSiteChange(site);

      dispatch(resetCategories());
      dispatch(loadCategories());
    }
  }, [dispatch, site, hasSession, siteChange]);

  useEffect(() => {
    const main = navigationOptions.find((it) => startsWith(router.asPath, it.link));
    setActiveId(main ? main.idx ?? 0 : 0);
  }, [navigationOptions, router.asPath]);

  return (
    <>
      <TopBannerContainer />
      <div ref={headerRef}>
        <TopHeader sticky={sticky} sword={sword} />
        <GlobalNavigationBar
          activeId={activeId}
          sticky={sticky}
          options={navigationOptions}
          onClickMainMenu={handleMainMenuClick}
        />
        <Gutter ref={gutterRef} hidden={!sticky} />
      </div>
    </>
  );
}
