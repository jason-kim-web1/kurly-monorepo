import { createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

import { fetchSession, putSession } from '../api/auth/token';

import { UnauthenticatedError } from '../errors';

import { getGuestToken, getSession } from '../services';
import { redirectToLogin, wrongApproach } from './page';
import { AppState } from '../store';
import { LoginFormInterface } from '../../member/login/pc/interfaces/loginForm.interface';
import { InputEventType, TouchEventType } from '../../member/signup/interfaces/NormalSignupForm.interface';

export interface AuthState {
  accessToken: string;
  isGuest: boolean;
  uid: string;
  hasSession: boolean;
  loginFailCount: number;
  loginForm: LoginFormInterface & { checkboxSaveID: boolean };
  // accessToken 은 업데이트하지만 회원정보등 필요 없는 경우 사용
  preventFetchingMemberData: boolean;
}

interface AccessTokenPayload {
  accessToken: string;
  isGuest: boolean;
  uid?: string;
  isExpired?: boolean;
  loginFailCount?: number;
  preventFetchingMemberData?: boolean;
}

export const initialState: AuthState = {
  accessToken: '',
  isGuest: true,
  uid: '',
  hasSession: false,
  loginFailCount: 0,
  loginForm: {
    id: '',
    password: '',
    captcha: '',
    checkboxSaveID: true,
  },
  preventFetchingMemberData: false,
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: { payload: AccessTokenPayload }) => ({
      ...state,
      ...payload,
      hasSession: true,
    }),
    setLoginForm: (
      state,
      {
        payload,
      }: {
        payload: InputEventType | TouchEventType;
      },
    ) => ({
      ...state,
      loginForm: {
        ...state.loginForm,
        [payload.name]: payload.value,
      },
    }),
    clearLoginForm: (state) => ({
      ...state,
      loginForm: {
        ...state.loginForm,
        id: '',
        password: '',
        captcha: '',
      },
    }),
    setLoginFailCount: (state, { payload }: { payload: number }) => ({
      ...state,
      loginFailCount: payload,
    }),
  },
});

export const { setAccessToken, setLoginForm, setLoginFailCount, clearLoginForm } = actions;

export const loadGuestAuth = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const { auth } = getState();
  if (auth.accessToken) {
    return;
  }

  try {
    const data = await getGuestToken();
    dispatch(setAccessToken(data));
  } catch (err) {
    dispatch(wrongApproach(err.message));
  }
};

export const loadAuth = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const { auth } = getState();
  if (auth.accessToken) {
    return;
  }

  try {
    const { accessToken, isGuest, uid } = await getSession();
    dispatch(
      setAccessToken({
        accessToken,
        isGuest,
        uid,
      }),
    );
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      dispatch(redirectToLogin());
      return;
    }

    dispatch(wrongApproach(err.message));
  }
};

export const loadSession = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const { auth } = getState();
  if (auth.accessToken) {
    return;
  }

  try {
    const data = await fetchSession();
    dispatch(setAccessToken(data));
  } catch {
    // Do nothing
  }
};

export const syncSession = (jwt: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  const { auth } = getState();
  if (auth.accessToken) {
    return;
  }

  try {
    const data = await putSession(jwt);
    dispatch(setAccessToken(data));
  } catch {
    // Do nothing
  }
};

export const refreshSession = (callback?: () => void) => async (dispatch: Dispatch) => {
  try {
    const data = await fetchSession();
    dispatch(setAccessToken(data));

    if (callback) {
      callback();
    }
  } catch {
    // Do nothing
  }
};

export default reducer;
