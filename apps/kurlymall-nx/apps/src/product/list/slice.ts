import { createSlice } from '@reduxjs/toolkit';

import { SearchResultSelectionTypeValue } from '../../search/shared/constants';

import { AppThunk } from '../../shared/store';

export interface ProductListState {
  isUnset: boolean;
  queryId: string;
  searchSelectionType?: SearchResultSelectionTypeValue;
}

export const initialState: ProductListState = {
  isUnset: false,
  queryId: '',
};

const { actions, reducer } = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setIsUnset: (state, { payload: isUnset }) => ({
      ...state,
      isUnset,
    }),
    setQueryId: (state, { payload: queryId }) => ({
      ...state,
      queryId,
    }),
    setSearchSelectionType: (state, { payload: searchSelectionType }) => ({
      ...state,
      searchSelectionType,
    }),
  },
});

export const { setQueryId, setSearchSelectionType } = actions;

export const unsetUpdate =
  (isUnset: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(actions.setIsUnset(isUnset));
  };

export default reducer;
