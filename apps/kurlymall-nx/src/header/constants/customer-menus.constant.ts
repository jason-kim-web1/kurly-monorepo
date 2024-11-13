import { Menu } from '../interfaces';

export const BULK_ORDER_GOOGLE_FORM_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLScWcjRuN6eWJK-G8x3NwBfE8IyKZIOq7jhD3fUXuKSWwPqzJw/viewform';

export const CUSTOMER_MENU: Menu[] = [
  {
    link: '/board/notice',
    title: '공지사항',
  },
  {
    link: '/board/faq',
    title: '자주하는 질문',
  },
  {
    link: '/mypage/inquiry/list',
    title: '1:1 문의',
  },
  {
    link: BULK_ORDER_GOOGLE_FORM_LINK,
    title: '대량주문 문의',
  },
];
