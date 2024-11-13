import { Menu } from '../interfaces';
import {
  BOARD_PATH,
  COMMON_PATH,
  getPageUrl,
  GIFT_PATH,
  GUIDE_PATH,
  INQUIRY_PATH,
  INTRODUCE_PATH,
  KURLY_PURPLE_BOX_PATH,
  MEMBER_BENEFIT_PATH,
  MY_KURLY_STYLE,
  MYPAGE_PATH,
} from '../../../shared/constant';
import { isPC } from '../../../../util/window/getDevice';
import { KURLYPAY_WEB_URL } from '../../../shared/configs/config';
import { KURLYPAY_PAGES } from '../../../shared/hooks/useKurlypay';

export const MENU_KEY_LIST = {
  emoney: 'emoney',
  coupon: 'coupon',
  invite: 'invite',
  myKurlyStyle: 'myKurlyStyle',
  order: 'order',
  gift: 'gift',
  pick: 'pick',
  favorite: 'favorite',
  review: 'review',
  address: 'delivery',
  purplebox: 'purplebox',
  info: 'info',
  qna: 'qna',
  inquiry: 'inquiry',
  bulkOrder: 'bulkOrder',
  introduce: 'introduce',
  kurlypass: 'kurlypass',
  deliveryInfo: 'deliveryInfo',
  notice: 'notice',
  faq: 'faq',
  serviceCenter: 'serviceCenter',
  userGuide: 'userGuide',
  logout: 'logout',
  kurlypay: 'kurlypay',
  myMembership: 'myMembership',
  kurlycash: 'kurlycash',
  vipGuide: 'vipGuide',
};

export type MenuKeyType = typeof MENU_KEY_LIST[keyof typeof MENU_KEY_LIST];
export type MenuListType = { [key: string]: Menu };

export type MenuTitle =
  | 'emoney'
  | 'coupon'
  | 'invite'
  | 'myKurlyStyle'
  | 'order'
  | 'gift'
  | 'pick'
  | 'favorite'
  | 'review'
  | 'address'
  | 'purplebox'
  | 'info'
  | 'qna'
  | 'inquiry'
  | 'bulkOrder'
  | 'introduce'
  | 'kurlypass'
  | 'deliveryInfo'
  | 'notice'
  | 'faq'
  | 'serviceCenter'
  | 'userGuide'
  | 'logout'
  | 'kurlypay'
  | 'myMembership'
  | 'kurlycash'
  | 'vipGuide';

export const MenuTitleTextMap: Record<MenuTitle, string> = {
  emoney: '적립금',
  coupon: '쿠폰',
  invite: '친구초대',
  myKurlyStyle: '나의 컬리스타일',
  order: `${isPC ? '주문 내역' : '주문내역'}`,
  gift: '선물 내역',
  pick: `${isPC ? '찜한 상품' : '찜'}`,
  favorite: `${isPC ? '자주 구매' : '자주구매'}`,
  review: '상품 후기',
  address: '배송지 관리',
  purplebox: '컬리퍼플박스',
  info: '개인정보 수정',
  qna: '상품 문의',
  inquiry: '1:1 문의',
  bulkOrder: '대량 주문 문의',
  introduce: '컬리소개',
  kurlypass: '컬리패스',
  deliveryInfo: '배송 안내',
  notice: '공지사항',
  faq: '자주하는 질문',
  serviceCenter: '고객센터',
  userGuide: '이용안내',
  logout: '로그아웃',
  kurlypay: '결제수단 · 컬리페이',
  myMembership: '컬리멤버스',
  kurlycash: '컬리캐시',
  vipGuide: 'VIP제도 안내',
};

