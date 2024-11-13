import { useState, Fragment, useCallback } from 'react';
import { get, isEqual } from 'lodash';

import styled from '@emotion/styled';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { SelectPhotoReviewList, ViewReviewDetail } from '../../../../../shared/amplitude/events/review';
import Alert from '../../../../../shared/components/Alert/Alert';

import ReviewModal from '../ReviewModal/ReviewModal';
import ReviewModalImageList from '../ReviewModal/ReviewModalImageList';
import ReviewModalDetailContent from '../ReviewModal/ReviewModalDetailContent';
import Loading from './Loading';
import { useAppSelector } from '../../../../../shared/store';
import { useInfiniteProductReviewList } from '../../hooks/useInfiniteProductReviewList';
import { REVIEW_SORT_TYPE } from '../../constants';
import { isNotEmpty } from '../../../../../shared/utils/lodash-extends';
import { ignoreError } from '../../../../../shared/utils/general';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import COLOR from '../../../../../shared/constant/colorset';
import NextImage from '../../../../../shared/components/NextImage';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
  padding: 20px 0 30px 0;
  ${hiddenScrollBar({ x: 'hidden', y: 'hidden' })}
`;

const ThumbnailImage = styled.button`
  position: relative;
  width: 124px;
  height: 124px;
  overflow: hidden;
  background-color: ${COLOR.bg};
  :first-of-type {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  :last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const ShowMore = styled.a`
  position: absolute;
  right: 0;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 124px;
  margin-bottom: 32px;
  border-radius: 0 6px 6px 0;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${COLOR.kurlyWhite};
  }
`;

const CONTENT_TYPE = {
  LIST: 'LIST',
  DETAIL: 'DETAIL',
};

const MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE = 8;

interface Props {
  contentsProductNo: number;
}

export default function ReviewGallery({ contentsProductNo }: Props) {
  const productData = useAppSelector(({ productDetail }) => productDetail);
  const [currentContent, setCurrentContent] = useState(CONTENT_TYPE.LIST);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    productReviewListSize,
    productReviewList,
    normalizedProductReviewList,
    getProductReviewGalleryImageListByAmount,
    queryKey,
  } = useInfiniteProductReviewList({
    contentsProductNo,
    onlyImage: true,
    dealProduct: [],
    memberGroup: [],
    sortType: REVIEW_SORT_TYPE.RECENTLY,
    size: 40,
  });
  const productReviewGalleryImageList = getProductReviewGalleryImageListByAmount(MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE);
  const selectedReview = get(productReviewList, selectedIndex);
  const modalTitle = currentContent === CONTENT_TYPE.DETAIL ? '사진 후기' : '사진 후기 전체보기';
  const handleClickBackToList = useCallback(() => setCurrentContent(() => CONTENT_TYPE.LIST), []);
  const handleClickPrev = useCallback(() => {
    if (selectedIndex === 0) {
      Alert({ text: '첫번째 후기입니다.' });
      return;
    }
    setSelectedIndex(() => selectedIndex - 1);
  }, [selectedIndex]);

  const handleClickNext = useCallback(() => {
    const isLastItem = productReviewListSize === selectedIndex + 1;
    const threshold = 20;
    if (isLastItem && !hasNextPage) {
      Alert({ text: '마지막 후기입니다.' });
      return;
    }
    if (hasNextPage && productReviewListSize - selectedIndex < threshold) {
      fetchNextPage();
    }
    setSelectedIndex(() => selectedIndex + 1);
  }, [productReviewListSize, hasNextPage, selectedIndex]);

  const handleClick = () => {
    ignoreError(() => {
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
      amplitudeService.logEvent(new SelectPhotoReviewList({ selectionType: 'more' }));
    });
    setIsOpen(true);
  };

  const handleClickImage = (index: number) => {
    setSelectedIndex(index);
    setCurrentContent(CONTENT_TYPE.DETAIL);
    setIsOpen(true);
  };

  const handleClickGalleryImage = (index: number, reviewId: number) => () => {
    ignoreError(() => {
      const review = normalizedProductReviewList[reviewId];
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
      amplitudeService.logEvent(
        new ViewReviewDetail({
          reviewData: review,
          sortType: 'RECENTLY',
          productData,
        }),
      );
    });
    handleClickImage(index);
  };

  const handleDismiss = () => {
    setCurrentContent(CONTENT_TYPE.LIST);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <Loading count={MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE} />
      </Wrapper>
    );
  }

  if (!isSuccess || !isNotEmpty(productReviewGalleryImageList)) {
    return null;
  }

  return (
    <Wrapper>
      {productReviewGalleryImageList.map(({ reviewId, imageId, imageSrc, reviewSquareSmallUrl }, index) => {
        const isLastImage = isEqual(MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE, index + 1);
        // TODO: [SEO] Image 의 ALT 를 상품명 + 후기로 변경 필요함
        return (
          <Fragment key={`${reviewId}_${imageId}`}>
            <ThumbnailImage onClick={handleClickGalleryImage(index, reviewId)}>
              <NextImage layout="fill" objectFit="cover" src={reviewSquareSmallUrl || imageSrc} alt="상품 후기" />
            </ThumbnailImage>
            {isLastImage && productReviewListSize >= MAX_NUMBER_OF_REVIEW_GALLERY_IMAGE ? (
              <ShowMore onClick={handleClick}>
                <span>+더보기</span>
              </ShowMore>
            ) : null}
          </Fragment>
        );
      })}
      <ReviewModal title={modalTitle} isOpen={isOpen} onDismiss={handleDismiss}>
        {isOpen ? (
          currentContent === CONTENT_TYPE.LIST ? (
            <ReviewModalImageList onClickImage={handleClickImage} contentsProductNo={contentsProductNo} />
          ) : (
            <ReviewModalDetailContent
              queryKey={queryKey}
              review={selectedReview}
              onClickBackToList={handleClickBackToList}
              onClickPrev={handleClickPrev}
              onClickNext={handleClickNext}
            />
          )
        ) : null}
      </ReviewModal>
    </Wrapper>
  );
}
