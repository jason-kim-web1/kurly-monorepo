import type { EventBenefitResponse } from '../interfaces';
import { fetchEventBenefit, fetchBeautyBargain, fetchBeautyEvent } from '../api';

export const getEventBenefit = (): Promise<EventBenefitResponse[]> => {
  return fetchEventBenefit();
};

export const getBeautyBargain = (): Promise<EventBenefitResponse[]> => {
  return fetchBeautyBargain();
};

export const getBeautyEvent = (): Promise<EventBenefitResponse[]> => {
  return fetchBeautyEvent();
};
