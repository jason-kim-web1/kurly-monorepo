/**
 * (받으실 장소가 '기타 장소' 일때) 기타장소 세부사항
 *
 * ETC: 기타
 *
 * PICKUP_BOX: 택배 수령실
 *
 * FRONT_OF_ENTRANCE: 공동현관(대문) 앞
 */
export enum PickupDetailCategory {
  ETC = 'ETC',
  PICKUP_BOX = 'PICKUP_BOX',
  FRONT_OF_ENTRANCE = 'FRONT_OF_ENTRANCE',
}

export type PickupDetailCategoryType = keyof typeof PickupDetailCategory;
