import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { usePaymentBenefitsInfo } from '../../hooks/usePaymentBenefitsQuery';
import { redirectTo } from '../../../../shared/reducers/page';
import { MEMBER_BENEFIT_PATH } from '../../../../shared/constant';
import Loading from '../../../../shared/components/Loading/Loading';
import PaymentEmpty from '../../components/shared/PaymentEmpty';

export default function PaymentDefaultContainer() {
  const { isReady } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, hasSubMenu, url } = usePaymentBenefitsInfo();

  useEffect(() => {
    if (!isReady || isLoading) {
      return;
    }

    if (hasSubMenu) {
      dispatch(redirectTo({ url: `${MEMBER_BENEFIT_PATH.payment.uri}/${url}`, replace: true }));
      return;
    }
  }, [dispatch, isLoading, isReady, hasSubMenu, url]);

  if (isLoading) {
    return <Loading />;
  }

  if (!hasSubMenu) {
    return <PaymentEmpty />;
  }

  return null;
}
