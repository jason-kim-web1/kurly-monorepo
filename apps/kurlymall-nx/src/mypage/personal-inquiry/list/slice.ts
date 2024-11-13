import { createSlice } from '@reduxjs/toolkit';

import { PersonalInquiryListItem } from './types';
import { AppThunk } from '../../../shared/store';
import { fetchPersonalInquiries } from '../../../shared/api';
import { notify } from '../../../shared/reducers/page';

export interface PersonalInquiryListPaginationState {
  pageNo: number;
  isFullyLoaded: boolean;
}

export interface PersonalInquiryListState {
  items: Array<PersonalInquiryListItem>;
  loading: boolean;
  error: boolean;
  pagination: PersonalInquiryListPaginationState;
}

export const personalInquiryListInitialState: PersonalInquiryListState = {
  items: [],
  loading: true,
  error: false,
  pagination: {
    pageNo: 1,
    isFullyLoaded: false,
  },
};

const { actions, reducer } = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'personal-inquiry-list',
  initialState: personalInquiryListInitialState,
  reducers: {
    addItems(state, { payload: items }) {
      state.items.push(...items);
    },
    modifyItem(state, action) {
      const { targetType, targetId, newItemProps } = action.payload;

      const item = state.items.find((it) => it.type === targetType && it.id === targetId);

      if (!item) {
        throw Error('item not found');
      }

      Object.assign(item, {
        ...item,
        ...newItemProps,
      });
    },
    modifyPagination: (state, { payload }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        ...payload,
      },
    }),
    setLoading: (state, { payload }: { payload: boolean }) => ({
      ...state,
      loading: payload,
    }),
    setError: (state, { payload }: { payload: boolean }) => ({
      ...state,
      error: payload,
    }),
    toggleExpanded: (state, action) => {
      const targetId = action.payload;

      return {
        ...state,
        items: state.items.map((it) => ({
          ...it,
          expanded: `${it.type}-${it.id}` === targetId ? !it.expanded : false,
        })),
      };
    },
    deleteItem: (state, { payload }) => ({
      ...state,
      items: state.items.filter((item) => item.id !== payload),
    }),
    initState: () => ({
      ...personalInquiryListInitialState,
    }),
  },
});

export const { addItems, modifyItem, modifyPagination, setLoading, setError, toggleExpanded, deleteItem, initState } =
  actions;

export default reducer;

export const loadPersonalInquiryItems =
  (pageNo: number, pageSize: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { content, last } = await fetchPersonalInquiries(pageNo, pageSize);

      if (last) {
        dispatch(modifyPagination({ isFullyLoaded: true }));
      }

      const userInquiries = content.map<PersonalInquiryListItem>((it) => ({
        id: it.id,
        type: 'NORMAL',
        orderType: it.orderType,
        orderNo: it.orderNo,
        orderProducts: it.orderProducts.map((product) => ({
          quantity: product.quantity,
          contentsProductNo: product.contentsProductNo,
          contentsProductName: product.contentsProductName,
          dealProductNo: product.dealProductNo,
          dealProductName: product.dealProductName,
          orderedDatetime: product.orderedAt,
          createdDateTime: product.createdDateTime,
          imageUrl: product.imageUrl,
          paymentAmount: product.productPrice,
        })),
        date: it.createdDateTime,
        title: it.subject,
        status: it.comments.length > 0 ? 'COMPLETE' : 'PENDING',
        contents: it.contents,
        comments: it.comments,
        inquiryTypeName: it.inquiryTypeName,
        inquiryTypeCode: it.inquiryTypeCode,
        inquiryTypeSubName: it.inquiryTypeSubName,
        inquiryTypeSubCode: it.inquiryTypeSubCode,
        images: it.images,
        allowsNotification: it.allowsNotification,
        expanded: false,
      }));
      dispatch(addItems(userInquiries));
    } catch (err) {
      dispatch(notify(err.message));
      dispatch(setError(true));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const loadPersonalInquiryNextPage =
  (pageSize: number): AppThunk =>
  async (dispatch, getState) => {
    const { pageNo } = getState().personalInquiryList.pagination;
    dispatch(loadPersonalInquiryItems(pageNo, pageSize));
    dispatch(modifyPagination({ pageNo: pageNo + 1 }));
  };
