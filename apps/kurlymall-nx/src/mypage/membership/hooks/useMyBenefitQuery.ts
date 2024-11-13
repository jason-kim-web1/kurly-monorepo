import { useQuery } from '@tanstack/react-query';

import { fetchMyBenefitInfo, fetchMyBenefitUpdate } from '../../../shared/api/membership/membership.api';
import { getUpdateData } from '../shared/utils';
import { getMinutes } from '../../../shared/utils/time';
import { useAppSelector } from '../../../shared/store';

export const useMyBenefitUpdate = () => {
  const queryKey = ['mypage', 'membership', 'benefit-update'];
  const queryResult = useQuery(queryKey, () => fetchMyBenefitUpdate(), {
    staleTime: getMinutes(30),
  });
  const { data } = queryResult;
  const myBenefitUpdate = getUpdateData(data);

  return { ...queryResult, queryKey, myBenefitUpdate };
};

export const useMyBenefitInfo = () => {
  const benefitOptionName = useAppSelector(({ myMembership }) => myMembership.providedBenefit.benefitOptionName);

  const queryKey = ['mypage', 'membership', 'benefit-update-info'];
  const { myBenefitUpdate } = useMyBenefitUpdate();
  const queryResult = useQuery(queryKey, () => fetchMyBenefitInfo(myBenefitUpdate ?? ''), {
    staleTime: getMinutes(30),
    enabled: !!myBenefitUpdate,
  });
  const { data } = queryResult;

  const selectedBenefit = data?.data.find((item) => item.name === benefitOptionName);
  const coreBenefitValue = data?.data.find((item) => item.name === '코어')?.value ?? '';

  return {
    ...queryResult,
    queryKey,
    data: selectedBenefit || null,
    coreBenefitValue,
  };
};
