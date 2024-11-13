import { isEmpty } from 'lodash';

import { createSlice } from '@reduxjs/toolkit';

import { AppThunk } from '../../../../shared/store';

import { fetchOrderDetail, postOrderCancel } from '../services/mypage-gift.service';

import { getPageUrl, GIFT_PATH } from '../../../../shared/constant';
import { notifyAndRedirectTo, redirectTo } from '../../../../shared/reducers/page';
import { CancelDetail, checkCancelable, getOrderDetail } from '../services/cancel-order.service';
import { GIFT_CANCEL_REASON_LIST } from '../constants/self-cancel';

export interface MypageGiftCancelState {
  orderNo?: string;
  isLoading: boolean;
  cancelReasonList: string[];
  selectedReason: string;
  etcReason: string;
  cancelInfo: CancelDetail;
  // 취소 실패 시 사유
  failMessage: string;
}

export const initialState: MypageGiftCancelState = {
  isLoading: false,
  cancelReasonList: GIFT_CANCEL_REASON_LIST,
  selectedReason: GIFT_CANCEL_REASON_LIST[0],
  etcReason: '',
  cancelInfo: {
    summary: '',
    price: {
      totalDealProductPrice: 0,
      totalDealProductDiscountPrice: 0,
      totalCouponDiscountPrice: 0,
      totalUsedFreePoint: 0,
      totalUsedPaidPoint: 0,
      totalPaymentPrice: 0,
      totalAccruedPoint: 0,
      deliveryPrice: 0,
      totalCardInstantDiscountPrice: 0,
    },
  },
  failMessage: '',
};

const { actions, reducer } = createSlice({
  name: 'mypageGiftCancel',
  initialState,
  reducers: {
    resetMypageGiftCancel: (state) => ({ ...initialState, failMessage: state.failMessage }),
    setOrderNo: (state, { payload: orderNo }) => ({ ...state, orderNo }),
    startLoading: (state) => ({ ...state, isLoading: true }),
    endLoading: (state) => ({ ...state, isLoading: false }),
    setCancelReason: (state, { payload: selectedReason }) => ({ ...state, selectedReason }),
    setCancelReasonEtc: (state, { payload: etcReason }) => ({ ...state, etcReason }),
    setCancelInfo: (state, { payload: cancelInfo }) => ({ ...state, cancelInfo }),
    setProducts: (state, { payload: products }) => ({ ...state, products }),
    setFailMessage: (state, { payload: failMessage }) => ({ ...state, failMessage }),
  },
});

export const {
  resetMypageGiftCancel,
  setOrderNo,
  startLoading,
  endLoading,
  setCancelReason,
  setCancelReasonEtc,
  setCancelInfo,
  setProducts,
  setFailMessage,
} = actions;

// 주문 조회
export const loadCancelOrder =
  (orderNo: string): AppThunk =>
  async (dispatch) => {
    dispatch(startLoading());

    try {
      const data = await fetchOrderDetail(Number(orderNo));
      const { isSelfCancelable, status } = data;

      const failMessage = checkCancelable({
        isSelfCancelable,
        orderStatus: status,
      });

      if (!isEmpty(failMessage)) {
        throw new Error(failMessage);
      }

      const cancelInfo = getOrderDetail(data);

      dispatch(setOrderNo(orderNo));
      dispatch(setCancelInfo(cancelInfo));
    } catch (e) {
      // 실패 사유
      dispatch(setFailMessage((e as Error).message));
      dispatch(
        notifyAndRedirectTo({
          message: (e as Error).message,
          redirectUrl: getPageUrl(GIFT_PATH.cancelFail),
        }),
      );
    }

    dispatch(endLoading());
  };

// 주문 취소
export const postCancelOrder = (): AppThunk => async (dispatch, getState) => {
  const {
    mypageGiftCancel: { orderNo, selectedReason, etcReason },
  } = getState();

  try {
    await postOrderCancel({
      orderNo: Number(orderNo),
      reasonDetail: selectedReason === '기타' ? etcReason : selectedReason,
    });

    dispatch(
      redirectTo({
        url: getPageUrl(GIFT_PATH.cancelSuccess),
        replace: true,
      }),
    );
  } catch (e) {
    dispatch(
      notifyAndRedirectTo({
        message: (e as Error).message,
        redirectUrl: getPageUrl(GIFT_PATH.cancelFail),
      }),
    );
  }
};

export { reducer as mypageGiftCancelReducer };
