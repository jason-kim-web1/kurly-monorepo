import { JoinOrderType, ReusablePackageType } from '.';
import { PickupRequest, ReceiverForm, ReceiverInfo } from '../../order/checkout/shared/interfaces';
import { OrderVendorCode, PaymentsVendorCode } from '../../order/shared/shared/interfaces/OrderVendorCode.interface';
import { DeliveryCompleteMessage, FrontDoorMethod, ReceivePlace } from '../enums';
import { TermsPolicy } from '../../order/shared/shared/constants/terms';
import { CheckoutCoupon, EasyPaymentCompanyId, EasyPaymentType } from './Checkout';
import { ReusablePackage } from './ReusablePackage';
import { NotificationType, RecipientInfo } from '../../order/gift/shared/interfaces/ReceiverForm.interface';
import { CardVendorCode } from '../constant';
import { Installment } from '../../order/shared/shared/interfaces';
import { CartDeliveryType } from '../../order/cart/constants/CartDeliveryType';

export type PaymentAllResult = string;

// 약관
export type TermsType = 'M01' | 'M02' | 'M03' | 'M04' | 'M05' | 'M06' | 'N01' | 'UNKNOWN';

export interface TermsPolicyList extends TermsPolicy {
  // 동의 여부
  agreed: boolean;
}

export interface TermsAgreements {
  // 약관 코드
  termsCode: TermsType;
  // 동의 여부
  agreed: boolean;
}

export interface CallbackUrl {
  // 함께구매 여부
  isJoinOrder: boolean;
  // 선택 된 결제 수단
  selectedVendorCode: OrderVendorCode;
}

// 컬리 어플리케이션 종류
export const enum ApplicationType {
  MOBILE_APP = 'MOBILE_APP',
  MOBILE_WEB = 'MOBILE_WEB',
  DESKTOP_WEB = 'DESKTOP_WEB',
}

