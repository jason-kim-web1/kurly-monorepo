import { useEffect, useState } from 'react';
import type { QueryKey } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';
import { eq, isEmpty, isUndefined } from 'lodash';
import { useDispatch } from 'react-redux';

import type { Swiper as SwiperClass } from 'swiper/types';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { RemoveReviewIsHelpful, SelectReviewIsHelpful } from '../../../../../shared/amplitude/events/review';
import Alert from '../../../../../shared/components/Alert/Alert';
import { useAppSelector } from '../../../../../shared/store';
import rgbDataUrl from '../../../../../shared/utils/image/rgbDataUrl';
import { COMMON_PATH, getPageUrl } from '../../../../../shared/constant';
import COLOR from '../../../../../shared/constant/colorset';
import { Check, Close, QuestionMark } from '../../../../../shared/icons';
import { ThumbsUpActiveIcon, ThumbsUpIcon } from '../../../../../shared/images';

import type { ProductReview } from '../../ProductReview.service';
import { useHelpfulReview } from '../../hooks';
import EnlargedImageFrame from '../EnlargedImageFrame';
import { AboutReview, Contents, Footer, RegistrationDate, Reviewer } from '../ReviewItem/styled-components';
import NextImage from '../../../../../shared/components/NextImage';
import NavigationArrow from '../../../../../shared/components/icons/NavigationArrow';
import BuyFooterContainer from '../../../../detail/m/containers/BuyFooterContainer';
import { loadProductDetailInfo } from '../../../../detail/slice';
import { REFERRER_EVENT_TYPE } from '../../../../constants';
import { useScreenName } from '../../../../../shared/hooks';
import { redirectTo } from '../../../../../shared/reducers/page';
import { Badges } from '../../../../review/components/Badges';

const BeautyProfile = styled.span`
  display: block;
  margin-bottom: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray800};
`;

const DealProductName = styled.h3`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const Dim = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: hsla(0, 0%, 0%, 0.4);
`;

const ImageFrame = styled.div`
  width: 100vw;
  display: flex;
  overflow-x: scroll;
`;

