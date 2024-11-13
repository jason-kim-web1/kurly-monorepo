import { createSlice } from '@reduxjs/toolkit';

import { PAYMENT_TYPE, PaymentType } from '../interfaces';
import { KurlyMembersCouponPackCodeType, KurlypayType } from '../interfaces/KurlyMembersProduct.interface';
import { EasyPaymentCompanyId } from '../../../shared/interfaces';
import { PaymentTermsId } from '../constants';

export interface SelectedCouponPackState {
  couponPackId: number;
  couponPackCode: KurlyMembersCouponPackCodeType;
}
export interface SubscribeCheckoutState {
  isPaymentLoading: boolean;
  isChangePayment?: boolean;
  paymentMethodType: PaymentType;
  paymentMethodId: string | null;
  paymentKurlypayType: KurlypayType | null;
  paymentKurlypayCompanyCode: EasyPaymentCompanyId | null;
  selectedCouponPack: SelectedCouponPackState | null;
  terms: { [key in PaymentTermsId]: boolean };
}

export const initialState: SubscribeCheckoutState = {
  // 결제 진행 중 상태
  isPaymentLoading: false,
  // 결제수단 변경 주문서 여부
  isChangePayment: undefined,
  // 선택된 결제수단
  paymentMethodType: PAYMENT_TYPE.KURLY_PAY,
  // 컬리페이 결제 ID
  paymentMethodId: null,
  // 컬리페이 결제 수단 타입 (card, bank)
  paymentKurlypayType: null,
  // 컬리페이 결제 아이디
  paymentKurlypayCompanyCode: null,
  // 선택된 쿠폰팩
  selectedCouponPack: null,
  // 약관 동의 여부
  terms: {
    termsPersonalAgreed: false,
    termsPaymentAgreed: false,
    termsAgreed: false,
    marketingAgreed: false,
  },
};

const { actions, reducer } = createSlice({
  name: 'subscribeCheckout',
  initialState,
  reducers: {
    initSubscribeCheckout: () => ({
      ...initialState,
    }),

    setPaymentLoading(state, { payload }: { payload: boolean }) {
      state.isPaymentLoading = payload;
    },

    setChangePayment(state, { payload }: { payload: boolean }) {
      state.isChangePayment = payload;
    },

    setPaymentMethodType(state, { payload }: { payload: PaymentType }) {
      state.paymentMethodType = payload;
    },

    setPaymentMethodId(state, { payload }: { payload: string | null }) {
      state.paymentMethodId = payload;
    },
    setPaymentKurlypayType(state, { payload }: { payload: KurlypayType | null }) {
      state.paymentKurlypayType = payload;
    },
    setPaymentKurlypayCompanyCode(state, { payload }: { payload: EasyPaymentCompanyId | null }) {
      state.paymentKurlypayCompanyCode = payload;
    },
    setSelectedCouponPack(state, { payload }: { payload: SelectedCouponPackState }) {
      state.selectedCouponPack = payload;
    },
    setChangeTermsState(
      state,
      { payload }: { payload: { state: boolean; id: PaymentTermsId } | { state: boolean; id: PaymentTermsId }[] },
    ) {
      if (payload instanceof Array) {
        payload.forEach((item) => {
          state.terms[item.id] = item.state;
        });
      } else {
        state.terms[payload.id] = payload.state;
      }
    },
  },
});

export const {
  initSubscribeCheckout,
  setPaymentLoading,
  setChangePayment,
  setPaymentMethodType,
  setPaymentMethodId,
  setSelectedCouponPack,
  setPaymentKurlypayType,
  setPaymentKurlypayCompanyCode,
  setChangeTermsState,
} = actions;

export default reducer;
