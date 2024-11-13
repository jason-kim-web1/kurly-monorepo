import { COMMON_PATH, getPageUrl } from '../../../shared/constant';

export type Menu = {
  title: string;
  text: string;
  icon: string;
  info: string;
};

export const Menus: Menu[] = [
  {
    title: '컬리 러버스 혜택',
    text: '연간 혜택 최대 240만원 이상',
    icon: 'https://res.kurly.com/images/event/fixed/common/ico-gift-s.svg',
    info: '매월 실적에 따라 적립/쿠폰이 바뀌는 컬리의 회원 등급 혜택이에요. 쓰면 쓸수록 높아지는 혜택을 지금 확인해보세요.',
  },
  {
    title: '친구 초대 이벤트',
    text: '참여할 때마다 5천원 적립',
    icon: 'https://res.kurly.com/images/event/fixed/common/ico-won-s.svg',
    info: '고객님의 ID를 추천인으로 적고 가입한 친구가 첫 구매를 하면 고객님과 친구분 모두에게 각각 5천원씩 적립금을 드려요.',
  },
  {
    title: '장바구니 이벤트',
    text: '최대 15만원 적립',
    icon: 'https://res.kurly.com/images/event/fixed/common/ico-won-s.svg',
    info: '고객님의 SNS에 컬리에서 구매한 상품을 자랑해주세요. 매일 선정을 통해 5천원, 월 최대 15만원의 적립금을 드려요.',
  },
];

export type Banner = {
  title: string;
  text: string;
  backgroundColor: string;
  link: string;
};

export const Banners: Banner[] = [
  {
    title: '다양한 상품을 특가로 만나보세요',
    text: '지금 진행 중인 특가전 보러가기',
    backgroundColor: 'purple',
    link: '/market-benefit',
  },
  {
    title: '컬리가 처음이신가요?',
    text: '신규 회원 이벤트 & 혜택 보러가기',
    backgroundColor: 'gray',
    link: getPageUrl(COMMON_PATH.signup),
  },
];
