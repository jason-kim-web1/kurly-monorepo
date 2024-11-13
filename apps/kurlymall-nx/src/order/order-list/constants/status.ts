export interface StatusText {
  mainText: string;
  subText?: string;
  buttonText: string;
}

export const ERROR_TEXT: StatusText = {
  mainText: '오류가 발생했습니다.',
  subText: '잠시 후 다시 시도해주세요.',
  buttonText: '재시도',
};

export const EMPTY_TEXT: StatusText = {
  mainText: '간의 주문 내역이 없습니다.',
  buttonText: '베스트 상품 보기',
};
