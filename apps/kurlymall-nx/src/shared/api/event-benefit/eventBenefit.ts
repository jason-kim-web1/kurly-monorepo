import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';
import type { BaseResponse, EventBenefitResponse } from '../../interfaces';

// 마켓 특가/혜택
export const fetchEventBenefit = async (): Promise<EventBenefitResponse[]> => {
  const url = '/banner-cloud/market/event/list?exposureType=EXPOSED';

  try {
    const { data } = await httpClient.get<BaseResponse<EventBenefitResponse[]>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 뷰티 특가
export const fetchBeautyBargain = async (): Promise<EventBenefitResponse[]> => {
  const url = '/banner-cloud/beauty/bargain/list?exposureType=EXPOSED';

  try {
    const { data } = await httpClient.get<BaseResponse<EventBenefitResponse[]>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 뷰티 이벤트
export const fetchBeautyEvent = async (): Promise<EventBenefitResponse[]> => {
  const url = '/banner-cloud/beauty/event/list?exposureType=EXPOSED';

  try {
    const { data } = await httpClient.get<BaseResponse<EventBenefitResponse[]>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};
