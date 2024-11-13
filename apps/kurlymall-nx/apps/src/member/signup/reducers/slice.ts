import { createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { LinkForm, SignupForm, SignupFormError, Member } from '../interfaces';

import {
  hideLoading,
  notify,
  notifyAndCloseWebview,
  notifyAndFocus,
  notifyAndRedirectTo,
  showLoading,
} from '../../../shared/reducers/page';

import {
  requestLinkableAccounts,
  linkKakaoAccount,
  kakaoLogin,
  confirmDuplicateId,
  kakaoAccountInfomation,
  simpleSignup,
} from '../services';
import { isWebview, kakaoSignupGetDevice } from '../../../../util/window/getDevice';
import { setAccessToken } from '../../../shared/reducers/auth';
import { GoBackError } from '../../../shared/errors';
import { AppThunk } from '../../../shared/store';
import { getPageUrl, COMMON_PATH, ID_PLACEHOLDER_TEXT, NAME_PLACEHOLDER_TEXT } from '../../../shared/constant';
import { syncUserCartItems } from '../../../cart/shared/services/cart.service';
import { BaseApiResponse } from '../../../shared/interfaces';

export interface SocialState {
  socialLoginToken: string;
  link: {
    status: 'INITIAL' | 'SUCCESS' | 'FAIL';
    matchingData: string;
    members: Member[];
    form: LinkForm;
  };
  signup: {
    status: 'INITIAL' | 'SUCCESS' | 'FAIL';
    duplicate: boolean;
    form: SignupForm;
  };
}

export const initialState: SocialState = {
  socialLoginToken: '',
  link: {
    status: 'INITIAL',
    matchingData: '',
    members: [],
    form: {
      memberNo: '',
      password: '',
    },
  },
  signup: {
    status: 'INITIAL',
    duplicate: true,
    form: {
      id: '',
      name: '',
      addressInfomation: {
        roadAddress: '',
        lotNumberAddress: '',
        zipCode: '',
        zoneCode: '',
        addressDetail: '',
      },
      password: '',
      passwordConfirm: '',
      recommender: '',
      eventName: '',
    },
  },
};

const { actions, reducer } = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setValue: (state, { payload }) => ({ ...state, ...payload }),
    changeLinkForm: (state, { payload: form }) => ({
      ...state,
      link: {
        ...state.link,
        form: {
          ...state.link.form,
          [form.name]: form.value,
        },
      },
    }),
    changeSignupForm: (state, { payload: form }) => ({
      ...state,
      signup: {
        ...state.signup,
        form: {
          ...state.signup.form,
          [form.name]: form.value,
        },
      },
    }),
    updateSignupState: (state, { payload: status }) => ({
      ...state,
      signup: {
        ...state.signup,
        status,
      },
    }),
    successLinkAccount: (state, { payload: status }) => ({
      ...state,
      link: {
        ...state.link,
        status,
      },
    }),
    updateDuplicate: (state, { payload: duplicate }) => ({
      ...state,
      signup: {
        ...state.signup,
        duplicate,
      },
    }),
    initialSignupForm: (state, { payload: form }) => ({
      ...state,
      signup: {
        ...state.signup,
        form: {
          ...state.signup.form,
          ...form,
        },
      },
    }),
  },
});

export const {
  setValue,
  changeLinkForm,
  changeSignupForm,
  updateSignupState,
  successLinkAccount,
  updateDuplicate,
  initialSignupForm,
} = actions;

