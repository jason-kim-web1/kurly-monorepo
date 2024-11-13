import { PathKey, PathKeyType } from './paths';

import { RichResultKey, RichResultKeyType } from './rich-results';

export interface PageMetaType {
  title?: string;
  description?: string;
  ldKeyList?: RichResultKeyType[];
  imageUrl?: string;
  keywords?: string;
}

type PartialRecord<K extends keyof never, T> = {
  [P in K]?: T;
};

export const DEFAULT_TITLE = '컬리 - 마켓컬리/뷰티컬리';
export const DEFAULT_SUB_TITLE = ' - 마켓컬리';
export const DEFAULT_BEAUTY_SUB_TITLE = ' - 뷰티컬리';

export const DEFAULT_DESCRIPTION =
  'Better Life for All. 건강한 식재료부터 믿을 수 있는 뷰티, 라이프스타일 상품까지. 나와 내 가족이 사고 싶은 상품을 판매합니다. 내일 아침 문 앞에서 만나요!';
export const DEFAULT_BEAUTY_DESCRIPTION =
  'My Favorite Beauty. 데일리부터 럭셔리 브랜드까지, 예뻐지는 모든 뷰티템을 가장 빠르게 만나보세요!';

export const DEFAULT_SUB_DESCRIPTION = ` - ${DEFAULT_DESCRIPTION}`;
export const DEFAULT_BEAUTY_SUB_DESCRIPTION = ` - ${DEFAULT_BEAUTY_DESCRIPTION}`;
export const DEFAULT_IMAGE_PATH = '/images/marketkurly/logo/logo_sns_marketkurly.jpg';
export const DEFAULT_BEAUTY_IMAGE_PATH = '/images/marketkurly/logo/logo_sns_marketkurly.jpg';
export const DEFAULT_KEYWORDS =
  '다이어트, 식단, 닭가슴살, 요리, 치아바타, 레시피, 상차림, 다이어트음식, 이유식, 건강이유식, 뷰티, 화장품';

export const DEFAULT_PAGE_META: PageMetaType = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
};

