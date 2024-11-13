export const TossPaymentsConfig = {
  LGD_WINDOW_TYPE_PC: 'iframe',
  LGD_WINDOW_TYPE_MW: 'submit',
  LGD_WINDOW_VERSION: '2.5',
  LGD_VERSION: 'PHP_NonActiveX_Mobile_CardApp',
  LGD_PAYWINDOWTYPE_PC: 'CardBillingAuth',
  LGD_PAYWINDOWTYPE_MW: 'CardBillingAuth_smartphone',
  LGD_VERSION_KURLY_PASS_PC: 'PHP_Non-ActiveX_CardBilling',
  LGD_VERSION_KURLY_PASS_MW: 'PHP_SmartXPay_CardBilling',
};

export const COMMON_SUCCESS_CODE = ['0000'];

export const TOSS_PATMENTS_CODE = {
  CANCEL: ['S053', '9999'],
};

export const TOSS_CODE = {
  CANCEL: ['PAY_COMPLETE'],
  SUCCESS: ['PAY_APPROVED'],
};

export const NAVER_PAY_CODE = {
  CANCEL: ['UserCancel'],
  SUCCESS: ['Success'],
};

export const PAYCO_CODE = {
  CANCEL: ['2222'],
  SUCCESS: ['0'],
};

export const PHONEBILL_CODE = {
  CANCEL: ['CANCEL'],
};

/** 컬리페이 결제 취소 코드
 * - QWXX : 결제 비밀번호 입력 창 왼쪽 상단의 x 버튼 클릭 시
 * - QW32 : 결제 비밀번호 오류 5회 초과 시
 * - QW37 : 컬리페이 간편결제 중 비밀번호 PIN 재설정 시
 */
export const KURLYPAY_CODE = {
  CANCEL: ['QWXX', 'QW32', 'QW37'],
};
