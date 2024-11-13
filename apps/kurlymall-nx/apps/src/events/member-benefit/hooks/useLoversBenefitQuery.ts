import { useQuery } from '@tanstack/react-query';

import { isEmpty } from 'lodash';

import { getSecond } from '../../../shared/utils/time';
import { fetchLoversBenefitInfo, fetchLoversBenefitUpdate } from '../../../shared/api/events/member/benefit.api';
import { getMemberBenefitUpdate } from '../shared/utils';

const STALE_TIME = getSecond(60 * 1000);

export const useLoversBenefitUpdate = () => {
  const queryKey = ['events', 'member', 'lovers-benefit-update'];
  const queryResult = useQuery(queryKey, () => fetchLoversBenefitUpdate(), {
    staleTime: STALE_TIME,
  });
  const { data } = queryResult;
  const loversBenefitUpdate = getMemberBenefitUpdate(data);

  return { ...queryResult, queryKey, loversBenefitUpdate };
};

export const useLoversBenefitInfo = () => {
  const queryKey = ['events', 'member', 'lovers-benefit-info'];
  const { loversBenefitUpdate } = useLoversBenefitUpdate();
  const queryResult = useQuery(queryKey, () => fetchLoversBenefitInfo(loversBenefitUpdate ?? ''), {
    staleTime: STALE_TIME,
    enabled: !!loversBenefitUpdate,
  });
  const { data: loversBenefitInfo } = queryResult;
  const isGiftHistoryEmpty = isEmpty(loversBenefitInfo?.giftHistory);
  const updateDate = loversBenefitUpdate
    ? `${loversBenefitUpdate?.slice(0, 4)}-${loversBenefitUpdate?.slice(4, 6)}` // YYYY-MM
    : '2023-04';

  return { ...queryResult, queryKey, loversBenefitInfo, isGiftHistoryEmpty, updateDate };
};
