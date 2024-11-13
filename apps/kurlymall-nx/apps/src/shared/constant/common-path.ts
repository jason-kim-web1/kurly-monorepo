import { isPC } from '../../../util/window/getDevice';

type PathValue = {
  uri: string;
  // NX 로 옮겨오지 않은 페이지 대상으로 사용, NX 로 옮겨오면 uri 하나로 수정되어야 합니다.
  mobileUri?: string;
  name: string;
};

const INTERNAL_COMMON_PATH = {
  login: {
    uri: '/member/login',
    name: '로그인',
  },
  logout: {
    uri: '/member/logout',
    name: '로그아웃',
  },
  error: {
    uri: '/shop/main/error.php',
    mobileUri: '/m2/error.php',
    name: '에러',
  },
  signup: {
    uri: '/member/signup',
    name: '회원가입',
  },
  signupSuccess: {
    uri: '/member/signup/success',
    name: '회원가입 완료',
  },
  findId: {
    uri: '/member/find/id',
    name: '아이디 찾기',
  },
  findPassword: {
    uri: '/member/find/password',
    name: '비밀번호 찾기',
  },
  changePassword: {
    uri: '/member/change-password',
    name: '비밀번호 변경',
  },
  closePopup: {
    uri: '/popup/close',
    name: '팝업 닫기',
  },
  blockInfo: {
    uri: '/member/block/info',
    name: '로그인 차단 해지',
  },
};

export const COMMON_PATH: Record<keyof typeof INTERNAL_COMMON_PATH, PathValue> = INTERNAL_COMMON_PATH;

const INTERNAL_MAIN_MENU_EVENT_PATH = {
  marketBenefit: {
    uri: '/market-benefit',
    name: '특가/혜택',
  },
  beautyBenefit: {
    uri: '/beauty-benefit',
    name: '뷰티-특가/혜택',
  },
  beautyEvent: {
    uri: '/beauty-event',
    name: '뷰티-브랜드관',
  },
};

export const MAIN_MENU_EVENT_PATH: Record<keyof typeof INTERNAL_MAIN_MENU_EVENT_PATH, PathValue> =
  INTERNAL_MAIN_MENU_EVENT_PATH;

const INTERNAL_PRODUCT_PATH = {
  list: {
    uri: '/goods-list',
    name: '상품 목록',
  },
  detail: {
    uri: '/goods',
    name: '상품 상세',
  },
  collections: {
    uri: '/collections',
    name: '컬렉션',
  },
  collectionGroups: {
    uri: '/collection-groups',
    name: '컬렉션그룹',
  },
  categories: {
    uri: '/categories',
    name: '카테고리',
  },
  marketBest: {
    uri: '/collection-groups/market-best',
    name: '베스트',
  },
  marketNewProduct: {
    uri: '/collection-groups/market-newproduct',
    name: '신상품',
  },
  marketTimeSales: {
    uri: '/collection-groups/market-sales-group',
    name: '알뜰쇼핑',
  },
  beautyNewProduct: {
    uri: '/collection-groups/beauty-new?site=beauty',
    name: '뷰티-신상품',
  },
  beautyBest: {
    uri: '/collection-groups/beauty-best?site=beauty',
    name: '뷰티-베스트',
  },
};

export const PRODUCT_PATH: Record<keyof typeof INTERNAL_PRODUCT_PATH, PathValue> = INTERNAL_PRODUCT_PATH;

const INTERNAL_GIFT_PATH = {
  gift: {
    uri: '/gift',
    mobileUri: '/m/gift',
    name: '선물하기',
  },
  order: {
    uri: '/order/gift',
    name: '주문서',
  },
  list: {
    uri: '/mypage/gift',
    name: '선물 목록',
  },
  cancel: {
    uri: '/mypage/gift/cancel?orderNo=',
    mobileUri: '/m/mypage/gift/cancel?orderNo=',
    name: '선물 주문 취소',
  },
  detail: {
    uri: '/mypage/gift/detail?orderNo=',
    name: '선물 주문 상세',
  },
  cancelSuccess: {
    uri: '/mypage/gift/cancel/success',
    name: '선물 주문 취소 성공',
  },
  cancelFail: {
    uri: '/mypage/gift/cancel/fail',
    name: '선물 주문 취소 실패',
  },
};

