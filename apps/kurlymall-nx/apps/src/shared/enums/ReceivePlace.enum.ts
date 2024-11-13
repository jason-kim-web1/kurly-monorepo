/**
 * 받으실 장소
 *
 * DOOR: 문 앞
 *
 * ETC: 기타 장소
 */
export enum ReceivePlace {
  DOOR = 'DOOR',
  ETC = 'ETC',
}

/**
 * 받으실 장소 (주문서에서 삭제, 마이페이지 호환)
 *
 * SECURITY_OFFICE: 경비실
 *
 * PICKUP_BOX: 택배함
 */
export enum DeletedReceivePlace {
  SECURITY_OFFICE = 'SECURITY_OFFICE',
  PICKUP_BOX = 'PICKUP_BOX',
}

export type ReceivePlaceType = keyof typeof ReceivePlace;
