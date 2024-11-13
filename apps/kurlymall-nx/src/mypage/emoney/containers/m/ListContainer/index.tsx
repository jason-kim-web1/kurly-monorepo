import { AutoSizer, List as FixedSizeList, InfiniteLoader, WindowScroller, ListRowRenderer } from 'react-virtualized';

import { usePaging } from '../../../context/m/PagingContext';
import useEMoneyInfiniteQuery from '../../../hooks/m/useEMoneyInfiniteQuery';

import Pending from '../../../components/m/List/Pending';
import Error from '../../../components/m/List/Error';
import Empty from '../../../components/pc/List/Empty';
import ListItem from '../../../components/m/ListItem';
import ListItemPending from '../../../components/m/ListItem/Pending';

const DEFAULT_ITEM_HEIGHT = 100;

const ListContainer = () => {
  const { size } = usePaging();
  const { data, isError, isSuccess, isFetchingNextPage, hasNextPage, fetchNextPage } = useEMoneyInfiniteQuery();

  const loadMoreRows = () => {
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
    return Promise.resolve(false);
  };

  const isRowLoaded = ({ index }: { index: number }) => {
    const pageIndex = Math.floor(index / 10);
    const itemIndex = index % 10;
    if (!data || !data.pages[pageIndex]) {
      return false;
    }
    return !!data.pages[pageIndex].data.emoneyLists[itemIndex];
  };

  const renderItem: ListRowRenderer = ({ key, index, style }) => {
    const pageIndex = Math.floor(index / 10);
    const itemIndex = index % 10;
    if (!data || !data.pages[pageIndex]) {
      return <ListItemPending key={key} style={style} />;
    }
    const { expireDate, regDate, point, detail } = data.pages[pageIndex].data.emoneyLists[itemIndex];
    return <ListItem key={key} style={style} point={point} detail={detail} regDate={regDate} expireDate={expireDate} />;
  };

  const renderValidList = () => (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={size} threshold={10}>
      {({ onRowsRendered, registerChild }) => (
        <WindowScroller>
          {({ height, isScrolling, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <FixedSizeList
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  width={width}
                  height={height}
                  autoHeight
                  rowCount={size}
                  rowHeight={DEFAULT_ITEM_HEIGHT}
                  scrollTop={scrollTop}
                  isScrolling={isScrolling}
                  rowRenderer={renderItem}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );

  const renderList = () => {
    if (isError) {
      return <Error />;
    }
    if (isSuccess) {
      if (size === 0) {
        return <Empty />;
      }
      return renderValidList();
    }
    return <Pending />;
  };

  return <section>{renderList()}</section>;
};

export default ListContainer;
