import { useQuery } from '@tanstack/react-query';

import { getSecond } from '../../../shared/utils/time';
import { fetchMembersBenefitInfo, fetchMembersBenefitUpdate } from '../../../shared/api/events/member/benefit.api';
import { getMemberBenefitUpdate } from '../shared/utils';

const STALE_TIME = getSecond(60 * 1000);

export const useMembersBenefitUpdate = () => {
  const queryKey = ['events', 'member', 'members-benefit-update'];
  const queryResult = useQuery(queryKey, () => fetchMembersBenefitUpdate(), {
    staleTime: STALE_TIME,
  });
  const { data } = queryResult;
  const membersBenefitUpdate = getMemberBenefitUpdate(data);

  return { ...queryResult, queryKey, membersBenefitUpdate };
};

export const useMembersBenefitInfo = () => {
  const queryKey = ['events', 'member', 'members-benefit-info'];
  const { membersBenefitUpdate } = useMembersBenefitUpdate();
  const queryResult = useQuery(queryKey, () => fetchMembersBenefitInfo(membersBenefitUpdate ?? ''), {
    staleTime: STALE_TIME,
    enabled: !!membersBenefitUpdate,
  });
  const { data } = queryResult;

  const membersBenefit = data ?? null;

  return {
    ...queryResult,
    queryKey,
    membersBenefit,
  };
};
