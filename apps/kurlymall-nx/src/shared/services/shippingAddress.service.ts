import { isEmpty } from 'lodash';

import {
  createAddress,
  deleteAddress,
  fetchAddressList,
  fetchCourierOperation,
  postGuestAddress,
  putChangeCurrentAddress,
  readAddress,
  updateAddress,
} from '../api';
import { checkShippingUnavailable } from '../utils/shipping-address';

import { removeHyphen } from '.';
import { formatMobileNumber } from '../utils';
import {
  AddressPoliciesProps,
  BaseAddressType,
  CourierOperationServiceRequest,
  CreateAddressServiceRequest,
  CreateGuestAddressServiceRequest,
  CurrentAddressResponse,
  DefaultAddressType,
  DeliveryPolicyType,
  DeliveryType,
  MemberAddressResponse,
  SearchAddressResultResponse,
} from '../interfaces/ShippingAddress';
import { fetchCurrentAddress, fetchGuestCurrentAddress } from '../../order/cart/api/currentAddress';

// (구) 장바구니 이외의 주소지 호출
export const fetchCartAddress = async (): Promise<CurrentAddressResponse> => {
  const data = await fetchGuestCurrentAddress();

  return {
    id: data.id,
    uuid: data.member_uuid,
    addressNo: data.address_no,
    roadZoneCode: data.road_zonecode,
    baseAddressType: data.base_address_type === 'R' ? BaseAddressType.road : BaseAddressType.jibun,
    address: data.base_address_type === 'R' ? data.road_address : data.address,
    roadAddress: data.road_address,
    addressDetail: data.address_sub,
    clusterCenterCode: data.cluster_center_code,
    deliveryType: data.delivery_type,
    createdAt: data.created_at,
    isShippingUnavailable: checkShippingUnavailable(data.delivery_type),
    isRetiredAddress: data.is_retired_address,
  };
};

// 배송지 정책까지 조회할 시
export const fetchShippingAreaPolicy = async ({
  address,
  addressDetail,
  baseAddressType,
}: CourierOperationServiceRequest): Promise<SearchAddressResultResponse> => {
  const data = await fetchCourierOperation({
    address,
    address_detail: addressDetail ?? '',
    base_address_type: baseAddressType === BaseAddressType.jibun ? 'J' : 'R',
  });

  return {
    deliveryType: data.delivery_type === null ? 'disable' : data.delivery_type,
    deliveryTime: data.delivery_time,
    clusterCenterCode: data.cluster_center_code,
    providerName: data.provider_name,
    address: data.addr,
    addressDetail: data.addr_sub,
    cutOff: data.cut_off?.unavailability ?? undefined,
    regionCode: data.region_group_name,
    policies: data.policies ?? [],
    isShippingUnavailable: checkShippingUnavailable(data.delivery_type),
  };
};

// 배송지 정보가 있으면 TAM 정책까지 호출하는 API
export const fetchDeliveryAddress = async () => {
  const baseAddress = await fetchCartAddress();

  const { address, addressDetail, baseAddressType } = baseAddress;

  if (isEmpty(address)) {
    return baseAddress;
  }

  try {
    const regionAddress = await fetchShippingAreaPolicy({
      address,
      addressDetail,
      baseAddressType,
    });

    return {
      ...baseAddress,
      regionAddress,
    };
  } catch (e) {
    return e;
  }
};

// 주소록 고유번호로 카트 현 배송지 업데이트
export const updateChangeCurrentAddress = async (addressNo: number) => {
  const data = await putChangeCurrentAddress(addressNo);

  return {
    id: data.id,
    uuid: data.member_uuid,
    addressNo: data.address_no,
    roadZoneCode: data.road_zonecode,
    baseAddressType: data.base_address_type,
    address: data.address,
    roadAddress: data.road_address,
    addressDetail: data.address_sub,
    clusterCenterCode: data.cluster_center_code,
    deliveryType: data.delivery_type,
    createdAt: data.created_at,
    isShippingUnavailable: checkShippingUnavailable(data.delivery_type),
  };
};

// 현 배송지와 기본 배송지 동일 여부, 현 배송지 조회
export const getBaseAddressNotification = async (): Promise<CurrentAddressResponse> => {
  const data = await fetchCurrentAddress();

  return {
    id: data.id,
    uuid: data.member_uuid,
    addressNo: data.address_no,
    roadZoneCode: data.road_zonecode,
    baseAddressType: data.base_address_type === 'J' ? BaseAddressType.jibun : BaseAddressType.road,
    address: data.base_address_type === 'J' ? data.address : data.road_address,
    roadAddress: data.road_address,
    addressDetail: data.address_sub,
    clusterCenterCode: data.cluster_center_code,
    deliveryType: data.delivery_type === null ? 'disable' : data.delivery_type,
    createdAt: data.created_at,
    isBaseAddress: data.is_base_address,
    isShippingUnavailable: checkShippingUnavailable(data.delivery_type),
    isRetiredAddress: data.is_retired_address,
  };
};

export interface AddressResponseInterface {
  no: number;
  name: string;
  mobile: string;
  address: string;
  addressDetail: string;
  zipcode: string;
  roadZoneCode: string;
  roadAddress: string;
  isCurrentDeliveryAddress: boolean;
  type: 'default' | 'recent';
  baseAddressType: BaseAddressType.jibun | BaseAddressType.road;
  deliveryType: DeliveryType;
  // 0: 샛별, 1: 택배
  deliveryPolicy: DeliveryPolicyType.direct | DeliveryPolicyType.indirect;
  clusterCenterCode: string;
  regionCode: string;
  policies: AddressPoliciesProps[] | null;
  isRetiredAddress: boolean;
}

