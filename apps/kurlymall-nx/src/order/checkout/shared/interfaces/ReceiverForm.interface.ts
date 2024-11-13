import {
  DeliveryCompleteMessage,
  FrontDoorMethod,
  PickupDetailCategory,
  ReceivePlace,
  ReceiverDetailTemplate,
} from '../../../../shared/enums';
import { BaseAddressType, RegionGroupCode } from '../../../../shared/interfaces/ShippingAddress';

export interface ReceiverInfo {
  name: string;
  phone: string;
  email: string;
}

export interface ReceiverForm {
  // 주문자 정보
  name: string;
  phone: string;
  // 주소지 정보
  isDefaultAddress: boolean;
  addressNo: number;
  address: string;
  addressDetail: string;
  roadAddress: string;
  baseAddressType: BaseAddressType;
  // 받으실 장소
  receivePlace: ReceivePlace;
  // (받으실 장소가 '문 앞'인 경우) 공동현관 출입방법
  frontDoorMethod: FrontDoorMethod;
  // (받으실 장소가 '문 앞'인 경우) 공동현관 출입방법 상세 내용
  frontDoorDetail: string;
  // (받으실 장소가 '기타 장소'인 경우) 기타장소 세부사항
  pickupDetailCategory: PickupDetailCategory;
  // (받으실 장소가 '기타 장소'인 경우) 기타장소 세부사항 상세 내용
  pickupDetail: string;
  // 배송 완료 메시지 전송 시각
  deliveryCompleteMessage: DeliveryCompleteMessage | '';
  // true 일 경우, 배송 요청사항을 입력하도록 고객에게 안내하고 업데이트되지 않으면 주문이 진행되지 않도록 한다
  requiredFillReceiverDetail: boolean;
  // true 일 경우, 배송자 정보를 입력하도록 고객에게 안내하고 업데이트되지 않으면 주문이 진행되지 않도록 한다
  requiredFillReceiverContact: boolean;
  // (상품 상세에서만 사용, 주문서 사용 X) 권역 코드
  regionCode?: RegionGroupCode;
  // 현 배송지의 위/경도
  latitude: number;
  longitude: number;
  // 배송 탬플릿
  receiverTemplate: ReceiverDetailTemplate;
  // 배송 탬플릿을 통한 배송 타입
  deliveryType: 'disable' | 'direct' | 'indirect';
}
