import { AxiosError } from 'axios';

import httpClient from '../../configs/http-client';

import { UnknownError } from '../../errors';
import { OrderTypes } from '../../../order/checkout/shared/utils';
import { LimitAddressLengthError } from '../../errors/shipping-address';
import { handleCheckoutError } from '../../error-handlers/CheckoutErrorHandlers';
import {
  AddressPoliciesProps,
  CreateAddressRequest,
  CreateGuestAddressRequest,
  CreateGuestAddressResponse,
  DeliveryType,
  UpdateAddressRequest,
} from '../../interfaces/ShippingAddress';
import { CheckoutAddressRequest, CheckoutAddressResponse } from '../../interfaces/Address';
import { BaseResponse } from '../../interfaces';
import { handleUnauthenticated } from '../../error-handlers';

export async function putChangeCurrentAddress(addressNo: number) {
  const url = `/addressbook/v1/cart/addresses/${addressNo}/change-current-address`;

  try {
    const { data } = await httpClient.put(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
}

interface AddressInterface {
  no: number;
  type: string;
  base_address_type: string;
  name: string;
  mobile: string;
  zipcode: string;
  address: string;
  address_sub: string;
  road_zonecode: string;
  road_address: string;
  delivery_policy: number;
  delivery_type: DeliveryType | null;
  is_current_delivery_address: boolean;
  cluster_center_code: string;
  region_group_name: string;
  policies?: AddressPoliciesProps[];
  is_retired_address: boolean;
}

interface AddressListInterface {
  data: AddressInterface[];
}

// 일반 - 회원 주소록 조회
export async function fetchAddressList() {
  const url = '/addressbook/v1/common/addresses';

  try {
    const { data } = await httpClient.get<AddressListInterface>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
}

// 일반 - 회원 주소 생성
export async function createAddress(requestBody: CreateAddressRequest) {
  const url = '/addressbook/v1/common/addresses/';

  try {
    const { data } = await httpClient.post(url, requestBody);
    return data.data;
  } catch (err) {
    const code = (err as AxiosError).response?.data.code ?? '';

    // 최대 주소록 생성 횟수 초과
    if (code === '9998') {
      throw new LimitAddressLengthError(err as Error);
    }

    throw new UnknownError(err as Error);
  }
}

// 일반 - 회원 주소 보기
export async function readAddress(addressNo: number) {
  const url = `/addressbook/v1/common/addresses/${addressNo}`;

  try {
    const { data } = await httpClient.get(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
}

// 일반 - 회원 주소 수정
export async function updateAddress({
  addressNo,
  requestBody,
}: {
  addressNo: number;
  requestBody: UpdateAddressRequest;
}) {
  const url = `/addressbook/v1/common/addresses/${addressNo}`;

  try {
    const { data } = await httpClient.put(url, requestBody);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
}

// 일반 - 회원 주소 삭제
export async function deleteAddress(addressNo: number) {
  const url = `/addressbook/v1/common/addresses/${addressNo}`;

  try {
    const { data } = await httpClient.delete(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
}

// 비회원의 배송지 생성
export const postGuestAddress = async (requestBody: CreateGuestAddressRequest) => {
  const url = '/cart/v1/guest/address';

  try {
    const { data } = await httpClient.post<BaseResponse<CreateGuestAddressResponse>>(url, requestBody);

    return data.data;
  } catch (err) {
    handleUnauthenticated(err);
    throw new UnknownError(err);
  }
};

/** 주문서 > 배송 요청사항 조회 */
/* https://kurly0521.atlassian.net/wiki/spaces/JGSD/pages/3993472108 */
export const readCheckoutAddress = async (params: { type: OrderTypes }) => {
  const url = '/order-external/v1/addressbook';

  try {
    const { data } = await httpClient.get<BaseResponse<CheckoutAddressResponse>>(url, { params });
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

/**
 * 주문서 > 배송 요청사항 수정
 * https://kurly0521.atlassian.net/wiki/spaces/JGSD/pages/3993672445
 */
export const updateCheckoutAddress = async (params: CheckoutAddressRequest) => {
  const url = '/order-external/v1/addressbook';

  try {
    await httpClient.put(url, params);
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};
