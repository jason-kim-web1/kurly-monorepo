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
export const ACCESS_METHOD = {
  PASSWORD: 'PASSWORD',
  FREE: 'FREE',
  CALL_SECURITY_OFFICE: 'CALL_SECURITY_OFFICE',
  ETC: 'ETC',
};

export const ACCESS_METHOD_TEXT_MAP: Record<AccessMethod, string> = {
  PASSWORD: '공동현관 비밀번호',
  FREE: '자유 출입 가능',
  CALL_SECURITY_OFFICE: '경비실 호출',
  ETC: '기타',
};

export type AccessMethod = typeof ACCESS_METHOD[keyof typeof ACCESS_METHOD];
