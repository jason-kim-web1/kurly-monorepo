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

import useKurlyFreshDetail from '../../hooks/useKurlyFreshDetail';

const Container = styled.div`
  padding: 60px 0 150px;
`;

const SlideContentWrap = styled.div`
  width: 884px;
  margin: 0 auto;
  border-top: 1px solid ${COLOR.lightGray};
  border-bottom: 1px solid ${COLOR.lightGray};
`;

const SlideButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 18px 20px;
  font-weight: 500;
  font-size: 16px;
`;

const SlideTitle = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-right: 18px;
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
  padding: 40px;
`;

const ImageView = styled.div`
  width: 698px;
  margin: 0 auto;
  box-shadow: 2px 2px 7px 0 rgb(0 0 0 / 0.15);
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  font-weight: 500;
  font-size: 14px;
`;

const NavButton = styled.button`
  width: 90px;
  height: 90px;
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
            <Certifycation width={40} height={28} />
            {title}
          </SlideTitle>
          <ArrowDown css={arrowIconStyle(isSlideToggle)} width={34} height={34} stroke={COLOR.kurlyGray800} />
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
                      <img key={imageUrl} data-src={imageUrl} className="swiper-lazy" alt={`${id} 성적서`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ImageView>
              <PaginationWrap>
                <NavButton onClick={handleClickSwiperPrev}>
                  <ScreenOut>이전</ScreenOut>
                  <ArrowRight css={prevArrowStyle} width={70} height={70} stroke={COLOR.kurlyGray800} />
                </NavButton>
                <p>{`${currentIndex} / ${imageList.length}`}</p>
                <NavButton onClick={handleClickSwiperNext}>
                  <ScreenOut>다음</ScreenOut>
                  <ArrowRight width={70} height={70} stroke={COLOR.kurlyGray800} />
                </NavButton>
              </PaginationWrap>
            </CertifySlide>
          </CertifySlideWrap>
        </AnimatePresence>
      </SlideContentWrap>
    </Container>
  );
}