export const GIFT_PATH: Record<keyof typeof INTERNAL_GIFT_PATH, PathValue> = INTERNAL_GIFT_PATH;

const INTERNAL_PAYMENT_GIFT_PATH = {
  init: {
    uri: '/order/gift/init',
    mobileUri: '/m/order/gift/init',
    name: '주문 시작',
  },
  process: {
    uri: '/order/gift/process',
    name: '주문 처리',
  },
  processWebview: {
    uri: '/webview/order/gift',
    name: '웹뷰 주문 처리',
  },
  payFail: {
    uri: '/order/gift/fail/pay-fail',
    name: '주문 실패 - 모빌리언스',
  },
  fail: {
    uri: '/order/gift/fail',
    name: '주문 실패',
  },
  cancel: {
    uri: '/order/gift/cancel',
    name: '주문 취소',
  },
  success: {
    uri: '/order/gift/success',
    name: '주문 성공',
  },
};

export const PAYMENT_GIFT_PATH: Record<keyof typeof INTERNAL_PAYMENT_GIFT_PATH, PathValue> = INTERNAL_PAYMENT_GIFT_PATH;

const INTERNAL_ADDRESS_PATH = {
  address: {
    uri: '/address',
    name: '배송지',
  },
  add: {
    uri: '/address/shipping-address',
    name: '배송지 추가',
  },
  list: {
    uri: '/address/shipping-address/list',
    name: '배송지 관리',
  },
  update: {
    uri: '/address/shipping-address/update',
    name: '배송지 수정',
  },
  result: {
    uri: '/address/shipping-address/result',
    name: '배송지 검색 결과',
  },
};

export const ADDRESS_PATH: Record<keyof typeof INTERNAL_ADDRESS_PATH, PathValue> = INTERNAL_ADDRESS_PATH;

const INTERNAL_CART_PATH = {
  cart: {
    uri: '/cart',
    mobileUri: '/m/cart',
    name: '장바구니',
  },
  counter: {
    uri: '/cart/counter',
    mobileUri: '/m/cart/counter',
    name: '계산대',
  },
};

export const CART_PATH: Record<keyof typeof INTERNAL_CART_PATH, PathValue> = INTERNAL_CART_PATH;

const INTERNAL_CHECKOUT_PATH = {
  address: {
    uri: '/order/checkout/receiver-details',
    name: '배송지 상세 정보 수정',
  },
  pickup: {
    uri: '/order/checkout/pickup',
    name: '픽업지 정보',
  },
};

export const CHECKOUT_PATH: Record<keyof typeof INTERNAL_CHECKOUT_PATH, PathValue> = INTERNAL_CHECKOUT_PATH;

const INTERNAL_ORDER_PATH = {
  order: {
    uri: '/order/checkout',
    mobileUri: '/m/order/checkout',
    name: '주문서',
  },
  init: {
    uri: '/order/checkout/init',
    mobileUri: '/m/order/checkout/init',
    name: '주문 시작',
  },
  processBridge: {
    uri: '/order/checkout/bridge',
    name: '주문 처리 브릿지',
  },
  process: {
    uri: '/order/checkout/process',
    name: '주문 처리',
  },
  processWebview: {
    uri: '/webview/order/checkout',
    name: '웹뷰 주문 처리',
  },
  payFail: {
    uri: '/order/checkout/fail/pay-fail',
    name: '주문 실패 - 모빌리언스',
  },
  fail: {
    uri: '/order/checkout/fail',
    name: '주문 실패',
  },
  cancel: {
    uri: '/order/checkout/cancel',
    name: '주문 취소',
  },
  success: {
    uri: '/order/checkout/success',
    mobileUri: '/m/order/checkout/success',
    name: '주문 성공',
  },
  join: {
    uri: '/order/checkout/join',
    mobileUri: '/m/order/checkout/join',
    name: '함께구매 주문서',
  },
  joinProcess: {
    uri: '/order/checkout/join/process',
    name: '함께구매 주문 처리',
  },
  joinPayFail: {
    uri: '/order/checkout/join/fail/pay-fail',
    name: '주문 실패 - 모빌리언스',
  },
  joinFail: {
    uri: '/order/checkout/join/fail',
    name: '함께구매 주문 실패',
  },
  joinCancel: {
    uri: '/order/checkout/join/cancel',
    name: '함께구매 주문 취소',
  },
  joinSuccess: {
    uri: '/order/checkout/join/success',
    mobileUri: '/m/order/checkout/join/success',
    name: '함께구매 주문 성공',
  },
  plccPopup: {
    uri: '/popup/payments/plcc',
    name: 'plcc 카드 신청 팝업',
  },
  leaveKurlyPay: {
    uri: '/popup/payments/leave',
    name: '컬리페이 연동 해지 팝업',
  },
  freeInterestInstallments: {
    uri: '/webview/order/checkout/free-installments',
    name: '웹뷰 무이자 혜택 안내',
  },
  subscribe: {
    uri: '/order/checkout/subscribe',
    name: '정기결제 신청',
  },
  editSubscribe: {
    uri: '/order/checkout/subscribe/edit',
    name: '정기결제 변경',
  },
  subscribeSuccess: {
    uri: '/order/checkout/subscribe/success',
    name: '정기결제 성공',
  },
  subscribeFail: {
    uri: '/order/checkout/subscribe/fail',
    name: '정기결제 실패',
  },
  editSubscribeSuccess: {
    uri: '/order/checkout/subscribe/success/edit',
    name: '정기결제 변경 성공',
  },
  editSubscribeFail: {
    uri: '/order/checkout/subscribe/fail/edit',
    name: '정기결제 변경 실패',
  },
  personalCustomsCodeForm: {
    uri: '/order/checkout/personal-customs-code-form',
    name: '개인통관고유부호',
  },
  subscribeBridge: {
    uri: '/order/checkout/bridge/subscribe',
    name: '정기결제 결제 처리 브릿지',
  },
  subscribeProcess: {
    uri: '/order/checkout/process/subscribe',
    name: '페이지이동 결제 프로세스',
  },
};

