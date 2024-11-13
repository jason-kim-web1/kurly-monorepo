// 장바구니에서 주문서로 넘어갈 때 버튼 텍스트
export const LOADING_TEXT = '로딩중...';
export const EMPTY_TEXT = '상품을 담아주세요';
export const NOT_SELECTED_TEXT = '상품을 선택해주세요';
export const NOT_AVAILABLE_TEXT = '배송불가 지역입니다';
export const NOT_ENTERED_TEXT = '배송지를 입력해주세요';
export const CONFIRMED_ORDER_TEXT = '주문하기';
export const RETIRED_ADDRESS_BUTTON_TEXT = '주소지를 재등록 해주세요';

// 장바구니에서 주문서 안내 문구
export const BASIC_ORDER_INFORMATION: string[] = [
  '[주문완료] 상태일 경우에만 주문 취소 가능합니다.',
  '[마이컬리 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.',
];

export const MEMBER_ORDER_INFORMATION: string[] = [
  '쿠폰/적립금은 주문서에서 사용 가능합니다',
  ...BASIC_ORDER_INFORMATION,
  '쿠폰, 적립금 사용 금액을 제외한 실 결제 금액 기준으로 최종 산정됩니다.',
  '상품별로 적립금 지급 기준이 다를 수 있습니다. (상품 상세 페이지에서 확인 가능합니다)',
];

// 장바구니 상단 폐지된 주소 텍스트
export const RETIRED_ADDRESS_DESCRIPTION_TEXT_NON_SPACE = '위 주소지가 폐지되었습니다. 재등록 해주세요.';
export const RETIRED_ADDRESS_DESCRIPTION_TEXT_SPACE = '위 주소지가 폐지되었습니다.\n재등록 해주세요.';

export const RETIRED_ADDRESS_ALERT_TEXT = '폐지된 주소지 입니다.\n재등록 해주세요.';
