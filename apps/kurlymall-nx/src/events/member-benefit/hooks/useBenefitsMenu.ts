import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { endsWith } from 'lodash';

import { MEMBER_BENEFIT_NAVMENU } from '../constants';
import { ParsedUrlQuery } from 'querystring';
import { usePaymentBenefitsInfo } from './usePaymentBenefitsQuery';
import { MEMBER_BENEFIT_PATH } from '../../../shared/constant';

export default function useBenefitsMenu() {
  const { pathname, query } = useRouter();

  const { id } = query as ParsedUrlQuery & { id: string };

  const { paymentSubMenu } = usePaymentBenefitsInfo();

  const [activeName, setActiveName] = useState('');

  const isShowSubMenu = useMemo(
    () => pathname.includes('payment-benefits') && paymentSubMenu.length > 0,
    [pathname, paymentSubMenu.length],
  );

  const getMenuUrl = (name: string, url: string) => {
    if (name === MEMBER_BENEFIT_PATH.payment.name) {
      return MEMBER_BENEFIT_PATH.payment.uri;
    }

    return url;
  };

  useEffect(() => {
    const activeOption = MEMBER_BENEFIT_NAVMENU.find((it) => endsWith(pathname.replace('/[id]', ''), it.url));

    if (activeOption) {
      setActiveName(activeOption.name);
    }
  }, [pathname]);

  return {
    id,
    activeName,
    paymentSubMenu,
    getMenuUrl,
    isShowSubMenu,
  };
}
