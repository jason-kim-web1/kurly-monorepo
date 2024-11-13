import { createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

import { fetchKakao } from '../api';

import { DialogCode } from '../services';

export interface InquiryKakaoState {
  cancelButtonTitle: string;
  code: DialogCode;
  confirmFlag: boolean;
  message: string;
  okButtonActionUrl: string;
  okButtonTitle: string;
  title: string;
  isKakaoUrl: boolean;
}

export const initialState: InquiryKakaoState = {
  cancelButtonTitle: '',
  code: 'WVD1000',
  confirmFlag: false,
  message: '',
  okButtonActionUrl: '',
  okButtonTitle: '',
  title: '',
  isKakaoUrl: false,
};

const { actions, reducer } = createSlice({
  name: 'inquirykakao',
  initialState,
  reducers: {
    setKakao: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setKakao } = actions;

export const loadInquiryKakao = () => async (dispatch: Dispatch) => {
  const alreadyCalledInquiryKakao = null; // TODO 세림님

  if (alreadyCalledInquiryKakao) {
    return;
  }

  const inquiryKakao = await fetchKakao();

  dispatch(setKakao(inquiryKakao));
};

export default reducer;
