import { BenefitType, NormalOrderTypePolicyType, ReusablePackage, TargetSiteType } from '.';
import { OrderVendorCode, VendorCode } from '../../order/shared/shared/interfaces';
import { TermsInfo } from './UserTerms';
import { CardVendorCode } from '../constant';
import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../order/checkout/shared/interfaces';
import { Grade, ReceiverDetailTemplate } from '../enums';
import { CheckoutCouponTargetType } from '../../order/checkout/shared/constants/coupon-target';
import { PromotionType } from '../../order/cart/constants/PromotionType';
import { CheckReAddAvailableRequest } from '../../order/cart/api/postCheckReAddAvailable';

export interface CheckoutProductItem {
  id: number;
  dealProductNo: number;
  dealProductName: string;
  contentProductNo: number;
  contentProductName: string;
  quantity: number;
  thumbnailUrl?: string;
  price: number;
  discountedPrice: number;
  isPickupProduct: boolean;
  isReservable: boolean;
  isAlcoholDealProduct: boolean;
  isGiftCard: boolean;
  isCouponBlacklist: boolean;
}

export interface CheckoutProductsRequest {
  memberReserveRatio?: number; // (회원) 적립률
  kurlypayAvailable?: boolean;
}

export interface CheckoutBasicProduct {
  dealProductNo: number;
  dealProductCode: string;
  dealProductName: string;
  contentProductNo: number;
  contentProductName: string;
  imageUrl: string;
  productVerticalSmallUrl: string;
  quantity: number;
  legacyPromotion?: PromotionType | null;
  exceptionLabel?: 'REFRESH_PACKAGE' | 'KURLY_PASS' | null;
  // 픽업 상품 여부
  isPickupDealProduct: boolean;
  // 예약 상품 여부
  isReservable: boolean;
  // 주류 상품 여부
  isAlcoholDealProduct: boolean;
  // 컬리 상품권 여부
  isGiftCard: boolean;
  // 쿠폰적용 불가 여부
  isCouponBlacklist: boolean;
}

export interface CheckoutProduct extends CheckoutBasicProduct {
  displayPrice: number;
  displayDiscountPrice: number;
}

export type CheckoutGiveProduct = CheckoutBasicProduct;

export interface CheckoutCoupon {
  // 쿠폰 코드
  couponCode: string;
  // 쿠폰 만료 시각 (무제한이면 null)
  endAt: string | null;
  // 사용 가능 여부
  usable: boolean;
  // 쿠폰 할인 금액
  totalCouponDiscount: number;
  // 사용 가능한 결제수단
  paymentGateways: (VendorCode | 'ALL')[];
  // 사용 가능한 카드사
  creditCardId: CardVendorCode | null;
  // 적립금 함께 사용 가능 여부
  pointAllowed: boolean;
  // 쿠폰 이름
  name: string;
  // 쿠폰 설명
  description: string;
  // 쿠폰 혜택: PRICE_DISCOUNT 및 PERCENT_DISCOUNT 일때 의미있음
  value: number;
  // 쿠폰 혜택 종류
  type: BenefitType;
  // 쿠폰 중복 검증용 추가 인터페이스
  // TODO: 서버 데이터 내려올 경우 변경
  duplicateCoupons?: unknown[];
  // (컬리상품 한정, 판매자배송 상품 한정) 등 추가적인 쿠폰 기준 노출 시 사용
  target?: CheckoutCouponTargetType;
  isAppOnly: boolean;
  siteType: TargetSiteType;
}

export interface ProductGroupAPIResponse {
  dealProducts: CheckoutProduct[];
  deliveryPolicy: string;
  deliveryPolicyDisplayName: string;
  partnerName?: string;
  isKurlyFulfillmentProduct?: boolean;
}

export interface ProductGroup
  extends Omit<ProductGroupAPIResponse, 'dealProducts' | 'deliveryPolicy' | 'deliveryPolicyDisplayName'> {
  products?: CheckoutProductItem[];
}