export const ORDER_PATH: Record<keyof typeof INTERNAL_ORDER_PATH, PathValue> = INTERNAL_ORDER_PATH;

const INTERNAL_USER_MENU_PATH = {
  home: {
    uri: '/main',
    name: '홈',
  },
  beautyHome: {
    uri: '/main/beauty',
    name: '뷰티홈',
  },
  category: {
    uri: '/category',
    name: '카테고리',
  },
  search: {
    uri: '/search',
    name: '검색',
  },
  mykurly: {
    uri: '/mypage',
    name: '마이컬리',
  },
};

export const USER_MENU_PATH: Record<keyof typeof INTERNAL_USER_MENU_PATH, PathValue> = INTERNAL_USER_MENU_PATH;

const INTERNAL_MYPAGE_PATH = {
  myInfo: {
    uri: '/mypage/info',
    name: '개인 정보 수정',
  },
  myInfoModify: {
    uri: '/mypage/info/modify',
    name: '개인 정보 수정',
  },
  leave: {
    uri: '/mypage/leave',
    name: '탈퇴하기',
  },
  orderList: {
    uri: '/mypage/order',
    mobileUri: '/m/mypage/order',
    name: '주문내역',
  },
  orderDetail: {
    uri: '/mypage/order/[orderNo]',
    mobileUri: '/m/mypage/order/[orderNo]',
    name: '주문상세',
  },
  kurlyPass: {
    uri: '/shop/mypage/kurlypass.php',
    mobileUri: '/m2/myp/kurlypass.php',
    name: '컬리패스',
  },
  bulkOrder: {
    uri: 'https://docs.google.com/forms/d/e/1FAIpQLScWcjRuN6eWJK-G8x3NwBfE8IyKZIOq7jhD3fUXuKSWwPqzJw/viewform',
    name: '대량주문 문의',
  },
  review: {
    uri: '/mypage/review',
    mobileUri: '/m/mypage/review',
    name: '상품 후기',
  },
  productInquiry: {
    uri: '/mypage/inquiry/products',
    mobileUri: '/mypage/inquiry/products',
    name: '상품 문의',
  },
  cancel: {
    uri: '/mypage/order/cancel',
    mobileUri: '/m/mypage/order/cancel',
    name: '주문 취소',
  },
  cancelSuccess: {
    uri: '/mypage/order/cancel/success',
    mobileUri: '/m/mypage/order/cancel/success',
    name: '주문 취소 성공',
  },
  cancelFail: {
    uri: '/mypage/order/cancel/fail',
    mobileUri: '/m/mypage/order/cancel/fail',
    name: '주문 취소 실패',
  },
  deliveryTracking: {
    uri: '/mypage/order/delivery-tracking',
    name: '배송 조회',
  },
  favorite: {
    uri: '/mypage/favorite/list',
    name: '자주 사는 상품',
  },
  pick: {
    uri: '/mypage/pick/list',
    name: '찜한 상품',
  },

  emoney: {
    //컬리페이 홈으로 이동(결제수단 · 컬리페이 메뉴와 동일)
    uri: '',
    name: '적립금 · 컬리캐시',
  },
  coupon: {
    uri: '/mypage/coupon',
    mobileUri: '/m/mypage/coupon',
    name: '쿠폰',
  },
  couponDetail: {
    uri: '/mypage/coupon/[couponNo]',
    mobileUri: '/m/mypage/coupon/[couponNo]',
    name: '쿠폰상세',
  },
  nextGrade: {
    uri: '/mypage/next-grade',
    name: '다음 달 나의 예상 등급',
  },
  address: {
    uri: '/mypage/address',
    name: '배송지 관리',
  },
  kurlypay: {
    uri: '',
    name: '결제수단 · 컬리페이',
  },
  serviceCenter: {
    uri: '/mypage/service-center',
    name: '고객센터',
  },
  myMembership: {
    uri: '/mypage/membership',
    mobileUri: '/m/mypage/membership',
    name: '마이 컬리멤버스',
  },
  myMembershipBenefit: {
    uri: '/mypage/membership/benefit',
    name: '컬리멤버스 혜택 안내',
  },
  unsubscribeMembership: {
    uri: '/mypage/membership/unsubscribe',
    mobileUri: '/m/mypage/membership/unsubscribe',
    name: '컬리멤버스 해지하기',
  },
  affiliateBenefit: {
    uri: '/mypage/membership/affiliate-benefit',
    name: '컬리멤버스 제휴 혜택',
  },
  couponpack: {
    uri: '/mypage/membership/couponpack',
    name: '컬리멤버스 쿠폰팩 변경',
  },
  notiCenter: {
    uri: '/mypage/noti-center',
    name: '알림센터',
  },
};

