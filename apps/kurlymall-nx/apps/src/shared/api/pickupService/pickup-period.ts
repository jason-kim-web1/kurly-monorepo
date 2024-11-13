import { isUndefined } from 'lodash';

import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';
import { PickupPeriod } from '../../../order/checkout/shared/interfaces';

export const fetchPickupPeriod = async ({ placeId }: { placeId?: number }) => {
  if (isUndefined(placeId)) {
    throw new Error('픽업지가 선택되지 않았습니다.');
  }
  const url = `/order-external/v1/pickup-places/${placeId}/pickup-period`;

  const { data } = await httpClient.get<BaseResponse<PickupPeriod>>(url);
  return data.data;
};