// 일반 - 회원 주소록 조회
export const getAddressList = async (): Promise<AddressResponseInterface[]> => {
  const data = await fetchAddressList();
  return data.map<AddressResponseInterface>((it) => ({
    no: it.no,
    name: it.name,
    mobile: it.mobile,
    address: it.address,
    addressDetail: it.address_sub,
    zipcode: it.zipcode,
    roadZoneCode: it.road_zonecode,
    roadAddress: it.road_address,
    isCurrentDeliveryAddress: it.is_current_delivery_address,
    // D: 기본 배송지, R: 최근 배송지
    type: it.type === 'D' ? 'default' : 'recent',
    // J: 지번, R: 도로명
    baseAddressType: it.base_address_type === 'J' ? BaseAddressType.jibun : BaseAddressType.road,
    deliveryType: it.delivery_type === null ? 'disable' : it.delivery_type,
    // 0: 샛별, 1: 택배
    deliveryPolicy: it.delivery_policy === 0 ? DeliveryPolicyType.direct : DeliveryPolicyType.indirect,
    clusterCenterCode: it.cluster_center_code,
    regionCode: it.region_group_name,
    policies: it.policies ?? null,
    isRetiredAddress: it.is_retired_address,
  }));
};

// 일반 - 회원 주소 생성
export const createMemberAddress = async (params: CreateAddressServiceRequest) => {
  const data = await createAddress({
    type: params.type === DefaultAddressType.default ? 'D' : 'R',
    base_address_type: params.baseAddressType === BaseAddressType.road ? 'R' : 'J',
    road_address: params.roadAddress,
    road_zonecode: params.roadZoneCode,
    address: params.address,
    zipcode: params.zipcode,
    address_sub: params.addressDetail ?? '',
  });

  return {
    no: data.no,
    type: data.type === 'D' ? DefaultAddressType.default : DefaultAddressType.recent,
    base_address_type: data.base_address_type === 'J' ? BaseAddressType.jibun : BaseAddressType.road,
    name: data.name,
    mobile: data.mobile,
    zipcode: data.zipcode,
    address: data.address,
    addressDetail: data.address_sub,
    roadZoneCode: data.road_zonecode,
    roadAddress: data.road_address,
    deliveryPolicy: data.delivery_policy === 0 ? DeliveryPolicyType.direct : DeliveryPolicyType.indirect,
    deliveryType: data.delivery_type,
    regionCode: data.region_group_name,
  };
};

// 비회원 주소 생성
export const createGuestAddress = async (params: CreateGuestAddressServiceRequest) => {
  const data = await postGuestAddress({
    base_address_type: params.baseAddressType === BaseAddressType.road ? 'R' : 'J',
    road_zonecode: params.roadZoneCode,
    address: params.address,
    road_address: params.roadAddress,
    address_sub: params.addressDetail ?? '',
  });

  return data;
};

// 일반 - 회원 주소 보기
export const fetchMemberAddress = async (addressNo: number) => {
  const data = await readAddress(addressNo);

  return {
    no: data.no,
    type: data.type === 'D' ? DefaultAddressType.default : DefaultAddressType.recent,
    baseAddressType: data.base_address_type === 'J' ? BaseAddressType.jibun : BaseAddressType.road,
    name: data.name,
    mobile: removeHyphen(data.mobile),
    zipcode: data.zipcode,
    address: data.address,
    addressDetail: data.address_sub,
    roadZoneCode: data.road_zonecode,
    roadAddress: data.road_address,
    deliveryPolicy: data.delivery_policy === 0 ? DeliveryPolicyType.direct : DeliveryPolicyType.indirect,
    deliveryType: data.delivery_type,
    regionCode: data.region_group_name,
  };
};

// 회원 주소 수정
export const updateMemberAddress = async (params: MemberAddressResponse) => {
  const data = await updateAddress({
    addressNo: params.no,
    requestBody: {
      type: params.type === DefaultAddressType.default ? 'D' : 'R',
      name: isEmpty(params.name) ? undefined : params.name,
      mobile: isEmpty(params.mobile) ? undefined : formatMobileNumber(params.mobile),
      base_address_type: params.baseAddressType === BaseAddressType.road ? 'R' : 'J',
      road_address: params.roadAddress,
      road_zonecode: params.roadZoneCode,
      address: params.address ?? '',
      address_sub: params.addressDetail ?? '',
      zipcode: params.zipcode,
    },
  });

  return {
    no: data.no,
    type: data.type === 'D' ? DefaultAddressType.default : DefaultAddressType.recent,
    baseAddressType: data.base_address_type === 'J' ? BaseAddressType.jibun : BaseAddressType.road,
    name: data.name,
    mobile: data.mobile,
    zipcode: data.zipcode,
    address: data.address,
    addressDetail: data.address_sub,
    roadZoneCode: data.road_zonecode,
    roadAddress: data.road_address,
    deliveryPolicy: data.delivery_policy === 0 ? DeliveryPolicyType.direct : DeliveryPolicyType.indirect,
    deliveryType: data.delivery_type,
    regionCode: data.region_group_name,
  };
};

// 회원 주소 삭제
export const deleteMemberAddress = async (addressNo: number) => {
  const data = await deleteAddress(addressNo);
  return data;
};
