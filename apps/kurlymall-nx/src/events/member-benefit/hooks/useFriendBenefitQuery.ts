import { useQuery } from '@tanstack/react-query';

import { isAfter, isBefore } from 'date-fns';

import { isEmpty } from 'lodash';

import { getSecond } from '../../../shared/utils/time';
import {
  fetchFriendBenefitInfo,
  fetchFriendBenefitUpdate,
  FriendBenefitUpdate,
} from '../../../shared/api/events/member/benefit.api';

const STALE_TIME = getSecond(60 * 1000);

const getFriendBenefitUpdate = (data?: FriendBenefitUpdate) => {
  if (!data) {
    return null;
  }
  const isStartDate = isAfter(new Date(), new Date(data.doubleStartDate));
  const isEndDate = isBefore(new Date(), new Date(data.doubleEndDate));
  const isDoubleEventDate = isStartDate && isEndDate;

  return isDoubleEventDate ? data.updateVersion : data.defaultVersion;
};

export const useFriendBenefitUpdate = () => {
  const queryKey = ['events', 'member', 'friend-benefit-update'];
  const queryResult = useQuery(queryKey, () => fetchFriendBenefitUpdate(), {
    staleTime: STALE_TIME,
  });
  const { data } = queryResult;
  const friendBenefitUpdate = getFriendBenefitUpdate(data);

  return { ...queryResult, queryKey, friendBenefitUpdate };
};

export const useFriendBenefitInfo = () => {
  const queryKey = ['events', 'member', 'friend-benefit-info'];
  const { friendBenefitUpdate } = useFriendBenefitUpdate();
  const queryResult = useQuery(queryKey, () => fetchFriendBenefitInfo(friendBenefitUpdate ?? ''), {
    staleTime: STALE_TIME,
    enabled: !!friendBenefitUpdate,
  });
  const { data: friendBenefitInfo } = queryResult;
  const isDefaultEvent = isEmpty(friendBenefitInfo?.addNotice);
  const joinBenefitUrl = friendBenefitInfo?.joinBenefitUrl;
  const shareEventUrl = friendBenefitInfo?.shareEventUrl;

  return { ...queryResult, queryKey, friendBenefitInfo, isDefaultEvent, joinBenefitUrl, shareEventUrl };
};
