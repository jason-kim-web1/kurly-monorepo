import { createSlice } from '@reduxjs/toolkit';

import { InquiryOrderProductType } from './types';
import { MemberOrder, MemberOrderProduct } from '../shared/types';
import {
  DEFAULT_DATE_SELECTOR_TAB_NUMBER,
  orderProductSateSelectorTabs,
} from './components/shared/input/product/search/OrderProductSearchDateTab';
import { UserInquiryContentImageData } from '../list/types';
import { AppThunk } from '../../../shared/store';

export interface PersonalInquiryDraft {
  id: number;
  subject: string;
  contents: string;
}

export interface OrderProductSearchInfoState {
  startDate: string;
  endDate: string;
  pageNo: number;
  pageSize: number;
  last: boolean;
  totalPages: number;
  dateSelectorTabNumber: number;
  keyword: string | null;
  orderNo: number | null;
}

export interface OrderProductPickerState {
  loading: boolean;
  orders: MemberOrder[];
  selectedOrderProducts: MemberOrderProduct[];
  searchInfo: OrderProductSearchInfoState;
}

export type PersonalInquiryFormMode = 'NEW' | 'EDIT';

export interface PersonalInquiryFormState {
  loading: boolean;
  draft: PersonalInquiryDraft;
  orderProductType: InquiryOrderProductType;
  isRegisterImage: boolean;
  displayNotice: boolean;
  orderProductPicker: OrderProductPickerState;
  userImages: UserInquiryContentImageData[];
  inquiryTypeCode?: string;
  inquiryTypeSubCode?: string;
  allowsNotification: boolean;
  mode: PersonalInquiryFormMode;
  memberMobileMasked: string;
}

const defaultDateSelectorTab = orderProductSateSelectorTabs[DEFAULT_DATE_SELECTOR_TAB_NUMBER];

export const personalInquiryDefaultSearchInfo = {
  dateSelectorTabNumber: 0,
  startDate: defaultDateSelectorTab.dates[0],
  endDate: defaultDateSelectorTab.dates[1],
  pageNo: 0,
  totalPages: 0,
  pageSize: 0,
  last: false,
  keyword: null,
  orderNo: null,
};

export const personalInquiryFormInitialState: PersonalInquiryFormState = {
  loading: true,
  draft: {
    id: 0,
    subject: '',
    contents: '',
  },
  isRegisterImage: false,
  orderProductType: 'NONE',
  displayNotice: true,
  orderProductPicker: {
    loading: false,
    orders: [],
    selectedOrderProducts: [],
    searchInfo: personalInquiryDefaultSearchInfo,
  },
  userImages: [],
  allowsNotification: true,
  mode: 'NEW',
  memberMobileMasked: '',
};