export const MYPAGE_PATH: Record<keyof typeof INTERNAL_MYPAGE_PATH, PathValue> = INTERNAL_MYPAGE_PATH;

const INTERNAL_INQUIRY_PATH = {
  inquiry: {
    uri: '/mypage/inquiry/list',
    name: '1:1문의 리스트',
  },
  form: {
    uri: '/mypage/inquiry/form',
    name: '1:1문의 작성',
  },
};

export const INQUIRY_PATH: Record<keyof typeof INTERNAL_INQUIRY_PATH, PathValue> = INTERNAL_INQUIRY_PATH;

export const getPageUrl = (path: PathValue) => {
  if (isPC) {
    return path.uri;
  } else {
    return path.mobileUri || (path.uri ? `/m${path.uri}` : path.uri);
  }
};

const INTERNAL_GUIDE_PATH = {
  userGuide: {
    uri: '/user-guide',
    name: '이용안내',
  },
  deliveryGuide: {
    uri: '/user-guide/delivery',
    name: '배송안내',
  },
};

export const GUIDE_PATH: Record<keyof typeof INTERNAL_GUIDE_PATH, PathValue> = INTERNAL_GUIDE_PATH;

const INTERNAL_TERMS_PATH = {
  agreement: {
    uri: '/user-terms/agreement',
    name: '이용약관',
  },
  privacyPolicy: {
    uri: '/user-terms/privacy-policy',
    name: '개인정보처리방침',
  },
};

export const TERMS_PATH: Record<keyof typeof INTERNAL_TERMS_PATH, PathValue> = INTERNAL_TERMS_PATH;

const INTERNAL_BOARD_PATH = {
  notice: {
    uri: '/board/notice',
    name: '공지사항',
  },
  noticeDetail: {
    uri: '/board/notice/detail',
    name: '공지사항',
  },
  faq: {
    uri: '/board/faq',
    name: '자주묻는 질문',
  },
};

export const BOARD_PATH: Record<keyof typeof INTERNAL_BOARD_PATH, PathValue> = INTERNAL_BOARD_PATH;

const INTERNAL_MY_KURLY_STYLE = {
  myKurlyStyle: {
    uri: '/mypage/my-kurly-style',
    name: '마이 컬리 스타일',
  },
  profile: {
    uri: '/mypage/my-kurly-style/profile',
    name: '프로필',
  },
  success: {
    uri: '/mypage/my-kurly-style/success',
    name: '프로필 저장완료',
  },
};

