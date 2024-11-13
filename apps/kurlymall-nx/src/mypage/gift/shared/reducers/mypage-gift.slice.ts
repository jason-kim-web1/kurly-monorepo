import { createSlice } from '@reduxjs/toolkit';

import { format, sub } from 'date-fns';

import { GiftDetails, GiftListItem, PostResendRequest } from '../../../../shared/interfaces';
import { notify, redirectToError } from '../../../../shared/reducers/page';
import { AppThunk } from '../../../../shared/store';
import { fetchOrderDetail, giftOrderList, postGiftMessage } from '../services/mypage-gift.service';

const ORDERS_GET_LIMIT = 10;
const DEFAULT_FILTER_MONTH = '3';

export interface MypageGiftState {
  orders?: GiftListItem[];
  currentPage: number;
  isFullyLoaded: boolean;
  limit: number;
  monthFilter: string;
  loading: boolean;
  error: boolean;
  loadLock: boolean;
  scrollYPosition: number;
  orderDetails: GiftDetails;
  messageTimeCheck: boolean;
}

export const initialState: MypageGiftState = {
  orders: undefined,
  currentPage: 1,
  isFullyLoaded: false,
  limit: ORDERS_GET_LIMIT,
  monthFilter: DEFAULT_FILTER_MONTH,
  loading: false,
  error: false,
  loadLock: false,
  scrollYPosition: 0,
  orderDetails: {
    groupOrderNo: 0,
    externalGroupOrderNo: '',
    status: 'READY_FOR_ACCEPT',
    recipientName: '',
    recipientMobile: '',
    message: '',
    ordererName: '',
    possibleNotificationSentCount: 0,
    notificationSentCount: 0,
    isSelfCancelable: true,
    notificationType: 'SMS',
    availableDate: '',
    payment: {
      method: 'credit_card',
      paymentGatewayId: 'others',
      paymentGatewayIdDisplayName: '기타',
      paymentCompletedAt: '',
      totalDisplayProductsPrice: 0,
      totalDisplayProductsDiscountPrice: 0,
      totalPaymentPrice: 0,
      deliveryPrice: 0,
      totalCouponDiscountPrice: 0,
      totalUsedPoint: 0,
      totalUsedFreePoint: 0,
      totalUsedPaidPoint: 0,
      totalRefundedPrice: 0,
      totalAccruedPoint: 0,
      totalRemainPaymentPrice: 0,
      totalRefundRequestedPrice: 0,
      totalCardInstantDiscountPrice: 0,
    },
    products: [
      {
        dealProductNo: 0,
        contentsProductNo: 0,
        imageUrl: '',
        dealProductName: '',
        contentsProductName: '',
        quantity: 1,
        displayPrice: 0,
        displayDiscountPrice: 0,
        isGiveawayProduct: false,
      },
    ],
  },
  messageTimeCheck: false,
};

const { actions, reducer } = createSlice({
  name: 'mypageGift',
  initialState,
  reducers: {
    setInitialStateData: (state, { payload }: { payload: MypageGiftState }) => payload,
    setOrders: (state, { payload: orders }: { payload: GiftListItem[] }) => ({ ...state, orders }),
    setAddOrders: (state, { payload: orders }: { payload: GiftListItem[] }) => {
      state.orders?.push(...orders);
    },
    setPagingLimit: (state, { payload: limit }: { payload: number }) => ({ ...state, limit }),
    setCurrentPage: (state, { payload: currentPage }: { payload: number | string | undefined }) => {
      if (currentPage) {
        return { ...state, currentPage: Number(currentPage) };
      } else {
        return { ...state, currentPage: state.currentPage + 1 };
      }
    },
    setCurrentFilter: (state, { payload: monthFilter }) => ({ ...state, monthFilter }),
    setLoading: (state, { payload: loading }) => ({ ...state, loading }),
    setError: (state, { payload: error }) => ({ ...state, error }),
    setIsFullyLoaded: (state, { payload: isFullyLoaded }: { payload: boolean }) => ({ ...state, isFullyLoaded }),
    setLoadLock: (state, { payload: loadLock }: { payload: boolean }) => ({ ...state, loadLock }),
    setScrollYPosition: (state, { payload: scrollYPosition }: { payload: number }) => ({ ...state, scrollYPosition }),
    updateOrderDetails: (state, { payload: orderDetails }) => ({ ...state, orderDetails }),
    setMessageTimeCheck: (state, { payload: messageTimeCheck }) => ({ ...state, messageTimeCheck }),
    setResetOrdersMethod: (state, { payload: orders }) => ({ ...state, orders }),
  },
});

