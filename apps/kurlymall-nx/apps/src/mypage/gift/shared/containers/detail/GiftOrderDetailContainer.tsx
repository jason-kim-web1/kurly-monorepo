import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import { useAppSelector } from '../../../../../shared/store';
import { loadOrderDetail } from '../../reducers/mypage-gift.slice';
import { redirectToError } from '../../../../../shared/reducers/page';

import OrderDetails from '../../components/detail/OrderDetails';
import Loading from '../../../../../shared/components/Loading/Loading';

export default function GiftOrderDetailContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const { loading, error } = useAppSelector(({ mypageGift }) => mypageGift);

  const { orderNo } = router.query as ParsedUrlQuery & { orderNo: string };

  useEffect(() => {
    if (!router.isReady || !hasSession) {
      return;
    }

    if (!orderNo) {
      dispatch(redirectToError('존재하지 않는 주문번호입니다.'));
      return;
    }

    dispatch(loadOrderDetail(Number(orderNo)));
  }, [dispatch, hasSession, orderNo, router.isReady, router.query]);

  if (loading || error) {
    return <Loading />;
  }

  return <OrderDetails />;
}
