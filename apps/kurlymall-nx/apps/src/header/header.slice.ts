import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { AppState, AppThunk } from '../shared/store';

import { getUserNotification } from './services/notification.service';

import { Menu, UserNotification } from './interfaces';

import { USER_MENUS } from './constants';

import { AdBannersResponse, BannerAccountType, initialAdBanner } from '../shared/interfaces/AdBannerResponse';
import { getDaBanner } from './services/banner.service';

interface Panel {
  imageUrl: string;
  name: string;
  quantity: number;
  isInCart: boolean;
}

export interface HeaderState {
  searchWord: string;
  topBanner: AdBannersResponse;
  userNotification: UserNotification;
  userMenus: Menu[];
  cartItemPanel: Panel;
  openCartItemPanel: boolean;
  mobileHeaderHeight: number;
}

export const initialState: HeaderState = {
  searchWord: '',
  topBanner: initialAdBanner,
  userNotification: {
    hasNew: false,
    badge: {
      coupon: false,
      friendsInvite: false,
      member: false,
      profile: false,
      kurlypay: false,
      kurlyMembers: false,
      vip: false,
    },
  },
  userMenus: USER_MENUS,
  cartItemPanel: {
    imageUrl: '',
    name: '',
    quantity: 0,
    isInCart: false,
  },
  openCartItemPanel: false,
  mobileHeaderHeight: 0,
};

const updateBadge = (title: string) => (hasNew: boolean) => (it: Menu) => it.title === title ? { ...it, hasNew } : it;

const { actions, reducer } = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeSearchWord: (state, { payload: searchWord }) => ({
      ...state,
      searchWord,
    }),
    setTopBanner: (state, { payload: topBanner }) => ({ ...state, topBanner }),
    setUserNotification: (state, { payload: userNotification }) => ({
      ...state,
      userNotification,
      userMenus: state.userMenus
        .map(updateBadge('쿠폰')(userNotification.badge.coupon))
        .map(updateBadge('결제수단 · 컬리페이')(userNotification.badge.kurlypay))
        .map(updateBadge('나의 컬리 스타일')(userNotification.badge.profile))
        .map(updateBadge('컬리멤버스')(userNotification.badge.kurlyMembers))
        .map(updateBadge('VIP제도 안내')(userNotification.badge.vip)),
    }),
    setUserMenus: (state, { payload: userMenus }) => ({ ...state, userMenus }),
    setCartItemPanel: (state, { payload: cartItemPanel }) => ({
      ...state,
      cartItemPanel,
    }),
    setOpenCartItemPanel(state, { payload: open }) {
      state.openCartItemPanel = open;
    },
    setMobileHeaderHeight: (state, { payload: mobileHeaderHeight }) => ({
      ...state,
      mobileHeaderHeight,
    }),
  },
});

export const {
  changeSearchWord,
  setTopBanner,
  setUserNotification,
  setUserMenus,
  setCartItemPanel,
  setOpenCartItemPanel,
  setMobileHeaderHeight,
} = actions;

export const loadTopBanner =
  (params: BannerAccountType): AppThunk =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    const {
      header: { topBanner },
    } = getState();

    if (topBanner.daBannerAccount === params) {
      return;
    }

    try {
      const banner = await getDaBanner(params);
      if (banner) {
        dispatch(setTopBanner(banner));
      }
    } catch (e) {
      dispatch(setTopBanner(initialAdBanner));
    }
  };

export const loadUserNotification = (): AppThunk => async (dispatch) => {
  try {
    const notification = await getUserNotification();
    dispatch(setUserNotification(notification));
  } catch {
    // Do nothing
    // 사용자의 알림을 불러오지 못했다고 하더라도, 컬리몰을 이용하는데 지장이 없으므로
    // 에러를 무시 합니다.
  }
};

export default reducer;