export interface ProductGroupsByDeliveryPolicy {
  productGroups: ProductGroup[];
  deliveryPolicyDisplayName: string;
  deliveryPolicy?: string;
}

export interface CheckoutProductsServiceResponse {
  // 상품 목록
  products: CheckoutProductItem[];
  // 배송 정책 기준으로 그룹화 된 상품 그룹
  productGroupsByDeliveryPolicies: ProductGroupsByDeliveryPolicy[];
  // 와인 픽업 서비스
  isPickupOrder: boolean;
  // 상품권 주문 여부
  isGiftCardOrder: boolean;
  // 증정품 목록
  giveawayProducts: CheckoutProductItem[];
  // 100원딜/럭키박스 상품 포함 여부
  isEventProducts: boolean;
  // 재사용포장재 구매 여부
  isReusablePackage: boolean;
  // 사용가능 쿠폰
  coupons: CheckoutCoupon[];
  // 가격
  price: CalculatedPrice;
  // 재사용포장재
  reusablePackage: ReusablePackage;
  // 바로구매 주문서 여부
  isDirectCheckout: boolean;
  // 예약 상품 포함 여부
  hasReservableProducts: boolean;
  // 컬리 물류 배송(1P, 3PL) 상품 포함 여부
  hasKurlyFulfillmentAndDeliveryProduct: boolean;
  // 무배송 상품 포함 여부
  hasNonDeliveryProduct: boolean;
  // 럭키박스 단건 주문 여부
  isLuckyBoxOrder: boolean;
  // 배송 메세지
  deliveryNotice: string;
  // 배송 안내 문구 BasicStyle, 있는 경우 배송 안내 문구의 스타일을 변경합니다.
  deliveryNoticeBasicStyle?: ContinuityMessageBasicStyle;
  // 배송 안내 문구 ReplaceStyles, 있는 경우 배송 안내 문구 특정 text의 스타일을 변경합니다.
  deliveryNoticeReplaceStyles?: ContinuityMessageReplaceStyle[];
  // 선물하기 주문서 여부
  isGiftOrder: boolean;
  // 약관동의 정보
  personalInfoAgreement: {
    isVisibleThirdPartyAgree: boolean;
    terms: TermsInfo[];
  };
  // 함께구매 정보
  joinOrder: JoinOrderMeta | null;
  // 사용가능 적립금/컬리캐시
  availablePoint: AvailablePoint;
  // 주문 타입
  checkoutType: CheckoutType;
  // 해외직배송 상품 구매 여부
  hasInternationalDirectProduct: boolean;
}

export interface GiftProductsServiceResponse {
  // 상품 목록
  products: CheckoutProductItem[];
  // 배송 정책 기준으로 그룹화 된 상품 그룹
  productGroupsByDeliveryPolicies: ProductGroupsByDeliveryPolicy[];
  // 와인 픽업 서비스
  isPickupOrder: boolean;
  // 증정품 목록
  giveawayProducts: CheckoutProductItem[];
  // 100원딜/럭키박스 상품 포함 여부
  isEventProducts: boolean;
  // 재사용포장재 구매 여부
  isReusablePackage: boolean;
  // 사용가능 쿠폰
  coupons: CheckoutCoupon[];
  // 가격
  price: CalculatedPrice;
  // 재사용포장재
  reusablePackage: ReusablePackage;
  // 바로구매 주문서 여부
  isDirectCheckout: boolean;
  // 예약 상품 포함 여부
  hasReservableProducts: boolean;
  // 컬리 물류 배송(1P, 3PL) 상품 포함 여부
  hasKurlyFulfillmentAndDeliveryProduct: boolean;
  // 무배송 상품 포함 여부
  hasNonDeliveryProduct: boolean;
  // 럭키박스 단건 주문 여부
  isLuckyBoxOrder: boolean;
  // 배송 메세지
  deliveryNotice: string;
  // 선물하기 주문서 여부
  isGiftOrder: boolean;
  // 함께구매 정보
  joinOrder: JoinOrderMeta | null;
  // 주문 타입
  checkoutType: CheckoutType;
  // 해외직배송 상품 구매 여부
  hasInternationalDirectProduct: boolean;
}

