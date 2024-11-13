import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';
import { eq, get, isEmpty, isUndefined } from 'lodash';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import { AxiosError } from 'axios';

import { ParsedUrlQuery } from 'querystring';

import httpClient from '../../../../../src/shared/configs/http-client';
import { amplitudeService, ScreenName } from '../../../../../src/shared/amplitude';
import { RemoveReviewIsHelpful, SelectReviewIsHelpful } from '../../../../../src/shared/amplitude/events/review';
import { useAppSelector } from '../../../../../src/shared/store';
import rgbDataUrl from '../../../../../src/shared/utils/image/rgbDataUrl';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import Loading from '../../../../../src/shared/components/Loading/Loading';
import { ThumbsUpActiveIcon, ThumbsUpIcon } from '../../../../../src/shared/images';
import { Check, QuestionMark, Close } from '../../../../../src/shared/icons';
import { COMMON_PATH, getPageUrl } from '../../../../../src/shared/constant';
import COLOR from '../../../../../src/shared/constant/colorset';

import { createProductReview } from '../../../../../src/product/board/review/ProductReview.service';
import { getReviewPagination } from '../../../../../src/product/board/review/utils';

import EnlargedImageFrame from '../../../../../src/product/board/review/m/EnlargedImageFrame';
import { multiMaxLineText } from '../../../../../src/shared/utils';
import {
  AboutReview,
  Footer,
  Contents,
  RegistrationDate,
  Reviewer,
} from '../../../../../src/product/board/review/m/ReviewItem/styled-components';
import NextImage from '../../../../../src/shared/components/NextImage';
import NavigationArrow from '../../../../../src/shared/components/icons/NavigationArrow';
import { loadProductDetailInfo } from '../../../../../src/product/detail/slice';
import BuyFooterContainer from '../../../../../src/product/detail/m/containers/BuyFooterContainer';
import { REFERRER_EVENT_TYPE } from '../../../../../src/product/constants';
import { useProductReviewDetail } from '../../../../../src/product/board/review/hooks/useReviewDetail';
import { useBlockContextMenu } from '../../../../../src/product/board/review/hooks/useBlockContextMenu';
import { redirectTo } from '../../../../../src/shared/reducers/page';
import { Badges } from '../../../../../src/product/review/components/Badges';

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
  ${multiMaxLineText(1)}
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

const ImageWrapper = styled.div`
  position: relative;
  width: 100vw;
  padding-bottom: 100%;
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

const Main = styled.main`
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

const ReviewImage = styled.div<{ width?: number }>`
  position: relative;
  width: 40px;
  height: 40px;

  span {
    border-radius: 3px;
  }
`;

const DealProductNameWrapper = styled.div`
  display: flex;
  position: relative;
`;

const LayerMsg = styled.div`
  width: 14px;
  height: 14px;
  padding-left: 5px;
`;

