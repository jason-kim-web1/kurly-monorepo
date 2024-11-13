import { useQuery } from '@tanstack/react-query';

import { fetchVipBenefitInfo, fetchVipBenefitUpdate } from '../../../shared/api/events/member/benefit.api';

import { STALE_TIME } from '../shared/constants';
import { getMemberBenefitUpdate } from '../shared/utils';

export const useVipBenefitQuery = () => {
  const queryKey = ['events', 'member', 'vip-benefit-update'];
  const queryResult = useQuery(queryKey, () => fetchVipBenefitUpdate(), {
    staleTime: STALE_TIME,
  });
  const { data } = queryResult;
  const vipBenefitUpdate = getMemberBenefitUpdate(data);

  return { ...queryResult, queryKey, vipBenefitUpdate };
};

export const useVipBenefitInfo = () => {
  const queryKey = ['events', 'member', 'vip-benefit-info'];
  const { vipBenefitUpdate } = useVipBenefitQuery();
  const queryResult = useQuery(queryKey, () => fetchVipBenefitInfo(vipBenefitUpdate ?? ''), {
    staleTime: STALE_TIME,
    enabled: !!vipBenefitUpdate,
  });
  const { data } = queryResult;

  const vipBenefit = data ?? null;

  return {
    ...queryResult,
    queryKey,
    vipBenefit,
  };
};