export interface AvailablePoint {
  // 적립금
  free: number;
  // 컬리캐시
  paid: number;
}

export interface CheckoutProductsResponse {
  // 상품 목록
  productGroups: ProductGroupAPIResponse[];
  // 증정품 목록
  giveawayProducts: CheckoutGiveProduct[];
  // 사용가능 쿠폰
  coupons: CheckoutCoupon[];
  // 권장소비자가를 반영한 총 상품 금액
  totalDisplayProductsPrice: number;
  // 권장소비자가를 반영한 총 상품 할인금액
  totalDisplayProductsDiscountPrice: number;
  // 컬리카드 이용 하였을 경우 적립되는 적립금
  totalKurlyCardAccruedPoint: number;
  // 예상 적립금
  totalAccruedPoint: number;
  // 총 결제 금액
  totalPaymentPrice: number;
  // 배송비
  deliveryPrice: number;
  // 배송비 할인 사유
  deliveryPriceDiscountReason: string;
  // 사용 가능한 재사용 포장재 옵션
  reusablePackageAvailability: {
    isPersonalBagAvailable: boolean;
    isKurlyPurpleBoxAvailable: boolean;
  };
  // 사용했던 재사용 포장재
  reusablePackagePreference: 'PAPER' | 'KURLY' | 'PERSONAL';
  // 바로구매로 주문서 진입 여부
  isDirectCheckout: boolean;
  // 컬리물류 배송 상품 여부(1P, 3PL)
  hasKurlyFulfillmentAndDeliveryProduct: boolean;
  // 컨티뉴이티 여부
  displayMessage: {
    deliveryNotice: {
      text: string;
      basicStyle: ContinuityMessageBasicStyle;
      replaceStyles: ContinuityMessageReplaceStyle[];
    };
  };
  // 개인정보 약관 동의 노출 정보와 판매자 정보
  personalInfoAgreement: {
    isVisibleThirdPartyAgree: boolean;
    terms?: TermsInfo[];
  };
  // 함께구매 주문 정보
  joinOrderMeta: JoinOrderMeta | null;
  // 사용가능 적립금/컬리캐시
  availablePoint: AvailablePoint;
  // 주문 타입
  checkoutType: CheckoutType;
  // 해외직배송 상품 구매 여부
  hasInternationalDirectProduct: boolean;
  // 배송 탬플릿
  receiverTemplate?: ReceiverDetailTemplate;
}

export interface PaymentMethodsRequest {
  // 실제 사용자가 결제하려는 가격 (상품 금액 합 - 상품 할인금액 합 - 쿠폰 할인금액 - 적립금 사용금액)
  paymentPrice: number;
  checkoutType?: CheckoutType;
}

// 간편결제 카드사 코드
export type CardCompanyIds =
  | '31' // 비씨
  | '11' // 국민
  | '21' // 하나
  | '51' // 삼성
  | '41' // 신한
  | '42' // 제주
  | '61' // 현대
  | '71' // 롯데
  | '36' // 씨티
  | '91' // NH농협
  | '34' // 수협
  | '33' // 우리
  | '46' // 광주
  | '35' // 전북
  | '4V' // 해외비자
  | '4M' // 해외마스터
  | '4J' // 해외 JCB
  | '37' // 우체국
  | '38' // MG 새마을금고
  | '62' // 신협
  | '39' // 저축은행
  | '30' // KDB 산업
  | '15' // 카카오뱅크
  | '3A' // 케이뱅크
  | 'P1' // 컬리카드
  | 'A'; // 전체

