export const phoneValidate = (phone: string) => /^01([016-9])\d{3,4}\d{4}$/.test(phone);

/**
 * 연락처에서 01000000000을 검증하는 이유
 * https://kurly0521.atlassian.net/wiki/spaces/orderpayments/pages/3745710456/2023.09+B2B
 *
 * @param phone 하이픈이 제거 된 휴대폰번호
 * @returns boolean
 */
export const isDefaultPhoneNumber = (phone: string) => '01000000000' === phone;

/**
 * API전달할때 필요한 모바일 번호 포멧터
 *
 * @param { string } mobile 전달할 전화번호 스트링
 * @return { string } \d{3}-\d{4}-\d{4} 형식의 전화번호
 */
export const formatMobileNumber = (mobile: string) => {
  const str = mobile.trim().replace(/[^\d]/g, '').split('');
  const lastIdx = str.length === 10 ? 7 : 8;

  str.splice(3, 0, '-');
  str.splice(lastIdx, 0, '-');
  return str.join('');
};
