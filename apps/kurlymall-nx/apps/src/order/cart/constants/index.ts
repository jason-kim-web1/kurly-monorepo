// PC 헤더 높이
import { isPC } from '../../../../util/window/getDevice';

export const PC_HEADER_HEIGHT = 56;

// 모바일 헤더 높이
export const MOBILE_HEADER_HEIGHT = 44;

// 모바일 장바구니 전체선택, 선택삭제 탭 높이
export const MOBILE_ITEM_CONTROL_HEIGHT = 52;

// 모바일 배송유형탭 필터 높이
export const CART_DELIVERY_TAB_HEIGHT = isPC ? 62 : 58;
