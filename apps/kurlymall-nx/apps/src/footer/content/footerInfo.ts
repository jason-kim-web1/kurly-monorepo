export type SnsItem = {
  link: string;
  title: string;
  imgPc: string;
};

export const SnsList: SnsItem[] = [
  {
    link: 'https://instagram.com/marketkurly',
    title: '컬리 인스타그램 바로가기',
    imgPc: 'https://res.kurly.com/pc/ico/1810/ico_instagram.png',
  },
  {
    link: 'https://www.facebook.com/marketkurly',
    title: '컬리 페이스북 바로가기',
    imgPc: 'https://res.kurly.com/pc/ico/1810/ico_fb.png',
  },
  {
    link: 'https://blog.naver.com/marketkurly',
    title: '컬리 네이버블로그 바로가기',
    imgPc: 'https://res.kurly.com/pc/ico/1810/ico_blog.png',
  },
  {
    link: 'https://m.post.naver.com/marketkurly',
    title: '컬리 네이버포스트 바로가기',
    imgPc: 'https://res.kurly.com/pc/ico/1810/ico_naverpost.png',
  },
  {
    link: 'https://www.youtube.com/channel/UCfpdjL5pl-1qKT7Xp4UQzQg',
    title: '컬리 유튜브 바로가기',
    imgPc: 'https://res.kurly.com/pc/ico/1810/ico_youtube.png',
  },
];

export type CompanyItem = {
  title: string;
  link: string;
  linkPopupSize?: {
    width: number;
    height: number;
  };
  isExternalLink?: boolean;
  isBold?: boolean;
};

export const CompanyList: CompanyItem[] = [
  {
    title: '컬리소개',
    link: '/introduce',
  },
  {
    title: '컬리소개영상',
    link: 'https://www.youtube.com/embed/WEep7BcboMQ?rel=0&showinfo=0&wmode=opaque&enablejsapi=1',
    linkPopupSize: {
      width: 1330,
      height: 660,
    },
  },
  {
    title: '투자정보',
    link: 'https://ir.kurly.com',
    isExternalLink: true,
  },
  {
    title: '인재채용',
    link: 'https://kurly.career.greetinghr.com',
    isExternalLink: true,
  },
  {
    title: '이용약관',
    link: '/user-terms/agreement',
  },
  {
    title: '개인정보처리방침',
    link: '/user-terms/privacy-policy',
    isBold: true,
  },
  {
    title: '이용안내',
    link: '/user-guide',
  },
];

export const CompanyListMobile: CompanyItem[] = [
  {
    title: '컬리소개',
    link: '/introduce',
  },
  {
    title: '이용안내',
    link: '/user-guide',
  },
  {
    title: '배송안내',
    link: '/user-guide/delivery',
  },
  {
    title: '자주하는 질문',
    link: '/mypage/faq',
  },
  {
    title: '공지사항',
    link: '/board/notice',
  },
  {
    title: '투자정보',
    link: 'https://ir.kurly.com',
    isExternalLink: true,
  },
  {
    title: '인재채용',
    link: 'https://kurly.career.greetinghr.com',
    isExternalLink: true,
  },
  {
    title: '이용약관',
    link: '/user-terms/agreement',
  },
  {
    title: '개인정보처리방침',
    link: '/user-terms/privacy-policy',
  },
];

export type CertificateItem = {
  title: string;
  logo: string;
  logoMobile?: string;
  textFirst: string;
  textSecond: string;
  textLast?: string;
  textFirstMobile?: string;
  textSecondMobile?: string;
  linkPopup: string;
  linkPopupSize: {
    width: number;
    height: number;
  };
  isSizeDifferent?: boolean;
};

export const CertificateList: CertificateItem[] = [
  {
    title: 'isms',
    logo: 'https://res.kurly.com/pc/ico/2208/logo_isms.svg',
    textFirst: '[인증범위] 컬리 쇼핑몰 서비스 개발·운영',
    textSecond: '(심사받지 않은 물리적 인프라 제외)',
    textLast: '[유효기간] 2022.01.19 ~ 2025.01.18',
    linkPopup: 'https://res.kurly.com/kurly/img/2022/isms_220310.png',
    linkPopupSize: {
      width: 550,
      height: 700,
    },
  },
  {
    title: 'eprivacy plus',
    logo: 'https://www.eprivacy.or.kr/images/mng/sub/mark1_eprivacy_plus.png',
    textFirst: '개인정보보호 우수 웹사이트 ·',
    textSecond: '개인정보처리시스템 인증 (ePRIVACY PLUS)',
    linkPopup:
      'https://www.eprivacy.or.kr/front/certifiedSiteMark/certifiedSiteMarkPopup.do?certCmd=EP&certNum=2024-EP-R002',
    linkPopupSize: {
      width: 527,
      height: 720,
    },
  },
  {
    title: 'payments',
    logo: 'https://res.kurly.com/pc/ico/2208/logo_tosspayments.svg',
    logoMobile: 'https://res.kurly.com/images/thirdparty-logo/tosspayments_34x34.svg',
    textFirst: '토스페이먼츠 구매안전(에스크로)',
    textSecond: '서비스를 이용하실 수 있습니다.',
    textFirstMobile: '고객님의 안전 거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한',
    textSecondMobile: '토스페이먼츠 구매안전(에스크로) 서비스를 이용하실 수 있습니다.',
    linkPopup: 'https://pgweb.uplus.co.kr/ms/escrow/s_escrowYn.do?mertid=go_thefarmers',
    linkPopupSize: {
      width: 460,
      height: 550,
    },
    isSizeDifferent: true,
  },
  {
    title: '우리은행',
    logo: 'https://res.kurly.com/pc/ico/2208/logo_wooriBank.svg',
    textFirst: '고객님이 현금으로 결제한 금액에 대해 우리은행과',
    textSecond: '채무지급보증 계약을 체결하여 안전거래를 보장하고',
    textLast: '있습니다.',
    textFirstMobile: '당사는 고객님이 현금 결제한 금액에 대해 우리은행과 채무지급보증',
    textSecondMobile: '계약을 체결하여 안전거래를 보장하고 있습니다.',
    linkPopup: 'https://res.kurly.com/kurly/img/recent/acceptances-and-guarantees/woori.png',
    linkPopupSize: {
      width: 550,
      height: 700,
    },
  },
];
