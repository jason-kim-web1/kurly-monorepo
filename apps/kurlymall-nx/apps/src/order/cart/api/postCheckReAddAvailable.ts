import httpClient from '../../../shared/configs/http-client';

import {
  AvailableProduct,
  BaseApiResponse,
  NormalOrderTypePolicyType,
  UnavailableProduct,
} from '../../../shared/interfaces';
import { UnknownError } from '../../../shared/errors';
import { CartItem } from '../interface/CartProduct';

export interface CheckReAddAvailableRequest {
  address: string;
  addressDetail: string;
  dealProducts: CartItem[];
}

export interface CheckReAddAvailableResponse {
  checkoutType: NormalOrderTypePolicyType | null;
  availableProducts: AvailableProduct[];
  unavailableProducts: UnavailableProduct[];
}

const CHECK_AVAILABLE_URL = '/repeat-checkout/v1/check-available';

/**
 * 장바구니 다시 담기 검증 api
 *
 * @param requestBody
 */
export const postCheckReAddAvailable = async (requestBody: CheckReAddAvailableRequest) => {
  try {
    const { data } = await httpClient.post<BaseApiResponse<CheckReAddAvailableResponse>>(
      CHECK_AVAILABLE_URL,
      requestBody,
    );

    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
