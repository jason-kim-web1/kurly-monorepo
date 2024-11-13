import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { AppThunk } from '../../../shared/store';

import { hideLoading, notify, showAlert, showLoading } from '../../../shared/reducers/page';

import {
  findIdByEmail,
  findIdByPhone,
  findPasswordByEmail,
  findPasswordByPhone,
  resetPassword,
  sendMembersToEmail,
  sendVerificationNumber,
  sendVerificationNumberWithId,
} from '../services';
import { TIME_LIMIT_SECONDS } from '../constants';

import { IdByPhoneForm } from '../id/interfaces';
import { Member } from '../interfaces';
import { PasswordByEmailForm, PasswordByPhoneForm } from '../password/interfaces';
import {
  ExceededVerificationCountError,
  TokenExpiredError,
  TooManyRequestError,
  VerificationNumberExpiredError,
} from '../errors';
import { amplitudeService } from '../../../shared/amplitude';
import { FindIdFail, FindIdSuccess, FindPasswordFail, FindPasswordSuccess } from '../../../shared/amplitude/events';

export interface FindState {
  selectedTab: string;
  idByEmail: {
    status: 'INITIAL' | 'SUCCESS';
    form: {
      name: string;
      email: string;
    };
  };
  idByPhone: {
    status: 'INITIAL' | 'SENT' | 'SUCCESS' | 'EXCEED';
    endTime?: number;
  };
  passwordByPhone: {
    status: 'INITIAL' | 'SENT' | 'SUCCESS' | 'EXCEED';
    token: string;
    endTime?: number;
  };
  passwordByEmail: {
    email: string;
    status: 'INITIAL' | 'SUCCESS';
  };
  passwordResetForm: {
    status: 'INITIAL' | 'SUCCESS';
  };
  members: Member[];
  token: string;
  tokenStatus: 'INITIAL' | 'EXPIRED';
}

export const initialState: FindState = {
  selectedTab: '휴대폰 인증',
  idByEmail: {
    status: 'INITIAL',
    form: {
      name: '',
      email: '',
    },
  },
  idByPhone: {
    status: 'INITIAL',
  },
  passwordByPhone: {
    status: 'INITIAL',
    token: '',
  },
  passwordByEmail: {
    email: '',
    status: 'INITIAL',
  },
  passwordResetForm: {
    status: 'INITIAL',
  },
  members: [],
  token: '',
  tokenStatus: 'INITIAL',
};

const { actions, reducer } = createSlice({
  name: 'find',
  initialState,
  reducers: {
    selectTab: (state, { payload: selectedTab }) => ({
      ...state,
      selectedTab,
    }),
    updateIdByEmailForm: (state, { payload: form }) => ({
      ...state,
      idByEmail: {
        ...state.idByEmail,
        form,
      },
    }),
    updateEmail: (state, { payload: email }) => ({
      ...state,
      passwordByEmail: {
        ...state.passwordByEmail,
        email,
      },
    }),
    updateToken: (state, { payload: token }) => ({
      ...state,
      token,
    }),
    successFindIdByEmail: (state, { payload: members }) => ({
      ...state,
      members,
      idByEmail: {
        ...state.idByEmail,
        status: 'SUCCESS',
      },
    }),
    successFindIdByPhone: (state, { payload: members }) => ({
      ...state,
      members,
      idByPhone: {
        ...state.idByPhone,
        status: 'SUCCESS',
      },
    }),
    successFindPasswordByPhone: (state, { payload: token }) => ({
      ...state,
      passwordByPhone: {
        ...state.passwordByPhone,
        status: 'SUCCESS',
        token,
      },
    }),
    successFindPasswordByEmail: (state) => ({
      ...state,
      passwordByEmail: {
        ...state.passwordByEmail,
        status: 'SUCCESS',
      },
    }),
    successResetPassword: (state) => ({
      ...state,
      passwordResetForm: {
        ...state.passwordResetForm,
        status: 'SUCCESS',
      },
    }),
    exceedFindIdVerificationCount: (state) => ({
      ...state,
      idByPhone: {
        ...initialState.idByPhone,
        status: 'EXCEED',
      },
    }),
    exceedFindPasswordVerificationCount: (state) => ({
      ...state,
      passwordByPhone: {
        ...initialState.passwordByPhone,
        status: 'EXCEED',
      },
    }),
    expiredToken: (state) => ({
      ...state,
      tokenStatus: 'EXPIRED',
    }),
    clear: () => ({
      ...initialState,
    }),
    clearStatus: (state) => ({
      ...initialState,
      idByEmail: {
        ...initialState.idByEmail,
        form: state.idByEmail.form,
      },
      passwordByEmail: {
        ...initialState.passwordByEmail,
        email: state.passwordByEmail.email,
      },
      members: state.members,
    }),
    clearTokenStatus: (state) => ({
      ...state,
      tokenStatus: initialState.tokenStatus,
    }),
    sentVerificationNumber: (state) => ({
      ...state,
      idByPhone: {
        ...initialState.idByPhone,
        status: 'SENT',
        endTime: moment().add(TIME_LIMIT_SECONDS, 'seconds').valueOf(),
      },
    }),
    sentVerificationNumberWithId: (state) => ({
      ...state,
      passwordByPhone: {
        ...initialState.passwordByPhone,
        status: 'SENT',
        endTime: moment().add(TIME_LIMIT_SECONDS, 'seconds').valueOf(),
      },
    }),
  },
});

