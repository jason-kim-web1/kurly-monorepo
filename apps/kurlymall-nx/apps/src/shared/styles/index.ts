import facepaint from 'facepaint';

export const mq = facepaint([1050].map((it) => `@media (min-width: ${it}px)`));

export const zIndex = {
  productInfoMenu: 1, // 상품상세 상품고시정보
  productReviewItemToolTip: 1,
  productNavi: 1,
  SearchWrapper: 2,
  cartProductFixedTitle: 3,
  notAvailablePurchaseTooltip: 3,
  checkoutGuideTooltip: 3,
  productSort: 4, // MW 상품 정렬 및 필터
  cartProductTitle: 6,
  couponList: 10, // 주문서 - 쿠폰
  orderLoader: 10, // 주문내역 및 상세 로더
  topScrollButton: 10,
  floatingButton: 10, // 둥둥이
  productBuyFooter: 20, // 상품상세 - 페이지 하단 고정 푸터(바로구매)
  productDetailListFilter: 20, // 상품상세 문의 탭, 상품 목록 필터 등
  headerMenu: 320,
  fixedHeader: 321,
  globalNavigationBarNotSticky: 300,
  globalNavigationBarWrap: 301,
  globalNavigationBarItem: 302,
  loading: 999,
  mainSectionLoading: 1,
  mobileHeader: 1000,
  floatingMenu: 1000,
  cartBottomButton: 1000,
  cartProductStickyHeader: 10,
  snowEffect: 9997, // 눈 내리는 효과
  bgProductMaximum: 9998, // 상품상세 - sns 공유하기 & 이미지 확대보기 딤처리
  mainPopupBanner: 9999, // 최상단 레이어 메인 팝업 공지
  mobileProductList: 5, // MW 상품 목록
  productMaximum: 9999, // 상품상세 - sns 공유하기 & 이미지 확대보기
  dialog: 9999, // 공통 다이얼로그
  pcProductListLoader: 1,
  bannerCarouselHorizontalList: 1,
  pcReviewFilter: 10, // PC 상품상세 - 리뷰 필터 팝업
  layerAdultVerification: 9999, // 19세 성인인증 팝업
  layerPopup: 9999, // 레이어 팝업
  membersBottomButton: 200, // 멤버스 구독 안내 페이지
  myKurlyStyle: 400, // 나의 컬리 스타일 프로필 수집 동의 팝업 배경
  disableKurlypayCard: 9999, // 비활성화 된 컬리페이 결제수단 카드
  paymentProcess: 10000, //결제진행 iframe
  bottomSheetOverlay: 1000,
  bottomSheet: 1001,
};

export const speed = {
  scroll: 300,
  testReport: 300, // 상품상세 MW 시험성적서 swiper
};
