import { RefObject, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Header from '../../components/m/Header';
import TopBannerContainer from '../../../header/containers/TopBannerContainer';
import useBannerView from '../../../shared/hooks/useBannerView';
import { setMobileHeaderHeight } from '../../../header/header.slice';

import { useAppSelector } from '../../../shared/store';

interface Props {
  wrapperRef: RefObject<HTMLDivElement>;
}

export default function HeaderContainer({ wrapperRef }: Props) {
  const dispatch = useDispatch();
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const { bannerView, handleCloseBanner } = useBannerView();

  useEffect(() => {
    if (!wrapperRef.current?.offsetHeight) return;
    const minHeight = Math.min(wrapperRef.current.offsetHeight, mobileHeaderHeight);
    const calculatedHeight = bannerView ? wrapperRef.current.offsetHeight : minHeight;

    dispatch(setMobileHeaderHeight(calculatedHeight || wrapperRef.current.offsetHeight));
  }, [bannerView, mobileHeaderHeight, dispatch, wrapperRef]);

  return (
    <>
      <TopBannerContainer visibleBanner={bannerView} onClickCloseBanner={handleCloseBanner} />
      <Header title={'카테고리'} buttonProps={{ withAddress: true, withCart: true }} />
    </>
  );
}