export const MY_KURLY_STYLE: Record<keyof typeof INTERNAL_MY_KURLY_STYLE, PathValue> = INTERNAL_MY_KURLY_STYLE;

const INTERNAL_INTRODUCE_PATH = {
  introduce: {
    uri: '/introduce',
    name: '컬리소개',
  },
  qualityStandard: {
    uri: '/introduce/quality-standard',
    name: '컬리의 품질 기준',
  },
  gmoFood: {
    uri: '/introduce/quality-standard/gmo-food',
    name: 'GMO 식품',
  },
  japaneseFood: {
    uri: '/introduce/quality-standard/japanese-food',
    name: '일본산 식품',
  },
  infantFood: {
    uri: '/introduce/quality-standard/infant-food',
    name: '영유아 식품',
  },
  foodAdditive: {
    uri: '/introduce/quality-standard/food-additive',
    name: '식품 첨가물',
  },
  pesticideUse: {
    uri: '/introduce/quality-standard/pesticide-use',
    name: '농약 및 비료 사용',
  },
  petFood: {
    uri: '/introduce/quality-standard/pet-food',
    name: '반려동물 식품',
  },
  ecoOrganic: {
    uri: '/introduce/quality-standard/eco-organic',
    name: '친환경(유기농)',
  },
  ecoPlantationBreeding: {
    uri: '/introduce/quality-standard/eco-plantation-breeding',
    name: '친환경(재배 / 사육)',
  },
  productionProcess: {
    uri: '/introduce/quality-standard/production-process',
    name: '생산 과정',
  },
  safetyHygiene: {
    uri: '/introduce/quality-standard/safety-hygiene',
    name: '안전 / 위생',
  },
  areaProducer: {
    uri: '/introduce/quality-standard/area-producer',
    name: '지역 / 생산자',
  },
  healthFunctionalFood: {
    uri: '/introduce/quality-standard/health-functional-food',
    name: '건강기능식품',
  },
  specialProduct: {
    uri: '/introduce/quality-standard/special-product',
    name: '특수제품',
  },
  kurlyFreshSolution: {
    uri: '/introduce/kurly-fresh-solution',
    name: 'Kurly Fresh Solution',
  },
  pricePolicy: {
    uri: '/introduce/price-policy',
    name: '가격 정책 및 직거래 매입 방식',
  },
  customerSystem: {
    uri: '/introduce/customer-system',
    name: '고객만족 보상제도',
  },
  sustainableDistribution: {
    uri: '/introduce/sustainable-distribution',
    name: '지속 가능한 유통',
  },
  jointGrowth: {
    uri: '/introduce/sustainable-distribution/joint-growth',
    name: '지속 가능한 생산자 동반 성장',
  },
  productSelection: {
    uri: '/introduce/sustainable-distribution/product-selection',
    name: '지속 가능한 상품 선정',
  },
  packagingMaterials: {
    uri: '/introduce/sustainable-distribution/packaging-materials',
    name: '지속 가능한 포장재 개발·개선',
  },
  socialContribution: {
    uri: '/introduce/sustainable-distribution/social-contribution',
    name: '지속 가능한 사회에 대한 기여',
  },
};

export const INTRODUCE_PATH: Record<keyof typeof INTERNAL_INTRODUCE_PATH, PathValue> = INTERNAL_INTRODUCE_PATH;

const INTERNAL_KURLY_PURPLE_BOX_PATH = {
  kurlyPurpleBox: {
    uri: '/mypage/kurly-purple-box',
    name: '컬리 퍼플 박스',
  },
  personalBoxRequest: {
    uri: '/mypage/kurly-purple-box/request',
    name: '개인 보냉 박스 신청',
  },
  personalBoxResult: {
    uri: '/mypage/kurly-purple-box/result',
    name: '개인 보냉 박스 진행 상황',
  },
  webviewPersonalBoxRequest: {
    uri: '/webview/mypage/kurly-purple-box/request',
    name: '개인 보냉 박스 신청',
  },
  webviewPersonalBoxResult: {
    uri: '/webview/mypage/kurly-purple-box/result',
    name: '개인 보냉 박스 진행 상황',
  },
  webviewGuideline: {
    uri: '/webview/mypage/kurly-purple-box/guideline',
    name: '개인 보냉 박스 이용 안내',
  },
};