const { actions, reducer } = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'personal-inquiry-form',
  initialState: personalInquiryFormInitialState,
  reducers: {
    setInitialFromData: (state, { payload }: { payload: PersonalInquiryFormState }) => payload,
    setIsRegisterImage(state, { payload }: { payload: boolean }) {
      state.isRegisterImage = payload;
    },
    setOrderProductType(state, { payload }: { payload: InquiryOrderProductType }) {
      state.orderProductType = payload;
    },
    closeNoticeModal(state) {
      state.displayNotice = false;
    },
    toggleSelectOrder(state, { payload }) {
      const targetOrder: MemberOrder = payload;

      state.orderProductPicker.orders = state.orderProductPicker.orders.map((order) => ({
        ...order,
        selected: order.orderNo === targetOrder.orderNo ? !targetOrder.selected : false,
        products: order.products.map((product) => ({
          ...product,
          selected: order.orderNo === targetOrder.orderNo ? !targetOrder.selected : false,
        })),
      }));
    },
    toggleSelectOrderProduct(state, { payload }) {
      const targetProduct: MemberOrderProduct = payload;

      const targetOrder = state.orderProductPicker.orders.find((it) => it.orderNo === targetProduct.orderNo);

      if (!targetOrder) {
        return;
      }

      // 동일한 주문 내 선택한 상품은 선택이 유지가 되고, 다른 주문의 상품은 선택이 해지된다.
      state.orderProductPicker.orders = state.orderProductPicker.orders.map((order) => ({
        ...order,
        products: order.products.map((product) => ({
          ...product,
          selected:
            order.orderNo === targetOrder.orderNo && product.dealProductNo === targetProduct.dealProductNo
              ? !targetProduct.selected
              : order.orderNo === targetOrder.orderNo && product.selected,
        })),
      }));

      // 주문의 상품이 모두 선택 돼 있으면 주문이 선택 된다
      state.orderProductPicker.orders = state.orderProductPicker.orders.map((order) => ({
        ...order,
        selected: order.products.every((it) => it.selected),
      }));
    },
    toggleFoldOrder(state, { payload }) {
      const targetOrder: MemberOrder = payload;

      state.orderProductPicker.orders = state.orderProductPicker.orders.map((order) => ({
        ...order,
        folded: order.orderNo === targetOrder.orderNo ? !targetOrder.folded : true,
      }));
    },
    modifyOrderProduct(state, { payload }) {
      const { targetProduct, newProps } = payload;
      const order = state.orderProductPicker.orders.find((it) => it.orderNo === targetProduct.orderNo);

      if (!order) {
        throw Error('order not found');
      }

      const product = order.products.find((it) => it.dealProductNo === targetProduct.dealProductNo);

      if (!product) {
        throw Error('product not found');
      }

      Object.assign(product, {
        ...product,
        ...newProps,
      });
    },
    setSelectedOrderProducts(state, { payload }) {
      state.orderProductPicker.selectedOrderProducts = payload;
    },
    clearSelectedProducts(state) {
      state.orderProductPicker.selectedOrderProducts = [];
      state.orderProductPicker.orders = state.orderProductPicker.orders.map((order) => ({
        ...order,
        selected: false,
        products: order.products.map((product) => ({
          ...product,
          selected: false,
        })),
      }));
    },
    addOrderProductItems(state, { payload }) {
      const items: Array<MemberOrder> = payload;
      state.orderProductPicker.orders.push(...items);
    },
    emptyOrderProductItems(state) {
      state.orderProductPicker.orders = [];
      state.orderProductPicker.searchInfo = {
        ...state.orderProductPicker.searchInfo,
        pageNo: 0,
        last: false,
      };
    },
    setOrderProductPickerLoading(state, { payload }) {
      state.orderProductPicker.loading = payload;
    },
    modifySearchInfo(state, { payload }) {
      state.orderProductPicker.searchInfo = {
        ...state.orderProductPicker.searchInfo,
        ...payload,
      };
    },
    resetSearchInfo(state) {
      return {
        ...state,
        orderProductPicker: {
          ...state.orderProductPicker,
          searchInfo: {
            ...personalInquiryDefaultSearchInfo,
            pageSize: state.orderProductPicker.searchInfo.pageSize,
          },
        },
      };
    },
    setMemberMobileMasked(state, { payload }) {
      return {
        ...state,
        memberMobileMasked: payload,
      };
    },
  },
});

export const {
  setInitialFromData,
  setIsRegisterImage,
  setOrderProductType,
  closeNoticeModal,
  toggleSelectOrder,
  toggleSelectOrderProduct,
  toggleFoldOrder,
  modifyOrderProduct,
  setSelectedOrderProducts,
  clearSelectedProducts,
  addOrderProductItems,
  emptyOrderProductItems,
  setOrderProductPickerLoading,
  modifySearchInfo,
  resetSearchInfo,
  setMemberMobileMasked,
} = actions;

export const initPersonalInquiryFormData =
  (props: Partial<PersonalInquiryFormState>): AppThunk =>
  (dispatch, getState) => {
    const { personalInquiryForm } = getState();
    dispatch(
      setInitialFromData({
        ...personalInquiryForm,
        ...props,
      }),
    );
  };

export default reducer;
