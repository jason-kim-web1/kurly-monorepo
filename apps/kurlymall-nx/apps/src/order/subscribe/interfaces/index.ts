export interface SubscribeResultParams {
  isChangePayment?: boolean;
  productCode: string;
  orderNo: string;
  couponPackId?: string;
}

export const PAYMENT_RESULT = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

export interface SubscribeResponse {
  nextSettlementDate: string;
  amount: number;
}

export interface SuccessResultResponse extends Pick<SubscribeResponse, 'nextSettlementDate'> {
  amount?: number;
}

export type DeviceType = 'mobile-web' | 'mobile-app' | 'desktop';

export const DEVICE_TYPE: Record<DeviceType, DeviceType> = {
  'mobile-web': 'mobile-web',
  'mobile-app': 'mobile-app',
  desktop: 'desktop',
};

export interface CallbackResult {
  result?: string;
  orderNo?: string;
  modifyPayMethodYn?: string;
  merchantMemberId?: string;
  productCd?: string;
  productNm?: string;
  createdAt?: string;
  errorCd?: string;
  errorMsg?: string;
}

export interface MobileInProgressProps extends InProgressProps {
  accessToken?: string;
}

export interface InProgressProps {
  result: string;
  errorMessage: string;
  productCode: string;
  orderNo: string;
  errorCode: string;
}
export interface PageProcessResult {
  couponPackId?: string;
  isAddKurlpayMethod: boolean;
  isChangePayment?: string;
  isQuickSubscribe?: string;
  result: string;
  orderNo: string;
  productCd: string;
  errorMsg: string;
  errorCd: string;
}

export interface PaymentUrlParams {
  productCode: string;
  os: DeviceType;
  returnUrl: string;
  paymentMethodType: PaymentType;
  paymentMethodId?: string | null;
  isChangePayment?: boolean;
}

export interface RequestPaymentUrl {
  productCode: string;
  os: DeviceType;
  returnUrl: string;
  paymentMethodType: PaymentType;
  paymentMethodId?: string;
}

export type PaymentType = typeof PAYMENT_TYPE[keyof typeof PAYMENT_TYPE];

export const PAYMENT_TYPE = {
  KURLY_PAY: 'kurly-pay',
  NAVER_PAY: 'naver-pay',
  CREDIT: 'credit',
} as const;

export type MethodType = 'GET' | 'POST';

export const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
} as const;
export interface PaymentUrlResponse {
  url: string;
  paymentType: PaymentType;
  method: MethodType;
}

export interface PostPaymentUrl {
  paymentUrl: string;
  paymentType: PaymentType;
  isPostRequest: boolean;
}

export interface NavigationButton {
  showPrevButton?: boolean;
  showNextButton?: boolean;
}
export interface SlideNavigationButtonProps {
  navigationButton?: NavigationButton;
  handleClickPrevButton: () => void;
  handleClickNextButton: () => void;
}

export interface RequestSubscribeParam {
  errorMessage: string;
  productCode: string;
  orderNo: string;
  couponPackId?: string;
  isChangePayment: boolean;
  isQuickSubscribe: boolean;
  errorCode: string;
}

export interface PaymentResult {
  paymentResult: string | null;
  requestSubscribeParams: RequestSubscribeParam;
}
