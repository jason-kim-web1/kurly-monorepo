// 1) 모바일 상단 띠배너 높이
export const LINE_BANNER_HEIGHT = 38;
// 2) 모바일 헤더 높이 - 기본 타입
export const HEADER_HEIGHT = 44;
// 3) 모바일 헤더 높이 - 메인 타입
export const MAIN_HEADER_HEIGHT = 50;
// 4) 모바일 GNB 높이
export const GNB_HEIGHT = 45;
// 5) 하단 메뉴 높이
export const USER_MENU_HEIGHT = 45;

// 1) + 2)
export const HEADER_WITH_BANNER_HEIGHT = LINE_BANNER_HEIGHT + HEADER_HEIGHT;
// 1) + 3)
export const MAIN_HEADER_WITH_BANNER_HEIGHT = LINE_BANNER_HEIGHT + MAIN_HEADER_HEIGHT;
// 3) + 4)
export const MAIN_HEADER_WITH_GNB_HEIGHT = MAIN_HEADER_HEIGHT + GNB_HEIGHT;
// 1) + 3) + 4)
export const GNB_MAIN_HEADER_WITH_BANNER_HEIGHT = LINE_BANNER_HEIGHT + MAIN_HEADER_WITH_GNB_HEIGHT;
