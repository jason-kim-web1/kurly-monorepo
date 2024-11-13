import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { MemberOrder } from '../../../../shared/types';
import { emptyOrderProductItems, OrderProductSearchInfoState } from '../../../slice';
import useOrderProductList from '../../../hooks/useOrderProductList';
import OrderItem from '../product/OrderItem';
import LoadingItem from './OrderProductLoadingItem';

const Container = styled.div`
  height: 100%;
`;

const Empty = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 1rem;
`;

const OrderItems = styled.div`
  padding: 0 20px;
`;

interface Props {
  orders: MemberOrder[];
  searchInfo: OrderProductSearchInfoState;
}

export default function OrderProductItemList({ orders, searchInfo }: Props) {
  const { startDate, endDate, keyword, orderNo, pageNo, last, dateSelectorTabNumber, pageSize } = searchInfo;

  const dispatch = useDispatch();

  const orderItemFoldOptionPredict = (nextPageNo: number, index: number) => index !== 0;

  const { loadOrderProductItems, loading } = useOrderProductList(searchInfo, orderItemFoldOptionPredict);

  useEffect(() => {
    // 검색 조건이 바뀌면 리스트 초기화
    dispatch(emptyOrderProductItems());
    loadOrderProductItems(0).catch();
  }, [startDate, endDate, keyword, orderNo, dateSelectorTabNumber, dispatch]);

  const currentPageItems = orders.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
  const isListEmpty = isEmpty(currentPageItems);

  useEffect(() => {
    const loadNextPage = !last && pageNo !== 0 && isListEmpty;
    if (loadNextPage) {
      loadOrderProductItems(pageNo).catch();
    }
  }, [pageNo, last, isListEmpty]);

  return (
    <Container>
      {loading && <LoadingItem />}
      {!loading && isListEmpty && <Empty>기간 내 주문내역이 없습니다.</Empty>}
      {!isListEmpty && !loading && (
        <OrderItems>
          {currentPageItems.map((order) => (
            <OrderItem key={`order-${order.orderNo}`} order={order} />
          ))}
        </OrderItems>
      )}
    </Container>
  );
}
