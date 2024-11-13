import { UaEventOptions } from 'react-ga4/types/ga4';

import { PaymentErrorResponse, PaymentCompleteResponse } from '../interfaces';

export type InformationChangeControl = 'WVC1000' | 'WVC1001' | 'WVC1002';
export type WebviewControl = 'WVC2000' | 'WVC2001';
export type ShareAction = 'WVA1000' | 'WVA1001';
export type PopupAction = 'WVA2000';
export type ImageAction = 'WVA3000';
export type OrderCancelAction = 'WVA4000' | 'WVA4001';
export type AddressSearchAction = 'WVA5000';
export type VerificationAction = 'WV3300';
export type SignupAction = 'WV3000' | 'WV3001';
export type MypageAction = 'WV3100' | 'WV7000' | 'WV3200';
export type RestockedNotificationAction = 'WVA6000';
export type CommonAction = 'WV1001';

export type CustomerCenterDialog = 'WVD1000' | 'WVD1001' | 'WVD1002';

export type WebViewReInjectTokenFromApp = 'WV1000';

export type ActionCode =
  | ShareAction
  | PopupAction
  | ImageAction
  | OrderCancelAction
  | AddressSearchAction
  | VerificationAction
  | SignupAction
  | MypageAction
  | CommonAction
  | WebViewReInjectTokenFromApp;

export type DialogCode = CustomerCenterDialog;

export type ButtonType = 'none' | 'back' | 'close';

export const BUTTON_TYPE: Record<ButtonType, ButtonType> = {
  none: 'none',
  close: 'close',
  back: 'back',
};

export const INFORMATION_CODE: Record<string, InformationChangeControl> = {
  TITLE: 'WVC1000',
  RETURN: 'WVC1001',
};

export const WEBVIEW_CODE: Record<string, WebviewControl> = {
  OPEN: 'WVC2000',
  CLOSE: 'WVC2001',
};

export type OrderStatus =
  | 'PM200'
  | 'PM220'
  | 'PM420'
  | 'PM250'
  | 'PM400'
  | 'PM430'
  | 'PM433'
  | 'PM435'
  | 'PM440'
  | 'PM450';

export const ORDER_SUCCESS = 'PM200';
// (선물하기) 컬리 API orderId 가져오기 성공
export const ORDER_PROCESS_SUCCESS = 'PM220';
export const ORDER_PROCESS = 'PM250';
// (주문서, 선물하기) 결제 실패
export const ORDER_FAIL = 'PM400';
// (선물하기) 컬리 API orderId 가져오기 실패
export const ORDER_PROCESS_FAIL = 'PM420';
// (선물하기) 주문/결제 정보 변경, 서버 에러
export const ORDER_CHANGED_FAIL = 'PM430';
// (주문서) 잘못된 접근
export const ORDER_WRONG_ACCESS = 'PM433';
// (주문서) PG 스크립트 로딩 에러
export const ORDER_SCRIPT_LOADING_FAIL = 'PM435';
// (주문서) 서버 에러
export const ORDER_SERVICE_FAIL = 'PM430';
// (주문서) 토큰 만료
export const ORDER_TOKEN_EXPIRED = 'PM440';
// (주문서, 선물하기) 사용자 결제 취소
export const ORDER_CANCEL = 'PM450';

export const TOAST_CODE = {
  SUCCESS: 'WVT1000' as InformationChangeControl,
  FAILURE: 'WVT1001' as InformationChangeControl,
};

export interface ActionProps {
  code: ActionCode;
  message?: string;
  data?: any;
  product_no?: string;
  url?: string;
  image_urls?: string[];
  current_image_index?: number;
  is_success?: boolean;
}

export interface AddressActionProps {
  code: 'WVA5000';
  base_address_type: 'R' | 'J';
  zipcode: string;
  address: string;
  road_zonecode: string;
  road_address: string;
}

export interface DialogProps {
  code?: DialogCode;
  title?: string;
  message?: string;
  cancel_button_title?: string;
  cancel_button_action_callback?: string;
  ok_button_title?: string;
  ok_button_action_url?: string;
  ok_button_action_callback?: string;
  ok_button_is_preferred?: boolean;
}

export interface WebviewProps {
  code: WebviewControl | InformationChangeControl;
  title?: string;
  url?: string;
  is_modal?: boolean;
  is_popup?: boolean;
  callback_function?: string;
}

export interface ToastProps {
  type: 'success' | 'failure';
  title: string;
  subtitle?: string;
}

export interface OpenWebviewProps {
  url: string;
  title?: string;
  is_modal?: boolean;
  is_popup?: boolean;
}

export interface OpenWebViewPopupProps {
  url: string;
  callback_function?: string;
}
export interface CloseWebviewProps {
  callback_function?: string;
  refresh?: boolean;
}

export interface PostGiftResultProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message?: any;
  orderNumber?: string;
  status: OrderStatus;
}

export interface PostCheckoutResultProps {
  code: OrderStatus;
  data: Omit<PaymentCompleteResponse, 'memberships'> | null;
  error: PaymentErrorResponse | null;
  message: string | null;
}

export interface RestockedNotificationActionProps {
  code: RestockedNotificationAction;
  dealProductName: string;
  dealProductNo: number;
  contentsProductNo: number;
}
export interface PostOrderProps {
  orderNumber: string;
}

export interface PostOrderSuccessProps {
  orderNumber: string;
  amount: number;
}

export interface AnalyticsSendGAEventProps {
  optionsOrName: UaEventOptions | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

export interface SetNavigationButtonProps {
  buttonType: ButtonType;
  callback_function?: string;
}

export interface SetCopyTextProps {
  text: string;
  callback_function: string;
}

export interface RemoveTokenProps {
  logoutCause: 'LogoutButton' | 'PasswordChange' | 'Etc';
  logoutReason:
    | 'Api401TokenRemove'
    | 'Api422RequireLogin'
    | 'Api401HeaderNullGuestTokenAccessTokenNull'
    | 'Api401TokenExpireGuestTokenAccessTokenNull';
}

export interface SendNewTokenProps {
  token: string;
}
