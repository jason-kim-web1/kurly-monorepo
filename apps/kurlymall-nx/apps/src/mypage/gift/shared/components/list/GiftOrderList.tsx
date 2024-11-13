import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../../shared/store';
import { setCurrentPage } from '../../reducers/mypage-gift.slice';
import GiftOrderItem from './GiftOrderItem';
import { GiftListItem } from '../../../../../shared/interfaces';
import { Divider } from '../../../../../shared/components/Divider/Divider';
import COLOR from '../../../../../shared/constant/colorset';
import Empty from './Empty';
import Loading from '../../../../../shared/components/Loading/Loading';

const ItemWrapper = styled.div`
  border-bottom: 8px solid ${COLOR.mykurlyBg};
  &:nth-last-of-type(2) {
    border-bottom: 0;
  }
`;

const IntersectionPoint = styled.div`
  width: 1px;
  height: 1px;
`;

interface Props {
  handleOrderCancel: (groupOrderNo: number) => void;
  handleSmsSend: (gift: GiftListItem) => void;
  handleKakaoTalkSend: (gift: GiftListItem) => void;
}

export default function GiftOrderList({ handleOrderCancel, handleSmsSend, handleKakaoTalkSend }: Props) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  const { orders, isFullyLoaded, loading } = useAppSelector(({ mypageGift }) => mypageGift);

  useEffect(() => {
    if (!inView || isFullyLoaded) {
      return;
    }

    dispatch(setCurrentPage());
  }, [dispatch, inView, isFullyLoaded]);

  if (isEmpty(orders)) {
    return <Empty />;
  }

  return (
    <>
      {loading && <Loading />}
      {orders?.map((order) => (
        <ItemWrapper key={`gift-product-${order.paymentCompletedAt}`}>
          <GiftOrderItem
            item={order}
            handleOrderCancel={() => handleOrderCancel(order.groupOrderNo)}
            handleKakaoTalkSend={handleKakaoTalkSend}
            handleSmsSend={handleSmsSend}
          />
        </ItemWrapper>
      ))}
      {!isFullyLoaded && <Divider />}
      {!loading && <IntersectionPoint ref={ref} />}
    </>
  );
}
