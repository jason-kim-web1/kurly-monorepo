import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import { amplitudeService, ScreenName } from '../../../../../src/shared/amplitude';
import { ViewReviewDetail } from '../../../../../src/shared/amplitude/events/review';
import { useAppSelector } from '../../../../../src/shared/store';

import type { ProductReview } from '../../../../../src/product/board/review/ProductReview.service';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import ReviewDetailLayer from '../../../../../src/product/board/review/m/ReviewDetailLayer/ReviewDetailLayer';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import type { ParsedUrlQuery } from 'querystring';
import { PhotoReviewList } from '../../../../../src/product/board/review/m/PhotoReviewList';
import { useInfiniteProductReviewList } from '../../../../../src/product/board/review/hooks/useInfiniteProductReviewList';
import { REVIEW_SORT_TYPE } from '../../../../../src/product/board/review/constants';

import { ignoreError } from '../../../../../src/shared/utils/general';
import { useScreenName } from '../../../../../src/shared/hooks';
import { redirectTo } from '../../../../../src/shared/reducers/page';

const CONTENT_TYPE = {
  LIST: 'LIST',
  DETAIL: 'DETAIL',
};

export default function ReviewListPage() {
  useScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
  const [currentContent, setCurrentContent] = useState(CONTENT_TYPE.LIST);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const router = useRouter();
  const { isReady, query } = router;
  const { productCode, contentType, reviewIndex } = query as ParsedUrlQuery & {
    productCode?: number;
    contentType?: 'LIST' | 'DETAIL';
    reviewIndex?: number;
  };
  const contentsProductNo = Number(productCode);
  const productData = useAppSelector(({ productDetail }) => productDetail);
  const { fetchNextPage, hasNextPage, productReviewList, productReviewListSize, queryKey } =
    useInfiniteProductReviewList({
      contentsProductNo,
      onlyImage: true,
      sortType: REVIEW_SORT_TYPE.RECENTLY,
      dealProduct: [],
      memberGroup: [],
      size: 40,
    });
  const selectedReview = get(productReviewList, selectedIndex);

  const logAmplitudeEvent = (reviewData: ProductReview) => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_PHOTO_REVIEW_LIST);
    amplitudeService.logEvent(
      new ViewReviewDetail({
        reviewData,
        sortType: 'RECENTLY',
        productData,
      }),
    );
  };

  const handleClickImageItem = (review: ProductReview, index: number) => () => {
    ignoreError(() => {
      logAmplitudeEvent(review);
    });
    setSelectedIndex(index);
    setCurrentContent(CONTENT_TYPE.DETAIL);

    dispatch(
      redirectTo({
        url: `/goods/${contentsProductNo}/review`,
        query: {
          reviewNo: review.id,
        },
        replace: true,
      }),
    );
  };

  const handleClickCloseButton = () => {
    if (currentContent === CONTENT_TYPE.LIST) {
      router.back();
      return;
    }
    setCurrentContent(CONTENT_TYPE.LIST);
  };

  const handleClickBackButton = () => {
    if (contentType === CONTENT_TYPE.DETAIL) {
      router.back();
      return;
    }
    setCurrentContent(CONTENT_TYPE.LIST);
  };

  const movePrevReview = async () => {
    if (selectedIndex === 0) {
      await Alert({ text: '첫번째 후기입니다.' });
      return;
    }
    setSelectedIndex(selectedIndex - 1);
  };

  const moveNextReview = async () => {
    const isLastItem = productReviewListSize === selectedIndex + 1;
    const threshold = 20;
    if (isLastItem && !hasNextPage) {
      await Alert({ text: '마지막 후기입니다.' });
      return;
    }
    if (hasNextPage && productReviewListSize - selectedIndex < threshold) {
      fetchNextPage();
    }
    setSelectedIndex(selectedIndex + 1);
  };

  useEffect(() => {
    if (!isReady || !contentType || !reviewIndex) {
      return;
    }
    setCurrentContent(contentType);
    setSelectedIndex(Number(reviewIndex));
  }, [isReady, contentType, reviewIndex]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          {currentContent === CONTENT_TYPE.LIST ? (
            <CloseButton onClick={handleClickCloseButton} />
          ) : (
            <BackButton onClick={handleClickBackButton} />
          )}
        </HeaderButtons>
        <HeaderTitle>{currentContent === CONTENT_TYPE.LIST ? '사진 후기 전체보기' : '사진 후기'}</HeaderTitle>
      </MobileHeader>
      {currentContent === 'LIST' ? (
        <PhotoReviewList contentsProductNo={contentsProductNo} onClickImageItem={handleClickImageItem} />
      ) : (
        <ReviewDetailLayer
          queryKey={queryKey}
          review={selectedReview}
          contentsProductNo={contentsProductNo}
          movePrevReview={movePrevReview}
          moveNextReview={moveNextReview}
        />
      )}
    </>
  );
}
