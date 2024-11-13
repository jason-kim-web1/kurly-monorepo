import { Dispatch, createSlice } from '@reduxjs/toolkit';

import { AppThunk } from '../../../shared/store';
import {
  getPaymentUnsubscribeDetail,
  getSubscriptionCancelReasons,
  getSubscriptionMembersDetail,
} from '../../../shared/api/membership/membership.api';
import { MyMembershipState, PaymentStatus, PaymentType } from './type';

const initialState: MyMembershipState = {
  loading: true,
  isSubscribed: false,
  isCancelReserved: false,
  isCancelNow: false,
  benefits: [],
  startBenefitDate: 'yyyy-mm-dd',
  endBenefitDate: 'yyyy-mm-dd',
  providedBenefit: {
    benefitOptionId: 0,
    benefitOptionName: '',
    benefitOptionDescription: '',
  },
  selectedBenefit: {
    benefitOptionId: 0,
    benefitOptionName: '',
    benefitOptionDescription: '',
  },
  payment: {
    status: PaymentStatus.COMPLETED,
    nextDate: 'yyyy-mm-dd',
    price: '-',
    type: PaymentType.CREDIT,
    method: {
      name: '**카드',
      number: '****-****-****-****',
    },
  },
  cancelReasons: [],
  partner: {
    isKurly: false,
    isSKT: false,
    name: '',
  },
  startAffiliateDate: 'yyyy-mm-dd',
  endAffiliateDate: 'yyyy-mm-dd',
  affiliateBenefits: [],
  usingFreeTicket: {
    id: 0,
    name: '',
    startedAt: '',
    endedAt: '',
    status: '',
  },
  unusedFreeTickets: [],
};

const { actions, reducer } = createSlice({
  name: 'myMembership',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyMembership: (state, action) => {
      const {
        isSubscribed,
        isCancelReserved,
        partner,
        startBenefitDate,
        endBenefitDate,
        benefits,
        providedBenefit,
        selectedBenefit,
        payment,
        startAffiliateDate,
        endAffiliateDate,
        affiliateBenefits,
        usingFreeTicket,
        unusedFreeTickets,
      } = action.payload;
      state.isSubscribed = isSubscribed;
      state.isCancelReserved = isCancelReserved;
      state.partner = partner;
      state.startBenefitDate = startBenefitDate;
      state.endBenefitDate = endBenefitDate;
      state.benefits = benefits;
      state.providedBenefit = providedBenefit;
      state.selectedBenefit = selectedBenefit;
      state.payment = payment;
      state.startAffiliateDate = startAffiliateDate;
      state.endAffiliateDate = endAffiliateDate;
      state.affiliateBenefits = affiliateBenefits;
      state.usingFreeTicket = usingFreeTicket;
      state.unusedFreeTickets = unusedFreeTickets;
    },
    setCancelReasons: (state, action) => {
      state.cancelReasons = action.payload;
    },
    setUnsubscribeMembershipDetail: (state, action) => {
      state.benefits = action.payload.benefits;
      state.endBenefitDate = action.payload.endBenefitDate;
      state.isCancelNow = action.payload.cancelable;
      state.usingFreeTicket = action.payload.usingFreeTicket;
      state.affiliateBenefits = action.payload.affiliateBenefits;
    },
  },
});

export const { setLoading, setMyMembership, setCancelReasons, setUnsubscribeMembershipDetail } = actions;

export const loadMyMembership = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));

  const myMembershipData = await getSubscriptionMembersDetail();

  dispatch(
    setMyMembership({
      isSubscribed: myMembershipData.isSubscribed,
      isCancelReserved: myMembershipData.isCancelReserved,
      partner: myMembershipData.partner,
      startBenefitDate: myMembershipData.startBenefitDate,
      endBenefitDate: myMembershipData.endBenefitDate,
      benefits: myMembershipData.benefits,
      providedBenefit: myMembershipData.providedBenefitOptionInfo,
      selectedBenefit: myMembershipData.selectedBenefitOptionInfo,
      payment: myMembershipData.payment,
      startAffiliateDate: myMembershipData.startAffiliateDate,
      endAffiliateDate: myMembershipData.endAffiliateDate,
      affiliateBenefits: myMembershipData.affiliateBenefits,
      usingFreeTicket: myMembershipData.usingFreeTicket,
      unusedFreeTickets: myMembershipData.unusedFreeTickets,
    }),
  );

  dispatch(setLoading(false));
};

export const loadCancelReasons = (): AppThunk => async (dispatch: Dispatch) => {
  const cancelReasons = await getSubscriptionCancelReasons();

  dispatch(setCancelReasons(cancelReasons));
};

export const loadUnsubscribeMembershipDetail = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));

  const response = await getPaymentUnsubscribeDetail();

  dispatch(setUnsubscribeMembershipDetail(response));
  dispatch(setLoading(false));
};

export default reducer;
