import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isMobile } from 'react-device-detect';

import { AxiosError } from 'axios';

import { calculateCartProductsTotalPrice } from '../utils/calculateCartProductsTotalPrice';
import { AvailableCartDeliveryGroup, CART_DELIVERY_GROUP } from '../constants/CartDeliveryGroup';
import { ORDER_PATH } from '../../../shared/constant';
import { AppThunk } from '../../../shared/store';
import { redirectTo } from '../../../shared/reducers/page';
import ContinuityBottomSheet from '../../checkout/m/components/ContinutyBottomSheet';
import { initCheckout } from '../../checkout/shared/reducers/checkout.slice';
import { cartError } from './cartError';

import Alert from '../../../shared/components/Alert/Alert';
import { postProceedToCheckout, ProceedToCheckoutRequest } from '../api/postProceedToCheckout';
import { getDeliveryNotice } from '../utils/getDeliveryNotice';

type TotalPriceType = Record<
  AvailableCartDeliveryGroup,
  Record<string, ReturnType<typeof calculateCartProductsTotalPrice>>
>;

export interface CartState {
  selectedCartItems: number[];

  totalPrice: TotalPriceType;
}

export const cartInitialState: CartState = {
  selectedCartItems: [],
  totalPrice: {
    [CART_DELIVERY_GROUP.KURLY]: {},
    [CART_DELIVERY_GROUP.PARTNER_DOMESTIC]: {},
    [CART_DELIVERY_GROUP.PARTNER_INTERNATIONAL]: {},
  },
};

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    initCartStore: () => ({ ...cartInitialState }),
    addCartItem: (state, action: PayloadAction<{ dealProductNos: number[] }>) => {
      state.selectedCartItems = Array.from(
        new Set<number>([...state.selectedCartItems, ...action.payload.dealProductNos]),
      );
    },
    removeCartItem: (state, action: PayloadAction<{ dealProductNos: number[] }>) => {
      state.selectedCartItems = state.selectedCartItems.filter((item) => !action.payload.dealProductNos.includes(item));
    },
    updateTotalPrice: (
      state,
      action: PayloadAction<{
        type: AvailableCartDeliveryGroup;
        partnerId: string;
        totalPrice: ReturnType<typeof calculateCartProductsTotalPrice> | null;
      }>,
    ) => {
      const { type, partnerId, totalPrice } = action.payload;
      if (totalPrice === null) {
        delete state.totalPrice[type][partnerId];
        return;
      }
      state.totalPrice[type][partnerId] = totalPrice;
    },
  },
});

export const { initCartStore, addCartItem, removeCartItem, updateTotalPrice } = actions;

export const totalPriceSelector = createSelector(
  (state: { cart: CartState }) => state.cart.totalPrice,
  (totalPrice) => {
    const kurlyTotalPrice = Object.values(totalPrice[CART_DELIVERY_GROUP.KURLY]);
    const partnerDomesticTotalPrice = Object.values(totalPrice[CART_DELIVERY_GROUP.PARTNER_DOMESTIC]);
    const partnerInternationalTotalPrice = Object.values(totalPrice[CART_DELIVERY_GROUP.PARTNER_INTERNATIONAL]);

    return [...kurlyTotalPrice, ...partnerDomesticTotalPrice, ...partnerInternationalTotalPrice].reduce(
      (acc, cur) => {
        return {
          productPrice: acc.productPrice + cur.price,
          discountPrice: acc.discountPrice + cur.discountPrice,
          deliveryPrice: acc.deliveryPrice + cur.deliveryFee,
          paymentPrice: acc.paymentPrice + cur.price + cur.deliveryFee,
        };
      },
      {
        productPrice: 0,
        discountPrice: 0,
        deliveryPrice: 0,
        paymentPrice: 0,
      },
    );
  },
);

// 상품영역의 바로구매에서만 사용
export const submitToCheckout =
  (params: ProceedToCheckoutRequest): AppThunk =>
  async (dispatch) => {
    try {
      const result = await postProceedToCheckout(params);
      const { deliveryNotice, hasDeliveryMessage } = getDeliveryNotice(result);

      if (hasDeliveryMessage) {
        const { basicStyle, replaceStyles, text } = deliveryNotice;

        const isContinuityBottomSheet = isMobile && basicStyle && replaceStyles;

        const { isDismissed } = await (isContinuityBottomSheet
          ? ContinuityBottomSheet({
              message: text,
              basicStyle,
              replaceStyles,
              showSubText: false,
              showCancelButton: false,
              confirmButtonText: '계속 주문하기',
            })
          : Alert({
              text,
              confirmButtonText: '계속 주문하기',
            }));

        if (isDismissed) return;
      }

      dispatch(initCheckout());
      dispatch(redirectTo({ url: ORDER_PATH.order.uri }));
    } catch (err) {
      dispatch(cartError(err as AxiosError));
    }
  };

export default reducer;