// 간편결제 은행/증권사 코드
export type BankCompanyIds =
  | '001' //한국은행
  | '002' //산업은행
  | '003' //기업은행
  | '004' //KB국민은행
  | '007' //수협은행
  | '008' //수출입은행
  | '011' //NH농협은행
  | '012' //지역농축협
  | '020' //우리은행
  | '023' //SC제일은행
  | '027' //한국씨티은행
  | '031' //대구은행
  | '032' //부산은행
  | '034' //광주은행
  | '035' //제주은행
  | '037' //전북은행
  | '039' //경남은행
  | '045' //새마을금고
  | '048' //신협
  | '050' //저축은행
  | '052' //모건스탠리은행
  | '054' //HSBC은행
  | '055' //도이치은행
  | '057' //제이피모간체이스은행
  | '058' //미즈호은행
  | '059' //엠유에프지은행
  | '060' //BOA은행
  | '061' //비엔피파리바은행
  | '062' //중국공상은행
  | '063' //중국은행
  | '064' //산림조합중앙회
  | '065' //대화은행
  | '066' //교통은행
  | '067' //중국건설은행
  | '071' //우체국
  | '076' //신용보증기금
  | '077' //기술보증기금
  | '081' //하나은행
  | '088' //신한은행
  | '089' //케이뱅크
  | '090' //카카오뱅크
  | '092' //토스혁신준비법인
  | '101' //한국신용정보원
  | '102' //대신저축은행
  | '103' //에스비아이저축은행
  | '104' //에이치케이저축은행
  | '105' //웰컴저축은행
  | '106' //신한저축은행
  | '209' //유안타증권
  | '218' //KB증권
  | '221' //상상인증권
  | '222' //한양증권
  | '223' //리딩투자증권
  | '224' //BNK투자증권
  | '225' //IBK투자증권
  | '227' //KTB투자증권
  | '238' //미래에셋대우
  | '240' //삼성증권
  | '243' //한국투자증권
  | '247' //NH투자증권
  | '261' //교보증권
  | '262' //하이투자증권
  | '263' //현대차증권
  | '264' //키움증권
  | '265' //이베스트투자증권
  | '266' //SK증권
  | '267' //대신증권
  | '269' //한화투자증권
  | '270' //하나금융투자
  | '271' //토스준비법인
  | '272' //NH선물
  | '278' //신한금융투자
  | '279' //DB금융투자
  | '280' //유진투자증권
  | '287' //메리츠증권
  | '288' //카카오페이증권
  | '290' //부국증권
  | '291' //신영증권
  | '292' //케이프투자증권
  | '293' //한국증권금융
  | '294' //한국포스증권
  | '295' //우리종합금융
  | '299'; //우리금융캐피탈

// 간편결제 카드 및 은행 코드
export type EasyPaymentCompanyId = CardCompanyIds | BankCompanyIds;

// 간편결제 결제 수단 종류
export const enum EasyPaymentType {
  CARD = 'card',
  BANK = 'bank',
  ADD_PLCC = 'add-plcc',
  ADD_KURLYPAY = 'add-kurlypay',
}

// 간편결제 카드 구분
export const enum EasyPaymentCardType {
  CREDIT_CARD = 'credit_card', // 신용카드
  CHECK_CARD = 'check_card', // 체크카드
}

// 컬리페이 결제수단 구분
export const enum KurlypayType {
  PLCC = 'kurlypay-plcc', // PLCC 카드
  CARD = 'kurlypay-card', // PLCC를 제외한 카드
  ACCOUNT = 'kurlypay-account', // 계좌
}

export const CARD_HOLDER_TYPE = {
  NOT_CARD: '',
  PERSONAL: 'personal',
  CORPORATE: 'corporate',
} as const;

// 카드 타입: 카드가 아닌 경우 "" | 개인 personal | 법인 corporate
export type CardHolderType = typeof CARD_HOLDER_TYPE[keyof typeof CARD_HOLDER_TYPE];
/**
 * normal: 일반 주문
 * gift_card: (환금성) 상품권
 * liquidity: (환금성) 금
 */
export const enum CheckoutType {
  NORMAL = 'normal',
  GIFT_CARD = 'gift_card',
  LIQUIDITY = 'liquidity',
}

// 신용카드 결제 toss-payments 한정
export interface CreditCardCompanies {
  // 신용카드사 코드
  companyId: CardVendorCode;
  // 카드사명
  companyName: string;
  // 기본 할부 가능 개월수
  defaultInstallmentMonths: number[];
  // 무이자할부 사용 가능 할부개월
  freeInterestInstallmentMonths: number[];
}

