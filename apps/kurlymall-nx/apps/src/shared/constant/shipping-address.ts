export const MAX_ADDRESS_LIST_LENGTH = 20;

export const MAX_ADDRESS_DETAIL_LENGTH = 50;

export const MAX_ADDRESS_TEXT = `배송지는 ${MAX_ADDRESS_LIST_LENGTH}개까지 저장하실 수 있어요. 사용하지 않는 배송지는 삭제해주세요.`;

export const EMPTY_ADDRESS_DETAIL_TEXT = '나머지 주소를 입력하지 않으셨습니다. 이대로 저장하시겠습니까?';

export const CHANGE_ADDRESS_TEXT = '배송지 변경으로 상품 정보가 업데이트됩니다.';

export const REMOVE_ADDRESS_TEXT = '배송지를 삭제하시겠습니까?';

export const ADDRESS_INFO = {
  name: '받으실 분',
  mobile: '휴대폰',
};

export const ADDRESS_DETAIL_PLACEHOLDER_TEXT = '나머지 주소를 입력해 주세요';
export const ADDRESS_MOBILE_PLACEHOLDER_TEXT = '번호를 입력해 주세요';
export const ADDRESS_MOBILE_FORMAT_TEXT = '휴대폰 번호를 정확히 입력해주세요';

export const NOT_ALLOWED_ADDRESS_TEXT = (texts: string[]) =>
  `주소에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요. \n${texts?.join(' ')}`;
export const NOT_ALLOWED_NAME_TEXT = (texts: string[]) =>
  `이름에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요. \n${texts?.join(' ')}`;
