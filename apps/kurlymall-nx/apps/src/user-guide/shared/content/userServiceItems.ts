interface ServiceItem {
  description: string;
  pageName: string;
  link: {
    pc: string;
    mobile: string;
  };
}

export const serviceItemList: ServiceItem[] = [
  {
    description: '보다 상세한 이용안내가 필요하신가요?',
    pageName: '자주하는 질문',
    link: {
      pc: '/board/faq',
      mobile: '/mypage/faq',
    },
  },
  {
    description: '추가적인 문의 사항이 있으신가요?',
    pageName: '1:1 문의',
    link: {
      pc: '/mypage/inquiry/form',
      mobile: '/mypage/inquiry/form',
    },
  },
];
