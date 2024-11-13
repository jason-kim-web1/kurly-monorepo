import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../store';
import { BANNER_HIDE_URL } from '../configs/config';
import { setMobileHeaderHeight } from '../../header/header.slice';

export default function useBannerView(visibleBanner = true) {
  const [bannerView, setBannerView] = useState(visibleBanner);
  const dispatch = useDispatch();

  const {
    topBanner: { title },
    mobileHeaderHeight,
  } = useAppSelector(({ header }) => header);

  useEffect(() => {
    const isHideUrl = BANNER_HIDE_URL.find((url: string) => window.location.href.indexOf(url) > 1);
    const isStoredHide = Boolean(localStorage.getItem('top_banner_hide'));
    const isEmptyResponse: boolean = isEmpty(title);

    if (isStoredHide || isHideUrl || isEmptyResponse) {
      setBannerView(false);
      return;
    }

    setBannerView(visibleBanner);
  }, [title, visibleBanner]);

  const handleCloseBanner = () => {
    setBannerView(false);
    dispatch(setMobileHeaderHeight(mobileHeaderHeight - 38));
  };

  return { bannerView, handleCloseBanner };
}
