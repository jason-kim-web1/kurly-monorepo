import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { head, isUndefined, sortBy } from 'lodash';

import { KurlypayEasyPaymentMethod, KurlypayVendor, PaymentMethodsRequest } from '../../../../shared/interfaces';
import { notify } from '../../../../shared/reducers/page';
import { AppThunk, RootState } from '../../../../shared/store';

import {
  CreditCard,
  Installment,
  OrderVendorCode,
  PaymentEvents,
  PaymentVendor,
  VendorCodes,
  VendorCodeWithDeleted,
} from '../../../shared/shared/interfaces';
import {
  formattedPaymentVendors,
  isCreditCardPayments,
  isKurlycard,
  isKurlycardCoupon,
  isKurlypayVendor,
} from '../../../shared/shared/services';
import { findVendor } from '../utils';
import { checkoutError } from './checkoutErrors';
import { recalculatePrice } from './checkout.slice';

import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import { CardVenderCode, CardVendorCode } from '../../../../shared/constant';
import { getInstantPointMessage } from '../utils/getInstantPointMessage';
import {
  validateAvailablePLCCPoint,
  validateCouponCalculate,
  validateProductPrice,
  validateWithCoupon,
} from '../utils/validatePLCCPoint';
import { notifyCouponMessage } from './checkout-coupon.slice';
import { isNotEmpty, isNotNull } from '../../../../shared/utils/lodash-extends';
import { ReturnMainError } from '../../../../shared/errors';
import { readPaymentMethods } from '../../../../shared/api';
import { Grade } from '../../../../shared/enums';
import findKurlypayVendor from '../utils/findKurlypayVendor';

export interface CheckoutPaymentState {
  // 결제수단
  vendors: PaymentVendor[];
  // 사용 불가 결제수단
  disableVendorCodes: VendorCodeWithDeleted[];
  // 신용카드 목록
  creditCards: CreditCard[];
  // 신용카드 할부 목록
  installments: {
    [x: string]: Installment[];
  };
  // 신용카드 무이자 할부 목록
  freeInterestInstallments: Installment[];
  // 결제수단 혜택
  event: PaymentEvents;
  // 간편 결제수단 목록
  simplePaymentVendors: PaymentVendor[];
  // 선택된 할부
  selectedInstallment?: { name: string; value: string };
  // 선택된 신용카드
  selectedCreditCard?: CreditCard;
  // 선택된 결제수단
  selectedVendor?: PaymentVendor;
  // 이전 결제수단 check 유무
  isPreferencePayment: boolean;

  // 컬리페이
  kurlypayVendors: KurlypayVendor[];
  // 사용가능 PLCC 포인트
  plccDiscountPrice: number;
  // 선택 된 컬리페이 결제수단 신용카드의 할부
  kurlypayInstallment: Installment;
  // PLCC Point 사용여부
  selectedPlccPoint: boolean;
  // 선택 된 컬리페이 결제수단
  selectedKurlypayVendor?: KurlypayVendor;
  // 카드 포인트 사용 여부 (현대카드)
  selectedCardPoint: boolean;
  // PLCC 결제수단 포함 여부
  isPLCCExisted: boolean;
  // 현금 영수증 등록 여부
  hasRegisteredCashReceipt: boolean;
  // 컬리페이 에러 상태 여부
  hasKurlypayError?: boolean;
  // 컬리페이 가입 여부
  isKurlypayMember: boolean;
  // 배너를 통한 멤버스 가입시 전송할 기본 Id
  defaultPaymentMethodId: string | null;
}

export type PaymentVendorsPayload = Pick<
  CheckoutPaymentState,
  | 'vendors'
  | 'disableVendorCodes'
  | 'event'
  | 'creditCards'
  | 'installments'
  | 'freeInterestInstallments'
  | 'simplePaymentVendors'
  | 'kurlypayVendors'
  | 'plccDiscountPrice'
  | 'isPLCCExisted'
  | 'hasRegisteredCashReceipt'
  | 'hasKurlypayError'
  | 'isKurlypayMember'
>;

