import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { useCallback, useMemo } from 'react';

import { AutoSizer, InfiniteLoader, List, ListRowRenderer, WindowScroller } from 'react-virtualized';

import { BoardList } from '../../components/m/List';
import COLOR from '../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../shared/utils';
import useNoticeInfiniteQuery from '../../hooks/useNoticeInfiniteQuery';
import { getFormattedDate } from '../../util';
import { BOARD_PATH } from '../../../shared/constant';
import { DEFAULT_ITEM_HEIGHT, PAGE_SIZE_LIMIT } from '../../constants';
import Loading from '../../components/m/Loading';

const styles = {
  view: css`
    padding: 16px 20px;
    border-bottom: 1px solid ${COLOR.bg};
  `,
  infoWrapper: css`
    flex-direction: row;
    margin-bottom: 8px;
  `,
  no: css`
    flex: 1 1 0;
    text-align: left;
  `,
  subject: css`
    color: ${COLOR.kurlyGray800};
    font-weight: 600;
    ${multiMaxLineText(1)};
  `,
  date: css`
    flex: 1 1 0;
    text-align: right;
  `,
};

export default function MobileNoticeListContainer() {
  const {
    flatList,
    isFetchingNextPage,
    hasNextPage,
    isSuccess,
    isFetching,
    isError,
    rowCount,
    isLastPage,
    isListEmpty,
    fetchNextPage,
  } = useNoticeInfiniteQuery();

  const listRowCount = useMemo(() => (isLastPage ? rowCount : rowCount + PAGE_SIZE_LIMIT), [isLastPage, rowCount]);

  const loadMoreRows = () => {
    if (isLastPage) {
      return Promise.resolve(false);
    }
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
    return Promise.resolve(false);
  };

  const isRowLoaded = ({ index }: { index: number }) => {
    return !isEmpty(flatList[index]);
  };

  const renderList: ListRowRenderer = useCallback(
    ({ key, index, style }) => {
      const item = flatList[index];

      if (isEmpty(item)) {
        return null;
      }

      const { displayNo, regdt, subject, no } = item;

      return (
        <div key={key} style={style}>
          <BoardList.Contents.Link href={`${BOARD_PATH.noticeDetail.uri}/${no}`}>
            <BoardList.Contents.LineBreak styles={styles.view}>
              <BoardList.Contents.LineBreak styles={styles.infoWrapper}>
                <BoardList.Contents.View styles={styles.no}>{displayNo}</BoardList.Contents.View>
                <BoardList.Contents.View styles={styles.date}>{getFormattedDate(regdt)}</BoardList.Contents.View>
              </BoardList.Contents.LineBreak>
              <BoardList.Contents.View styles={styles.subject}>{subject}</BoardList.Contents.View>
            </BoardList.Contents.LineBreak>
          </BoardList.Contents.Link>
        </div>
      );
    },
    [flatList],
  );

  const renderListView = () => {
    if (isSuccess) {
      return (
        <BoardList>
          <BoardList.Contents isLoading={isFetching} isError={isError} isEmpty={isListEmpty}>
            <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={listRowCount}>
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
                          rowCount={rowCount}
                          rowHeight={DEFAULT_ITEM_HEIGHT}
                          scrollTop={scrollTop}
                          isScrolling={isScrolling}
                          rowRenderer={renderList}
                          onRowsRendered={onRowsRendered}
                          overscanRowCount={5}
                        />
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          </BoardList.Contents>
        </BoardList>
      );
    }
    return <Loading numberOfRows={PAGE_SIZE_LIMIT} />;
  };

  return renderListView();
}
