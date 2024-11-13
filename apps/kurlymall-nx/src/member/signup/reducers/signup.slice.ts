import { createSlice } from '@reduxjs/toolkit';

import { NormalSignupFormInterface } from '../interfaces/NormalSignupForm.interface';

export interface SignupState {
  tempForm?: NormalSignupFormInterface;
}

export const initialState: SignupState = {};

const { actions, reducer } = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    syncTempForm: (_, { payload }) => ({ tempForm: payload }),
  },
});

export const { syncTempForm } = actions;

export default reducer;
