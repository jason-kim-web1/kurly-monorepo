import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { AcceptInfo, ReceiveInfo } from '../shared/constant/giftTypes';
import { getGiftInformation, updateGiftApproved, updateGiftReject } from './services/gift.service';
import { DeliveryStatus } from '../shared/constant/deliveryPath';
import { TermsPolicyList } from '../shared/interfaces';
import { PERSONAL_INFO_AGREE_GIFT_RECEIVER } from '../order/shared/shared/constants/terms';

import { Invoice } from '../shared/interfaces/OrderDetail';
import { GiftOrderStatus } from '../mypage/gift/shared/enum/GiftOrderStatus.enum';
import { notify, redirectToError } from '../shared/reducers/page';
import { DeliveryProps, DeliveryTimeType, DeliveryType } from '../shared/interfaces/ShippingAddress';
import { fetchCourierOperation } from '../shared/api';

export interface GiftState {
  loading: boolean;
  externalOrderNo: string;
  receiver: ReceiveInfo;
  acceptInfo: AcceptInfo;
  terms: TermsPolicyList[];
  readOnlyMobile: boolean;
  policy: {
    deliveryType: DeliveryType;
  };
  deliveryStatus?: DeliveryStatus[];
  invoice?: Invoice;
}

const initialState: GiftState = {
  loading: false,
  externalOrderNo: '',
  receiver: {
    externalOrderNo: '',
    orderNo: 0,
    ordererName: '',
    recipientName: '',
    status: 'READY_FOR_ACCEPT',
    dealProducts: {
      dealProductNo: 0,
      dealProductName: '',
      dealProductImageUrl: '',
      productVerticalSmallUrl: '',
      contentProductName: '',
      quantity: 1,
    },
    message: '',
    giftSentDateTime: 0,
    availableDate: '',
    giftAcceptedDateTime: null,
    giftCanceledDateTime: null,
    giftRejectedDateTime: null,
  },
  acceptInfo: {
    name: '',
    phoneNumber: '',
    address: '',
    addressDetail: '',
    memo: '',
    termsAgreements: [
      {
        termsCode: PERSONAL_INFO_AGREE_GIFT_RECEIVER.code,
        agreed: false,
      },
    ],
  },
  terms: [
    {
      ...PERSONAL_INFO_AGREE_GIFT_RECEIVER,
      agreed: false,
    },
  ],
  readOnlyMobile: false,
  policy: {
    deliveryType: 'disable',
  },
  deliveryStatus: [],
};

const { actions, reducer } = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    showLoading: (state) => ({ ...state, loading: true }),
    hideLoading: (state) => ({ ...state, loading: false }),
    updateAddress(state, { payload: address }) {
      state.acceptInfo.address = address;
    },
    updateAddressDetail(state, { payload: address }) {
      state.acceptInfo.addressDetail = address;
    },
    updatePolicy(state, { payload: policy }) {
      state.policy = policy;
    },
    updateTerms(state, { payload: terms }) {
      state.terms = terms;
    },

    setExternalOrderNo(state, { payload: externalOrderNo }) {
      state.externalOrderNo = externalOrderNo;
    },

    updateReceiverStatus(state, { payload: status }) {
      state.receiver.status = status;
    },

    updateGiftInformation(state, { payload: receiver }) {
      state.receiver = receiver;
      state.acceptInfo.name = receiver.recipientName;
      state.invoice = receiver.invoice;

      if (!state.acceptInfo.phoneNumber) {
        state.acceptInfo.phoneNumber = receiver.recipientMobile ?? '';
        state.readOnlyMobile = !!receiver.recipientMobile;
      }
    },

    updateAcceptPhoneNumber(state, { payload: phoneNumber }) {
      state.acceptInfo.phoneNumber = phoneNumber;
    },

    updateAcceptMemo(state, { payload: memo }) {
      state.acceptInfo.memo = memo;
    },

    updateTermsAgreements(state, { payload: termsAgreements }) {
      state.acceptInfo.termsAgreements = termsAgreements;
    },
  },
});

export const {
  updatePolicy,
  setExternalOrderNo,
  updateTerms,
  updateTermsAgreements,
  showLoading,
  hideLoading,
  updateReceiverStatus,
  updateGiftInformation,
  updateAddress,
  updateAddressDetail,
  updateAcceptPhoneNumber,
  updateAcceptMemo,
} = actions;

export const loadGiftInformation = (orderNo: string) => async (dispatch: Dispatch) => {
  try {
    const result = await getGiftInformation(orderNo);
    dispatch(updateGiftInformation(result));
  } catch (e) {
    dispatch(redirectToError(e.message));
  }
};

export const loadDeliveryPolicy = (deliveryProps: DeliveryProps) => async (dispatch: Dispatch) => {
  try {
    const { delivery_type } = await fetchCourierOperation(
      {
        address: deliveryProps.roadAddress,
        address_detail: deliveryProps.addressDetail ?? '',
      },
      DeliveryTimeType.DAY,
    );

    dispatch(updatePolicy({ deliveryType: delivery_type }));
  } catch (e) {
    dispatch(notify(e.message));
  }
};

export const postGiftApproved = (orderNo: string, acceptInfo: AcceptInfo) => async (dispatch: Dispatch) => {
  try {
    await updateGiftApproved(orderNo, acceptInfo);
    dispatch(updateReceiverStatus(GiftOrderStatus.ACCEPTED));
  } catch (e) {
    dispatch(notify(e.message));
    dispatch(updateReceiverStatus(GiftOrderStatus.CANCELED));
  }
};

export const postGiftReject = (orderNo: string) => async (dispatch: Dispatch) => {
  try {
    await updateGiftReject(orderNo);
    dispatch(updateReceiverStatus(GiftOrderStatus.REJECTED));
  } catch (e) {
    dispatch(notify(e.message));
    dispatch(updateReceiverStatus(GiftOrderStatus.CANCELED));
  }
};

export default reducer;