export const {
  selectTab,
  updateIdByEmailForm,
  updateEmail,
  updateToken,
  successFindIdByEmail,
  successFindIdByPhone,
  successResetPassword,
  exceedFindIdVerificationCount,
  exceedFindPasswordVerificationCount,
  expiredToken,
  clear,
  clearStatus,
  clearTokenStatus,
  sentVerificationNumber,
  sentVerificationNumberWithId,
  successFindPasswordByPhone,
  successFindPasswordByEmail,
} = actions;

export const submitFindIdByEmail =
  (form: { name: string; email: string }): AppThunk =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const { members } = await findIdByEmail(form);
      dispatch(updateIdByEmailForm(form));
      dispatch(successFindIdByEmail(members));
      amplitudeService.logEvent(new FindIdSuccess({ authenticationMethod: 'email' }));
    } catch (err) {
      amplitudeService.logEvent(new FindIdFail({ authenticationMethod: 'email' }));
      dispatch(notify((err as Error).message));
    }

    dispatch(hideLoading());
  };

export const submitFindIdByPhone =
  (form: IdByPhoneForm): AppThunk =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const { members } = await findIdByPhone(form);
      dispatch(successFindIdByPhone(members));
      amplitudeService.logEvent(new FindIdSuccess({ authenticationMethod: 'mobile' }));
    } catch (err) {
      amplitudeService.logEvent(new FindIdFail({ authenticationMethod: 'mobile' }));
      if (err instanceof ExceededVerificationCountError) {
        dispatch(exceedFindIdVerificationCount());
        dispatch(
          showAlert({
            message: `최대 인증 시도 횟수를 초과했어요.
내일 다시 시도해 주세요.`,
          }),
        );
      }
      if (err instanceof VerificationNumberExpiredError) {
        dispatch(
          showAlert({
            message: `유효 시간이 만료되었습니다.
재발송 후 다시 시도해 주세요.`,
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export const submitFindPasswordByPhone =
  (form: PasswordByPhoneForm): AppThunk =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = await findPasswordByPhone({
        phone: form.phone,
        verificationNumber: form.verificationNumber,
      });
      dispatch(successFindPasswordByPhone(token));
      amplitudeService.logEvent(new FindPasswordSuccess({ authenticationMethod: 'mobile' }));
    } catch (err) {
      amplitudeService.logEvent(new FindPasswordFail({ authenticationMethod: 'mobile' }));
      if (err instanceof ExceededVerificationCountError) {
        dispatch(exceedFindPasswordVerificationCount());
        dispatch(
          showAlert({
            message: `최대 인증 시도 횟수를 초과했어요.
내일 다시 시도해 주세요.`,
          }),
        );
      }
      if (err instanceof VerificationNumberExpiredError) {
        dispatch(
          showAlert({
            message: `유효 시간이 만료되었습니다.
재발송 후 다시 시도해 주세요.`,
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export const submitFindPasswordByEmail =
  (form: PasswordByEmailForm): AppThunk =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      await findPasswordByEmail(form);
      dispatch(updateEmail(form.email));
      dispatch(successFindPasswordByEmail());
      amplitudeService.logEvent(new FindPasswordSuccess({ authenticationMethod: 'email' }));
    } catch (err) {
      amplitudeService.logEvent(new FindPasswordFail({ authenticationMethod: 'email' }));
      dispatch(notify((err as Error).message));
    }

    dispatch(hideLoading());
  };

export const submitPasswordResetForm =
  (password: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(showLoading());

    const { find } = getState();
    const { token } = find;

    try {
      await resetPassword({
        token,
        password,
      });
      dispatch(successResetPassword());
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        dispatch(expiredToken());
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export const requestVerificationNumber =
  (form: IdByPhoneForm): AppThunk =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      await sendVerificationNumber(form);
      dispatch(sentVerificationNumber());
    } catch (err) {
      if (err instanceof TooManyRequestError) {
        dispatch(
          showAlert({
            message: `재발송 요청이 너무 빠릅니다.
잠시 후 다시 시도해 주세요.`,
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export const requestToSendMembersByEmail = (): AppThunk => async (dispatch, getState) => {
  dispatch(showLoading());

  const { find } = getState();

  try {
    await sendMembersToEmail(find.idByEmail.form);
    dispatch(
      showAlert({
        message: `가입하신 이메일로 아이디가 발송되었습니다. 메일을 받지 못하셨다면 스팸함을 확인해 보세요.

* 휴대폰 인증으로 아이디 찾기 시에도 전체 아이디 확인이 가능해요.`,
      }),
    );
  } catch (err) {
    if (err instanceof TooManyRequestError) {
      dispatch(
        showAlert({
          message: `재발송 요청이 너무 빠릅니다.
잠시 후 다시 시도해 주세요.`,
        }),
      );
    } else {
      dispatch(notify((err as Error).message));
    }
  }

  dispatch(hideLoading());
};

export const requestVerificationNumberWithId =
  (params: { id: string; phone: string }): AppThunk =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      await sendVerificationNumberWithId(params);
      dispatch(sentVerificationNumberWithId());
    } catch (err) {
      if (err instanceof TooManyRequestError) {
        dispatch(
          showAlert({
            message: `재발송 요청이 너무 빠릅니다.
잠시 후 다시 시도해 주세요.`,
          }),
        );
      } else {
        dispatch(notify((err as Error).message));
      }
    }

    dispatch(hideLoading());
  };

export default reducer;