export const initialState: CheckoutPaymentState = {
  vendors: [],
  disableVendorCodes: [],
  creditCards: [],
  installments: {},
  freeInterestInstallments: [],
  event: {},
  simplePaymentVendors: [],
  selectedInstallment: undefined,
  selectedCreditCard: undefined,
  selectedVendor: undefined,
  isPreferencePayment: true,

  // 컬리페이
  kurlypayVendors: [],
  plccDiscountPrice: 0,
  kurlypayInstallment: { name: '일시불', value: '0' },
  selectedPlccPoint: false,
  selectedKurlypayVendor: undefined,
  selectedCardPoint: false,
  isPLCCExisted: false,
  hasRegisteredCashReceipt: false,
  hasKurlypayError: false,
  isKurlypayMember: false,
  defaultPaymentMethodId: null,
};

const { actions, reducer } = createSlice({
  name: 'checkout-payment',
  initialState,
  reducers: {
    resetCheckoutPaymentState: () => ({ ...initialState }),
    setPaymentVendors: (state, { payload }: PayloadAction<PaymentVendorsPayload>) => {
      state.vendors = payload.vendors;
      state.disableVendorCodes = payload.disableVendorCodes;
      state.event = payload.event;
      state.creditCards = payload.creditCards;
      state.installments = payload.installments;
      state.freeInterestInstallments = payload.freeInterestInstallments;
      state.simplePaymentVendors = payload.simplePaymentVendors;
      state.kurlypayVendors = payload.kurlypayVendors;
      state.plccDiscountPrice = payload.plccDiscountPrice;
      state.hasRegisteredCashReceipt = payload.hasRegisteredCashReceipt;
      state.isPLCCExisted = payload.isPLCCExisted;
      state.hasKurlypayError = payload.hasKurlypayError;
      state.isKurlypayMember = payload.isKurlypayMember;
    },
    setSelectedVendor: (state, { payload: selectedVendor }: PayloadAction<PaymentVendor | undefined>) => {
      state.selectedVendor = selectedVendor;
    },
    setDefaultPaymentMethodId: (state, { payload }: { payload: string | null }) => {
      state.defaultPaymentMethodId = payload;
    },
    setSelectedCreditCard: (state, { payload: selectedCreditCard }: PayloadAction<CreditCard>) => {
      state.selectedCreditCard = selectedCreditCard;
    },
    setSelectedInstallment: (state, { payload: selectedInstallment }: PayloadAction<Installment>) => {
      state.selectedInstallment = selectedInstallment;
    },
    setKurlypayCardInstallment: (state, { payload: kurlypayInstallment }: PayloadAction<Installment>) => {
      state.kurlypayInstallment = kurlypayInstallment;
    },
    setSelectedKurlypayVendor: (
      state,
      { payload: selectedKurlypayVendor }: PayloadAction<KurlypayVendor | undefined>,
    ) => {
      state.selectedKurlypayVendor = selectedKurlypayVendor;
    },
    togglePreferencePaymentMethods: (state) => {
      state.isPreferencePayment = !state.isPreferencePayment;
    },
    toggleUsedPlccPoint: (state) => {
      state.selectedPlccPoint = !state.selectedPlccPoint;
    },
    toggleUsedCardPoint: (state) => {
      state.selectedCardPoint = !state.selectedCardPoint;
    },
  },
});

export const {
  resetCheckoutPaymentState,
  setPaymentVendors,
  setSelectedVendor,
  setDefaultPaymentMethodId,
  setSelectedCreditCard,
  setSelectedInstallment,
  setKurlypayCardInstallment,
  setSelectedKurlypayVendor,
  togglePreferencePaymentMethods,
  toggleUsedPlccPoint,
  toggleUsedCardPoint,
} = actions;

export const availablePLCCPointSelector = createDraftSafeSelector(
  [
    ({ checkout }: RootState) => checkout.products,
    ({ checkout }: RootState) => checkout.joinOrder,
    ({ checkoutPayment }: RootState) => checkoutPayment.plccDiscountPrice,
  ],
  (products, joinOrder, plccDiscountPrice) =>
    validateAvailablePLCCPoint({ products, isJoinOrder: isNotNull(joinOrder), plccDiscountPrice }),
);

// 멤버스 가입 유도 배너를 통해 가입시 전송할 기본 paymentMethodId
export const membersBannerPaymentMethodId =
  ({
    defaultKurlypayVendors,
    isKurlypayMember,
  }: {
    defaultKurlypayVendors: KurlypayEasyPaymentMethod[] | null;
    isKurlypayMember: boolean;
  }): AppThunk =>
  async (dispatch) => {
    if (isNotEmpty(defaultKurlypayVendors) && isKurlypayMember) {
      const hasPaymentKurlypay = defaultKurlypayVendors?.some(({ lastPaymentDateTime }) => lastPaymentDateTime !== '');

      const sortedVendors = hasPaymentKurlypay
        ? sortBy(defaultKurlypayVendors, ['lastPaymentDateTime']).reverse()
        : sortBy(defaultKurlypayVendors, ['registrationDateTime']).reverse();

      dispatch(setDefaultPaymentMethodId(sortedVendors[0].paymentMethodId));
      return;
    }

    dispatch(setDefaultPaymentMethodId(null));
  };

