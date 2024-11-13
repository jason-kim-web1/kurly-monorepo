import {
  DeliveryCompleteMessage,
  FrontDoorMethod,
  PickupDetailCategory,
  ReceivePlace,
  ReceiverDetailTemplate,
} from '../../shared/enums';

// 배송지 수령방법 수정
export interface PickUpPlaceRequest {
  // 주문자 정보
  receiverName: string;
  receiverPhoneNumber: string;
  // 받으실 장소
  pickupType: ReceivePlace | '';
  // (받으실 장소가 '문 앞'인 경우) 공동현관 출입방법
  accessMethod: FrontDoorMethod | '';
  // (받으실 장소가 '문 앞'인 경우) 공동현관 출입방법 상세 내용
  accessDetail: string;
  // (받으실 장소가 '기타 장소'인 경우) 기타장소 세부사항
  pickupDetailCategory: PickupDetailCategory | '';
  // (받으실 장소가 '기타 장소'인 경우) 기타장소 세부사항 상세 내용
  pickupDetail: string;
  // 배송 완료 메시지 전송 시각
  deliveryMessageTimeType: DeliveryCompleteMessage | '';
  // 배송 기사 요청사항
  memo: string;
}

/**
 * 주문서 배송지 정보
 * @interface CheckoutAddressResponse
 * @property {number} addressbookId - 주소록 ID
 * @property {'D' | 'R'} type - 주소록 타입 (D: 기본배송지, R: 그외)
 * @property {'R' | 'J'} baseAddressType - 화면 보여줄 형식 (R: 도로명 (roadAddress), J: 지번 (jibunAddress))
 * @property {string} roadAddress - 도로명 주소
 * @property {string} jibunAddress - 지번 주소
 * @property {string} addressDetail - 상세주소
 * @property {boolean} requiredFillReceiverContact - true인 경우 배송자 정보를 고객에 안내 및 업데이트 되지 않으면 주문 진행 불가
 * @property {boolean} requiredFillReceiverDetail - true인 경우 배송 요청사항을 입력하도록 고객에게 안내 및 업데이트 되지 않으면 주문 진행 불가
 * @property {string} receiverName - 수령자 명
 * @property {string} receiverPhoneNumber - 수령자 전화번호
 * @property {ReceivePlace} pickupType - 받을 장소 타입
 * @property {PickupDetailCategory | ''} pickupDetailCategory - 받을 장소 옵션
 * @property {string} pickupDetail - 받을 장소 세부사항
 * @property {FrontDoorMethod} accessMethod - 공동현관 출입 방법
 * @property {string} accessDetail - 공동현관 출입 방법 상세
 * @property {DeliveryCompleteMessage | ''} deliveryMessageTimeType - 배송 완료 메시지 전송시각
 * @property {number} latitude - 현재 배송지의 위도
 * @property {number} longitude - 현재 배송지의 경도
 * @property {ReceiverDetailTemplate} receiverTemplate - 배송 탬플릿
 * @property {boolean} isJeJuIsland - 제주 배송인지 구분
 */
export interface CheckoutAddressResponse {
  addressbookId: number;
  type: 'D' | 'R';
  baseAddressType: 'R' | 'J';
  roadAddress: string;
  jibunAddress: string;
  addressDetail: string;
  requiredFillReceiverContact: boolean;
  requiredFillReceiverDetail: boolean;
  receiverName: string;
  receiverPhoneNumber: string;
  pickupType: ReceivePlace;
  pickupDetailCategory: PickupDetailCategory | '';
  pickupDetail: string;
  accessMethod: FrontDoorMethod;
  accessDetail: string;
  deliveryMessageTimeType: DeliveryCompleteMessage | '';
  latitude: number;
  longitude: number;
  receiverTemplate: ReceiverDetailTemplate;
  isJeJuIsland: boolean;
}

/**
 * 주문서 배송지 정보 수정
 * @interface CheckoutAddressRequest
 * @property {string} receiverName - 수령자 명
 * @property {string} receiverPhoneNumber - 수령자 전화번호
 * @property {ReceivePlace} pickupType - 받을 장소 타입
 * @property {PickupDetailCategory | ''} pickupDetailCategory - 받을 장소 옵션
 * @property {string} pickupDetail - 받을 장소 세부사항
 * @property {FrontDoorMethod | ''} accessMethod - 공동현관 출입 방법
 * @property {string} accessDetail - 공동현관 출입 방법 상세
 * @property {DeliveryCompleteMessage | ''} deliveryMessageTimeType - 배송 완료 메시지 전송시각
 */
export interface CheckoutAddressRequest {
  receiverName: string;
  receiverPhoneNumber: string;
  pickupType: ReceivePlace;
  pickupDetailCategory: PickupDetailCategory | '';
  pickupDetail: string;
  accessMethod: FrontDoorMethod | '';
  accessDetail: string;
  deliveryMessageTimeType: DeliveryCompleteMessage | '';
}