export const MENU_LIST: MenuListType = {
  [MENU_KEY_LIST.emoney]: {
    title: MenuTitleTextMap.emoney,
    link: '',
  },
  [MENU_KEY_LIST.coupon]: {
    title: MenuTitleTextMap.coupon,
    link: getPageUrl(MYPAGE_PATH.coupon),
  },
  [MENU_KEY_LIST.invite]: {
    title: MenuTitleTextMap.invite,
    link: '',
  },
  [MENU_KEY_LIST.myKurlyStyle]: {
    title: MenuTitleTextMap.myKurlyStyle,
    link: getPageUrl(MY_KURLY_STYLE.myKurlyStyle),
  },
  [MENU_KEY_LIST.order]: {
    title: MenuTitleTextMap.order,
    link: getPageUrl(MYPAGE_PATH.orderList),
  },
  [MENU_KEY_LIST.gift]: {
    title: MenuTitleTextMap.gift,
    link: getPageUrl(GIFT_PATH.list),
  },
  [MENU_KEY_LIST.favorite]: {
    title: MenuTitleTextMap.favorite,
    link: getPageUrl(MYPAGE_PATH.favorite),
  },
  [MENU_KEY_LIST.pick]: {
    title: MenuTitleTextMap.pick,
    link: getPageUrl(MYPAGE_PATH.pick),
  },
  [MENU_KEY_LIST.review]: {
    title: MenuTitleTextMap.review,
    link: getPageUrl(MYPAGE_PATH.review),
  },
  [MENU_KEY_LIST.kurlypay]: {
    title: MenuTitleTextMap.kurlypay,
    link: `${KURLYPAY_WEB_URL}/${KURLYPAY_PAGES.mypage}`,
  },
  [MENU_KEY_LIST.address]: {
    title: MenuTitleTextMap.address,
    link: getPageUrl(MYPAGE_PATH.address),
  },
  [MENU_KEY_LIST.purplebox]: {
    title: MenuTitleTextMap.purplebox,
    link: getPageUrl(KURLY_PURPLE_BOX_PATH.kurlyPurpleBox),
  },
  [MENU_KEY_LIST.info]: {
    title: MenuTitleTextMap.info,
    link: getPageUrl(MYPAGE_PATH.myInfo),
  },
  [MENU_KEY_LIST.qna]: {
    title: MenuTitleTextMap.qna,
    link: getPageUrl(MYPAGE_PATH.productInquiry),
  },
  [MENU_KEY_LIST.inquiry]: {
    title: MenuTitleTextMap.inquiry,
    link: getPageUrl(INQUIRY_PATH.inquiry),
  },
  [MENU_KEY_LIST.bulkOrder]: {
    title: MenuTitleTextMap.bulkOrder,
    link: MYPAGE_PATH.bulkOrder.uri,
  },
  [MENU_KEY_LIST.introduce]: {
    title: MenuTitleTextMap.introduce,
    link: getPageUrl(INTRODUCE_PATH.introduce),
  },
  [MENU_KEY_LIST.kurlypass]: {
    title: MenuTitleTextMap.kurlypass,
    link: getPageUrl(MYPAGE_PATH.kurlyPass),
  },
  [MENU_KEY_LIST.deliveryInfo]: {
    title: MenuTitleTextMap.deliveryInfo,
    link: getPageUrl(GUIDE_PATH.deliveryGuide),
  },
  [MENU_KEY_LIST.notice]: {
    title: MenuTitleTextMap.notice,
    link: getPageUrl(BOARD_PATH.notice),
  },
  [MENU_KEY_LIST.faq]: {
    title: MenuTitleTextMap.faq,
    link: getPageUrl(BOARD_PATH.faq),
  },
  [MENU_KEY_LIST.serviceCenter]: {
    title: MenuTitleTextMap.serviceCenter,
    link: getPageUrl(MYPAGE_PATH.serviceCenter),
  },
  [MENU_KEY_LIST.userGuide]: {
    title: MenuTitleTextMap.userGuide,
    link: getPageUrl(GUIDE_PATH.userGuide),
  },
  [MENU_KEY_LIST.logout]: {
    title: MenuTitleTextMap.logout,
    link: getPageUrl(COMMON_PATH.logout),
  },
  [MENU_KEY_LIST.myMembership]: {
    title: MenuTitleTextMap.myMembership,
    link: getPageUrl(MYPAGE_PATH.myMembership),
  },
  [MENU_KEY_LIST.kurlycash]: {
    title: MenuTitleTextMap.kurlycash,
    link: '',
  },
  [MENU_KEY_LIST.vipGuide]: {
    title: MenuTitleTextMap.vipGuide,
    link: getPageUrl(MEMBER_BENEFIT_PATH.vip),
  },
};

// 마이컬리 내 컬리페이 메뉴 체크
export const myPageKurlypayMenu = (title: string) =>
  title === MenuTitleTextMap.emoney || title === MenuTitleTextMap.kurlycash || title === MenuTitleTextMap.kurlypay;