export const loadCheckoutPaymentMethods = (): AppThunk => async (dispatch, getState) => {
  const {
    checkout: {
      price: { paymentPrice },
      checkoutType,
      isGiftCardOrder,
      isGiftOrder,
      joinOrder,
    },
    checkoutPayment: { selectedKurlypayVendor },
    member,
  } = getState();

  const orderTypeInformation = {
    checkoutType,
    isGiftOrder,
    userGrade: member.info?.grade ?? Grade.Normal,
    isSubscribed: member.subscription.isSubscribed,
    isJoinOrder: !!joinOrder,
  };

  try {
    const params: PaymentMethodsRequest = { paymentPrice, checkoutType };
    const { paymentMethods, kurlypayEasyPayment } = await readPaymentMethods(params);
    const data = formattedPaymentVendors(paymentMethods, kurlypayEasyPayment, orderTypeInformation);

    if (data.hasKurlypayError && isGiftCardOrder) {
      throw new ReturnMainError('현재 컬리 상품권 주문이 불가능 합니다.\n잠시 후 다시 이용해주세요.');
    }

    const { defaultKurlypayVendors, isKurlypayMember } = data;

    dispatch(setPaymentVendors(data));

    dispatch(membersBannerPaymentMethodId({ defaultKurlypayVendors, isKurlypayMember }));

    if (isUndefined(selectedKurlypayVendor)) {
      const kurlypayVendor = findKurlypayVendor({ vendors: data.kurlypayVendors });
      dispatch(setSelectedKurlypayVendor(kurlypayVendor));
    }
  } catch (err) {
    dispatch(checkoutError(err as AxiosError));
  }
};

/**
 * 즉시할인을 사용 및 해제하고, recalculate 를 진행합니다.
 *
 * recalculate 의 조건은 P1 + @ 입니다.
 * 해당 기본 액션을 thunk에서 검증하여 실행하게 됩니다.
 *
 * 검증시 메시지 띄우기 등은 따로 구현하고, 해당 thunk는 검증과 변경 및 계산만 진행합니다.
 */
const updateInstantPoint = (): AppThunk => async (dispatch, getState) => {
  const { products } = getState().checkout;
  const { selectedCoupon } = getState().checkoutCoupon;
  const { plccDiscountPrice, selectedVendor, selectedKurlypayVendor } = getState().checkoutPayment;

  // 선택한 벤더가 컬리페이 인지
  if (!isKurlypayVendor(selectedVendor)) {
    return;
  }

  // 선택한 컬리페이 벤더가 컬리 카드인지
  if (!isKurlycard({ companyId: selectedKurlypayVendor?.companyId })) {
    return;
  }

  // 최소 금액 검증
  const validatePrice = validateProductPrice({ plccDiscountPrice, products });
  if (!validatePrice) {
    return;
  }

  // 쿠폰검증
  const validateCoupon = validateWithCoupon({
    coupon: selectedCoupon,
  });
  if (!validateCoupon) {
    return;
  }

  // 금액검증
  const validatePlccCaluclate = validateCouponCalculate({
    plccDiscountPrice,
    products,
    coupon: selectedCoupon,
  });
  if (!validatePlccCaluclate) {
    return;
  }

  dispatch(toggleUsedPlccPoint());
  dispatch(recalculatePrice());
};

