import { isUndefined, pick, values } from 'lodash';

import { PickupPlaceResponse, PlaceSearchType } from '../../../order/checkout/shared/interfaces';
import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';
import { BaseResponse } from '../../interfaces';

export interface PickupPlacesParams {
  cursor?: number;
  size?: number;
  dealProductNo?: number;
  latitude?: number;
  longitude?: number;
  searchKeyword: string;
  placeSearchType: PlaceSearchType;
}

export const fetchPickupPlaces = async (params: PickupPlacesParams) => {
  const requiredParams = values(pick(params, ['dealProductNo', 'longitude', 'latitude']));
  if (requiredParams.some((it) => isUndefined(it))) {
    throw new Error('필수 파라미터가 undefined 입니다. 다시 시도해 주세요');
  }

  const url = '/order-external/v2/pickup-places';

  try {
    const { data } = await httpClient.get<BaseResponse<PickupPlaceResponse>>(url, { params });

    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
