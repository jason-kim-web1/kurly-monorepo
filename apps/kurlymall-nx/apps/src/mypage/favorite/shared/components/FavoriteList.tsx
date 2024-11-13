import { ListRowRenderer, WindowScroller, List, AutoSizer } from 'react-virtualized';

import useFavoriteClickEvent from '../../hooks/useFavoriteClickEvent';

import RestockNotificationModal from '../../../../shared/components/Restock/RestockNotificationModal';
import { FavoriteItems } from './FavoriteItems';
import ProductItemPending from './ProductItemPending';

import BottomInfoText from './BottomInfoText';
import { FavoriteProductExtend } from '../../../../shared/interfaces';
import { isPC } from '../../../../../util/window/getDevice';

const PC_DEFAULT_ITEM_HEIGHT = 137;
const MO_DEFAULT_ITEM_HEIGHT = 133;

export default function FavoriteList({
  favoriteList,
  favoriteListSize,
}: {
  favoriteList: FavoriteProductExtend[];
  favoriteListSize: number;
}) {
  const { productCode, openedRestock, dealProductCode, handleClickRestock, handleCloseRestock } =
    useFavoriteClickEvent();

  const renderItem: ListRowRenderer = ({ key, index, style }) => {
    const productExtend = favoriteList[index];

    if (!productExtend) {
      return <ProductItemPending key={key} style={style} />;
    }

    return (
      <FavoriteItems
        key={key}
        index={index}
        productExtend={productExtend}
        style={style}
        handleClickRestock={handleClickRestock}
      />
    );
  };

  return (
    <>
      <WindowScroller>
        {({ height, scrollTop, registerChild, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div ref={registerChild}>
                <List
                  autoHeight
                  height={height}
                  width={width}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowHeight={isPC ? PC_DEFAULT_ITEM_HEIGHT : MO_DEFAULT_ITEM_HEIGHT}
                  rowRenderer={renderItem}
                  rowCount={favoriteListSize}
                  overscanRowCount={5}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      <RestockNotificationModal
        contentProductNo={Number(productCode)}
        dealProductCode={dealProductCode}
        open={openedRestock}
        closeModal={handleCloseRestock}
      />
      <BottomInfoText />
    </>
  );
}
