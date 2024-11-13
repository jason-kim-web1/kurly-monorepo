import { createSlice } from '@reduxjs/toolkit';

import { InputEventType, BulkOrderFormInterface, initialFormValues } from '../interfaces/BulkOrderForm.interface';
import { AppThunk } from '../../../shared/store';

export interface BulkOrderState {
  form: BulkOrderFormInterface;
}

export const initialState: BulkOrderState = {
  form: initialFormValues,
};

const { actions, reducer } = createSlice({
  name: 'bulkOrder',
  initialState,
  reducers: {
    clear: () => ({ ...initialState }),
    setBulkOrderForm: (state, { payload: form }: { payload: InputEventType }) => ({
      ...state,
      form: {
        ...state.form,
        [form.name]: form.value,
      },
    }),
    setTermCheckState: (state, { payload: agreePrivacyUse }: { payload: boolean }) => ({
      ...state,
      form: {
        ...state.form,
        agreePrivacyUse,
      },
    }),
  },
});

export const { setBulkOrderForm, setTermCheckState, clear } = actions;

export const handleChange =
  (event: InputEventType): AppThunk =>
  async (dispatch) => {
    dispatch(setBulkOrderForm(event));
  };

export default reducer;
