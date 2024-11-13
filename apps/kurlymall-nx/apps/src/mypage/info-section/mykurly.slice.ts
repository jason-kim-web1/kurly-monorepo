import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { AppThunk } from '../../shared/store';
import { MypageGiftCardInfo, MypagePointInfo, VipInfo } from '../../shared/interfaces';
import { AdBannersResponse } from '../../shared/interfaces/AdBannerResponse';

import { getMemberMykurlyInfo } from '../../shared/services';
import { getMyKurlyDaBanner } from '../../header/services/banner.service';
import { isPC } from '../../../util/window/getDevice';
import { Grade } from '../../shared/enums';

export interface MyKurlyState {
  loading: boolean;
  isMyKurlyLoaded: boolean;
  userName: string | null;
  userGrade: Grade | null;
  userGradeName: string | null;
  mykurlyBanner: AdBannersResponse | null;
  recommendMenu: AdBannersResponse | null;
  membersMenu: AdBannersResponse | null;
  couponCount: number;
  pickCount: number;
  freePoint: MypagePointInfo;
  prepaidPoint: MypagePointInfo;
  giftCard: MypageGiftCardInfo;
  vipInfo: VipInfo | null;
  isKurlypayFailure: boolean;
  isKurlyPassEnabled: boolean;
}

export const initialState: MyKurlyState = {
  loading: false,
  isMyKurlyLoaded: false,
  userName: null,
  userGrade: null,
  userGradeName: null,
  mykurlyBanner: null,
  recommendMenu: null,
  membersMenu: null,
  couponCount: 0,
  pickCount: 0,
  freePoint: {
    point: 0,
    redirectUrl: '',
  },
  prepaidPoint: {
    point: 0,
    redirectUrl: '',
  },
  giftCard: {
    count: 0,
    benefitMessage: '',
    redirectUrl: '',
  },
  vipInfo: null,
  isKurlypayFailure: false,
  isKurlyPassEnabled: false,
};

const { actions, reducer } = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyKurlyLoaded: (state, action) => {
      state.isMyKurlyLoaded = action.payload;
    },
    setMyKurlyBanner: (state, { payload: mykurlyBanner }) => ({ ...state, mykurlyBanner }),
    setRecommendMenu: (state, { payload: recommendMenu }) => ({ ...state, recommendMenu }),
    setMembersMenu: (state, { payload: membersMenu }) => ({ ...state, membersMenu }),
    setMyKurlyInfo: (state, action) => {
      const {
        userName,
        userGrade,
        userGradeName,
        couponCount,
        pickCount,
        freePoint,
        prepaidPoint,
        giftCard,
        vipInfo,
        isKurlypayFailure,
        isKurlyPassEnabled,
      } = action.payload;
      state.userName = userName;
      state.userGrade = userGrade;
      state.userGradeName = userGradeName;
      state.couponCount = couponCount;
      state.pickCount = pickCount;
      state.freePoint = freePoint;
      state.prepaidPoint = prepaidPoint;
      state.giftCard = giftCard;
      state.vipInfo = vipInfo;
      state.isKurlypayFailure = isKurlypayFailure;
      state.isKurlyPassEnabled = isKurlyPassEnabled;
    },
  },
});

export const { setLoading, setMyKurlyLoaded, setMyKurlyBanner, setRecommendMenu, setMembersMenu, setMyKurlyInfo } =
  actions;

const BANNER_TYPE: Record<string, string> = {
  RECOMMENDATION: 'recommendMenu',
  KURLY_MEMBERS_MENU: 'membersMenu',
  MYKURLY_BANNER: 'agentBanner',
};

interface Props {
  isSubscribed: boolean;
  vipInfoName: string;
  userGrade: Grade;
}

export const loadMyKurlyBanner =
  ({ isSubscribed, vipInfoName, userGrade }: Props): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const banners = await getMyKurlyDaBanner();

    // TODO 추후 로직 개선 필요..
    const myKurlyBanners = banners.reduce((acc: { [key: string]: AdBannersResponse }, banner: AdBannersResponse) => {
      const { daBannerAccount } = banner;

      const daBannerDeviceCheck = `MY_KURLY_${isPC ? 'PC' : 'MOBILE'}`;

      const isKurlyBanner = daBannerAccount.startsWith(daBannerDeviceCheck);

      const isVip = vipInfoName
        ? daBannerAccount.startsWith(`${daBannerDeviceCheck}_KURLY_${vipInfoName}`)
        : !daBannerAccount.includes('VIP');

      const isMembers = isSubscribed
        ? daBannerAccount.includes('KURLY_MEMBERS_BANNER')
        : !daBannerAccount.includes('KURLY_MEMBERS_BANNER');

      const isGradeCheck =
        userGrade === Grade.Welcome ? !daBannerAccount.includes('NORMAL') : !daBannerAccount.includes('WELCOME');

      const shouldIncludeBanner =
        isKurlyBanner &&
        isVip &&
        (vipInfoName ? !daBannerAccount.includes('KURLY_MEMBERS_BANNER') : isMembers) &&
        isGradeCheck;

      if (shouldIncludeBanner || !isKurlyBanner) {
        const key = shouldIncludeBanner ? BANNER_TYPE.MYKURLY_BANNER : BANNER_TYPE[daBannerAccount];

        return {
          ...acc,
          [key]: banner,
        };
      }

      return acc;
    }, {});

    const { agentBanner, recommendMenu, membersMenu } = myKurlyBanners;

    if (agentBanner) {
      dispatch(setMyKurlyBanner(agentBanner));
    }
    dispatch(setRecommendMenu(recommendMenu));
    dispatch(setMembersMenu(membersMenu));

    dispatch(setMyKurlyLoaded(true));
    dispatch(setLoading(false));
  };

export const loadMyKurlyInfo = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));

  const myKurlyData = await getMemberMykurlyInfo();

  dispatch(
    setMyKurlyInfo({
      userName: myKurlyData.userName,
      userGrade: myKurlyData.userGrade,
      userGradeName: myKurlyData.userGradeName,
      couponCount: myKurlyData.couponCount,
      pickCount: myKurlyData.pickCount,
      freePoint: myKurlyData.freePoint,
      prepaidPoint: myKurlyData.prepaidPoint,
      giftCard: myKurlyData.giftCard,
      vipInfo: myKurlyData.vipInfo,
      isKurlypayFailure: myKurlyData.isKurlypayFailure,
      isKurlyPassEnabled: myKurlyData.isKurlyPassEnabled,
    }),
  );
  dispatch(setMyKurlyLoaded(true));
  dispatch(setLoading(false));
};

export default reducer;
