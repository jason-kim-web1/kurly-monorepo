import React, { useMemo } from 'react';

import useKurlyMembersCheckout from './useKurlyMembersCheckout';

import KurlypayIcon from '../../../shared/components/icons/order/checkout/KurlypayIcon';
import COLOR from '../../../shared/constant/colorset';

export default function useKurlypayPayment() {
  const { kurlypayList, isKurlypayError } = useKurlyMembersCheckout();

  const kurlypayIcon = useMemo(
    () => <KurlypayIcon fill={isKurlypayError ? COLOR.lightGray : COLOR.kurlyPurple} />,
    [isKurlypayError],
  );

  return {
    kurlypayList,
    isKurlypayError,
    kurlypayIcon,
  };
}
