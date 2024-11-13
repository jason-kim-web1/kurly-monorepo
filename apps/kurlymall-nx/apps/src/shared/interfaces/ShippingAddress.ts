export type DeliveryType = 'direct' | 'indirect' | 'disable';

export enum BaseAddressType {
  road = 'road',
  jibun = 'jibun',
}

export enum DefaultAddressType {
  default = 'default',
  recent = 'recent',
}

export enum DeliveryPolicyType {
  direct = 'direct',
  indirect = 'indirect',
}

export enum ClusterCodeType {
  CC01 = 'CC01',
  CC02 = 'CC02',
  CC03 = 'CC03',
  CC04 = 'CC04',
}

export enum DeliveryTimeType {
  DAWN = 'DAWN',
  DAY = 'DAY',
  MANUAL = 'MANUAL',
  PICKUP = 'PICKUP',
}

export enum ProviderName {
  CJ = 'CJT',
  CJT = 'CJT',
  FRS = 'FRS',
  LTT = 'LTT',
}

// TODO: AB는 5월 1일 이후 정상 배포가 되면 제거 예정
// (샛별: (구)대구, 부산, 울산, 김해창원, 동대구 서대구)
export enum RegionDeliveryCode {
  AB = 'AB',
  BS = 'BS',
  UL = 'UL',
  GC = 'GC',
  DE = 'DE',
  DW = 'DW',
}

// (택배: 대구, 부산, 울산)
export enum RegionIndirectDeliveryCode {
  NJ = 'NJ',
  NK = 'NK',
  NO = 'NO',
}

// 수도권 샛별 코드
export enum RegionMetropolitanCode {
  A = 'A',
  R = 'R',
  C = 'C',
  X = 'X',
  F = 'F',
  M = 'M',
  I = 'I',
  Y = 'Y',
  H = 'H',
  D = 'D',
  B = 'B',
  S = 'S',
  T = 'T',
  G = 'G',
  Z = 'Z',
  W = 'W',
}

export type RegionCode = RegionDeliveryCode | RegionIndirectDeliveryCode;
export type RegionGroupCode = RegionCode | RegionMetropolitanCode | string;

export interface DeliveryProps {
  address: string;
  addressDetail?: string;
  roadAddress: string;
  roadZoneCode: string;
  zipcode: string;
  baseAddressType: BaseAddressType;
}

export interface CourierOperationProps {
  operation: {
    zone: string;
    time: string;
  };
}

export interface DeactivationProps {
  startAt: string | null;
  endAt: string | null;
}

export interface CutOffProps {
  startAt: string;
  endAt: string;
  noticeMessage: string;
}

export interface AddressPoliciesProps {
  courierOperation: CourierOperationProps;
  deactivation?: DeactivationProps;
  order?: {
    policy: {
      unavailability: CutOffProps;
    };
  };
}
export interface AddressListProps {
  no: number;
  name: string;
  mobile: string;
  address: string;
  addressDetail: string;
  zipcode: string;
  roadZoneCode: string;
  roadAddress: string;
  isCurrentDeliveryAddress: boolean;
  // 주소록 타입 (기본 배송지, 최근 배송지)
  type: DefaultAddressType;
  // 정제 전 주소의 종류
  baseAddressType: BaseAddressType;
  // 배송방법
  deliveryType: DeliveryType;
  deliveryPolicy: DeliveryPolicyType;
  clusterCenterCode: ClusterCodeType;
  regionCode: RegionGroupCode;
  policies?: AddressPoliciesProps[];
  isRetiredAddress: boolean;
}

export interface CreateGuestAddressServiceRequest {
  baseAddressType: BaseAddressType;
  roadAddress: string;
  roadZoneCode: string;
  address: string;
  addressDetail?: string;
}

export interface CreateGuestAddressRequest {
  base_address_type: 'R' | 'J';
  road_zonecode: string;
  address: string;
  road_address: string;
  address_sub: string;
}

export type CreateGuestAddressResponse = CreateGuestAddressRequest;

export type CreateAddressRequest = CreateGuestAddressRequest & {
  type: 'D' | 'R';
  zipcode: string;
};

export type CreateAddressServiceRequest = DeliveryProps & {
  type: DefaultAddressType;
};

export interface UpdateAddressRequest {
  type: 'D' | 'R';
  name?: string;
  mobile?: string;
  base_address_type: 'R' | 'J';
  road_address: string;
  road_zonecode: string;
  address: string;
  address_sub: string;
  zipcode: string;
}

export interface CartAddressResponse {
  id: string;
  uuid: string;
  addressNo: number;
  roadZoneCode: string;
  baseAddressType: BaseAddressType;
  address: string;
  roadAddress: string;
  addressDetail: string;
  clusterCenterCode: ClusterCodeType;
  deliveryType: DeliveryType;
  isRetiredAddress: boolean;
  createdAt: string;
}

export type CurrentAddressResponse = CartAddressResponse & {
  isGuest?: boolean;
  isBaseAddress?: boolean;
  isShippingUnavailable: boolean;
};

export interface CurrentAddressParams {
  id: string;
  uuid?: string;
  addressNo: number;
  roadZoneCode: string;
  baseAddressType: BaseAddressType;
  address: string;
  roadAddress: string;
  addressDetail: string;
  clusterCenterCode: ClusterCodeType;
  deliveryType: DeliveryType;
  isRetiredAddress?: boolean;
  createdAt?: string;
  isGuest?: boolean;
  isBaseAddress?: boolean;
  isShippingUnavailable?: boolean;
}

export interface MemberAddressResponse {
  no: number;
  type: DefaultAddressType;
  baseAddressType: BaseAddressType;
  name: string;
  mobile: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  roadZoneCode: string;
  roadAddress: string;
  deliveryPolicy: DeliveryPolicyType;
  deliveryType: DeliveryType;
  regionCode: RegionGroupCode;
}

export interface SearchAddressResultResponse {
  deliveryType: DeliveryType;
  deliveryTime: DeliveryTimeType;
  clusterCenterCode: ClusterCodeType;
  providerName: ProviderName;
  address: string;
  addressDetail: string;
  cutOff?: CutOffProps;
  regionCode: RegionGroupCode;
  policies?: AddressPoliciesProps[];
  isShippingUnavailable: boolean;
}

// Tam API Interface
export interface CourierOperationServiceRequest {
  address: string;
  addressDetail?: string;
  baseAddressType?: BaseAddressType;
}

export interface CourierOperationRequest {
  address: string;
  address_detail: string;
  base_address_type?: 'R' | 'J' | null;
}

export interface CourierOperationResponse {
  addr: string;
  addr_sub: string;
  cluster_center_code: ClusterCodeType;
  cut_off: {
    unavailability: CutOffProps;
  };
  delivery_time: DeliveryTimeType;
  delivery_type: DeliveryType | null;
  policies?: AddressPoliciesProps[];
  provider_name: ProviderName;
  region_group_name: RegionGroupCode;
}
