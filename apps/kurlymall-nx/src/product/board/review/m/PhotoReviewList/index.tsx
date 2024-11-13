import styled from '@emotion/styled';
import { chain, get, gt, head, nth, size } from 'lodash';

import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

import type { ProductReview, ProductReviewList } from '../../ProductReview.service';
import { ScreenName } from '../../../../../shared/amplitude';
import { useScreenName } from '../../../../../shared/hooks';
import { NoImage, NoMainImageLogo } from '../../../../../shared/images';
import COLOR from '../../../../../shared/constant/colorset';

import Repeat from '../../../../../shared/components/Repeat';
import NextImage from '../../../../../shared/components/NextImage';
import { useInfiniteProductReviewList } from '../../hooks/useInfiniteProductReviewList';
import { REVIEW_SORT_TYPE } from '../../constants';
import { isNotEmpty } from '../../../../../shared/utils/lodash-extends';

const PhotoList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-content: start;
  gap: 3px;
  width: 100%;
  padding-bottom: 3px;
`;

const PhotoItem = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 100%;
  background: url(${NoImage}) no-repeat 50% 50%;
  background-size: 40%;
  background-color: ${COLOR.kurlyGray200};
  a {
    display: inline-block;
    width: 0;
    height: 0;
  }
`;

const ImageCount = styled.p`
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 22px;
  height: 22px;
  border-top-left-radius: 4px;
  background-color: hsla(0, 0%, 0%, 0.4);
  text-align: center;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  color: ${COLOR.kurlyWhite};
  vertical-align: top;
`;

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 300,
});

const PHOTOS_PER_ROW = 3;

interface Props {
  contentsProductNo: number;
  onClickImageItem(review: ProductReview, index: number): () => void;
}

export const PhotoReviewList = ({ contentsProductNo, onClickImageItem }: Props) => {
  useScreenName(ScreenName.PRODUCT_PHOTO_REVIEW_LIST);

  const {
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    productReviewList,
    isProductReviewListEmpty,
  } = useInfiniteProductReviewList({
    contentsProductNo,
    onlyImage: true,
    sortType: REVIEW_SORT_TYPE.RECENTLY,
    dealProduct: [],
    memberGroup: [],
    size: 40,
  });

  const photosByLineArray = chain(productReviewList)
    .filter((review) => isNotEmpty(get(review, 'images', [])))
    .chunk(PHOTOS_PER_ROW)
    .value();

  const rowCount = hasNextPage ? photosByLineArray.length + 1 : photosByLineArray.length;

  const loadMoreRows = () => {
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
    return Promise.resolve(false);
  };

  const isRowLoaded = ({ index }: { index: number }) => {
    const target = nth(photosByLineArray, index);
    return !!target;
  };

  const renderGallery = ({ items, parentIndex }: { items: ProductReviewList; parentIndex: number }) => {
    return items.map((item, index) => {
      if (!item) {
        return null;
      }

      const { id, images } = item;
      const firstImage = head(images);
      const imageUrl = get(firstImage, 'url', NoMainImageLogo);
      const reviewSquareSmallUrl = get(firstImage, 'reviewSquareSmallUrl');
      const imageCount = size(images);
      const imageItemIndex = parentIndex * PHOTOS_PER_ROW + index;

      return (
        <PhotoItem key={`${id}-${index}`}>
          <button type="button" onClick={onClickImageItem(item, imageItemIndex)}>
            <NextImage
              src={reviewSquareSmallUrl || imageUrl}
              alt={`${item.dealProductName} 후기`}
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
            {gt(imageCount, 1) ? <ImageCount>{imageCount}</ImageCount> : null}
          </button>
        </PhotoItem>
      );
    });
  };

  const renderItem = ({ index, key, parent, style }: ListRowProps) => {
    const items = photosByLineArray[index];

    if (!items) {
      return null;
    }

    return (
      <CellMeasurer cache={cache} key={key} rowIndex={index} parent={parent}>
        <PhotoList style={style}>{renderGallery({ items, parentIndex: index })}</PhotoList>
      </CellMeasurer>
    );
  };

  // TODO: 오류 화면, 리스트 비어있는 경우 디자인 요청 필요
  if (isError) {
    return null;
  }

  return (
    <div>
      {/* TODO: [EdgeCase] 후기 목록이 비어있는 경우 디자인 요청 필요
        isSuccess && isProductReviewListEmpty ? <div>후기 목록이 없습니다.</div> : null
         */}
      {isSuccess && !isProductReviewListEmpty ? (
        <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount} threshold={10}>
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      ref={registerChild}
                      width={width}
                      height={height}
                      autoHeight
                      deferredMeasurementCache={cache}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      rowRenderer={renderItem}
                      rowCount={rowCount}
                      rowHeight={cache.rowHeight}
                      onRowsRendered={onRowsRendered}
                      overscanRowCount={1}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      ) : null}
      {isLoading ? (
        <PhotoList>
          <Repeat count={18}>
            <PhotoItem />
          </Repeat>
        </PhotoList>
      ) : null}
    </div>
  );
};
