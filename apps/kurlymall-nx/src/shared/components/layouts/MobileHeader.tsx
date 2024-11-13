import { ReactNode, useEffect, useMemo, useRef } from 'react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import TopBannerContainer from '../../../header/containers/TopBannerContainer';
import COLOR from '../../constant/colorset';
import useBannerView from '../../hooks/useBannerView';
import { setMobileHeaderHeight } from '../../../header/header.slice';
import { useAppSelector } from '../../store';
import useSpecificPageColor from '../../hooks/useSpecificPageColor';
import { MainSite } from '../../../main/interfaces/MainSection.interface';
import { useScroll } from '../../hooks';

const height = '44px';
const expandHeight = '82px';

const Container = styled.div<{ color: 'purple' | 'white'; isBottomLine: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  ${({ color, isBottomLine }) =>
    color === 'purple'
      ? css`
          background-color: ${COLOR.kurlyPurple};
        `
      : css`
          background-color: ${COLOR.kurlyWhite};
          border-bottom: ${isBottomLine ? `1px solid rgba(221, 221, 221, 0.5)` : 0};
        `}
`;

const StatusBarMarginRemover = styled.div<{ isSpecificPageColor: boolean; site: MainSite }>`
  //ios safari에서 스크롤 시, 상태표시줄과 컨텐츠사이의 간헐적인 여백을 가리는 용도의 컴포넌트
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 20px;
  z-index: -1;
  transform: translateY(-1px);
  background-color: ${({ isSpecificPageColor, site }) =>
    isSpecificPageColor && site === 'MARKET' ? COLOR.kurlyPurple : COLOR.kurlyWhite};
`;
const Inner = styled.div`
  position: relative;
  min-height: ${height};
`;

const Gutter = styled.div<{ visibleBanner: boolean }>(
  ({ visibleBanner }) => `
  min-height: ${visibleBanner ? expandHeight : height};
  transition: height .4s linear;
`,
);

interface Props {
  color?: 'purple' | 'white';
  children: ReactNode;
  visibleBanner?: boolean; // 스크롤 시에 띠배너가 히든되도록 처리할 때 사용합니다. 기본 true
  hideBottomLine?: boolean;
}

export default function MobileHeader({
  color = 'white',
  children,
  visibleBanner = true,
  hideBottomLine = false,
}: Props) {
  const dispatch = useDispatch();
  const { isScrollTop } = useScroll();
  const { bannerView, handleCloseBanner } = useBannerView(visibleBanner);
  const { mobileHeaderHeight } = useAppSelector(({ header }) => header);
  const { isSpecificPageColor } = useSpecificPageColor();
  const site = useAppSelector(({ main }) => main.site);
  const ref = useRef<HTMLDivElement>(null);
  const isBottomLine = useMemo(() => !hideBottomLine && !isScrollTop, [hideBottomLine, isScrollTop]);

  useEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      const minHeight = Math.min(ref.current.clientHeight, mobileHeaderHeight);
      const calculatedHeight = bannerView ? ref.current.clientHeight : minHeight;
      dispatch(setMobileHeaderHeight(calculatedHeight));
    }
  }, [dispatch, bannerView, mobileHeaderHeight]);

  return (
    <>
      <Container ref={ref} color={color} isBottomLine={isBottomLine}>
        <StatusBarMarginRemover isSpecificPageColor={isSpecificPageColor} site={site} />
        <TopBannerContainer visibleBanner={bannerView} onClickCloseBanner={handleCloseBanner} />
        <Inner>{children}</Inner>
      </Container>
      <Gutter visibleBanner={bannerView} />
    </>
  );
}