const ImageGallery = styled.div<{ imageCount: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  width: ${({ imageCount }) => (imageCount > 0 ? `${42 * imageCount - 2}px` : '100%')};
  max-width: 100%;
  height: 40px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100vw;
  padding-bottom: 100%;
`;

const Main = styled.main`
  position: relative;
  padding: 20px 16px 120px;
`;

const LikeButton = styled.button<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 88px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 20px;
  font-size: 12px;
  line-height: 20px;
  color: ${({ checked }) => (checked ? COLOR.kurlyPurple : COLOR.kurlyGray450)};
`;

const LikeIcon = styled.div<{ checked: boolean }>`
  width: 15px;
  height: 15px;
  margin-right: 4px;
  background: url(${({ checked }) => (checked ? ThumbsUpActiveIcon : ThumbsUpIcon)}) no-repeat center;
`;

const PaginationButton = styled.button<{ position: string }>`
  position: absolute;
  z-index: 1;
  left: 7px;
  top: 50%;
  width: 40px;
  height: 73px;
  margin-top: -38px;
  ${({ position }) =>
    position === 'right' &&
    css`
      left: auto;
      right: 7px;
      transform: rotate(180deg);
    `}
`;

const Position = styled.div`
  position: relative;
`;

const ProductName = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  height: 16px;
`;

const ReviewImage = styled.div<{ width?: number }>`
  position: relative;
  width: 40px;
  height: 40px;
  span {
    border-radius: 3px;
  }
`;

const SkeletonImageFrame = styled.div`
  width: 100vw;
  height: 100vw;
  background-color: ${COLOR.kurlyGray200};
`;

const Text = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: self-start;
  gap: 10px;
  width: 100%;
  max-width: 543px;
  padding: 12px;
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const TooltipIcon = styled.div`
  width: 14px;
  height: 14px;
`;

const blurDataUrl = rgbDataUrl(parseInt('ee', 16), parseInt('ee', 16), parseInt('ee', 16));

interface SwiperExtendProps extends SwiperClass {
  swipeDirection?: 'prev' | 'next';
}

interface Props {
  queryKey: QueryKey;
  review?: ProductReview;
  contentsProductNo: number;
  movePrevReview(): void;
  moveNextReview(): void;
}

export default function ReviewDetailLayer({
  queryKey,
  review,
  contentsProductNo,
  movePrevReview,
  moveNextReview,
}: Props) {
  useScreenName(ScreenName.PRODUCT_REVIEW_DETAIL);
  const router = useRouter();
  const dispatch = useDispatch();
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const isProductInfoLoaded = eq(productNo, contentsProductNo);

  useEffect(() => {
    // TODO: eq(contentsProductNo, 0) -> 후기 필터 쪽에 적용된 유효 상품코드 검증 함수로 개선
    if (!hasSession || eq(contentsProductNo, 0) || isProductInfoLoaded) {
      return;
    }
    dispatch(loadProductDetailInfo(contentsProductNo));
  }, [hasSession, contentsProductNo, isProductInfoLoaded]);

  const mutationOption = {
    onSuccess: () => {
      if (isUndefined(review)) {
        return;
      }
      const AmplitudeEvent = review.hasLiked ? RemoveReviewIsHelpful : SelectReviewIsHelpful;
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_DETAIL);
      amplitudeService.logEvent(new AmplitudeEvent({ contentsProductNo }));
    },
  };

  const { isGuest } = useAppSelector(({ auth }) => auth);
  const { productSites } = useAppSelector(({ productDetail }) => productDetail);
  const { mutateAsync } = useHelpfulReview(queryKey, mutationOption);
  const buttonText = !!review && review.likeCount > 0 ? `도움돼요 ${review.likeCount}` : '도움돼요';

  useEffect(() => {
    if (!swiper) {
      return;
    }

    setActiveSlideIndex(0);
    swiper?.slideTo(0);
  }, [swiper, review?.id]);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.slideTo(activeSlideIndex);
  }, [activeSlideIndex, swiper]);

  const handleSwiperTouchEnd = (swiperObj: SwiperExtendProps) => {
    if (!swiperObj.isBeginning && !swiperObj.isEnd) {
      return;
    }

    switch (swiperObj.swipeDirection) {
      case 'prev':
        movePrevReview();
        break;
      case 'next':
        moveNextReview();
        break;
      default:
        break;
    }
  };

  const handleSlideChange = (event: { activeIndex: number }) => {
    setActiveSlideIndex(event.activeIndex);
  };

  function handleImageClick(imageIndex: number) {
    if (!swiper) {
      return;
    }

    setActiveSlideIndex(imageIndex);
    swiper.slideTo(imageIndex);
  }

  const handleClickLike = async () => {
    if (isGuest) {
      const text = '회원전용 서비스입니다. 로그인 페이지로 이동하시겠습니까?';
      const { isDismissed } = await Alert({ text, showCancelButton: true });

      if (isDismissed) {
        return;
      }

      dispatch(
        redirectTo({
          url: getPageUrl(COMMON_PATH.login),
          query: {
            internalUrl: router.asPath,
          },
        }),
      );

      return;
    }

    if (isUndefined(review)) {
      return;
    }

    await mutateAsync({ reviewId: review.id, isChecked: review.hasLiked });
  };

  return !!review ? (
    <>
      <Position>
        <ImageFrame>
          <Swiper
            loop={false}
            onSwiper={(s) => setSwiper(s)}
            onSlideChange={handleSlideChange}
            onTouchEnd={handleSwiperTouchEnd}
          >
            {review.images.map(({ id, url }, index) => (
              <SwiperSlide key={`${id}-${index}`}>
                <ImageWrapper>
                  <NextImage
                    src={url}
                    alt="review-image"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    onClick={() => setIsImageEnlarged(true)}
                  />
                </ImageWrapper>
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageFrame>
        <PaginationButton position="left" onClick={movePrevReview}>
          <NavigationArrow />
        </PaginationButton>
        <PaginationButton position="right" onClick={moveNextReview}>
          <NavigationArrow />
        </PaginationButton>
      </Position>
      <Main>
        {review.images.length > 1 && (
          <ImageGallery imageCount={review.images.length}>
            {review.images.map(({ id: imageId, url: imageSrc, reviewSquareSmallUrl }, imageIndex) => (
              <ReviewImage
                key={`${imageId}-${imageIndex}`}
                tabIndex={0}
                className="review-image"
                onClick={() => handleImageClick(imageIndex)}
              >
                <NextImage
                  src={reviewSquareSmallUrl || imageSrc}
                  alt="review-image"
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
                {imageIndex === activeSlideIndex ? (
                  <Dim>
                    <Check />
                  </Dim>
                ) : null}
              </ReviewImage>
            ))}
          </ImageGallery>
        )}
        <AboutReview>
          <Badges type={review.type} grade={review.reviewerGrade} isMembership={review.isMembership} />
          <Reviewer>{review.reviewer}</Reviewer>
        </AboutReview>
        {!isEmpty(review.profiles.beautyProfile) && productSites.includes('BEAUTY') ? (
          <BeautyProfile>{review.profiles.beautyProfile}</BeautyProfile>
        ) : null}
        <ProductName>
          <DealProductName>{review.dealProductName}</DealProductName>
          {router.isReady && Number(router.query.productCode) !== review.contentsProductNo ? (
            <TooltipIcon>
              <button onClick={() => setIsTooltipOpen(true)}>
                <QuestionMark stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
              </button>
              {isTooltipOpen && (
                <Text>
                  <p>
                    이 후기는 판매구성이 다르지만 본품이 동일한 상품을 구매 후 작성된 후기입니다. 판매구성에 따라 용량,
                    구성, 상품명 등 일부 정보가 상이할 수 있습니다.
                  </p>
                  <button type="button" onClick={() => setIsTooltipOpen(false)}>
                    <Close width={16} height={16} fill={COLOR.kurlyGray800} stroke={COLOR.kurlyGray800} />
                  </button>
                </Text>
              )}
            </TooltipIcon>
          ) : null}
        </ProductName>
        <Contents>{review.contents}</Contents>
        <Footer>
          {review.registrationDate ? (
            <RegistrationDate>{format(parseISO(review.registrationDate), 'yyyy.MM.dd')}</RegistrationDate>
          ) : (
            <span />
          )}
          <LikeButton checked={review.hasLiked} onClick={handleClickLike}>
            <LikeIcon checked={review.hasLiked} />
            <span>{buttonText}</span>
          </LikeButton>
        </Footer>
        {isProductInfoLoaded ? <BuyFooterContainer referrerEventType={REFERRER_EVENT_TYPE.REVIEW_DETAIL} /> : null}
      </Main>
      {isImageEnlarged ? (
        <EnlargedImageFrame
          reviewImages={review.images}
          activeIndex={activeSlideIndex}
          handleSlideChange={handleSlideChange}
          reviewImageLength={review.images.length}
          onDismiss={() => setIsImageEnlarged(false)}
        />
      ) : null}
    </>
  ) : (
    <SkeletonImageFrame />
  );
}
