import {
  DeletedReceivePlace,
  DeliveryCompleteMessage,
  FrontDoorMethod,
  PickupDetailCategory,
  ReceivePlace,
} from '../enums';

/**
 * 받으실 장소 텍스트맵
 *
 * DOOR: 문 앞
 *
 * ETC: 기타 장소
 */
export const ReceivePlaceTextMap: Record<ReceivePlace, string> = {
  DOOR: '문 앞',
  ETC: '기타 장소',
};

/**
 * 받으실 장소 (주문서에서 사용 X, 마이페이지 호환) 텍스트맵
 *
 * DOOR: 문 앞
 *
 * SECURITY_OFFICE: 경비실
 *
 * PICKUP_BOX: 택배함
 *
 * ETC: 기타 장소
 */
export const OldReceivePlaceTextMap: Record<ReceivePlace | DeletedReceivePlace, string> = {
  DOOR: '문 앞',
  SECURITY_OFFICE: '경비실',
  PICKUP_BOX: '택배함',
  ETC: '기타 장소',
};

/**
 * 샛별배송의 배송완료 알림 수신요청 시각 텍스트맵
 *
 * IMMEDIATELY : 배송즉시
 *
 * AM7 : 7시
 *
 * AM8 : 8시
 */
export const DeliveryCompleteMessageTextMap: Record<DeliveryCompleteMessage, string> = {
  AM7: '오전 7시',
  AM8: '오전 8시',
  IMMEDIATELY: '배송 직후',
};

/**
 * (받으실 장소가 '문 앞' 일때) 공동현관 출입방법 텍스트맵
 *
 * PASSWORD: 공동현관 비밀번호
 *
 * FREE: 자유 출입 가능
 *
 * CALL_SECURITY_OFFICE: 경비실 호출
 *
 * ETC: 기타
 */
export const FrontDoorMethodTextMap: Record<FrontDoorMethod, string> = {
  PASSWORD: '공동현관 비밀번호',
  FREE: '자유 출입 가능',
  CALL_SECURITY_OFFICE: '경비실 호출',
  ETC: '기타',
};

/**
 * (받으실 장소가 '기타 장소' 일때) 기타장소 세부사항 텍스트맵
 *
 * ETC: 기타
 *
 * PICKUP_BOX: 택배 수령실
 *
 * FRONT_OF_ENTRANCE: 공동현관(대문) 앞
 */
export const PickupDetailCategoryTextMap: Record<PickupDetailCategory, string> = {
  ETC: '기타',
  PICKUP_BOX: '택배 수령실',
  FRONT_OF_ENTRANCE: '공동현관(대문) 앞',
};
