import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../src/shared/store';

import ReceiverDetailsContainer from '../../../../src/order/checkout/shared/containers/ReceiverDetailsContainer';
import Loading from '../../../../src/shared/components/Loading/Loading';
import { setOrderType } from '../../../../src/order/checkout/shared/reducers/checkout.slice';
import { ParsedUrlQuery } from 'querystring';

import { OrderTypes } from '../../../../src/order/checkout/shared/utils';

export default function ReceiverDetailsPage() {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const { orderType } = query as ParsedUrlQuery & { orderType?: OrderTypes };

  useEffect(() => {
    dispatch(setOrderType(orderType ?? OrderTypes.CHECKOUT));
  }, [dispatch, orderType]);

  if (!hasSession) {
    return <Loading testId="loading" />;
  }

  return <ReceiverDetailsContainer isPC />;
}
