import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../shared/store';
import { isPC } from '../../../util/window/getDevice';
import { BANNER_HIDE_URL } from '../../shared/configs/config';
import { loadTopBanner } from '../header.slice';
import { TopBanner as PcTopBanner } from '../components/pc/TopBanner';
import { TopBanner as MoWebTopBanner } from '../components/m/TopBanner';

interface Props {
  visibleBanner?: boolean; // 스크롤에 따라 배너 사라질 때 배너 제어
  onClickCloseBanner?(): void;
}

export default function TopBannerContainer({ visibleBanner = true, onClickCloseBanner }: Props) {
  const dispatch = useDispatch();
  // API 호출 이전까지의 초기 노출
  const [initialHide, setInitialHide] = useState(true);
  // 스크롤에 따라 잠시 히든
  const [visible, setVisibility] = useState(visibleBanner);

  const { isGuest, hasSession } = useAppSelector(({ auth }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
  }));

  const { title, link, locationTarget } = useAppSelector(({ header }) => ({
    title: header.topBanner.title,
    link: header.topBanner.link,
    locationTarget: header.topBanner.locationTarget,
  }));

  const isExpiredBanner = (date: number) => new Date().valueOf() >= date;

  const isAllowedBanner = useCallback(() => {
    const isStoredHide = localStorage.getItem('top_banner_hide');

    const isHideUrl = BANNER_HIDE_URL.find((url: string) => window.location.href.indexOf(url) > 1);

    if (isStoredHide) {
      return false;
    }

    if (isHideUrl) {
      return false;
    }

    return isExpiredBanner(Number(isStoredHide));
  }, []);

  const loadBanner = useCallback(async () => {
    localStorage.removeItem('top_banner_hide');

    dispatch(loadTopBanner(`TOP_BAR_BANNER_${isPC ? 'PC' : 'MOBILE'}_${isGuest ? 'LOGOUT' : 'LOGIN'}`));

    setInitialHide(false);
  }, [dispatch, isGuest]);

  const handleClickClose = useCallback(() => {
    setVisibility(false);

    if (onClickCloseBanner) {
      onClickCloseBanner();
    }
  }, [onClickCloseBanner]);

  useEffect(() => {
    if (hasSession && isAllowedBanner()) {
      void loadBanner();
    }
  }, [hasSession, isAllowedBanner, loadBanner]);

  if (initialHide || isEmpty(title)) {
    return null;
  }

  return (
    <>
      {isPC ? (
        <PcTopBanner
          loggedIn={!isGuest}
          visible={visible}
          onClickClose={handleClickClose}
          title={title}
          link={link}
          locationTarget={locationTarget}
        />
      ) : (
        <MoWebTopBanner
          loggedIn={!isGuest}
          visible={visible}
          onClickClose={handleClickClose}
          title={title}
          link={link}
          locationTarget={locationTarget}
        />
      )}
    </>
  );
}
