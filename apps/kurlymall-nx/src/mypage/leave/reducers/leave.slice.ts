import { createSlice } from '@reduxjs/toolkit';

import { InputEventType, ReasonCodeInterface } from '../interface/Leave.interface';
import { AppThunk } from '../../../shared/store';

export interface LeaveState {
  form: {
    password: string;
    reasonComment: string;
  };
  reasonCodes: Array<string>;
  reasonCode: ReasonCodeInterface;
  isKurlyPay: boolean;
  isKurlyMembers: boolean;
}

export const initialState: LeaveState = {
  form: {
    password: '',
    reasonComment: '',
  },
  reasonCodes: [],
  reasonCode: {
    name: '무엇이 불편하였나요?',
    value: '',
  },
  isKurlyPay: false,
  isKurlyMembers: false,
};

const { actions, reducer } = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    clear: () => ({ ...initialState }),
    setLeaveForm: (state, { payload: form }: { payload: InputEventType }) => ({
      ...state,
      form: {
        ...state.form,
        [form.name]: form.value,
      },
    }),
    setReasonCodes: (state, { payload: reasonCodes }) => ({
      ...state,
      reasonCodes,
    }),
    setReasonCode: (state, { payload: reasonCode }) => ({
      ...state,
      reasonCode,
    }),
    setActiveKurlyPay: (state, { payload: isKurlyPay }) => ({
      ...state,
      isKurlyPay,
    }),
    setActiveKurlyMembers: (state, { payload: isKurlyMembers }) => ({
      ...state,
      isKurlyMembers,
    }),
  },
});

export const { clear, setLeaveForm, setReasonCodes, setReasonCode, setActiveKurlyPay, setActiveKurlyMembers } = actions;

export const handleChange =
  (event: InputEventType): AppThunk =>
  async (dispatch) => {
    dispatch(setLeaveForm(event));
  };

export default reducer;