export const submitSignupForm =
  (params: { provider: string; errors: SignupFormError }): AppThunk =>
  async (dispatch, getState) => {
    const { provider, errors } = params;

    const { social } = getState();
    const { socialLoginToken, signup } = social;
    const { form, duplicate } = signup;

    const device = kakaoSignupGetDevice();

    // 아이디 미입력시
    if (!form.id || errors.id.minAndPattern) {
      dispatch(
        notifyAndFocus({
          message: ID_PLACEHOLDER_TEXT,
          documentId: 'id',
        }),
      );
      return;
    }

    // 중복 확인 하지 않았을 경우 or 중복확인 미 통과시
    if (duplicate) {
      dispatch(notify('아이디 중복 확인을 해주세요.'));
      dispatch(
        notifyAndFocus({
          message: '아이디 중복 확인을 해주세요.',
          documentId: 'id',
        }),
      );
      return;
    }

    // 이름 미 입력시
    if (!form.name) {
      dispatch(
        notifyAndFocus({
          message: NAME_PLACEHOLDER_TEXT,
          documentId: 'name',
        }),
      );
      return;
    }

    // 비밀번호 미입력 및 벨리데이션 미 통과시
    if (!form.password || errors.password.min || errors.password.consecutive || errors.password.pattern) {
      dispatch(
        notifyAndFocus({
          message: '비밀번호를 입력해 주세요.',
          documentId: 'password',
        }),
      );
      return;
    }

    // 비밀번호 확인 미 입력 및 비밀번호 확인 미 일치 시
    if (!form.passwordConfirm || errors.passwordConfirm) {
      dispatch(
        notifyAndFocus({
          message: '비밀번호를 한번 더 입력해 주세요.',
          documentId: 'passwordConfirm',
        }),
      );
      return;
    }

    dispatch(showLoading());

    try {
      await simpleSignup({
        provider,
        socialLoginToken,
        form,
        device,
      });
      const authData = await kakaoLogin({ provider, socialLoginToken });
      dispatch(setAccessToken(authData));
      dispatch(updateSignupState('SUCCESS'));
    } catch (err) {
      if (err instanceof GoBackError) {
        if (isWebview()) {
          dispatch(notifyAndCloseWebview((err as Error).message));
          return;
        }

        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: getPageUrl(COMMON_PATH.login),
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export const loadLinkableAccounts =
  (params: { provider: string }): AppThunk =>
  async (dispatch, getState) => {
    const { social } = getState();
    const { socialLoginToken } = social;

    try {
      const linkable = await requestLinkableAccounts({
        provider: params.provider,
        socialLoginToken,
      });
      dispatch(
        setValue({
          link: {
            ...linkable,
            form: {
              memberNo: linkable.members[0]?.number,
              password: '',
            },
          },
        }),
      );
    } catch (err) {
      if (err instanceof GoBackError) {
        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: getPageUrl(COMMON_PATH.login),
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }
  };

export const submitLinkForm =
  (params: { provider: string; form: LinkForm }): AppThunk =>
  async (dispatch, getState) => {
    const { social } = getState();
    const { socialLoginToken } = social;
    const { provider } = params;

    dispatch(showLoading());

    try {
      await linkKakaoAccount({ ...params, socialLoginToken });
      const authData = await kakaoLogin({ provider, socialLoginToken });

      // 장바구니 상품 연동
      await syncUserCartItems(authData.accessToken);

      dispatch(setAccessToken(authData));
      dispatch(successLinkAccount('SUCCESS'));
    } catch (err) {
      if (err instanceof GoBackError) {
        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: getPageUrl(COMMON_PATH.login),
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export const requestConfirmDuplicateId =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const { duplicate } = await confirmDuplicateId(id);

      dispatch(updateDuplicate(duplicate));
      if (duplicate) {
        dispatch(notify('이미 존재하는 아이디입니다.'));
        return;
      }
      dispatch(notify('사용하실 수 있는 아이디입니다!'));
    } catch (err) {
      const error = err as AxiosError<BaseApiResponse<{ message: string }>>;
      if (error.response?.status === 400) {
        dispatch(notify('세션 정보가 누락되었습니다. 페이지를 새로고침해주세요.'));
      } else {
        dispatch(notify(error.response?.data.message ?? '중복 확인에 실패 하였습니다. 다시 시도해 주세요!'));
      }
    }
  };

export const requestKakaoAccountInfomation =
  (params: { provider: string }): AppThunk =>
  async (dispatch, getState) => {
    const { social } = getState();
    const { socialLoginToken } = social;

    try {
      const form = await kakaoAccountInfomation({
        provider: params.provider,
        socialLoginToken,
      });

      dispatch(initialSignupForm(form));
      if (form.id) {
        dispatch(updateDuplicate(false));
      }
    } catch (err) {
      if (err instanceof GoBackError) {
        if (isWebview()) {
          dispatch(notifyAndCloseWebview((err as Error).message));
          return;
        }

        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: getPageUrl(COMMON_PATH.login),
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }
  };
export default reducer;
