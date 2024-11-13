import { createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

import { AppThunk } from '../store';

export interface AddressState {
  status: {
    changed: boolean;
    added: boolean;
  };
}

export const initialState: AddressState = {
  status: {
    changed: false,
    added: false,
  },
};

const { actions, reducer } = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setStatus: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setStatus } = actions;

export const getAddressStatus = () => (dispatch: Dispatch) => {
  const changed = sessionStorage.getItem('hasChanged') === 'YES';
  const added = sessionStorage.getItem('hasRegistered') === 'YES';

  dispatch(
    setStatus({
      status: {
        added,
        changed,
      },
    }),
  );
};

export const initAddressStatus = (): AppThunk => (dispatch) => {
  sessionStorage.removeItem('hasChanged');
  sessionStorage.removeItem('hasRegistered');

  dispatch(
    setStatus({
      status: {
        added: false,
        changed: false,
      },
    }),
  );
};

export default reducer;
