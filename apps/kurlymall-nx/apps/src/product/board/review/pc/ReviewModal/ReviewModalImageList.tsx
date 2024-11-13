import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { size, get, eq, head } from 'lodash';
import { useInView } from 'react-intersection-observer';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { ViewReviewDetail } from '../../../../../shared/amplitude/events/review';
import { useAppSelector } from '../../../../../shared/store';

import COLOR from '../../../../../shared/constant/colorset';

import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import { ProductReview, ProductReviewImageItem } from '../../ProductReview.service';
import NextImage from '../../../../../shared/components/NextImage';
import { NoImage } from '../../../../../shared/images';
import { useInfiniteProductReviewList } from '../../hooks/useInfiniteProductReviewList';
import { REVIEW_SORT_TYPE } from '../../constants';
import Repeat from '../../../../../shared/components/Repeat';

const Position = styled.div`
  position: relative;
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 121px);
  gap: 3px;
  grid-gap: 3px;
  max-height: 616px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-right: -10px;
  ${hiddenScrollBar({ x: 'hidden', y: 'auto' })}
`;

const ImageCount = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-top-left-radius: 4px;
  background-color: hsla(0, 0%, 0%, 0.4);

  span {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: ${COLOR.kurlyWhite};
  }
`;

const Thumbnail = styled.div`
  position: relative;
  cursor: pointer;
  width: 120px;
  height: 120px;
  background: url(${NoImage}) no-repeat 50% 50%;
  background-size: 40%;
  background-color: ${COLOR.kurlyGray200};
`;

const RENDER_IMAGE_LENGTH = 36;

const checkLastGridItem = (total: number, current: number) => {
  const actualIndex = current + 1;
  return eq(total, actualIndex);
};

const getReviewDetailMainImageUrl = (images: ProductReviewImageItem[]): string => {
  const DEFAULT_IMAGE_URL = '';
  const firstImage = head(images);
  if (!firstImage) {
    return DEFAULT_IMAGE_URL;
  }
  const reviewSquareSmallUrl = get(firstImage, 'reviewSquareSmallUrl');
  if (reviewSquareSmallUrl) {
    return reviewSquareSmallUrl;
  }
  return get(firstImage, 'url', DEFAULT_IMAGE_URL);
};

interface Props {
  contentsProductNo: number;
  onClickImage(index: number): void;
}

export default function ReviewModalImageList({ onClickImage, contentsProductNo }: Props) {
  const root = useRef(null);
  const [ref, inView] = useInView({
    root: root?.current,
    initialInView: false,
  });
  const productData = useAppSelector(({ productDetail }) => productDetail);
  const { isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, productReviewList, productReviewListSize } =
    useInfiniteProductReviewList({
      contentsProductNo,
      sortType: REVIEW_SORT_TYPE.RECENTLY,
      onlyImage: true,
      dealProduct: [],
      memberGroup: [],
      size: 40,
    });
  const productReviewImageList = productReviewList.filter((review) => {
    const images = get(review, 'images');
    const imageCount = size(images);
    return imageCount > 0;
  });

  const handleClick = (reviewData: ProductReview, index: number) => () => {
    onClickImage(index);
    amplitudeService.setScreenName(ScreenName.PRODUCT_PHOTO_REVIEW_LIST);
    amplitudeService.logEvent(
      new ViewReviewDetail({
        reviewData,
        sortType: 'RECENTLY',
        productData,
      }),
    );
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_DETAIL);
  };

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage]);

  return isSuccess && productReviewImageList ? (
    <Position ref={root}>
      <Grid>
        {productReviewImageList.map((review, index) => (
          <Thumbnail
            key={`${review.id}-${index}`}
            tabIndex={0}
            onClick={handleClick(review, index)}
            ref={checkLastGridItem(productReviewListSize, index) ? ref : null}
          >
            <NextImage
              width={120}
              height={120}
              src={getReviewDetailMainImageUrl(review.images)}
              alt={review.dealProductName}
              objectFit="cover"
              loading="lazy"
            />
            {review.images.length > 1 && (
              <ImageCount>
                <span>{review.images.length}</span>
              </ImageCount>
            )}
          </Thumbnail>
        ))}
        {isFetchingNextPage ? (
          <Repeat count={RENDER_IMAGE_LENGTH}>
            <Thumbnail />
          </Repeat>
        ) : null}
      </Grid>
    </Position>
  ) : null;
}
