import { ClusterCodeType, DeliveryType } from '../../../shared/interfaces/ShippingAddress';

export interface CurrentAddressResponse {
  id: string;
  member_uuid: string;
  address_no: number;
  road_zonecode: string;
  base_address_type: 'R' | 'J';
  address: string;
  road_address: string;
  address_sub: string;
  cluster_center_code: ClusterCodeType;
  delivery_type: DeliveryType;
  micro_center_code: string | null;
  kurly_now_region_group_code: string;
  is_base_address: boolean;
  created_at: string;
  is_retired_address: boolean;
}

export interface GuestCurrentAddressResponse extends CurrentAddressResponse {
  kurly_now_available: boolean;
  masked_road_zonecode: string;
}

export interface CurrentAddress {
  id: string;
  addressBookId: number;
  roadZoneCode: string;
  baseAddressType: 'R' | 'J';
  jibunAddress: string;
  roadAddress: string;
  addressDetail: string;
  clusterCenterCode: ClusterCodeType;
  deliveryType: DeliveryType;
  isRetiredAddress: boolean;
}
