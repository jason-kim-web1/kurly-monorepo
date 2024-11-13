import { useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';

export default function useBenefit() {
  const { isSubscribed, pointBenefit } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
    pointBenefit: member.pointBenefit,
  }));
  const percent = useMemo(() => pointBenefit?.percent, [pointBenefit?.percent]);
  const isExpectedPoint = useMemo(() => !!percent, [percent]);

  return {
    percent,
    isSubscribed,
    isExpectedPoint,
  };
}