export const KURLY_PURPLE_BOX_PATH: Record<keyof typeof INTERNAL_KURLY_PURPLE_BOX_PATH, PathValue> =
  INTERNAL_KURLY_PURPLE_BOX_PATH;

const INTERNAL_EVENT_PATH = {
  plcc: {
    uri: '/events/plcc',
    name: '컬리 PLCC 이벤트 안내',
  },
  showcase: {
    uri: '/events/showcase/[id]',
    name: '컬리 쇼케이스 컬렉션',
  },
};

export const EVENT_PATH: Record<keyof typeof INTERNAL_EVENT_PATH, PathValue> = INTERNAL_EVENT_PATH;

const INTERNAL_MEMBER_BENEFIT_PATH = {
  lovers: {
    uri: '/events/member/lovers',
    name: '회원혜택',
  },
  members: {
    uri: '/events/member/kurly-members',
    name: '컬리멤버스',
  },
  vip: {
    uri: '/events/member/vip',
    name: 'VIP 제도',
  },
  friend: {
    uri: '/events/member/friend',
    name: '친구초대',
  },
  payment: {
    uri: '/events/member/payment-benefits',
    name: '결제혜택',
  },
};

export const MEMBER_BENEFIT_PATH: Record<keyof typeof INTERNAL_MEMBER_BENEFIT_PATH, PathValue> =
  INTERNAL_MEMBER_BENEFIT_PATH;

const INTERNAL_PARTNERS_PATH = {
  partners: {
    uri: '/partners',
    name: '파트너 페이지',
  },
  loreal: {
    uri: '/partners/loreal',
    name: '로레알 제휴 멤버십 연동 동의 페이지',
  },
  popup: {
    uri: '/popup/partners/loreal',
    name: '로레알 제휴 멤버십 연동 페이지',
  },
  webview: {
    uri: '/webview/partners/loreal',
    name: '로레알 제휴 멤버십 연동 페이지',
  },
  skt: {
    uri: '/partners/tuniverse',
    mobileUri: '/m/partners/tuniverse',
    name: 'SKT 우주패스',
  },
};

export type PartnersPathType = keyof typeof INTERNAL_PARTNERS_PATH;
export const PARTNERS_PATH: Record<PartnersPathType, PathValue> = INTERNAL_PARTNERS_PATH;

const INTERNAL_KURLYPAY_PATH = {
  kurlypayAction: {
    uri: '/popup/payments/kurlypay/action',
    name: '컬리페이 팝업 url',
  },
  kurlypayDefaultCallback: {
    uri: '/popup/payments/kurlypay/callback',
    name: '컬리페이 팝업 기본 callback url',
  },
};

export const KURLYPAY_PATH: Record<keyof typeof INTERNAL_KURLYPAY_PATH, PathValue> = INTERNAL_KURLYPAY_PATH;

const INTERNAL_GAME_PATH = {
  myKurlyFarm: {
    uri: '/games/my-kurly-farm',
    name: '게임 - 마이컬리팜 url',
  },
};

export const GAME_PATH: Record<keyof typeof INTERNAL_GAME_PATH, PathValue> = INTERNAL_GAME_PATH;

const INTERNAL_MEMBERSHIP_PATH = {
  membership: {
    uri: '/member/membership',
    mobileUri: '/m/member/membership',
    name: '컬리멤버스 구독',
  },
  terms: {
    uri: '/member/membership/terms',
    mobileUri: '/m/member/membership/terms',
    name: '컬리멤버스 구독 이용약관',
  },
};

export const MEMBERSHIP_PATH: Record<keyof typeof INTERNAL_MEMBERSHIP_PATH, PathValue> = INTERNAL_MEMBERSHIP_PATH;

const INTERNAL_LOUNGE_PATH = {
  vvip: {
    uri: '/member/lounges/vvip',
    mobileUri: '/m/member/lounges/vvip',
    name: 'VVIP 전용관',
  },
  vip: {
    uri: '/member/lounges/vip',
    mobileUri: '/m/member/lounges/vip',
    name: 'VIP 전용관',
  },
};

export const LOUNGE_PATH: Record<keyof typeof INTERNAL_LOUNGE_PATH, PathValue> = INTERNAL_LOUNGE_PATH;