const QuestionButton = styled.button`
  vertical-align: -2px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-start;
  position: absolute;
  left: 0;
  top: 21px;
  width: 100%;
  gap: 10px;
  padding: 11px 10px 11px 12px;
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const blurDataUrl = rgbDataUrl(parseInt('ee', 16), parseInt('ee', 16), parseInt('ee', 16));
const getCTAQuery = (query: ParsedUrlQuery) => {
  const ctaStr = get(query, 'cta');
  if (isUndefined(ctaStr) || eq(ctaStr, 'true')) {
    return true;
  }
  return false;
};

export default function ReviewPage() {
  useBlockContextMenu();

  const router = useRouter();
  const { isReady, query } = router;
  const { productCode, reviewId, imageId, reviewList } = query;
  const ctaEnabled = getCTAQuery(query);
  const contentsProductNo = Number(productCode);
  const reviewNo = Number(reviewId);
  const dispatch = useDispatch();
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const isProductInfoLoaded = eq(productNo, contentsProductNo);
  const { data, isLoading, isSuccess, queryKey } = useProductReviewDetail(contentsProductNo, reviewNo);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isEnlargedImage, setIsEnlargedImage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonText = !!data && data?.likeCount > 0 ? `도움돼요 ${data?.likeCount}` : '도움돼요';
  const queryClient = useQueryClient();
  const { productSites } = useAppSelector(({ productDetail }) => productDetail);
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const mutationKey = ['product', contentsProductNo, 'review', reviewId];
  const mutationFn = ({ isChecked }: { isChecked: boolean }) => {
    const url = `/product-review/v1/reviews/${reviewId}/like`;
    const method = isChecked ? 'delete' : 'post';

    return httpClient[method]<null>(url);
  };
  const { mutate } = useMutation(mutationFn, {
    onMutate: async () => {
      await queryClient.cancelQueries(mutationKey);
      const previousData = queryClient.getQueryData<ReturnType<typeof createProductReview>>(mutationKey);
      if (isGuest || isUndefined(previousData)) {
        return;
      }
      queryClient.setQueryData(queryKey, () => ({
        ...previousData,
        hasLiked: !previousData.hasLiked,
        likeCount: previousData.hasLiked ? Math.max(0, previousData.likeCount - 1) : previousData.likeCount + 1,
      }));
      return { previousData };
    },
    onSuccess: (_, { isChecked }) => {
      const AmplitudeEvent = isChecked ? RemoveReviewIsHelpful : SelectReviewIsHelpful;
      if (!contentsProductNo) {
        return;
      }
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_DETAIL);
      amplitudeService.logEvent(new AmplitudeEvent({ contentsProductNo: Number(contentsProductNo) }));
    },
    onError: async (error: AxiosError, _variables, context) => {
      const { message } = error.response?.data;
      if (message) {
        await Alert({ text: message });
      }
      queryClient.setQueryData(mutationKey, context?.previousData);
    },
    onSettled: async () => {
      await queryClient.refetchQueries(['product', contentsProductNo, 'review', reviewNo], { exact: false });
    },
  });

  const handleClick = () => {
    const text = '회원전용 서비스입니다. 로그인 페이지로 이동하시겠습니까?';
    if (!isGuest) {
      mutate({ isChecked: Boolean(data?.hasLiked) });
      return;
    }
    Alert({
      text,
      showCancelButton: true,
    }).then(async ({ isDismissed }) => {
      if (isDismissed) {
        return;
      }

      dispatch(
        redirectTo({
          url: getPageUrl(COMMON_PATH.login),
          query: {
            internalUrl: router.asPath,
          },
          replace: true,
        }),
      );
    });
  };

  const handleClickPaging = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isUndefined(contentsProductNo) || isUndefined(reviewNo)) {
      return;
    }
    const { value: pagingDirection } = event.target as HTMLButtonElement;
    const { before: previousReviewNo, after: nextReviewNo } = await getReviewPagination(
      contentsProductNo,
      reviewNo,
      pagingDirection === 'prev' ? 'PREVIOUS' : 'NEXT',
    );
    const isNewestReview = !previousReviewNo || previousReviewNo === reviewNo;
    const isOldestReview = !nextReviewNo || nextReviewNo === reviewNo;
    if ((isNewestReview && pagingDirection === 'prev') || (isOldestReview && pagingDirection === 'next')) {
      const text = isNewestReview ? '첫번째 후기입니다.' : '마지막 후기입니다.';
      await Alert({ text });
      return;
    }
    const replacedReviewNo = pagingDirection === 'prev' ? previousReviewNo : nextReviewNo;

    dispatch(
      redirectTo({
        url: `/goods/${contentsProductNo}/review/${replacedReviewNo}`,
        query: {
          reviewList: true,
        },
        replace: true,
      }),
    );
  };

  const handleSlideChange = (event: { activeIndex: number }) => {
    if (!swiper) {
      return;
    }
    swiper.slideTo(event.activeIndex);
    setSelectedSlideIndex(event.activeIndex);
  };

  const handleChangeImageSlide = (thumbIndex: number) => {
    if (!swiper) {
      return;
    }
    setSelectedSlideIndex(thumbIndex);
    swiper.slideTo(thumbIndex);
  };

  useEffect(() => {
    // TODO: eq(contentsProductNo, 0) -> 후기 필터 쪽에 적용된 유효 상품코드 검증 함수로 개선
    if (!hasSession || eq(contentsProductNo, 0) || isProductInfoLoaded || !ctaEnabled) {
      return;
    }
    dispatch(loadProductDetailInfo(contentsProductNo));
  }, [hasSession, contentsProductNo, isProductInfoLoaded, ctaEnabled]);

  useEffect(() => {
    if (!contentsProductNo || !reviewId) {
      return;
    }
  }, [contentsProductNo, reviewId]);

  useEffect(() => {
    if (!isReady || !isSuccess || !swiper) {
      return;
    }
    data?.images.find((image, index) => {
      if (image.id === Number(imageId)) {
        setSelectedSlideIndex(index);
        swiper.slideTo(index);
      }
    });
  }, [isReady, isSuccess, imageId, swiper]);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.activeIndex = selectedSlideIndex;
  }, [selectedSlideIndex, swiper]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton onClick={router.back} />
        </HeaderButtons>
        <HeaderTitle>사진 후기</HeaderTitle>
      </MobileHeader>
      {isLoading ? <Loading /> : null}
      {isSuccess && !!data && (
        <>
          <ImageFrame>
            <Swiper loop={false} onSwiper={(s) => setSwiper(s)} onSlideChange={handleSlideChange}>
              {data.images.map(({ id, url }, index) => (
                <SwiperSlide key={`${id}-${index}`}>
                  <ImageWrapper>
                    <NextImage
                      src={url ?? blurDataUrl}
                      alt={data.contents}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                      onClick={() => setIsEnlargedImage(true)}
                    />
                  </ImageWrapper>
                </SwiperSlide>
              ))}
              {reviewList && (
                <>
                  <PaginationButton position="left" type="button" value="prev" onClick={handleClickPaging}>
                    <NavigationArrow />
                  </PaginationButton>
                  <PaginationButton position="right" type="button" value="next" onClick={handleClickPaging}>
                    <NavigationArrow />
                  </PaginationButton>
                </>
              )}
            </Swiper>
          </ImageFrame>
          <Main>
            {data.images.length > 1 && (
              <ImageGallery imageCount={data.images.length}>
                {data.images.map(({ id, url: imageSrc, reviewSquareSmallUrl }, thumbIndex) => (
                  <ReviewImage
                    key={id}
                    aria-hidden
                    tabIndex={0}
                    className="review-image"
                    onClick={() => handleChangeImageSlide(thumbIndex)}
                  >
                    <NextImage
                      src={reviewSquareSmallUrl || imageSrc}
                      alt="review-image"
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                    />
                    {thumbIndex === selectedSlideIndex ? (
                      <Dim>
                        <Check />
                      </Dim>
                    ) : null}
                  </ReviewImage>
                ))}
              </ImageGallery>
            )}
            <AboutReview>
              <Badges type={data.type} grade={data.reviewerGrade} isMembership={data.isMembership} />
              <Reviewer>{data.reviewer}</Reviewer>
            </AboutReview>
            {!isEmpty(data.profiles.beautyProfile) && productSites.includes('BEAUTY') ? (
              <BeautyProfile>{data.profiles.beautyProfile}</BeautyProfile>
            ) : null}
            <DealProductNameWrapper>
              <DealProductName>{data.dealProductName}</DealProductName>
              {Number(router.query.productCode) !== data.contentsProductNo && (
                <LayerMsg>
                  <QuestionButton onClick={() => setIsOpen(true)}>
                    <QuestionMark stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
                  </QuestionButton>
                  {isOpen && (
                    <Text>
                      <p>
                        이 후기는 판매구성이 다르지만 본품이 동일한 상품을 구매 후 작성된 후기입니다. 판매구성에 따라
                        용량, 구성, 상품명 등 일부 정보가 상이할 수 있습니다.
                      </p>
                      <button type="button" onClick={() => setIsOpen(false)}>
                        <Close width={16} height={16} fill={COLOR.kurlyGray800} stroke={COLOR.kurlyGray800} />
                      </button>
                    </Text>
                  )}
                </LayerMsg>
              )}
            </DealProductNameWrapper>
            <Contents>{data.contents}</Contents>
            <Footer>
              {data.registrationDate ? (
                <RegistrationDate>{format(parseISO(data.registrationDate), 'yyyy.MM.dd')}</RegistrationDate>
              ) : (
                <span />
              )}
              <LikeButton checked={data.hasLiked} onClick={handleClick}>
                <LikeIcon checked={data.hasLiked} />
                <span>{buttonText}</span>
              </LikeButton>
            </Footer>
            {isProductInfoLoaded ? <BuyFooterContainer referrerEventType={REFERRER_EVENT_TYPE.REVIEW_DETAIL} /> : null}
          </Main>
        </>
      )}
      {!!data && isEnlargedImage ? (
        <EnlargedImageFrame
          reviewImages={data.images}
          activeIndex={selectedSlideIndex}
          handleSlideChange={handleSlideChange}
          reviewImageLength={data.images.length}
          onDismiss={() => setIsEnlargedImage(false)}
        />
      ) : null}
    </>
  );
}
