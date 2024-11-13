import { Menu } from '../interfaces';
import { COMMON_PATH, GIFT_PATH, MEMBERSHIP_PATH, MY_KURLY_STYLE, MYPAGE_PATH } from '../../shared/constant';
import { KURLYPAY_PAGES } from '../../shared/hooks/useKurlypay';

export const USER_MENUS: Menu[] = [
  {
    link: MYPAGE_PATH.orderList.uri,
    title: '주문 내역',
  },
  {
    link: MYPAGE_PATH.coupon.uri,
    title: '쿠폰',
    hasNew: false,
  },
  {
    link: MYPAGE_PATH.pick.uri,
    title: '찜한 상품',
  },
  {
    link: MYPAGE_PATH.favorite.uri,
    title: '자주 구매',
  },
  {
    link: KURLYPAY_PAGES.mypage,
    title: '적립금 · 컬리캐시',
    hasNew: false,
  },
  {
    link: KURLYPAY_PAGES.mypage,
    title: '결제수단 · 컬리페이',
    hasNew: false,
  },
  {
    link: '/mypage/review',
    title: '상품 후기',
    hasNew: false,
  },
  {
    link: GIFT_PATH.list.uri,
    title: '선물 내역',
  },
  {
    link: '/mypage/inquiry/products',
    title: '상품 문의',
  },
  {
    link: MEMBERSHIP_PATH.membership.uri,
    title: '컬리멤버스',
    hasNew: false,
  },

  {
    link: MYPAGE_PATH.address.uri,
    title: '배송지 관리',
  },
  {
    link: MY_KURLY_STYLE.myKurlyStyle.uri,
    title: '나의 컬리 스타일',
    hasNew: false,
  },
  {
    link: MYPAGE_PATH.myInfo.uri,
    title: '개인 정보 수정',
  },
  {
    link: COMMON_PATH.logout.uri,
    title: '로그아웃',
  },
];
