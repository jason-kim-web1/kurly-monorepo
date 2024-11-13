import { createSlice } from '@reduxjs/toolkit';

export interface SubscribeResultState {
  price?: number | null;
  date: string | null;
  errorMessage: string | null;
  isChangePayment: boolean;
  isQuickSubscribe?: boolean;
  couponPackId: string;
}

export const initialState: SubscribeResultState = {
  price: null,
  date: null,
  errorMessage: null,
  isChangePayment: false,
  isQuickSubscribe: false,
  couponPackId: '',
};

const { actions, reducer } = createSlice({
  name: 'subscribeResult',
  initialState,
  reducers: {
    setSubscribeSuccessResult: (state, { payload }: { payload: { price?: number; date: string } }) => ({
      ...state,
      ...payload,
    }),

    setSubscribeFailResult(state, { payload }: { payload: string }) {
      state.errorMessage = payload;
    },

    setChangePayment(state, { payload }: { payload: boolean }) {
      state.isChangePayment = payload;
    },

    setOrderBannerSubscribe(state, { payload }: { payload: { isQuickSubscribe: boolean } }) {
      state.isQuickSubscribe = payload.isQuickSubscribe;
    },

    setCouponPackId(state, { payload }: { payload: { couponPackId: string } }) {
      state.couponPackId = payload.couponPackId;
    },
  },
});

export const {
  setSubscribeSuccessResult,
  setSubscribeFailResult,
  setChangePayment,
  setOrderBannerSubscribe,
  setCouponPackId,
} = actions;

export default reducer;
