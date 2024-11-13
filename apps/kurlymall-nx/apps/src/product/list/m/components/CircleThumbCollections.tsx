import { useEffect, useState, useMemo } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import styled from '@emotion/styled';
import { motion, useTransform, useScroll as framerScroll } from 'framer-motion';
import { eq, get, head } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { ProductCollectionGroups } from '../../types';
import NextImage from '../../../../shared/components/NextImage';
import { NoProductImageLogo } from '../../../../shared/images';
import { CIRCLE_THUMBNAIL_IMAGE_SIZE, SLIDES_OFFSET, CHIP_THUMBNAIL_BORDER_SIZE } from '../../collections/constants';
import { useThumbCollection } from '../../hook/useThumbCollection';
import { useAppSelector } from '../../../../shared/store';

const MenuWrap = styled(motion.div)<{ isChipShape: boolean; mobileHeaderHeight: number }>`
  overflow: hidden;
  position: sticky;
  z-index: 2;
  left: 0;
  top: ${({ mobileHeaderHeight }) => `${mobileHeaderHeight}px`};
  width: 100%;
  background-color: ${COLOR.kurlyWhite};
  padding: ${({ isChipShape }) => (isChipShape ? '8px 0px' : 0)};

  & > .swiper {
    overflow: visible;
    height: 100%;
  }
`;

const MenuLink = styled(motion.a)<{ isCurrent: boolean; isChipShape: boolean }>`
  display: flex;
  overflow: hidden;
  max-width: 80px;
  width: ${({ isChipShape }) => (isChipShape ? '100%' : '80px')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 8px 4px 12px;
  font-size: 13px;
  color: ${COLOR.kurlyGray700};
  line-height: 18px;
  white-space: nowrap;

  ${({ isCurrent }) =>
    isCurrent
      ? `
      position: relative;
      font-weight: 600;
      color: ${COLOR.loversLavender};
    `
      : ''}

  ${({ isChipShape, isCurrent }) =>
    isChipShape
      ? `
      flex-direction: row;
      align-items: center;
      max-width: none;
      padding: 4px 8px 4px 4px;
      overflow: visible;

      &:after {
        content: '';
        height: 36px;
        position: absolute;
        border: ${
          isCurrent
            ? `${CHIP_THUMBNAIL_BORDER_SIZE}px solid ${COLOR.loversLavender}`
            : `${CHIP_THUMBNAIL_BORDER_SIZE}px solid ${COLOR.kurlyGray200}`
        };
        border-radius: 30px;
        inset: 0;
      }
    `
      : ''}
`;

const Thumb = styled(motion.div)<{ isCurrent: boolean; isImageExisted: boolean; isChipShape: boolean }>`
  width: ${CIRCLE_THUMBNAIL_IMAGE_SIZE}px;
  height: ${CIRCLE_THUMBNAIL_IMAGE_SIZE}px;
  padding: ${({ isChipShape }) => (isChipShape ? 0 : '4px')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ isChipShape }) => (isChipShape ? '4px' : 0)};

  & > span {
    overflow: visible !important;
  }

  ${({ isCurrent, isChipShape }) =>
    isCurrent && !isChipShape
      ? `
      & > span {
        &:after {
          content: '';
          width: ${CIRCLE_THUMBNAIL_IMAGE_SIZE}px;
          height: ${CIRCLE_THUMBNAIL_IMAGE_SIZE}px;
          position: absolute;
          border: 2.5px solid ${COLOR.loversLavender};
          border-radius: 100%;
          inset: -4px;
        }
      }
  `
      : ''}

  img {
    border-radius: 100%;

    ${({ isImageExisted }) => (!isImageExisted ? `background-color : ${COLOR.kurlyGray150}` : '')}
  }
`;

const Name = styled.p<{ isChipShape: boolean }>`
  margin-top: ${({ isChipShape }) => (isChipShape ? '0' : '8px')};
  font-size: 14px;
  line-height: 19px;
  text-align: center;
`;

const swiperStyles = {
  '.swiper-slide': {
    width: 'auto',
  },
};

interface SwiperExtendProps extends SwiperClass {
  virtualSize?: number;
}

interface Props {
  code: string;
  groups: ProductCollectionGroups[];
  isChipShape: boolean;
  onPageChange: (groupCode: string) => void;
  onAmplitude: (groupCode: string) => void;
}

export default function CircleThumbCollections({ code, groups, isChipShape, onPageChange, onAmplitude }: Props) {
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const [swiper, setSwiper] = useState<SwiperExtendProps>();
  const [isSwiperOption, setIsSwiperOption] = useState(true);
  const { opacity: collectionOpacity, imageSize, wrapHeight: collectionWrapHeight } = useThumbCollection();

  const { scrollY: motionScrollYValue } = framerScroll();

  const swiperGapSize = useMemo(() => (isChipShape ? 4 : 0), [isChipShape]);

  const opacity = useTransform(motionScrollYValue, collectionOpacity.input, collectionOpacity.output);
  const wrapHeight = useTransform(motionScrollYValue, collectionWrapHeight.input, collectionWrapHeight.output);
  const thumbWidth = useTransform(motionScrollYValue, imageSize.input, imageSize.output);
  const thumbHeight = useTransform(motionScrollYValue, imageSize.input, imageSize.output);

  useEffect(() => {
    if (!swiper) {
      return;
    }
    const { width, virtualSize } = swiper;
    if (!virtualSize || !width) {
      return;
    }
    if (width >= virtualSize) {
      setIsSwiperOption(false);
      return;
    }
    const initialSlideIndex = groups.findIndex((it) => eq(it.code, code));
    swiper.slideTo(initialSlideIndex);
  }, [code, groups, swiper]);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    const headCollectionCode = get(head(groups), 'code');

    if (isChipShape && code === headCollectionCode) {
      swiper.slideTo(0, 0);
    }
  }, [isChipShape]);

  const handleClick = (groupCode: string) => {
    onAmplitude(groupCode);
    onPageChange(groupCode);
  };

  return (
    <MenuWrap style={{ opacity, height: wrapHeight }} isChipShape={isChipShape} mobileHeaderHeight={mobileHeaderHeight}>
      <Swiper
        slidesPerView={'auto'}
        watchOverflow={!isSwiperOption}
        slidesOffsetBefore={SLIDES_OFFSET}
        slidesOffsetAfter={SLIDES_OFFSET}
        spaceBetween={swiperGapSize}
        centeredSlides={isSwiperOption}
        slideToClickedSlide={isSwiperOption}
        centeredSlidesBounds={isSwiperOption}
        css={swiperStyles}
        onSwiper={(s) => {
          setSwiper(s);
        }}
      >
        {groups.map(({ code: groupCode, title: groupTitle, mobileCollectionImage }) => (
          <SwiperSlide key={groupCode}>
            <MenuLink isCurrent={groupCode === code} isChipShape={isChipShape} onClick={() => handleClick(groupCode)}>
              <Thumb
                style={{ width: thumbWidth, height: thumbHeight }}
                isCurrent={groupCode === code}
                isImageExisted={!!mobileCollectionImage}
                isChipShape={isChipShape}
              >
                <NextImage
                  src={mobileCollectionImage || NoProductImageLogo}
                  width={CIRCLE_THUMBNAIL_IMAGE_SIZE}
                  height={CIRCLE_THUMBNAIL_IMAGE_SIZE}
                  alt="컬렉션 이미지"
                />
              </Thumb>
              <Name isChipShape={isChipShape}>{groupTitle.length > 6 ? groupTitle.slice(0, 6) : groupTitle}</Name>
            </MenuLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </MenuWrap>
  );
}