// 컬리 플랫폼 종류
export const enum Platform {
  DESKTOP = 'DESKTOP',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

// 함께구매 모집 상태
export type JoinOrderStatus = 'OPENED' | 'COMPLETED';
export const JOIN_ORDER_STATUS: Record<JoinOrderStatus, JoinOrderStatus> = {
  OPENED: 'OPENED',
  COMPLETED: 'COMPLETED',
};

// 주문 접수 - 받는 분 정보 파라미터
export interface PlaceOrderReceiverFormRequest {
  // 수령자 이름
  receiverName: string;
  // 수령자 핸드폰 번호
  receiverPhoneNumber: string;
  // 수령지 주소 (도로명주소)
  address: string;
  // 수령지 세부주소
  addressDetail: string;
  // 샛별배송인 경우 수령장소 정보 | (택배배송인 경우) null
  pickupType?: ReceivePlace | null;
  // 수령장소 세부사항
  pickupDetail: string;
  // 샛별배송인 경우 공동현관 출입방법 | (택배배송인 경우) null
  accessMethod?: FrontDoorMethod | null;
  // 공동현관출입방법 세부사항
  accessDetail: string;
  // 샛별배송의 배송완료 알림 수신요청 시각
  // AM7: 7시, AM8: 8시, IMMEDIATELY: 배송즉시 | (택배배송인 경우) null
  deliveryMessageTimeType: DeliveryCompleteMessage | null;
}

// 주문 접수 - 유저 에이전트 정보
export interface UserAgentParameter {
  // 컬리 어플리케이션 종류
  applicationType: 'MOBILE_APP' | 'MOBILE_WEB' | 'DESKTOP_WEB';
  // 사용자 기기 환경
  platform: Platform;
  appVersion: string | null;
}

// 선택 된 신용카드
type CreditCardType = { name: string; value: CardVendorCode };

// 선택 된 신용카드 할부
type InstallmentType = { name: string; value: string };

// 선택한 결제수단이 toss-payments 인 경우
export interface TossPaymentsParameter {
  lgdRespcode?: string;
  cstPlatform?: string;
  lgdCustomProcesstype?: string;
  cstMid?: string;
  lgdMid?: string;
  lgdOid?: string;
  lgdAmount?: string;
  lgdTaxfreeamount?: string;
  lgdBuyer?: string;
  lgdProductinfo?: string;
  lgdCardtype?: string;
  lgdInstall?: string;
  lgdNoint?: string;
  lgdReturnurl?: string;
  lgdHashdata?: string;
  lgdWindowType?: string;
  lgdSelfCustom?: string;
  lgdVersion?: string;
  lgdDomainUrl?: string;
  lgdTimestamp?: string;
  lgdCancelurl?: string;
  lgdKvpmispautoappyn?: string;
  lgdKvpmispwapurl?: string;
  lgdKvpmispcancelurl?: string;
  lgdMertname?: string;
  lgdDiscountflag?: string;
  lgdDiscountcardcode?: string;
  lgdDiscountamount?: string;
  lgdApiDcno?: string;
  lgdRespCode?: string;
  lgdRespMsg?: string;
  lgdBillKey?: string;
  lgdFinanceName?: string;
  authType?: string;
  pointUse?: string;
  installment?: string;
  noInt?: string;
  cardCode?: string;
  sessionKey?: string;
  encData?: string;
  pan?: string;
  eci?: string;
  cavv?: string;
  xid?: string;
  joinCode?: string;
}

// 컬리페이 간편 결제
export interface KurlypayEasyPaymentParameter {
  // 결제 수단
  paymentType: EasyPaymentType;
  // 결제 수단 ID
  paymentMethodId: string;
  // 카드 포인트 사용여부
  useCardPoint: boolean;
  // 컬리페이 무인증 결제에 사용
  deviceId: string;
}

// 주문 시작 API Service Params - 공통
export interface CommonPlaceOrderServiceRequest {
  // 선택 된 결제 수단
  selectedVendorCode: OrderVendorCode;
}

// 주문 시작 API Service Params - 주문서
export interface PlaceOrderServiceRequest extends CommonPlaceOrderServiceRequest {
  // (공통) 배송 정보
  receiverForm: ReceiverForm;
  // (회원) 쿠폰 코드
  selectedCoupon?: CheckoutCoupon;
  // (회원) 사용 적립금
  usedPoint: number;
  // 선택 된 신용카드 할부
  selectedInstallment?: InstallmentType;
  // 선택 된 신용카드
  selectedCreditCard?: CreditCardType;
  // 컬리페이 카드 포인트 사용 여부
  selectedCardPoint?: boolean;
  // 재사용 포장재 옵션
  reusablePackage: ReusablePackage;
  // 와인 정보
  pickup: PickupRequest | null;
  // 컬리페이 간편결제 - 결제 수단
  kurlypayPaymentType?: EasyPaymentType;
  // 컬리페이 간편결제 - 결제 수단 ID
  kurlypayPaymentMethodId?: string;
  // 컬리페이 간편결제 선택 된 신용카드 할부
  kurlypayInstallment?: Installment;
  // 컬리페이 간편결제 선택 된 신용카드
  kurlypayCreditCard?: EasyPaymentCompanyId | null;
  // plcc 할인금액
  plccDiscountPrice?: number;
  // 함께구매 주문서 여부
  isJoinOrder: boolean;
  // 컬리페이 무인증 결제에 사용
  deviceId: string;
  // 개인통관고유부호
  personalCustomsCode: string;
}

// 주문 시작 API Service Params - 선물하기
export interface GiftPlaceOrderServiceRequest extends CommonPlaceOrderServiceRequest {
  // 주문자 정보
  receiverInfo: ReceiverInfo;
  // (회원) 쿠폰 코드
  selectedCoupon?: CheckoutCoupon;
  // (회원) 사용 적립금
  usedPoint: number;
  // 선택 된 신용카드 할부
  selectedInstallment?: InstallmentType;
  // 선택 된 신용카드
  selectedCreditCard?: CreditCardType;
  // 컬리페이 카드 포인트 사용 여부
  selectedCardPoint?: boolean;
  // 선물 알림 타입
  notificationType: NotificationType;
  // 선물 수신자 정보
  recipientInfo: RecipientInfo;
  // 컬리페이 간편결제 - 결제 수단
  kurlypayPaymentType?: EasyPaymentType;
  // 컬리페이 간편결제 - 결제 수단 ID
  kurlypayPaymentMethodId?: string;
  // 컬리페이 간편결제 선택 된 신용카드 할부
  kurlypayInstallment?: Installment;
  // 컬리페이 간편결제 선택 된 신용카드
  kurlypayCreditCard?: EasyPaymentCompanyId | null;
  // plcc 할인금액
  plccDiscountPrice?: number;
  // 컬리페이 무인증 결제에 사용
  deviceId: string;
  // 개인통관고유부호
  personalCustomsCode: string;
}

// 주문 시작 API Request - Common
export interface CommonPlaceOrderRequest {
  // 선택한 결제수단
  // 전액 적립금 결제일 경우 kurly
  paymentGatewayId?: OrderVendorCode;
  // 선택한 결제수단이 toss-payments | kurlypay-credit | kurlypay 인 경우 부가적으로 전달해야하는 파라미터
  // (toss-payments가 아닌 경우) null
  creditCardParameter?: {
    // 신용카드사 ID
    creditCardId: CardVendorCode | EasyPaymentCompanyId;
    // 할부개월수
    installmentPlan: number;
  } | null;
  // 결제 성공시 PG 가 리다이렉션할 컬리몰의 URL
  paymentSuccessRedirectUrl?: string;
  // 결제 실패시 PG 사가 리다이렉션할 컬리몰의 URL
  paymentFailRedirectUrl?: string;
  // 사용자가 도중에 결제 취소시 PG 가 리다이렉션할 컬리몰의 URL
  paymentCancelRedirectUrl?: string;
  // 약관 동의 정보
  termsAgreements: TermsAgreements[];
  // 주문하는 고객의 환경 정보
  userAgent: UserAgentParameter;
}

// 주문 시작 API Request - 주문서
export interface PlaceOrderRequest extends CommonPlaceOrderRequest, PlaceOrderReceiverFormRequest {
  // 쿠폰 코드 | (없다면) null
  couponCode: string | null;
  // 사용 적립금 | (없다면) 0
  usingFreePoint: number;
  // PERSONAL: 개인 보냉백, KURLY: 컬리 퍼플박스, PAPER: 종이 포장재
  packingType: ReusablePackageType | null;
  // 선택한 와인 정보
  pickup: Array<PickupRequest> | null;
  // 컬리페이 간편결제
  kurlypayEasyPaymentParameter?: KurlypayEasyPaymentParameter;
  // plcc 할인금액
  plccDiscountPrice?: number;
  // 개인통관고유부호
  personalCustomsCode: string;
}

// 주문 시작 API Request - 선물하기
export interface GiftPlaceOrderRequest extends CommonPlaceOrderRequest {
  // 주문자명
  ordererName: string;
  // 주문자 이메일
  ordererEmail: string;
  // 주문자 핸드폰 번호
  ordererPhoneNumber: string;
  // (회원) 쿠폰 코드
  selectedCoupon?: CheckoutCoupon;
  // (회원) 사용 적립금
  usedPoint: number;
  // 선택 된 신용카드 할부
  selectedInstallment?: InstallmentType;
  // 선택 된 신용카드
  selectedCreditCard?: CreditCardType;
  // 사용 적립금 | (없다면) 0
  usingFreePoint: number;
  // 쿠폰 코드 | (없다면) null
  couponCode: string | null;
  // 선물 알림 타입
  notificationType: NotificationType;
  // 선물 수신자명
  recipientName: string;
  // 선물 수신자 전화번호
  recipientMobile: string;
  // 선물 메시지
  message: string;
  // 컬리페이 간편결제
  kurlypayEasyPaymentParameter?: KurlypayEasyPaymentParameter;
  // plcc 할인금액
  plccDiscountPrice?: number;
  // 개인통관고유부호
  personalCustomsCode: string;
}

// 주문 시작 API Response - 주문서, 선물하기, 함께구매
export interface PlaceOrderResponse {
  // 대표 주문 번호
  groupOrderNo: string;
  // 결제수단이 토스페이먼츠인 경우 결제 시작에 사용하는 파라미터
  paymentAuthParameter: {
    paymentGatewayToken: string | null;
    paymentGatewayTransactionId: string | null;
    tossPaymentsParameter: TossPaymentsParameter | null;
  };
  paymentUrlParameter: {
    // 모바일 앱에서 사용하는 PG 사 리다이렉션 URL
    nextRedirectAppUrl: string | null;
    // 데스크탑 앱에서 사용하는 PG 사 리다이렉션 URL
    nextRedirectPcUrl: string | null;
    // 모바일 웹에서 사용하는 PG 사 리다이렉션 URL
    nextRedirectMobileUrl: string | null;
    // PG 사 앱을 통한 결제에 사용할 안드로이드 딥링크
    androidAppScheme: string | null;
    // PG 사 앱을 통한 결제에 사용할 iOS 딥링크
    iosAppScheme: string | null;
  };
  kurlypayEasyPaymentUrlParameter: {
    // 컬리페이 간편결제 리다이렉션 URL
    requestUrl: string | null;
  };
}

// loadOrder, getOrderParams Props
export interface LoadOrderProps {
  // 주문서 페이지에서 결제하기 버튼 클릭 시 주문 시작 API Response
  placeOrderResponse: PlaceOrderResponse;
  // 선택 된 결제 수단
  selectedVendorCode: PaymentsVendorCode;
  // 주문서 or 선물하기 여부
  isGiftOrder?: boolean;
  // 함께구매 여부
  isJoinOrder?: boolean;
}

type FailedOrderType = 'NORMAL' | 'JOIN' | 'GIFT';

export const FailedOrder: Record<FailedOrderType, FailedOrderType> = {
  NORMAL: 'NORMAL',
  JOIN: 'JOIN',
  GIFT: 'GIFT',
};

interface DealProductResponse {
  // 딜 번호
  dealProductNo: number;
  // 컨텐츠 번호
  contentsProductNo: number;
  // 수량
  quantity: number;
}

// 주문 실패 페이지에서 사용하는 주문정보 API Response - 주문서, 선물하기, 함께구매
export interface FailedOrderResponse {
  // 대표주문번호
  groupOrderNo: number;
  // 주문 타입
  orderType: FailedOrderType;
  // 바로구매 여부
  isDirectOrder: boolean;
  // 상품 목록
  dealProducts: DealProductResponse[];
}

// 주문 완료 API에 필요한 params
interface PaymentGateway {
  // PaymentGateway params
  paymentGatewayAuthNo?: string;
  paymentGatewayAuthToken?: string;
  paymentGatewayToken?: string;
  paymentGatewayTransactionId?: string;
  // 토스페이먼츠 전용 params
  tossPaymentsParameter?: {
    authType: string;
    pointUse: string;
    installment: string;
    noInt: string;
    ispDetails: {
      cardCode: string;
      sessionKey: string;
      encData: string;
    };
    safeClickDetails: {
      pan: string;
      eci: string;
      cavv: string;
      xid: string;
      joinCode: string;
    };
  };
  kurlypayParameter?: {
    signData: string;
  };
}

// Post 방식 PG Process Page Props - 주문서
export interface PostProcessPageProps extends PaymentGateway {
  accessToken: string;
  paymentAllResult: PaymentAllResult;
  paymentGatewayResult: string;
  paymentGatewayMessage?: string;
}

// Post 방식 PG Process Page Props - 토스페이먼츠 (주문서)
export interface TossPaymentsPostProcessPageProps {
  // PG 결과
  accessToken?: string;
  paymentAllResult: PaymentAllResult;
  paymentGatewayResult: string;
  tossPaymentsParameter: TossPaymentsParameter;
  // 주문서 or 선물하기
  isGiftOrder?: boolean;
  // 함께구매 여부
  isJoinOrder?: boolean;
}

// 주문 완료 checkPaymentGatewayResult Props
export interface CheckPaymentGatewayResultProps {
  // 선택 된 결제 수단
  selectedVendorCode: OrderVendorCode;
  // PG 결과
  paymentGatewayResult?: string;
  // PG 결과 추가 메세지
  paymentGatewayMessage?: string;
}

// 주문 완료 checkPaymentGatewayResult return type
export type PaymentGatewayStatus = 'success' | 'cancel' | 'fail';

// 주문 완료 checkTossPaymentsResult Props
export interface CheckTossPaymentsResultProps {
  // 대표 주문 번호
  groupOrderNo: string;
  // 선택 된 결제 수단
  selectedVendorCode: 'toss-payments';
  // PG 결과
  paymentGatewayResult: string;
  // 토스페이먼츠 전용 params
  tossPaymentsParameter: TossPaymentsParameter;
  // 주문서 or 선물하기 여부
  isGiftOrder?: boolean;
  // 함께구매 여부
  isJoinOrder?: boolean;
}

// 주문 완료 completeOrder Props
export interface CompleteOrderProps extends PaymentGateway, CheckPaymentGatewayResultProps {
  paymentAllResult?: PaymentAllResult;
  // 대표 주문 번호
  groupOrderNo: string;
  // 주문서 or 선물하기 여부
  isGiftOrder?: boolean;
  // 함께구매 여부
  isJoinOrder?: boolean;
}

// 주문 완료 API Request - 주문서
export interface PaymentCompleteRequest extends PaymentGateway {
  // 대표 주문 번호
  groupOrderNo: string;
  // PaymentGateway params
  paymentGatewayAuthNo: string;
  paymentGatewayAuthToken: string;
  paymentGatewayToken: string;
  paymentGatewayTransactionId: string;
}

// 앰플리튜드를 위한 주문 상품 정보
export interface PaymentCompletedDealProducts {
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  masterProductCode: string;
  quantity: number;
  retailPrice: number;
  productPrice: number;
  discountPrice: number;
  deliveryPolicy: CartDeliveryType; // TODO: 데이터 들어오면 확인 필요 [] 인지 string 인지
}

export interface DisplayMessage {
  deliveryNotice: {
    text: string;
    basicStyle: {
      color: string;
      bold: boolean;
      backgroundColor: string;
    };
    replaceStyles: [
      {
        text: string;
        color: string;
        bold: boolean;
      },
    ];
    subText: string;
  };
}

// 주문 완료 API Response - 주문서
export interface PaymentCompleteResponse {
  // 대표 주문 번호
  groupOrderNo: number;
  // 주문자명
  ordererName: string;
  // 주소
  address: string;
  // 상세주소
  addressDetail: string;
  // 주문자 회원 등급
  ordererMemberGroup: number;
  // 예상 적립률
  ordererPointRatio: number;
  // 회원등급명
  ordererMemberGroupName: string;
  // 첫 구매여부
  isFirstPurchased: boolean;
  // 총 결제금액
  totalPaymentPrice: number;
  // 총 발생 예정 적립금
  totalAccruedPoint: number;
  // 포장 방식
  packingType: ReusablePackageType;
  // (빈 배열로 들어오는 데이터)
  dealProducts: [];
  // 앰플리튜드를 위한 주문 상품 정보
  orderDealProducts: PaymentCompletedDealProducts[];
  // PG ID
  paymentGatewayId: string;
  // 배송비
  deliveryPrice: number;
  // 쿠폰 할인가
  totalCouponDiscountPrice: number;
  // 적립금 사용금액
  totalUsedPoint: number;
  // 쿠폰코드
  couponCode: number | null;
  // 쿠폰이름
  couponName: string | null;
  // 배송 도착 안내 예정 문구
  displayMessages: DisplayMessage[];
  // 선물하기 - 메세지 타입
  notificationType?: NotificationType;
  // 선물하기 - 받으실 분 이름
  recipientName?: string;
  // 선물하기 - 주문 날짜
  orderedDate?: string;
  // 선물하기 - 수락 만료 날짜
  availableDate?: string;
  // 선물하기 - 수신자용 주문 번호
  externalGroupOrderNo?: string;
  // 외부 멤버쉽 연동
  memberships: MemberShipList;
  // PLCC 가입 여부
  isKurlypayPlccMember: boolean;
  // 배송 상품(1P, 3P, 3PL) 여부
  isDeliveryOrder: boolean;
  //함께구매 정보
  joinOrderMeta: JoinOrderCompleteResponse | null;
}

// 함께구매 정보
export interface JoinOrderCompleteResponse {
  code: string;
  type: JoinOrderType;
  status: JoinOrderStatus;
  joinOrderShareLink: string;
  requiredPeopleCount: number;
  joinedPeopleCount: number;
}

// 주문 실패 failOrderWithSetMessage Props
export interface FailOrderWithSetMessage {
  // 대표 주문 번호
  groupOrderNo: string;
  paymentAllResult?: PaymentAllResult;
  // PG 결과 추가 메세지
  paymentGatewayMessage?: string;
  // 선물하기 or 주문서 여부
  isGiftOrder?: boolean;
  // 결제 실패 페이지에서 결제 실패 메세지를 보여줘야 하는지 여부를 정합니다.
  showPGFailMessage?: boolean;
}

// 결제 시도 중 이탈 Request
export interface PaymentCancelRequest {
  groupOrderNo: string;
}

// 주문 API Error Response - 주문서
export interface PaymentErrorResponse {
  code: string;
  message: string;
  success: boolean;
}

// 배송 도착 안내 예정 문구 타입
export type DeliveryNoticeMessageType = 'SOON' | 'TOMORROW' | 'TOMORROW_MORNING' | 'DAY_AFTER_TOMORROW';

// 주문 완료 결과
export interface PaymentsResult {
  // 주문자명
  name: string;
  // 주소
  address: string;
  // 상세 주소
  addressDetail: string;
  // 실패 시 메시지
  reason: string | null;
  // (임시) 0: 성공, 1: 실패
  resultCode: number;
  // 첫 구매 여부
  isFirstOrder: boolean;
  // 최종 결제 금액
  totalPrice: number;
  // 최종 적립예정 금액
  expectedPoint: number;
  // 회원 적립률 퍼센트(api 호출로 할지는 확인 해봐야)
  benefitPercent: number;
  // 재사용포장재 띠배너 노출 여부
  isViewPackage?: boolean;
  // 사용한 재사용포장재 타입
  reusablePackageType: ReusablePackageType;
  // 배송 도착 안내 예정 문구
  displayMessages: DisplayMessage[];
  // PG ID
  paymentGatewayId: PaymentsVendorCode;
  // 배송비
  deliveryPrice: number;
  // 쿠폰 할인가
  totalCouponDiscountPrice: number;
  // 적립금 사용금액
  totalUsedPoint: number;
  // 쿠폰코드
  couponCode: number | null;
  // 쿠폰이름
  couponName: string | null;
  // 주문한 상품들
  orderDealProducts: PaymentCompletedDealProducts[];
  // 선물하기 주문서 여부
  isGiftPurchase: boolean;
  // 선물하기 메세지 전송 타입
  notificationType: NotificationType;
  // 선물 수신자 이름
  recipientName: string;
  // 선물 주문 일자
  orderedDate: string;
  // 선물 수락 가능 일자
  availableDate: string;
  // 선물 수신자 주문 번호
  externalGroupOrderNo: string;
  // 외부 멤버쉽 연동
  memberships: MemberShipList;
  // PLCC 가입 여부
  isKurlypayPlccMember: boolean;
  // 배송 상품 (1P, 3P, 3PL) 여부
  isDeliveryOrder: boolean;
  // 함께구매 정보
  joinOrderMeta: JoinOrderCompleteResponse | null;
}

export type MemberShipList = MemberShipItem[];
export interface MemberShipItem {
  code: string;
  status: 'AGREE' | 'EXPIRED' | 'DISAGREE';
  containsAllBrands: boolean;
}
