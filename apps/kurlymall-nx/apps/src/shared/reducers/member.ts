import { createSelector, createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

import { RootState } from '../store';
import { AsyncStatus, requestHelper } from '../../cart/shared/reducers/async-request.slice';

import {
  getMemberBenefits,
  getMemberGradeInfo,
  getMemberInfo,
  getMemberPointBenefit,
  getMyKurlyStyleProfile,
  getSubscriptionMembersInfo,
  getUserSegments,
} from '../services';
import {
  MemberBenefit,
  MemberGradeInfo,
  MemberInfo,
  MemberMetadata,
  MemberPointBenefit,
  MemberSubscription,
} from '../interfaces';
import { notify } from './page';
import { GradeName } from '../enums';

export interface MemberState {
  info?: MemberInfo;
  pointBenefit?: MemberPointBenefit;
  benefits: MemberBenefit[];
  hasProfile: boolean;
  gradeInfo: MemberGradeInfo;
  subscription: MemberSubscription;
  metadata: MemberMetadata;
}

export const initialState: MemberState = {
  // 구독 정보
  subscription: {
    agreeSMS: false,
    cancelReserved: false,
    startSubscriptionDate: '',
    endSubscriptionDate: '',
    isSubscribed: false,
    hasAffiliateBenefits: false,
    showMembershipBanner: false,
    partner: {
      isKurly: false,
      isSKT: false,
      name: '',
    },
    isUsingFreeTicket: false,
    freeTicket: {
      expiredAt: '',
      name: '',
      months: 0,
    },
    bannerMessage: {
      title: '',
      description: '',
    },
  },
  hasProfile: false,
  benefits: [],
  // 다음달 예상등급 데이터
  gradeInfo: {
    memberNo: 0,
    currentMonth: {
      level: 0,
      name: GradeName.Normal,
      description: '',
    },
    nextMonth: {
      level: 0,
      name: GradeName.Normal,
      description: '',
    },
    upgradeInfo: {
      paymentPriceSum: 0,
      orderPriceSum: 0,
      usedPointSum: 0,
      requireOrderPriceSum: 0,
      upgradeLevel: {
        level: 0,
        name: GradeName.Normal,
        description: '',
      },
    },
  },
  // 메타정보
  metadata: {
    segments: [],
  },
};

const { actions, reducer } = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setValue: (
      state,
      {
        payload,
      }: {
        payload:
          | { info: MemberInfo }
          | { pointBenefit: MemberPointBenefit }
          | { benefits: MemberBenefit[] }
          | { subscription: MemberSubscription }
          | { gradeInfo: MemberGradeInfo }
          | { metadata: MemberMetadata };
      },
    ) => ({ ...state, ...payload }),

    setMyKurlyStyleProfile: (draftState, { payload: hasProfile }) => {
      draftState.hasProfile = hasProfile;
    },
  },
});

export const { setValue, setMyKurlyStyleProfile } = actions;

export const loadMemberLoading = createSelector(
  ({ asyncRequest }: RootState) => asyncRequest.loadMemberInfo,
  ({ asyncRequest }: RootState) => asyncRequest.loadMemberPointBenefit,
  ({ asyncRequest }: RootState) => asyncRequest.loadMemberBenefits,
  ({ asyncRequest }: RootState) => asyncRequest.loadMemberSubscriptionInfo,
  ({ asyncRequest }: RootState) => asyncRequest.loadMemberMetadata,
  (loadMemberInfo, loadMemberPointBenefit, loadMemberBenefits, loadMemberSubscriptionInfo, loadMemberMetadata) =>
    loadMemberInfo.status === AsyncStatus.PENDING ||
    loadMemberPointBenefit.status === AsyncStatus.PENDING ||
    loadMemberBenefits.status === AsyncStatus.PENDING ||
    loadMemberSubscriptionInfo.status === AsyncStatus.PENDING ||
    loadMemberMetadata.status === AsyncStatus.PENDING,
);

// 나의컬리스타일 프로필 등록여부 확인
export const loadMyKurlyStyleProfile = () => async (dispatch: Dispatch) => {
  const hasProfile = await getMyKurlyStyleProfile();
  dispatch(setMyKurlyStyleProfile(hasProfile));
};

// 정보 조회
export const loadMemberInfo = () =>
  requestHelper({
    request: 'loadMemberInfo',
    action: async (dispatch) => {
      const info = await getMemberInfo();

      dispatch(
        setValue({
          info,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 메타데이터 조회
export const loadMemberMetadata = () =>
  requestHelper({
    request: 'loadMemberMetadata',
    action: async (dispatch) => {
      const data = await getUserSegments();

      dispatch(
        setValue({
          metadata: {
            segments: data || [],
          },
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 적립률 조회
export const loadMemberPointBenefit = () =>
  requestHelper({
    request: 'loadMemberPointBenefit',
    action: async (dispatch) => {
      const pointBenefit = await getMemberPointBenefit();

      dispatch(
        setValue({
          pointBenefit,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 혜택 조회
export const loadMemberBenefits = () =>
  requestHelper({
    request: 'loadMemberBenefits',
    action: async (dispatch) => {
      const benefits = await getMemberBenefits();

      dispatch(
        setValue({
          benefits,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 회원 구독 정보 조회
export const loadMemberSubscriptionInfo = () =>
  requestHelper({
    request: 'loadMemberSubscriptionInfo',
    action: async (dispatch) => {
      const subscription = await getSubscriptionMembersInfo();

      dispatch(
        setValue({
          subscription,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 다음달 예상등급 정보 조회
export const loadMemberGradeInfo = () =>
  requestHelper({
    request: 'loadMemberGradeInfo',
    action: async (dispatch) => {
      const gradeInfo = await getMemberGradeInfo();

      dispatch(
        setValue({
          gradeInfo,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

export default reducer;
