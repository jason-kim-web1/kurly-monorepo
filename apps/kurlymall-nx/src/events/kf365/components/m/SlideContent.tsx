import { useEffect } from 'react';

import { css } from '@emotion/react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import { Lazy } from 'swiper';

import styled from '@emotion/styled';

import { AnimatePresence, motion } from 'framer-motion';

import COLOR from '../../../../shared/constant/colorset';

import { slideToggleVariant } from '../../../../shared/styles/motions/common/common';
import { ImageList } from '../../constants';
import Certifycation from '../../../../shared/icons/Certifycation';
import { ArrowDown, ArrowRight } from '../../../../shared/icons';
import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';

import CertifyZoomImage from '../m/CertifyZoomImage';
import useKurlyFreshDetail from '../../hooks/useKurlyFreshDetail';

const Container = styled.div`
  padding: 10% 10% 30%;
`;

const SlideContentWrap = styled.div`
  border-top: 1px solid ${COLOR.lightGray};
  border-bottom: 1px solid ${COLOR.lightGray};
`;

const SlideButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 43px;
  padding: 0 11px;
`;

const SlideTitle = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-right: 9px;
  }
`;

const arrowIconStyle = (isSlideToggle: boolean) => css`
  transition: transform 0.5s ease-out;
  transform: rotate(${isSlideToggle ? '180deg' : 0});
`;

const CertifySlideWrap = styled(motion.div)`
  overflow: hidden;
  background-color: ${COLOR.bgLightGray};
`;

const CertifySlide = styled.div`
  position: relative;
  padding: 18px 15px 8px;
`;

const ImageView = styled.div`
  box-shadow: 2px 2px 7px 0 rgb(0 0 0 / 0.15);
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  font-weight: 500;
  font-size: 12px;
`;

const NavButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 5px;

  > svg {
    vertical-align: middle;
  }
`;

const prevArrowStyle = css`
  transform: rotate(180deg);
`;

interface Props {
  title: string;
  imageList: ImageList[];
}

export default function SlideContent({ title, imageList }: Props) {
  const {
    isSlideToggle,
    swiper,
    setSwiper,
    currentIndex,
    setCurrentIndex,
    handleClickSlideView,
    handleClickSwiperNext,
    handleClickSwiperPrev,
  } = useKurlyFreshDetail();

  useEffect(() => {
    if (!swiper) {
      return;
    }
    swiper.on('slideChangeTransitionEnd', ({ realIndex }) => {
      setCurrentIndex(realIndex + 1);
    });
  }, [setCurrentIndex, swiper]);

  return (
    <Container>
      <SlideContentWrap>
        <SlideButton onClick={handleClickSlideView}>
          <SlideTitle>
            <Certifycation width={26} height={18} />
            {title}
          </SlideTitle>
          <ArrowDown css={arrowIconStyle(isSlideToggle)} width={22} height={22} stroke={COLOR.kurlyGray800} />
        </SlideButton>
        <AnimatePresence>
          <CertifySlideWrap
            initial="view"
            animate={isSlideToggle ? 'view' : 'hide'}
            exit="hide"
            variants={slideToggleVariant}
          >
            <CertifySlide>
              <ImageView>
                <Swiper
                  onSwiper={setSwiper}
                  modules={[Lazy]}
                  lazy={{
                    loadPrevNext: true,
                    loadPrevNextAmount: 2,
                  }}
                  preloadImages={false}
                  loop
                  autoHeight
                >
                  {imageList.map(({ id, imageUrl }) => (
                    <SwiperSlide key={id}>
                      <CertifyZoomImage id={id} imageUrl={imageUrl} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ImageView>
              <PaginationWrap>
                <NavButton onClick={handleClickSwiperPrev}>
                  <ScreenOut>이전</ScreenOut>
                  <ArrowRight css={prevArrowStyle} width={20} height={20} stroke={COLOR.kurlyGray800} />
                </NavButton>
                <p>{`${currentIndex} / ${imageList.length}`}</p>
                <NavButton onClick={handleClickSwiperNext}>
                  <ScreenOut>다음</ScreenOut>
                  <ArrowRight width={20} height={20} stroke={COLOR.kurlyGray800} />
                </NavButton>
              </PaginationWrap>
            </CertifySlide>
          </CertifySlideWrap>
        </AnimatePresence>
      </SlideContentWrap>
    </Container>
  );
}
