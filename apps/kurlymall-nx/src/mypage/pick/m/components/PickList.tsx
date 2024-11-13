import { ListRowRenderer, WindowScroller, List, AutoSizer } from 'react-virtualized';

import { isNull } from 'lodash';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { PickProductExtend } from '../../../../shared/api';
import PickItem from './PickItem';
import usePickButtonEvent from '../../hooks/usePickButtonEvent';
import ProductItemPending from './ProductItemPending';
import ShortcutModalContainer from '../../../../shared/components/Cart/ShortcutModalContainer';
import { SHORTCUT_TYPE } from '../../../../shared/constant/shortcut-type';
import DialogCart from '../../../../shared/components/Cart/DialogCart';
import RestockNotificationModal from '../../../../shared/components/Restock/RestockNotificationModal';

const DEFAULT_ITEM_HEIGHT_MO = 133;
const DEFAULT_ITEM_HEIGHT_PC = 137;

const Wrapper = styled.div`
  padding: 8px 0 10px;
`;

const Summary = styled.div<{ isPC: boolean }>`
  color: ${COLOR.kurlyGray800};

  ${({ isPC }) =>
    isPC
      ? css`
          padding: 8px 0 6px;
        `
      : css`
          padding: 16px;
        `}
`;

interface Props {
  isPC?: boolean;
  products: PickProductExtend[];
  count: number;
}

export default function PickList({ isPC = true, products = [], count }: Props) {
  const {
    productCode,
    openedRestock,
    type,
    handleClickCart,
    handleClickRestock,
    handleClickClose,
    handleCloseRestock,
  } = usePickButtonEvent();

  const renderItem: ListRowRenderer = ({ key, index, style }) => {
    const product = products[index];

    if (!product) {
      return <ProductItemPending isPC={isPC} key={key} style={style} />;
    }

    return (
      <PickItem
        key={key}
        index={index}
        product={product}
        style={style}
        handleClickCart={handleClickCart}
        handleClickRestock={() => () => handleClickRestock(product, index)}
        isPC={isPC}
      />
    );
  };

  const renderModal = () => {
    if (!productCode) {
      return;
    }

    if (isPC) {
      return (
        <>
          <DialogCart
            open={type === SHORTCUT_TYPE.CART && !isNull(productCode)}
            productCode={type === SHORTCUT_TYPE.CART ? productCode : null}
            onHandleClose={handleClickClose}
          />
          <RestockNotificationModal
            contentProductNo={Number(productCode)}
            open={openedRestock}
            closeModal={handleCloseRestock}
          />
        </>
      );
    }

    return (
      <ShortcutModalContainer
        productCode={productCode}
        open={type === SHORTCUT_TYPE.CART ? !isNull(productCode) : openedRestock}
        onHandleClose={type === SHORTCUT_TYPE.CART ? handleClickClose : handleCloseRestock}
      />
    );
  };

  return (
    <Wrapper>
      <Summary isPC={isPC}>
        전체 <strong>{count}</strong>개
      </Summary>
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
                  rowHeight={isPC ? DEFAULT_ITEM_HEIGHT_PC : DEFAULT_ITEM_HEIGHT_MO}
                  rowRenderer={renderItem}
                  rowCount={count}
                  overscanRowCount={5}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      {renderModal()}
    </Wrapper>
  );
}
