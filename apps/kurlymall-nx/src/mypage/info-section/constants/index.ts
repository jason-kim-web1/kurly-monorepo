import { MENU_KEY_LIST } from '../../menu-section/constants';

export const QUICKMENU_TITLE = '자주찾는 메뉴';

export const MAIN_TITLE = ['쇼핑', '혜택', '내 정보관리', '서비스 안내', '고객 지원', '로그아웃'];

export const PC_MENU_ARRAY = {
  [MAIN_TITLE[0]]: [MENU_KEY_LIST.kurlypay, MENU_KEY_LIST.review, MENU_KEY_LIST.gift, MENU_KEY_LIST.qna],
  [MAIN_TITLE[1]]: [MENU_KEY_LIST.myMembership],
  [MAIN_TITLE[2]]: [MENU_KEY_LIST.address, MENU_KEY_LIST.myKurlyStyle, MENU_KEY_LIST.info],
  [MAIN_TITLE[3]]: [MENU_KEY_LIST.purplebox, MENU_KEY_LIST.vipGuide],
  [MAIN_TITLE[4]]: [],
  [MAIN_TITLE[5]]: [],
};

export const MO_MENU_ARRAY = {
  [MAIN_TITLE[0]]: [MENU_KEY_LIST.kurlypay, MENU_KEY_LIST.review, MENU_KEY_LIST.gift],
  [MAIN_TITLE[1]]: [MENU_KEY_LIST.invite, MENU_KEY_LIST.myMembership],
  [MAIN_TITLE[2]]: [MENU_KEY_LIST.info, MENU_KEY_LIST.myKurlyStyle, MENU_KEY_LIST.address],
  [MAIN_TITLE[3]]: [
    MENU_KEY_LIST.deliveryInfo,
    MENU_KEY_LIST.purplebox,
    MENU_KEY_LIST.kurlypass,
    MENU_KEY_LIST.vipGuide,
  ],
  [MAIN_TITLE[4]]: [
    MENU_KEY_LIST.serviceCenter,
    MENU_KEY_LIST.notice,
    MENU_KEY_LIST.qna,
    MENU_KEY_LIST.faq,
    MENU_KEY_LIST.inquiry,
    MENU_KEY_LIST.bulkOrder,
  ],
  [MAIN_TITLE[5]]: [MENU_KEY_LIST.logout],
};
