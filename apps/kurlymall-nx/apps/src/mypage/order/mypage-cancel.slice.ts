import { createSlice } from '@reduxjs/toolkit';

import { AppThunk } from '../../shared/store';

import { cancelMypageOrders } from '../../shared/api/mypage/order';

import { MYPAGE_PATH } from '../../shared/constant';
import { notifyAndRedirectTo, redirectTo } from '../../shared/reducers/page';
import { CANCEL_REASON_LIST } from './shared/constants/self-cancel';
import fetchOrderToCancelDetail from '../../order/cancel-order/api/fetchOrderToCancelDetail';
import { OrderToCancelDetail } from '../../order/cancel-order/interface/OrderToCancelDetail';
import { CartItem } from '../../order/cart/interface/CartProduct';

export interface MypageCancelState {
  orderNoMeta?: {
    groupOrderNo: number;
    orderNos?: number[];
  };
  isLoading: boolean;
  cancelReasonList: string[];
  selectedReason: string;
  etcReason: string;
  cancelInfo: OrderToCancelDetail;
  // 취소 상품 다시 담기에 필요한 딜번호
  productsToReAddToCart: CartItem[];
  // 취소 상품 다시 담기 가능여부
  isAddBackToCart: boolean;
  // 주문 취소 중복 방지
  isCanceling: boolean;
  // 취소 상품 요약 문자열
  productsSummary: string;
}

export const initialState: MypageCancelState = {
  isLoading: false,
  cancelReasonList: CANCEL_REASON_LIST,
  selectedReason: CANCEL_REASON_LIST[0],
  etcReason: '',
  cancelInfo: {
    totalPaymentPrice: 0,
    deliveryPrice: 0,
    totalUsedFreePoint: 0,
    totalUsedPaidPoint: 0,
    totalCouponDiscountPrice: 0,
    totalCardInstantDiscountPrice: 0,
    totalDealProductPrice: 0,
    totalDealProductDiscountPrice: 0,
    totalDisplayProductsPrice: 0,
    totalDisplayProductsDiscountPrice: 0,
    totalAccruedPoint: 0,
    dealProducts: [],
  },
  productsToReAddToCart: [],
  isAddBackToCart: false,
  isCanceling: false,
  productsSummary: '',
};

const { actions, reducer } = createSlice({
  name: 'mypageCancel',
  initialState,
  reducers: {
    initMypageCancel: (state) => ({
      ...initialState,
      productsToReAddToCart: state.productsToReAddToCart,
      isAddBackToCart: state.isAddBackToCart,
    }),
    setOrderNoMeta: (state, { payload: orderNoMeta }) => ({ ...state, orderNoMeta }),
    startLoading: (state) => ({ ...state, isLoading: true }),
    endLoading: (state) => ({ ...state, isLoading: false }),
    setCanceling: (state, { payload: isCanceling }) => ({ ...state, isCanceling }),
    setCancelReason: (state, { payload: selectedReason }) => ({ ...state, selectedReason }),
    setCancelReasonEtc: (state, { payload: etcReason }) => ({ ...state, etcReason }),
    setCancelInfo: (state, { payload: cancelInfo }) => ({ ...state, cancelInfo }),
    setProductsSummary: (state, { payload: productsSummary }) => ({ ...state, productsSummary }),
    setProductsToReAddToCart: (
      state,
      {
        payload: { productsToReAddToCart, isAddBackToCart },
      }: { payload: { productsToReAddToCart: CartItem[]; isAddBackToCart: boolean } },
    ) => ({
      ...state,
      productsToReAddToCart,
      isAddBackToCart,
    }),
  },
});

export const {
  initMypageCancel,
  setOrderNoMeta,
  startLoading,
  endLoading,
  setCancelReason,
  setCancelReasonEtc,
  setCancelInfo,
  setCanceling,
  setProductsSummary,
  setProductsToReAddToCart,
} = actions;

const getDealProductsSummary = (dealProducts: OrderToCancelDetail['dealProducts']) => {
  return dealProducts.length > 1
    ? `${dealProducts[0].dealProductName} 외 ${dealProducts.length - 1} 건`
    : `${dealProducts[0].dealProductName}`;
};

// 주문 취소 데이터 조회
export const loadCancelOrder =
  (groupOrderNo: number, orderNos?: number[]): AppThunk =>
  async (dispatch) => {
    dispatch(startLoading());

    try {
      const cancelDetail = await fetchOrderToCancelDetail({ groupOrderNo, orderNos });
      const productsSummary = getDealProductsSummary(cancelDetail.dealProducts);

      dispatch(setOrderNoMeta({ groupOrderNo, orderNos }));
      dispatch(setProductsSummary(productsSummary));
      dispatch(setCancelInfo(cancelDetail));
    } catch (e) {
      dispatch(
        notifyAndRedirectTo({
          message: (e as Error).message,
          redirectUrl: MYPAGE_PATH.cancelFail.uri,
        }),
      );
    }

    dispatch(endLoading());
  };

// 주문 취소
export const postCancelOrder = (): AppThunk => async (dispatch, getState) => {
  const {
    mypageCancel: { orderNoMeta, selectedReason, etcReason },
  } = getState();

  if (!orderNoMeta) return;

  try {
    const { groupOrderNo, orderNos } = orderNoMeta;
    const { dealProducts, isAddBackToCart } = await cancelMypageOrders({
      groupOrderNo,
      reasonDetail: selectedReason === '기타' ? etcReason : selectedReason,
      orderNos,
    });

    dispatch(setProductsToReAddToCart({ productsToReAddToCart: dealProducts, isAddBackToCart }));

    dispatch(
      redirectTo({
        url: MYPAGE_PATH.cancelSuccess.uri,
        replace: true,
      }),
    );
  } catch (e) {
    dispatch(
      notifyAndRedirectTo({
        message: (e as Error).message,
        redirectUrl: MYPAGE_PATH.cancelFail.uri,
      }),
    );
  } finally {
    dispatch(setCanceling(false));
  }
};

export { reducer as mypageCancelReducer };
