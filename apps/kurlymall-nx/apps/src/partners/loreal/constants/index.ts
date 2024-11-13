import { isProduction } from '../../../shared/configs/config';

export const BASE_BREAK_POINT = 448;

export const MY_BEAUTY_BOX_URL = isProduction()
  ? 'https://www.mybeautybox.co.kr/retailer/kurly.view'
  : 'https://dev.mybeautybox.co.kr/retailer/kurly.view';

const MY_BEAUTY_BOX_CONTACT_EMAIL = 'CORPKRDeptConsumerCareCenter@loreal.com';

export const CAUTION_TEXT_LIST = [
  '컬리에서는 전체 브랜드 연동/해지만 가능합니다.',
  '개별 브랜드 멤버십 탈퇴는 마이뷰티박스에서 가능합니다.',
  `컬리에서 마이뷰티박스 연동 후 개별 브랜드 탈퇴 시, 해당 브랜드 상품의 구매 포인트는 적립 되지 않으며, 포인트 관련 문의는 로레알 고객센터로 문의 바랍니다.\n(문의: 마이뷰티박스 고객센터 이메일 <a href="mailto:${MY_BEAUTY_BOX_CONTACT_EMAIL}">${MY_BEAUTY_BOX_CONTACT_EMAIL}</a>)`,
  '가입/연결 당일 및 이후 주문 건에 대해서만 포인트가 지급됩니다.',
  '브랜드 멤버십 프로그램을 운영하지 않는 일부 브랜드의 경우, 포인트 적립이 불가합니다. (스킨수티컬즈, 라로슈포제, 케라스타즈)',
];

export const PROMOTION_CAUTION_TEXT_LIST = [
  '마이뷰티박스 가입 당일 컬리에서 브랜드 제품을 첫 구매한 경우 적립금 지급됩니다.',
  '적립금 지급 이벤트는 마케팅 수신동의가 필수이며 적립금 지급일까지 유지되어야 합니다. 중도 탈퇴 시 지급 대상에서 제외됩니다.',
  '할인, 쿠폰, 적립금 사용을 제외한 실결제금액 기준으로, 구매 익월 20일 배송완료 주문건에 혜택 지급됩니다.',
  '마이뷰티박스 연동 이전 구매 건에 대해서는 적립금을 지급하지 않고, 연동 후 첫 구매만 해당합니다.',
  '멤버십 탈퇴 후 재가입의 경우, 첫 구매 이벤트가 중복 적용되지 않습니다.',
];

// NOTE: 자주 변경되는 요소가 아니므로 30분으로 설정
export const STALE_TIME = 1000 * 60 * 30;

// NOTE: 페이지르 1시간 단위로 재 빌드 합니다.
export const REVALIDATE = 60 * 60;