export const {
  setInitialStateData,
  setOrders,
  setAddOrders,
  setPagingLimit,
  setCurrentPage,
  setCurrentFilter,
  setLoading,
  setError,
  setIsFullyLoaded,
  setLoadLock,
  setScrollYPosition,
  updateOrderDetails,
  setMessageTimeCheck,
  setResetOrdersMethod,
} = actions;

interface LoadGiftOrdersProps {
  merge?: boolean;
}

// 선물 목록 조회
export const loadGiftOrders =
  (
    { merge }: LoadGiftOrdersProps = {
      merge: false,
    },
  ): AppThunk =>
  async (dispatch, getState) => {
    const {
      mypageGift: { currentPage, limit, monthFilter, loadLock, isFullyLoaded },
    } = getState();

    dispatch(setLoading(true));
    dispatch(setError(false));

    const dateFormat = 'yyyy-MM-dd';
    const endDate = new Date();
    const startDate = sub(endDate, { months: Number(monthFilter) });

    try {
      if (loadLock || isFullyLoaded) {
        // LOCK은 1회 사용 후 초기화 됩니다.
        dispatch(setLoadLock(false));
        return;
      }

      const { orders, pagination } = await giftOrderList({
        page: currentPage,
        limit,
        startDate: format(startDate, dateFormat),
        endDate: format(endDate, dateFormat),
      });

      // 첫페이지로 돌아올 경우데이터를 비워서 새로 시작함
      if (merge && currentPage !== 1) {
        dispatch(setAddOrders(orders));
      } else {
        dispatch(setOrders(orders));
      }

      if (!pagination.hasNext) {
        dispatch(setIsFullyLoaded(true));
      } else {
        dispatch(setIsFullyLoaded(false));
      }
    } catch {
      dispatch(setError(true));
      dispatch(setOrders([]));
    } finally {
      dispatch(setLoading(false));
    }
  };

// 선물 주문 상세 조회
export const loadOrderDetail =
  (orderNo: number): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const result = await fetchOrderDetail(orderNo);

      dispatch(updateOrderDetails(result));
    } catch (e) {
      dispatch(setError(true));
      dispatch(redirectToError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

// 선물 알림 메세지 전송
export const postResendMessage =
  (params: PostResendRequest): AppThunk =>
  async (dispatch, getState) => {
    const {
      mypageGift: { orders, orderDetails },
    } = getState();

    // 2초간 재전송 클릭 금지 처리
    dispatch(setMessageTimeCheck(true));

    try {
      await postGiftMessage(params.groupOrderNo);

      dispatch(notify(`${params.recipientName}님께 선물 메시지를 다시 전송했습니다.`));

      // 선물 리스트와 상세에서 카운트를 추가한다.
      dispatch(
        setResetOrdersMethod(
          orders?.map((it) =>
            it.groupOrderNo === params.groupOrderNo
              ? {
                  ...it,
                  notificationSentCount: it.notificationSentCount + 1,
                }
              : it,
          ),
        ),
      );
      dispatch(
        updateOrderDetails({
          ...orderDetails,
          notificationSentCount: orderDetails.notificationSentCount + 1,
        }),
      );
    } catch (e) {
      dispatch(notify('메시지를 보낼 수 없습니다. 잠시 후 다시 시도해주세요.'));
    }
  };

export default reducer;