export interface CreditCardPoint {
  // 신용카드사 코드
  creditCardVendorCode: CardVendorCode;
  // 카드사명
  creditCardVendorName: string;
  // 포인트 사용 문구
  pointUseText: string;
  // 포인트 사용 가능 최소금액
  pointMinPayment: number;
}

// // 결제 수단 및 결제 이벤트 데이터
export interface PaymentMethod {
  // 결제수단코드
  // TODO: VendorCode 가 아닌 PaymentGatewayId 로 interface 명 수정.
  paymentGatewayId: VendorCode;
  // 결제수단명
  paymentGatewayName: string;
  // 이벤트 제목
  eventTitle: string;
  // 이벤트 내용
  eventDescriptions: string[];
  // 신용카드사 목록 및 할부 정보
  creditCards: CreditCardCompanies[];
}

export interface KurlypayEasyPaymentMethod {
  // 결제수단 ID
  paymentMethodId: string;
  // 결제 수단 종류
  paymentType: EasyPaymentType;
  // 결제 수단 기관 코드
  companyId: EasyPaymentCompanyId;
  // 결제 수단 기관 명
  companyName: string;
  // 결제 수단 정보
  maskingNo: string;
  // 카드 구분
  cardType: EasyPaymentCardType | null;
  // 간편 결제 무이자할부 개월
  freeInterestInstallmentMonths: number[];
  // 간편 결제 기본할부 개월
  defaultInstallmentMonths: number[];
  // 결제수단 이미지 URL
  imageUrl: string;
  // 환금성 상품 주문 시 컬리페이 결제수단 사용 가능 여부
  isDisabled: boolean;
  // 카드 타입: 카드가 아닌 경우 "" | 개인 personal | 법인 corporate
  cardHolderType: CardHolderType;
  // 마지막 결제 일시
  lastPaymentDateTime: string;
  // 결제수단 등록 일시
  registrationDateTime: string;
}

export interface KurlypayVendor
  extends Omit<KurlypayEasyPaymentMethod, 'freeInterestInstallmentMonths' | 'defaultInstallmentMonths' | 'companyId'> {
  companyId: EasyPaymentCompanyId | null;
  installments: { name: string; value: string }[];
}

// 간편결제 수단 목록, null일 경우 컬리페이 에러
export interface KurlypayEasyPayment {
  // 이벤트 제목
  eventTitle: string;
  // 이벤트 내용
  eventDescriptions: string[];
  // 사용 가능한 선할인 포인트
  // TODO OPTIONAL 여부 확인 필요
  plccDiscountPrice: number;
  // 결제 수단
  paymentMethods: KurlypayEasyPaymentMethod[] | null;
  // 현금영수증 등록 여부
  hasRegisteredCashReceipt: boolean;
  // 컬리페이 가입 여부
  isKurlypayMember: boolean;
}

export interface PaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
  kurlypayEasyPayment: KurlypayEasyPayment;
}

// 마지막으로 사용한 결제 수단
export interface PreferenceMethods {
  // 결제수단코드
  paymentGatewayId: VendorCode | '';
  // 신용카드사 코드
  creditCardCompanyId?: CardVendorCode;
  // 신용카드사 코드 (하위호환성 유지를 위한 파라미터)
  tossPaymentsCreditCardCompanyId?: CardVendorCode;
}

// 결제금액
export interface CalculatedPrice {
  // 총 상품 금액
  totalPrice: number;
  // 총 상품 할인금액
  discountPrice: number;
  // 예상 적립금
  expectedPoint: number;
  // 총 쿠폰 할인 금액
  couponDiscountPrice: number;
  // 결제금액
  paymentPrice: number;
  // 배송비
  deliveryPrice: number;
  // 배송비 무료 사유
  deliveryPriceDiscountReason?: string;
  // 카드할인 금액 (PLCC 할인)
  usedPlccPoint: number;
  // 컬리카드 사용할 경우 예상 적립금
  kurlycardAccruedPoint: number;
  // 결제시 사용되는 적립금
  usedFreePoint: number;
  // 결제시 사용되는 컬리캐시
  usedPaidPoint: number;
}

