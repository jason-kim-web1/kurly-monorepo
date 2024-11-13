import { useQuery } from '@tanstack/react-query';

import { fetchAffiliateBenefit } from '../../../shared/api/membership/membership.api';
import { getSecond } from '../../../shared/utils/time';

const STALE_TIME = getSecond(60);

export default function useAffiliateBenefitQuery() {
  const queryKey = ['member', 'affiliate-benefit'];
  const queryResult = useQuery(queryKey, () => fetchAffiliateBenefit(), {
    staleTime: STALE_TIME,
    enabled: false,
  });
  const { data } = queryResult;
  const affiliateBenefits = data ?? [];

  return { ...queryResult, queryKey, affiliateBenefits };
}