// vendor 가 변경됐을때 즉시할인에 대한 액션
const changeKurlypayVendor =
  ({ vendor, couponVendor }: { vendor: PaymentVendor; couponVendor?: PaymentVendor }): AppThunk =>
  async (dispatch, getState) => {
    const { checkout, checkoutCoupon, checkoutPayment } = getState();
    const { products } = checkout;
    const { selectedCoupon } = checkoutCoupon;
    const { selectedPlccPoint, plccDiscountPrice } = checkoutPayment;

    const validatePlccCaluclate = validateCouponCalculate({
      plccDiscountPrice,
      products,
      coupon: selectedCoupon,
    });

    // 즉시할인 체크 된 상태에서 vendor를 변경 하였다면
    if (selectedPlccPoint) {
      dispatch(updateInstantPoint());

      // 쿠폰을 사용할 수 있는 결제수단으로 바뀐다면 즉시할인 해제 메시지만 보여줌
      if (!couponVendor || vendor.code === couponVendor.code) {
        const message = '3만원 즉시할인 혜택이 해제 되었습니다.';
        if (isWebview()) {
          appService.postToast({
            type: 'failure',
            title: message,
          });
        } else {
          setTimeout(() => {
            dispatch(notify(message));
          }, 0);
        }
      }
    } else if (!isKurlycardCoupon(selectedCoupon) && validatePlccCaluclate) {
      // 컬리페이 카드 이지만 즉시할인 미사용이라면 즉시할인 사용 체크
      // 페이지 초기 진입시 kurlypay일 경우에도 사용
      // 최소금액, 컬리카드 중복사용 안되는 쿠폰 (PLCC coupon) 검증
      dispatch(setSelectedVendor(vendor));
      dispatch(updateInstantPoint());
    }
  };

export const selectVendor =
  (code: OrderVendorCode | ''): AppThunk =>
  async (dispatch, getState) => {
    const { checkoutPayment, checkoutCoupon } = getState();

    const { selectedCoupon } = checkoutCoupon;
    const { selectedVendor, vendors } = checkoutPayment;

    const vendor = findVendor(vendors, code);
    const couponVendor = findVendor(vendors, selectedCoupon?.paymentGateways[0]);

    if (!vendor) {
      return;
    }

    // 컬리페이를 선택 하거나, 선택을 해제하는 경우
    if ((isKurlypayVendor(selectedVendor) || isKurlypayVendor(vendor)) && selectedVendor?.code !== vendor.code) {
      dispatch(
        changeKurlypayVendor({
          vendor,
          couponVendor,
        }),
      );
    }

    dispatch(setSelectedVendor(vendor));
    dispatch(notifyCouponMessage());
  };

export const selectSimplePay = (): AppThunk => async (dispatch, getState) => {
  const { checkoutPayment } = getState();
  const { simplePaymentVendors, selectedVendor } = checkoutPayment;

  const vendor: PaymentVendor | undefined = head(simplePaymentVendors);
  if (!vendor) {
    return;
  }

  if (selectedVendor && simplePaymentVendors.some(({ code }) => code === selectedVendor?.code)) {
    return;
  }

  dispatch(selectVendor(vendor.code));
};

export const selectKurlyPay =
  (kurlypayCard?: KurlypayVendor): AppThunk =>
  async (dispatch, getState) => {
    const {
      checkout: { isGiftCardOrder, isUsePaidPoint },
      checkoutCoupon: { selectedCoupon },
      checkoutPayment: { vendors, selectedVendor, selectedPlccPoint, selectedKurlypayVendor },
    } = getState();

    if (selectedVendor?.code !== 'kurlypay') {
      const kurlypay = findVendor(vendors, 'kurlypay');
      dispatch(setSelectedVendor(kurlypay));
    }

    // 선택한 카드가 P1 (컬리페이 카드) 가 아닌경우 즉시할인 해제
    // 해제 후 벤더 변경해야함
    if (selectedPlccPoint && !isKurlycard({ companyId: kurlypayCard?.companyId })) {
      dispatch(updateInstantPoint());
    }

    dispatch(setSelectedKurlypayVendor(kurlypayCard));

    if (kurlypayCard?.companyId !== selectedKurlypayVendor?.companyId) {
      dispatch(setKurlypayCardInstallment({ name: '일시불', value: '0' }));
    }

    // 선택한 카드가 P1 라면 즉시할인 체크
    // p1 쿠폰 사용중엔 적용 하지 않음
    if (!selectedPlccPoint && !isKurlycardCoupon(selectedCoupon) && !isUsePaidPoint) {
      dispatch(updateInstantPoint());
    }

    const { selectedVendor: updateSelectedVendor, selectedPlccPoint: updatePlccPoint } = getState().checkoutPayment;

    // 선택한 쿠폰이 없거나, 쿠폰 검증은 통과했고
    // PLCC 사용여부가 변경되었을 경우 메시지
    if (
      !selectedCoupon ||
      !isGiftCardOrder ||
      selectedCoupon.creditCardId === kurlypayCard?.companyId ||
      validateWithCoupon({
        paymentVendor: updateSelectedVendor,
        kurlypayVendor: kurlypayCard,
        coupon: selectedCoupon,
      })
    ) {
      if (selectedPlccPoint && !updatePlccPoint) {
        const message = '3만원 즉시할인 혜택이 해제 되었습니다.';
        if (isWebview()) {
          appService.postToast({
            type: 'failure',
            title: message,
          });
          return;
        }
        setTimeout(() => {
          dispatch(notify(message));
        }, 0);
      }
      return;
    }
  };