const PageMeta: PartialRecord<PathKeyType, PageMetaType> = {
  // 메인 마켓/뷰티 - /main, /main/beauty
  [PathKey.MAIN]: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_MAIN]: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MAIN_BEAUTY]: {
    title: DEFAULT_TITLE,
    description: DEFAULT_BEAUTY_DESCRIPTION,
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: '뷰티, 화장품',
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_MAIN_BEAUTY]: {
    title: DEFAULT_TITLE,
    description: DEFAULT_BEAUTY_DESCRIPTION,
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: '뷰티, 화장품',
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 로그인 - /member/login
  [PathKey.MEMBER_LOGIN]: {
    title: '로그인 - 컬리',
    description: '로그인하고 더 많은 서비스를 이용해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_MEMBER_LOGIN]: {
    title: '로그인 - 컬리',
    description: '로그인하고 더 많은 서비스를 이용해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 회원가입 - /member/signup
  [PathKey.MEMBER_SIGNUP]: {
    title: '회원가입 - 컬리',
    description: '지금 가입하고 인기상품 100원에 받아가세요!',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_MEMBER_SIGNUP]: {
    title: '회원가입 - 컬리',
    description: '지금 가입하고 인기상품 100원에 받아가세요!',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 검색 - /search
  [PathKey.SEARCH]: {
    title: '검색 - 컬리',
    description: '컬리에서 제공하는 모든 상품을 검색할 수 있어요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords:
      '다이어트, 식단, 닭가슴살, 요리, 치아바타, 레시피, 상차림, 다이어트음식, 이유식, 건강이유식, 뷰티, 화장품',
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_SEARCH]: {
    title: '검색 - 컬리',
    description: '컬리에서 제공하는 모든 상품을 검색할 수 있어요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 마켓 특가혜택
  [PathKey.MARKET_BENEFIT]: {
    title: '마켓 특가혜택 - 컬리',
    description: '지금 마켓컬리에서 제공하는 다양한 특가혜택을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_MARKET_BENEFIT]: {
    title: '마켓 특가혜택 - 컬리',
    description: '지금 마켓컬리에서 제공하는 다양한 특가혜택을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 뷰티 특가혜택 - /beauty-benefit
  [PathKey.BEAUTY_BENEFIT]: {
    title: '뷰티 특가혜택 - 컬리',
    description: '지금 뷰티컬리에서 제공하는 다양한 특가혜택을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_BEAUTY_BENEFIT]: {
    title: '뷰티 특가혜택 - 컬리',
    description: '지금 뷰티컬리에서 제공하는 다양한 특가혜택을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 컬렉션 상품목록
  [PathKey.COLLECTION_GROUPS_MARKET_NEWPRODUCT]: {
    title: '마켓 신상품 - 컬리',
    description: '지금 마켓컬리에서 제공하는 다양한 신상품을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.COLLECTION_GROUPS_BEAUTY_NEWPRODUCT]: {
    title: '뷰티 신상품 - 컬리',
    description: '지금 뷰티컬리에서 제공하는 다양한 신상품을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.COLLECTION_GROUPS_MARKET_BEST]: {
    title: '마켓 베스트 - 컬리',
    description: '지금 마켓컬리에서 제공하는 다양한 베스트 상품을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.COLLECTION_GROUPS_BEAUTY_BEST]: {
    title: '뷰티 베스트 - 컬리',
    description: '지금 뷰티컬리에서 제공하는 다양한 베스트 상품을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.COLLECTION_GROUPS_MARKET_SALES_GROUP]: {
    title: '마켓 알뜰쇼핑 - 컬리',
    description: '지금 마켓컬리에서 제공하는 다양한 최저가 상품을 확인해보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  // 컬렉션 그룹 상품목록
  // 카테고리 상품목록

  // 상품상세

  // 상품 후기 사진 전체보기 - /m/goods/[productCode]/review
  [PathKey.MOBILE_REVIEW]: {
    title: '사진 후기 전체보기',
    description: '다양한 상품 후기를 살펴보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 상품상세 > 후기상세 - /m/goods/[productCode]/review/[reviewId]
  [PathKey.MOBILE_REVIEW_DETAIL]: {
    title: '사진 후기 상세',
    description: '상품 후기를 살펴보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 뷰티 > 브랜드관 - /beauty-event
  [PathKey.BEAUTY_EVENT]: {
    title: '뷰티 브랜드관 - 컬리',
    description: '컬리가 소개하는 다양한 브랜드를 살펴보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_BEAUTY_EVENT]: {
    title: '뷰티 브랜드관 - 컬리',
    description: '컬리가 소개하는 다양한 브랜드를 살펴보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 고객센터 - /m/mypage/service-center
  [PathKey.USER_GUIDE]: {
    title: '고객센터 - 컬리',
    description:
      '전화문의, 대량주문 문의, 카카오톡 문의, 1:1 문의 - 365일 고객센터 운영시간에 순차적으로 답변드리겠습니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 개인정보처리방침 - /user-terms/privacy-policy
  [PathKey.USER_TERMS_PRIVACY_POLICY]: {
    title: '개인정보처리방침 - 컬리',
    description:
      '㈜컬리는(이하 “회사”는) 개인정보 보호 관련 법령에 따라 고객의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_USER_TERMS_PRIVACY_POLICY]: {
    title: '개인정보처리방침 - 컬리',
    description:
      '㈜컬리는(이하 “회사”는) 개인정보 보호 관련 법령에 따라 고객의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 이용약관 - /user-terms/agreement
  [PathKey.USER_TERMS_AGREEMENT]: {
    title: '이용약관 - 컬리',
    description: '컬리의 자세한 이용약관을 살펴볼수 있습니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_USER_TERMS_AGREEMENT]: {
    title: '이용약관 - 컬리',
    description: '컬리의 자세한 이용약관을 살펴볼수 있습니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 컬리소개 - /introduce
  [PathKey.INTRODUCE]: {
    title: '컬리소개 - 컬리',
    description: '컬리의 시작, 믿음 그리고 지켜야할 가치',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_INTRODUCE]: {
    title: '컬리소개 - 컬리',
    description: '컬리의 시작, 믿음 그리고 지켜야할 가치',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 컬리 소개 > Fresh Solution - /introduce/kurly-fresh-solution
  [PathKey.KURLY_FRESH_SOLUTION]: {
    title: 'Fresh Solution - 컬리소개 - 컬리',
    description: '물류혁신을 통해 최상의 품질로 전해드립니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 컬리 소개 > 컬리의 품질기준 - /introduce/quality-standard
  [PathKey.QUALITY_STANDARD]: {
    title: '컬리의 품질기준 - 컬리소개 - 컬리',
    description: '나와 내 가족이 사고 싶은 상품을 판매합니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 이용안내 - /user-guide
  [PathKey.USER_GUIDE]: {
    title: '이용안내 - 컬리',
    description: '컬리를 이용하는데 필요한 정보를 알아보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_USER_GUIDE]: {
    title: '이용안내 - 컬리',
    description: '컬리를 이용하는데 필요한 정보를 알아보세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 자주하는 질문 - /board/faq
  [PathKey.BOARD_FAQ]: {
    title: '자주하는 질문 - 컬리',
    description: '컬리 고객님들께서 자주하시는 질문을 모두 모았습니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  // 자주하는 질문 - /m/mypage/faq
  [PathKey.MOBILE_MYPAGE_FAQ]: {
    title: '뷰티 브랜드관 - 컬리',
    description: '컬리 고객님들께서 자주하시는 질문을 모두 모았습니다.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },

  // 공지사항 - /board/notice
  [PathKey.BOARD_NOTICE]: {
    title: '공지사항 - 컬리',
    description: '컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
  [PathKey.MOBILE_BOARD_NOTICE]: {
    title: '공지사항 - 컬리',
    description: '컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.',
    imageUrl: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
    keywords: DEFAULT_KEYWORDS,
    ldKeyList: [RichResultKey.ORGANIZATION, RichResultKey.WEB_SITE],
  },
};

export default PageMeta;
