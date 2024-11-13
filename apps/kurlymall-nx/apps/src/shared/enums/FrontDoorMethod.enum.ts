/**
 * (받으실 장소가 '문 앞' 일때) 공동현관 출입방법
 *
 * PASSWORD: 공동현관 비밀번호
 *
 * FREE: 자유 출입 가능
 *
 * CALL_SECURITY_OFFICE: 경비실 호출
 *
 * ETC: 기타
 */
export enum FrontDoorMethod {
  PASSWORD = 'PASSWORD',
  FREE = 'FREE',
  CALL_SECURITY_OFFICE = 'CALL_SECURITY_OFFICE',
  ETC = 'ETC',
}

export type FrontDoorMethodType = keyof typeof FrontDoorMethod;

export enum FrontDoorMethodName {
  FRONT_DOOR = 1,
  FREE_PASS = 6,
  ETC = 7,
}