export const selectCreditCard =
  (creditCard: CreditCard): AppThunk =>
  (dispatch, getState) => {
    const { checkoutPayment } = getState();

    const { selectedCreditCard } = checkoutPayment;

    if (selectedCreditCard?.value === creditCard.value) {
      return;
    }

    dispatch(setSelectedCreditCard(creditCard));
    dispatch(setSelectedInstallment({ name: '일시불', value: '0' }));
    dispatch(notifyCouponMessage());
  };

export const selectPreviousVendor =
  ({ paymentGatewayId, companyId }: { paymentGatewayId: OrderVendorCode | ''; companyId?: CardVendorCode }): AppThunk =>
  (dispatch, getState) => {
    const { checkoutPayment } = getState();
    const { creditCards, kurlypayVendors } = checkoutPayment;

    dispatch(selectVendor(paymentGatewayId));

    if (isCreditCardPayments(paymentGatewayId) && companyId) {
      const creditCard = creditCards.find((it) => it.value === companyId);

      if (!creditCard) {
        return;
      }

      dispatch(setSelectedCreditCard(creditCard));
      dispatch(setSelectedInstallment({ name: '일시불', value: '0' }));

      return;
    }

    /**
     * TODO
     *
     * 이전 결제수단이 컬리페이 간편결제 일 때 현재는 companyId 가 빈 문자열 입니다.
     * 추후에 서버측에서 정의가 되면 컬리페이 간편결제를 선택해야 합니다.
     * 현재는 간편결제 수단 중 첫 번쨰 결제수단을 선택하는 정책을 유지합니다.
     *
     * see: "https://marketkurly.slack.com/archives/C04BCB2A4RH/p1678601175436669?thread_ts=1678595547.755659&cid=C04BCB2A4RH"
     */
    if (paymentGatewayId === VendorCodes.KURLYPAY) {
      const kurlypayCard = findKurlypayVendor({ vendors: kurlypayVendors });

      if (!kurlypayCard) {
        dispatch(selectVendor(VendorCodes.NAVER_PAY));

        return;
      }

      dispatch(setSelectedKurlypayVendor(kurlypayCard));

      return;
    }
  };

// (컬리패스 주문서) 결제 수단 자동 선택 처리
export const updateKurlyPassVendor = (): AppThunk => (dispatch, getState) => {
  const { checkoutPayment } = getState();
  const { vendors } = checkoutPayment;

  try {
    const creditCard = findVendor(vendors, 'kurlypay-credit') ?? {
      code: 'kurlypay-credit',
      hasEvent: false,
      isSimplePay: false,
      name: '신용카드',
    };

    dispatch(setSelectedVendor(creditCard));
  } catch (err) {
    dispatch(notify((err as Error).message));
  }
};

// PLCC 즉시할인 선택
export const selectCardInstantPoint = (): AppThunk => (dispatch, getState) => {
  const {
    checkout: { products },
    checkoutPayment: { selectedPlccPoint, plccDiscountPrice, kurlypayVendors },
    checkoutCoupon: { selectedCoupon },
  } = getState();

  // 즉시 할인을 적용하기 위해 선택하는 경우
  if (!selectedPlccPoint) {
    const message = getInstantPointMessage({
      products,
      coupon: selectedCoupon,
      plccDiscountPrice,
    });

    if (message) {
      if (isWebview()) {
        appService.postToast({
          type: 'failure',
          title: message,
        });
        return;
      }
      dispatch(notify(message));
      return;
    }

    // Kurlypay 선택 및 PLCC 혹은 lottie로 컬리페이 플레이트 이동
    const lottieOrPLCC = kurlypayVendors.find((vendor) => vendor.companyId === CardVenderCode.KURLYPAY_CARD);
    dispatch(selectKurlyPay(lottieOrPLCC ?? kurlypayVendors[0]));
    dispatch(selectVendor(VendorCodes.KURLYPAY));
    return;
  }

  // 즉시할인 상태 변경 후 계산 요청
  dispatch(updateInstantPoint());
};

export default reducer;