export interface CalculateServiceRequest {
  memberReserveRatio?: number;
  couponCode?: string | null;
  usedPoint?: number;
  paymentGateways?: OrderVendorCode;
  creditCardId: CardVendorCode | EasyPaymentCompanyId | null;
  deliveryPrice: number;
  usedPlccPoint: number;
  kurlypayPaymentMethodId: string | null;
}

export const CALCULATE_REQUEST_ORDER_TYPE = {
  NORMAL: 'NORMAL',
  JOIN: 'JOIN',
  GIFT: 'GIFT',
  PICKUP: 'PICKUP',
} as const;

export type CalculateRequestOrderType = keyof typeof CALCULATE_REQUEST_ORDER_TYPE;

export interface CalculateRequest {
  memberReserveRatio?: number;
  couponCode: string | null;
  usingFreePoint: number;
  plccDiscountPrice: number;
  paymentGatewayId: OrderVendorCode | null;
  creditCardId: CardVendorCode | EasyPaymentCompanyId | null;
  deliveryPrice: number;
  type: CalculateRequestOrderType;
  kurlypayPaymentMethodId: string | null;
}

export interface CalculateResponse {
  totalDealProductsPrice: number;
  totalDealProductsDiscountPrice: number;
  totalDisplayProductsPrice: number;
  totalDisplayProductsDiscountPrice: number;
  totalCardInstantDiscountPrice: number;
  totalKurlyCardAccruedPoint: number;
  totalAccruedPoint: number;
  totalCouponDiscountPrice: number;
  totalPaymentPrice: number;
  deliveryPrice: number;
  usedPoint: {
    free: number;
    paid: number;
  };
}

// 컨티뉴이티 상품 검증에 사용하는 PageType Property
// 추후 더 추가 예정
export enum PageType {
  PLACE_ORDER = 'PLACE_ORDER', // 주문서에서 결제 페이지로 넘어갈 때 사용
}

// 컨티뉴이티 상품 검증
export interface CheckContinuityRequest extends CheckReAddAvailableRequest {
  pageType: PageType;
}

export interface ReorderProduct {
  dealProductNo: number;
  dealProductName: string;
  available: boolean;
  isLegacyPromotion: boolean;
  isSale: boolean;
  isSoldOut: boolean;
  isGiveaway: boolean;
  normalOrderTypePolicyInContents: NormalOrderTypePolicyType;
  quantity: number;
}

export type AvailableProduct = ReorderProduct;
export type UnavailableProduct = ReorderProduct;

export interface ContinuityResponse {
  displayMessage: {
    deliveryNotice: {
      text: string;
      subText: string;
      basicStyle: {
        color: string;
        bold: boolean;
      };
      replaceStyles: {
        text: string;
        color: string;
        bold: boolean;
      }[];
    };
  };
}

export interface InterestFreeResponse {
  interestFreeCards: InterestFreeItem[];
}

export interface InterestFreeItem {
  name: string;
  interestBenefits: string[];
}

export type JoinOrderType = 'CREATED' | 'JOINED';
export const JOIN_ORDER_TYPE: Record<JoinOrderType, JoinOrderType> = {
  CREATED: 'CREATED',
  JOINED: 'JOINED',
};
export interface JoinOrderMeta {
  isChanged: boolean;
  type: JoinOrderType;
  eventStartDate: string;
  eventEndDate: string;
  requiredPeopleCount: number;
  joinedPeopleCount: number;
}

export interface OrderTypeInformation {
  checkoutType: CheckoutType;
  isGiftOrder?: boolean;
  userGrade: Grade;
  isSubscribed: boolean;
  isJoinOrder?: boolean;
}

export interface PersonalCustomsCodeResponse {
  personalCustomsCode: string | null;
}
