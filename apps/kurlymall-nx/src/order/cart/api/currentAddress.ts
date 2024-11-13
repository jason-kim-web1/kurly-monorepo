import httpClient from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { UnknownError } from '../../../shared/errors';
import { CurrentAddressResponse, GuestCurrentAddressResponse } from '../interface/CurrentAddressResponse';

const GUEST_CURRENT_ADDRESS_API = '/cart/v1/cart';
const CURRENT_ADDRESS_API = '/addressbook/v1/cart/check-base-address-notification';

// 주소지 조회 - 비회원
export const fetchGuestCurrentAddress = async () => {
  try {
    const { data } = await httpClient.get<BaseResponse<GuestCurrentAddressResponse>>(GUEST_CURRENT_ADDRESS_API);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

// 주소지 조회 - 회원
export async function fetchCurrentAddress() {
  try {
    const { data } = await httpClient.get<BaseResponse<CurrentAddressResponse>>(CURRENT_ADDRESS_API);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
}
