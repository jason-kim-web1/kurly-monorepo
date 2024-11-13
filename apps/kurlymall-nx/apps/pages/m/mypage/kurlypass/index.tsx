import { useState } from 'react';
import styled from '@emotion/styled';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import { useWebview } from '../../../../src/shared/hooks';
import useKurlyPass from '../../../../src/kurlypass/shared/hooks/useKurlyPass';

import COLOR from '../../../../src/shared/constant/colorset';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import Tabs from '../../../../src/shared/components/layouts/Tabs';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import KurlyPassProductsContainer from '../../../../src/kurlypass/m/containers/KurlyPassProductsContainer';
import KurlyPassReceiptContainer from '../../../../src/kurlypass/m/containers/KurlyPassReceiptContainer';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div``;

const ContentsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 45px);
  > .swiper {
    height: 100%;
    background: ${COLOR.bg};
    .swiper-slide {
      background: ${COLOR.kurlyWhite};
    }
  }
`;

const tabs = ['컬리패스', '결제내역'];

// TODO 컬리멤버스 릴리즈 이후로 컬리패스는 fade-out될 예정이랑 NX 이전 안 함
export default function KurlyPassPage() {
  const webview = useWebview();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const { list, loading, currentKurlyPass, terminateKurlyPass, loadKurlyPassHistory } = useKurlyPass();

  const handleNextPage = () => {
    if (tabs[selectedTabIndex] === tabs[0]) {
      return;
    }

    loadKurlyPassHistory();
  };

  const handleSlideChange = (event: { activeIndex: number }) => {
    setSelectedTabIndex(event.activeIndex);
  };

  const handleChange = (tabName: string) => {
    const tabIndex = tabs.findIndex((value) => value === tabName);

    setSelectedTabIndex(tabIndex);
    swiper?.slideTo(tabIndex);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        {!webview && (
          <MobileHeader>
            <HeaderButtons position="left">
              <BackButton />
            </HeaderButtons>
            <HeaderTitle>컬리패스</HeaderTitle>
            <HeaderButtons position="right">
              <CartButtonContainer />
            </HeaderButtons>
          </MobileHeader>
        )}
        <Tabs hasHeader={!webview} selectedTab={tabs[selectedTabIndex]} tabs={tabs} onChange={handleChange} />
      </HeaderWrapper>
      <ContentsWrapper>
        <Inner>
          <Swiper loop={false} onSwiper={(s) => setSwiper(s)} onSlideChange={handleSlideChange}>
            <SwiperSlide key="kurly-pass-product-detail">
              <KurlyPassProductsContainer currentKurlyPass={currentKurlyPass} />
            </SwiperSlide>
            <SwiperSlide key="kurly-pass-receipt-detail">
              <KurlyPassReceiptContainer
                loading={loading}
                currentKurlyPass={currentKurlyPass}
                list={list}
                onClickTerminate={terminateKurlyPass}
                onNextPage={handleNextPage}
              />
            </SwiperSlide>
          </Swiper>
        </Inner>
        <UserMenu />
      </ContentsWrapper>
    </Wrapper>
  );
}
