import {
  CurrentAddress,
  CurrentAddressResponse,
  GuestCurrentAddressResponse,
} from '../interface/CurrentAddressResponse';

//TODO 현 주소조회 API 응답값을 스네이크에서 카멜로 변경해주는 converter. API 변경 요청 권장
export const convertCurrentAddress = (data: CurrentAddressResponse | GuestCurrentAddressResponse): CurrentAddress => {
  return {
    id: data.id,
    addressBookId: data.address_no,
    roadZoneCode: data.road_zonecode,
    baseAddressType: data.base_address_type,
    jibunAddress: data.address,
    roadAddress: data.road_address,
    addressDetail: data.address_sub,
    clusterCenterCode: data.cluster_center_code,
    deliveryType: data.delivery_type,
    isRetiredAddress: data.is_retired_address,
  };
};
