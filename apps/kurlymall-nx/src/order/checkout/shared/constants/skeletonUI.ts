import { isPC } from '../../../../../util/window/getDevice';

//쿠폰영역 스켈레톤 UI
export const COUPON_SELECT_BOX_HEIGHT = isPC ? 44 : 48;
export const COUPON_SELECT_BOX_BORDER_RADIUS = isPC ? 0 : 4;

//적립금영역 스켈레톤 UI
export const POINT_INPUT_WIDTH = 306;
export const POINT_INPUT_HEIGHT = isPC ? 44 : 48;
export const POINT_INPUT_BORDER_RADIUS = 3;

export const POINT_BUTTON_WIDTH = isPC ? 100 : 88;
export const POINT_BUTTON_HEIGHT = 48;
export const POINT_BUTTON_BORDER_RADIUS = isPC ? 3 : 4;

//컬리카드혜택영역 스켈레톤 UI
export const KURLY_CEHCK_BOX_HEIGHT = isPC ? 26 : 24;
