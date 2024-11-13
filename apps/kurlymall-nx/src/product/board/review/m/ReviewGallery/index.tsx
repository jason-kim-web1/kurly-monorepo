import type { MouseEvent } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { get, isEqual } from 'lodash';
import styled from '@emotion/styled';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { SelectPhotoReviewList, ViewReviewDetail } from '../../../../../shared/amplitude/events/review';
import { useScreenName } from '../../../../../shared/hooks';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import Repeat from '../../../../../shared/components/Repeat';
import { imageRatioWrapper } from '../../../../../shared/styles/imageRatioStyle';
import COLOR from '../../../../../shared/constant/colorset';
import type { ProductReviewData, ProductReviewImageItem } from '../../ProductReview.service';
import { useInfiniteProductReviewList } from '../../hooks/useInfiniteProductReviewList';
import { useAppSelector } from '../../../../../shared/store';
import { createUrlPath } from '../../../../../shared/utils/url';
import { ignoreError } from '../../../../../shared/utils/general';
import { REVIEW_SORT_TYPE } from '../../constants';
import { isNotEmpty } from '../../../../../shared/utils/lodash-extends';
import ReviewGalleryItem from './ReviewGalleryItem';
import { redirectTo } from '../../../../../shared/reducers/page';

const ReviewGalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const ImageReviewText = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
`;

const ShowAll = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
`;

const GalleryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  margin-bottom: 16px;
  ${hiddenScrollBar({ x: 'auto', y: 'hidden' })}

  > span {
    display: flex;
    flex: 1 1 25%;
    max-width: 25%;
    ${imageRatioWrapper('25%')}
    margin-left: 2px;

    :first-of-type {
      span {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        margin-left: 0;
      }
    }

    :last-of-type {
      span {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        overflow: hidden;
      }
    }
  }
`;

interface Props {
  contentsProductNo: number;
}

const MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE = 4;

const shouldDisplayShowMore = (imageLength: number) => {
  return imageLength >= MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE;
};

export default function ReviewGallery({ contentsProductNo }: Props) {
  useScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
  const dispatch = useDispatch();
  const productData = useAppSelector(({ productDetail }) => productDetail);
  const {
    isSuccess,
    isLoading,
    productReviewListSize,
    isProductReviewListEmpty,
    normalizedProductReviewList,
    getProductReviewGalleryImageListByAmount,
  } = useInfiniteProductReviewList({
    contentsProductNo,
    sortType: REVIEW_SORT_TYPE.RECENTLY,
    onlyImage: true,
    dealProduct: [],
    memberGroup: [],
    size: 40,
  });
  const productReviewGalleryImageList = getProductReviewGalleryImageListByAmount(MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE);

  const handleClick =
    (reviewId: ProductReviewData['id'], imageId: ProductReviewImageItem['id'], index: number) => () => {
      if (isEqual(MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE, index + 1)) {
        return;
      }
      const nextPath = createUrlPath(`/goods/${contentsProductNo}/review`, {
        reviewNo: reviewId,
        imageId,
        contentType: 'DETAIL',
        reviewIndex: index,
      });
      ignoreError(() => {
        const productReview = get(normalizedProductReviewList, reviewId);
        amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
        amplitudeService.logEvent(
          new ViewReviewDetail({
            reviewData: productReview,
            sortType: REVIEW_SORT_TYPE.RECENTLY,
            productData,
          }),
        );
      });

      dispatch(
        redirectTo({
          url: nextPath,
        }),
      );
    };

  const handleShowAll = () => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
    amplitudeService.logEvent(new SelectPhotoReviewList({ selectionType: 'all' }));
  };

  const handleShowMore = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
    amplitudeService.logEvent(new SelectPhotoReviewList({ selectionType: 'more' }));

    dispatch(
      redirectTo({
        url: `/goods/${contentsProductNo}/review`,
      }),
    );
  };

  if (isProductReviewListEmpty) {
    return null;
  }

  return (
    <>
      <ReviewGalleryHeader>
        {isLoading ? (
          <>
            <SkeletonLoading width={52} height={19} />
            <SkeletonLoading width={49} height={19} />
          </>
        ) : null}

        {isSuccess ? (
          <>
            <ImageReviewText>사진 후기</ImageReviewText>
            {shouldDisplayShowMore(productReviewListSize) ? (
              <Link href={`/goods/${contentsProductNo}/review`} passHref>
                <a href={`/goods/${contentsProductNo}/review`} onClick={handleShowAll}>
                  <ShowAll>전체보기</ShowAll>
                </a>
              </Link>
            ) : null}
          </>
        ) : null}
      </ReviewGalleryHeader>
      <GalleryWrapper>
        {isLoading ? (
          <Repeat count={MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE}>
            <div
              css={css`
                width: 84px;
                height: 84px;
                flex-shrink: 0;
              `}
            >
              <SkeletonLoading width={84} height={84} />
            </div>
          </Repeat>
        ) : null}
        {isSuccess && isNotEmpty(productReviewGalleryImageList)
          ? productReviewGalleryImageList.map(({ reviewId, imageId, imageSrc, reviewSquareSmallUrl }, index) => (
              <ReviewGalleryItem
                key={reviewId}
                onClick={handleClick(reviewId, imageId, index)}
                imageSrc={reviewSquareSmallUrl || imageSrc}
                isShowMoreBlock={
                  shouldDisplayShowMore(productReviewListSize) && index + 1 === MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE
                }
                onClickShowMore={handleShowMore}
              />
            ))
          : null}
      </GalleryWrapper>
    </>
  );
}
