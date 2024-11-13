import { MouseEvent, useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

import { drop, take } from 'lodash';

import ProductItem from './ProductItem';
import { MemberOrder } from '../../../../shared/types';
import useOrderItem from '../../../../hook/useOrderItem';
import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import ArrowMore from '../../../../icons/ArrowMore';
import ShowMoreButton from '../../shared/ShowMoreButton';
import COLOR from '../../../../../../shared/constant/colorset';
import SlideToggleWrapper from '../../../../../../shared/components/motion/SlideToggleWrapper';
import KurlyNowTag from '../../../../../../shared/components/KurlyNowTag';
import { isKurlyNowOrder } from '../../../../../../shared/utils/order';

const Container = styled.div`
  border-top: 1px solid ${COLOR.kurlyGray200};
  &:last-of-type {
    border-bottom: 1px solid ${COLOR.kurlyGray200};
  }
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 12px 0;
  label {
    padding: 0;
  }
`;

const OrderWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`;

const OrderDate = styled.div`
  font-weight: bold;
  color: #333;
  margin-right: 6px;
`;

const OrderNumber = styled.div`
  font-size: 12px;
  color: #999;
  letter-spacing: -0.025em;
  margin-right: 8px;
`;

const CheckboxWrap = styled.div`
  flex-shrink: 0;
  margin-right: 12px;
  cursor: pointer;
  label {
    padding: 0;
    img {
      margin: 0;
    }
  }
`;

const ProductsContainer = styled.div`
  padding-bottom: 16px;
  margin-bottom: 8px;
  > div:last-child {
    padding-bottom: 0;
  }
`;

const FoldOrderButton = styled.button`
  display: block;
  position: relative;
  span {
    display: inline-block;
  }
`;

const DEFAULT_PRODUCT_DISPLAY_COUNT = 3;

interface Props {
  order: MemberOrder;
}

const OrderItem = ({ order }: Props) => {
  const [folded, setFolded] = useState(true);

  const { toggleSelect, toggleFold } = useOrderItem(order);

  const handleClickFoldButton = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toggleFold();
  };

  const handleClickShowMore = () => {
    setFolded(!folded);
  };

  const firstProduct = order.products[0];

  if (!firstProduct) {
    // 상품이 없는 주문은 있을 수 없다
    return null;
  }

  return (
    <Container>
      <OrderContainer>
        <CheckboxWrap>
          <Checkbox label="" checked={order.selected} onChange={toggleSelect} />
        </CheckboxWrap>
        <OrderWrap onClick={handleClickFoldButton}>
          <OrderDate>{moment(order.products[0].orderedDatetime).format('YYYY.MM.DD')}</OrderDate>
          <OrderNumber>{`주문번호 ${order.orderNo}`}</OrderNumber>
          {isKurlyNowOrder(order.orderType) && <KurlyNowTag />}
        </OrderWrap>
        <FoldOrderButton type="button" onClick={handleClickFoldButton}>
          <ArrowMore direction={order.folded ? 'down' : 'up'} />
        </FoldOrderButton>
      </OrderContainer>
      <SlideToggleWrapper opened={!order.folded}>
        <ProductsContainer>
          {take(order.products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
            <ProductItem key={`product-${product.dealProductNo}`} product={product} />
          ))}
          <SlideToggleWrapper opened={!folded}>
            {drop(order.products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
              <ProductItem key={`product-${product.dealProductNo}`} product={product} />
            ))}
          </SlideToggleWrapper>
          {order.products.length > DEFAULT_PRODUCT_DISPLAY_COUNT && (
            <ShowMoreButton onClick={handleClickShowMore} folded={folded} />
          )}
        </ProductsContainer>
      </SlideToggleWrapper>
    </Container>
  );
};

export default OrderItem;
