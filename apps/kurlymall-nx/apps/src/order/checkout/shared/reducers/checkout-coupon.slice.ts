import { PayloadAction, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

import { batch } from 'react-redux';

import { head, isEmpty, last } from 'lodash';

import { CARD_HOLDER_TYPE, CheckoutCoupon, CheckoutType, EasyPaymentType } from '../../../../shared/interfaces';
import { AppThunk, RootState } from '../../../../shared/store';
import { recalculatePrice } from './checkout.slice';
import { getInstantPointMessage } from '../utils/getInstantPointMessage';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import { notify } from '../../../../shared/reducers/page';
import { getCouponMessage } from '../../../shared/shared/utils';
import { findVendor } from '../utils';
import {
  selectKurlyPay,
  setSelectedCreditCard,
  setSelectedInstallment,
  setSelectedVendor,
} from './checkout-payment.slice';
import { isCreditCardPayments } from '../../../shared/shared/services';
import { CardVenderCode, PaymentVenderName } from '../../../../shared/constant';
import { isNotNull } from '../../../../shared/utils/lodash-extends';
import { findCouponVendor } from '../utils/validation/findCouponVendor';
import { findPaymentVendor } from '../utils/validation/findPaymentVendor';
import usableCouponWithPayment from '../utils/validation/usableCouponWithPayment';
import { PaymentVendor } from '../../../shared/shared/interfaces';

export interface CheckoutCouponState {
  coupons: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
}

export const initialState: CheckoutCouponState = {
  coupons: [],
  selectedCoupon: undefined,
};

const { actions, reducer } = createSlice({
  name: 'checkout-coupon',
  initialState,
  reducers: {
    resetCouponState: () => ({ ...initialState }),
    setCoupons: (state, { payload: coupons }: PayloadAction<CheckoutCoupon[]>) => {
      state.coupons = coupons;
    },
    setSelectedCoupon: (state, { payload: selectedCoupon }: PayloadAction<CheckoutCoupon | undefined>) => {
      state.selectedCoupon = selectedCoupon;
    },
  },
});

export const { resetCouponState, setSelectedCoupon, setCoupons } = actions;

/**
 * 쿠폰을 사용할 수 없는 상태를 정의합니다.
 * 쿠폰은 이벤트 상품 구매 시, 픽업 주문, 컬리패스 주문, 상품권 주문, 함께구매 주문, 쿠폰이 없을 때 disable 됩니다.
 */
export const disabledCoupon = createDraftSafeSelector(
  [
    ({ checkout }: RootState) => checkout.isEventProducts,
    ({ checkout }: RootState) => checkout.isPickupOrder,
    ({ checkout }: RootState) => checkout.isGiftCardOrder,
    ({ checkout }: RootState) => checkout.joinOrder,
    ({ checkout }: RootState) => checkout.checkoutType,
    ({ checkoutCoupon }: RootState) => checkoutCoupon.coupons,
  ],
  (isEventProducts, isPickupOrder, isGiftCardOrder, joinOrder, checkoutType, coupons) => {
    return (
      isEventProducts ||
      isPickupOrder ||
      isGiftCardOrder ||
      checkoutType === CheckoutType.LIQUIDITY ||
      isEmpty(coupons) ||
      isNotNull(joinOrder)
    );
  },
);

export const isEqualCouponAndVendor = (): AppThunk<boolean> => (_, getState) => {
  const {
    checkoutCoupon: { selectedCoupon },
    checkoutPayment: {
      vendors,
      creditCards,
      kurlypayVendors,
      selectedVendor,
      selectedCreditCard,
      selectedKurlypayVendor,
    },
  } = getState();

  const couponVendor = findCouponVendor({ selectedCoupon, vendors, creditCards, kurlypayVendors });
  const paymentVendor = findPaymentVendor({
    selectedVendor,
    selectedKurlypayVendor,
    selectedCreditCard,
    vendors,
    creditCards,
  });

  if (!couponVendor || !paymentVendor) {
    return false;
  }

  return usableCouponWithPayment({ coupon: couponVendor, vendor: paymentVendor });
};

export const notifyCouponMessage = (): AppThunk => async (dispatch, getState) => {
  const {
    checkoutCoupon: { selectedCoupon },
    checkoutPayment: { vendors, creditCards, kurlypayVendors },
  } = getState();
  if (!selectedCoupon || selectedCoupon.paymentGateways[0] === 'ALL') {
    return;
  }

  if (dispatch(isEqualCouponAndVendor())) {
    return;
  }

  const message = getCouponMessage({
    vendors,
    creditCards,
    coupon: selectedCoupon,
    kurlypayVendors,
  });

  if (message) {
    setTimeout(() => {
      dispatch(notify(message));
    }, 0);
  }
};

const selectCreditCardByCoupon =
  (coupon: CheckoutCoupon, vendor: PaymentVendor): AppThunk =>
  (dispatch, getState) => {
    const {
      checkoutPayment: { creditCards, kurlypayVendors },
    } = getState();

    const kurlypayCreditCard = kurlypayVendors
      .filter(
        ({ isDisabled, paymentType, cardHolderType }) =>
          !isDisabled &&
          ![EasyPaymentType.BANK, EasyPaymentType.ADD_PLCC].includes(paymentType) &&
          cardHolderType === CARD_HOLDER_TYPE.PERSONAL,
      )
      .find(({ companyId }) => companyId === coupon.creditCardId);

    const onlyPLCC = kurlypayVendors
      .filter(({ paymentType }) => paymentType !== EasyPaymentType.ADD_PLCC)
      .find(
        ({ companyId, cardHolderType }) =>
          companyId === CardVenderCode.KURLYPAY_CARD && cardHolderType === CARD_HOLDER_TYPE.PERSONAL,
      );
    const creditCard = creditCards.find(({ value }) => value === coupon.creditCardId);

    // 쿠폰이 BC 카드 전용 쿠폰이고, PLCC 카드(개인)가 있을 경우 이를 선택합니다.
    if (coupon.creditCardId === CardVenderCode.BC_CARD && onlyPLCC) {
      dispatch(selectKurlyPay(onlyPLCC));
      return;
    }

    // 없다면 컬리페이 결제수단 중 선택합니다.
    if (kurlypayCreditCard) {
      dispatch(selectKurlyPay(kurlypayCreditCard));
      return;
    }

    // 이마저도 없다면 BC 쿠폰을 포함한 다른 쿠폰은 일반 신용카드 결제수단에서 찾습니다.
    if (creditCard) {
      batch(() => {
        dispatch(setSelectedVendor(vendor));
        dispatch(setSelectedCreditCard(creditCard));
        dispatch(setSelectedInstallment({ name: '일시불', value: '0' }));
      });
    }
    return;
  };

const selectKurlypayByCoupon =
  (coupon: CheckoutCoupon): AppThunk =>
  (dispatch, getState) => {
    const {
      checkoutPayment: { kurlypayVendors },
    } = getState();

    const kurlypayCards = kurlypayVendors.filter(
      ({ paymentType, isDisabled, cardHolderType }) =>
        !isDisabled &&
        cardHolderType === CARD_HOLDER_TYPE.PERSONAL &&
        ![EasyPaymentType.BANK, EasyPaymentType.ADD_PLCC].includes(paymentType),
    );
    const kurlypayCreditCard = kurlypayCards.find(({ companyId }) => companyId === coupon.creditCardId);

    const plccOrLottie = kurlypayVendors.find(({ companyId }) => companyId === CardVenderCode.KURLYPAY_CARD);
    const firstKurlypayCreditCard = head(kurlypayCards);
    const kurlypayAddCard = last(kurlypayVendors);

    // 컬리페이-PLCC or 컬리페이-BC 카드 전용 쿠폰이면
    if (
      (coupon.creditCardId === CardVenderCode.KURLYPAY_CARD || coupon.creditCardId === CardVenderCode.BC_CARD) &&
      plccOrLottie
    ) {
      // PLCC 카드가 법인 카드인 경우 고스트카드 플레이트로 이동
      if (plccOrLottie.cardHolderType === CARD_HOLDER_TYPE.CORPORATE) {
        dispatch(selectKurlyPay(kurlypayAddCard));
        return;
      }
      // PLCC 카드 선택 or PLCC 로띠 선택
      dispatch(selectKurlyPay(plccOrLottie));
      return;
    }

    // 컬리페이-전체카드사 전용 쿠폰이면
    if (coupon.creditCardId === CardVenderCode.ALL_CARD) {
      // 등록되어 있는 컬리페이 결제수단 중 첫 번째 신용카드를 선택. 없으면 고스트 카드 선택
      dispatch(selectKurlyPay(firstKurlypayCreditCard ?? kurlypayAddCard));
      return;
    }

    // 그 외에 컬리페이-신용카드 전용 쿠폰은 카드 찾아서 사용
    if (kurlypayCreditCard) {
      dispatch(selectKurlyPay(kurlypayCreditCard));
      return;
    }

    // 없으면 컬리페이추가 카드
    dispatch(selectKurlyPay(kurlypayAddCard));
    return;
  };

// (회원) 특정 결제수단 전용 쿠폰 선택 시 결제수단 변경
export const selectPaymentsByCoupon =
  (coupon?: CheckoutCoupon): AppThunk =>
  async (dispatch, getState) => {
    const {
      checkoutPayment: { vendors, disableVendorCodes },
    } = getState();

    if (!coupon || coupon?.paymentGateways[0] === 'ALL') {
      return;
    }

    const couponPaymentsGateways = coupon.paymentGateways[0];
    const vendor = findVendor(vendors, couponPaymentsGateways);

    if (!vendor || disableVendorCodes.includes(couponPaymentsGateways)) {
      return;
    }

    // 일반 신용카드 전용 쿠폰 일 때
    if (isCreditCardPayments(couponPaymentsGateways)) {
      dispatch(selectCreditCardByCoupon(coupon, vendor));
      return;
    }

    // 컬리카드 전용 쿠폰이면
    if (couponPaymentsGateways === PaymentVenderName.KURLYPAY) {
      dispatch(selectKurlypayByCoupon(coupon));
      return;
    }

    // 그 외 결제수단 일 때
    dispatch(setSelectedVendor(vendor));
  };

// (회원) 쿠폰 선택
export const selectCoupon =
  (coupon?: CheckoutCoupon): AppThunk =>
  async (dispatch, getState) => {
    const {
      checkout: { products },
      checkoutPayment: { selectedPlccPoint, plccDiscountPrice },
    } = getState();

    // 쿠폰과 즉시할인 관계 검증
    if (selectedPlccPoint) {
      const message = getInstantPointMessage({
        products,
        coupon,
        plccDiscountPrice,
        selectedPlccPoint,
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
    }

    dispatch(setSelectedCoupon(coupon));

    // 즉시할인 선택 안되어져 있을때만 coupon 메시지 검증 (즉시할인이 우선)
    if (!selectedPlccPoint) {
      dispatch(selectPaymentsByCoupon(coupon));
    }

    dispatch(recalculatePrice());
  };

export default reducer;
