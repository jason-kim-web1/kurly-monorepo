import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/router';

import { fetchPaymentBenefitsInfo, fetchPaymentBenefitsUpdate } from '../../../shared/api/events/member/benefit.api';

import { STALE_TIME } from '../shared/constants';
import { ParsedUrlQuery } from 'querystring';
import { getMemberBenefitUpdate } from '../shared/utils';

export const usePaymentBenefitsUpdate = () => {
  const queryKey = ['events', 'member', 'payment-benefits-update'];
  const queryResult = useQuery(queryKey, () => fetchPaymentBenefitsUpdate(), {
    staleTime: STALE_TIME,
  });
  const { data } = queryResult;
  const paymentBenefitsUpdate = getMemberBenefitUpdate(data);

  return { paymentBenefitsUpdate };
};

export const usePaymentBenefitsInfo = () => {
  const { query } = useRouter();

  const { id } = query as ParsedUrlQuery & { id: string };

  const queryKey = ['events', 'member', 'payment-benefits-info'];
  const { paymentBenefitsUpdate } = usePaymentBenefitsUpdate();
  const queryResult = useQuery(queryKey, () => fetchPaymentBenefitsInfo(paymentBenefitsUpdate ?? ''), {
    staleTime: STALE_TIME,
    enabled: !!paymentBenefitsUpdate,
  });
  const { data } = queryResult;

  const paymentBenefits = data?.data ?? [];

  const now = new Date();
  const paymentBenefitsFilter = paymentBenefits.filter(
    ({ date }) => new Date(date.startDate) <= now && new Date(date.endDate) > now,
  );

  const content = paymentBenefitsFilter.find(({ id: paymentId }) => paymentId === id);

  const url = { ...paymentBenefitsFilter[0] }.id;

  const hasSubMenu = paymentBenefitsFilter.length > 0;

  const isDifferentId = id !== content?.id;

  const paymentSubMenu = paymentBenefitsFilter.map(({ id: paymentId, menu }) => ({ paymentId, menu }));

  return {
    ...queryResult,
    queryKey,
    data: content,
    paymentSubMenu,
    hasSubMenu,
    isDifferentId,
    url,
  };
};
