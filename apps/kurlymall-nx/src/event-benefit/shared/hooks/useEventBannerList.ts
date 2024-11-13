import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../shared/store';
import { getEventBenefit, getBeautyBargain, getBeautyEvent } from '../../../shared/services/event-benefit.service';
import { getMinutes } from '../../../shared/utils/time';

const STALE_TIME = getMinutes(1);

export const EVENT_BANNER_TYPE = {
  MARKET: 'MARKET',
  BEAUTY_BENEFIT: 'BEAUTY_BENEFIT',
  BEAUTY_EVENT: 'BEAUTY_EVENT',
} as const;

export type EventBannerType = keyof typeof EVENT_BANNER_TYPE;

const EVENT_BANNER_FETCH_URL = {
  MARKET: 'fetchEventBenefit',
  BEAUTY_BENEFIT: 'fetchBeautyBargain',
  BEAUTY_EVENT: 'fetchBeautyEvent',
} as const;

interface Props {
  eventType: EventBannerType;
}

const getEventType = ({ eventType }: Props) => {
  if (eventType === 'BEAUTY_BENEFIT') {
    return getBeautyBargain();
  }
  if (eventType === 'BEAUTY_EVENT') {
    return getBeautyEvent();
  }
  return getEventBenefit();
};

export const useEventBannerList = ({ eventType }: Props) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(
    ['eventBanner', EVENT_BANNER_FETCH_URL[eventType], 'list'],
    () => getEventType({ eventType }),
    {
      staleTime: STALE_TIME,
      refetchOnMount: true,
      enabled: hasSession,
    },
  );
  return {
    ...queryResult,
  };
};
