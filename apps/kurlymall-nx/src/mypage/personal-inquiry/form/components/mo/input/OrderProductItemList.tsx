import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useInView } from 'react-intersection-observer';

import OrderItem from '../product/OrderItem';
import OrderProductPickerLoading from '../../shared/input/product/OrderProductPickerLoading';
import { MemberOrder } from '../../../../shared/types';
import { emptyOrderProductItems, OrderProductSearchInfoState } from '../../../slice';
import useOrderProductList from '../../../hooks/useOrderProductList';
import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: white;
  flex: 10;
  margin-top: 14px;
`;

const Empty = styled.div`
  display: flex;
  height: 90%;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 1rem;
  color: ${COLOR.kurlyGray400};
`;

const OrderItems = styled.div`
  background-color: #f7f7f7;
`;

const ObservingBlock = styled.div`
  width: 100%;
  height: 5px;
`;

interface Props {
  orders: MemberOrder[];
  searchInfo: OrderProductSearchInfoState;
}

export default function OrderProductItemList({ orders, searchInfo }: Props) {
  const { startDate, endDate, pageNo, last, keyword, orderNo, pageSize } = searchInfo;

  const orderItemFoldOptionPredict = (nextPageNo: number, index: number) => !(nextPageNo === 0 && index === 0);

  const { loadOrderProductItems, loading, error, setPage } = useOrderProductList(
    searchInfo,
    orderItemFoldOptionPredict,
  );

  const dispatch = useDispatch();

  const [ref, inView] = useInView();

  useEffect(() => {
    // 검색 조건이 바뀌면 리스트 리셋
    dispatch(emptyOrderProductItems());
  }, [startDate, endDate, keyword, orderNo, dispatch]);

  useEffect(() => {
    // 하단 스크롤 후 더 불러올 아이템이 있으면 가져온다
    (async () => {
      if (inView && !last && !loading && !error) {
        await loadOrderProductItems(pageNo);
        setPage(pageNo + 1);
      }
    })();
  }, [inView, last]);

  const isEmpty = !loading && orders.length === 0;

  return (
    <Container>
      {loading && <OrderProductPickerLoading count={pageSize} />}
      {isEmpty ? (
        <Empty>기간 내 주문내역이 없습니다.</Empty>
      ) : (
        <OrderItems>
          {orders.map((order) => (
            <OrderItem key={`order-${order.orderNo}`} order={order} />
          ))}
        </OrderItems>
      )}
      <ObservingBlock ref={ref} />
    </Container>
  );
}
