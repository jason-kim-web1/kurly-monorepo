import { createSlice } from '@reduxjs/toolkit';

import { AppThunk } from '../store';

import {
  fetchPersonalInformationTermsHTML,
  fetchPgTermsHTML,
  fetchKurlyTermsHTML,
  fetchTermsOfUse,
  fetchPrivacyPolicy,
  fetchPrivacyPolicyOptional,
  getFile,
} from '../api';
import { notify } from './page';

interface TermsFile {
  key: string;
  html: string;
  status: 'success' | 'error';
}

export interface TermsState {
  personalInformationTermsHTML: string;
  pgTermsHTML: string;
  kurlyTermsHTML: string;
  termsOfUseHTML: string;
  privacyPolicyHTML: string;
  privacyPolicyOptionalHTML: string;
  termsFile?: TermsFile[];
}

export const initialState: TermsState = {
  personalInformationTermsHTML: '',
  pgTermsHTML: '',
  kurlyTermsHTML: '',
  termsOfUseHTML: '',
  privacyPolicyHTML: '',
  privacyPolicyOptionalHTML: '',
  termsFile: [],
};

const { actions, reducer } = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    setValue: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setValue } = actions;

export const loadTermsFile =
  (params: { key: string; url: string }): AppThunk =>
  async (dispatch, getState) => {
    const {
      terms: { termsFile = [] },
    } = getState();

    const isAlreadyOpened = termsFile?.find(({ key }) => key === params.key);
    if (isAlreadyOpened) {
      return;
    }

    try {
      const html = await getFile(params.url);

      dispatch(
        setValue({
          termsFile: [
            ...termsFile,
            {
              key: params.key,
              html,
              status: 'success',
            },
          ],
        }),
      );
    } catch (e) {
      dispatch(
        setValue({
          termsFile: [
            ...termsFile,
            {
              key: params.key,
              html: undefined,
              status: 'error',
            },
          ],
        }),
      );

      console.error(e);

      dispatch(notify('일시적인 장애가 발생했어요. 새로고침 후 다시 시도해주세요.'));
    }
  };

export const loadPersonalInformationTerms = (): AppThunk => async (dispatch, getState) => {
  const { terms } = getState();
  if (terms.personalInformationTermsHTML) {
    return;
  }

  const html = await fetchPersonalInformationTermsHTML();
  dispatch(setValue({ personalInformationTermsHTML: html }));
};

export const loadPgTermsHTML = (): AppThunk => async (dispatch, getState) => {
  const { terms } = getState();
  if (terms.pgTermsHTML) {
    return;
  }

  const html = await fetchPgTermsHTML();
  dispatch(setValue({ pgTermsHTML: html }));
};

export const loadKurlyTermsHTML = (): AppThunk => async (dispatch, getState) => {
  const { terms } = getState();
  if (terms.kurlyTermsHTML) {
    return;
  }

  const html = await fetchKurlyTermsHTML();
  dispatch(setValue({ kurlyTermsHTML: html }));
};

export const loadTermsOfUseHTML = (): AppThunk => async (dispatch, getState) => {
  const { terms } = getState();
  if (terms.termsOfUseHTML) {
    return;
  }

  const html = await fetchTermsOfUse();
  dispatch(setValue({ termsOfUseHTML: html }));
};

export const loadPrivacyPolicyHTML = (): AppThunk => async (dispatch, getState) => {
  const { terms } = getState();
  if (terms.privacyPolicyHTML) {
    return;
  }

  const html = await fetchPrivacyPolicy();
  dispatch(setValue({ privacyPolicyHTML: html }));
};

export const loadPrivacyPolicyOptionalHTML = (): AppThunk => async (dispatch, getState) => {
  const { terms } = getState();
  if (terms.privacyPolicyOptionalHTML) {
    return;
  }

  const html = await fetchPrivacyPolicyOptional();
  dispatch(setValue({ privacyPolicyOptionalHTML: html }));
};

export default reducer;
