import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { UserTerms } from '../shared/interfaces/UserTerms';
import { fetchUserTerms, fetchEachUserTerms } from '../shared/api/user-terms/terms';
import { UnknownError } from '../shared/errors';
import { AppThunk } from '../shared/store';
import { UserTermsType } from '../shared/interfaces/UserTerms';

export interface UserTermsState {
  userTermsItem: UserTerms;
  details?: string;
  selectedVersion: number;
}

const initialState: UserTermsState = {
  userTermsItem: [],
  selectedVersion: 0,
};

const { actions, reducer } = createSlice({
  name: 'user-terms',
  initialState,
  reducers: {
    setVersion: (draftState, action: PayloadAction<number>) => {
      draftState.selectedVersion = action.payload;
    },
    setUserTerms: (draftState, action: PayloadAction<UserTerms>) => {
      draftState.userTermsItem = action.payload;
    },
    setUserTermsDetails: (draftState, action: PayloadAction<string>) => {
      draftState.details = action.payload;
    },
  },
});

export const { setVersion, setUserTerms, setUserTermsDetails } = actions;

export const getUserTermsDetails =
  (terms: UserTermsType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const {
        userTerms: { selectedVersion, userTermsItem },
      } = getState();
      const majorVersion = selectedVersion;
      const selectMinorVersion = userTermsItem.find((eachUserTerms) => eachUserTerms.majorVersion === majorVersion);

      if (!selectMinorVersion) {
        throw new Error('약관을 불러올 수 없습니다.');
      }

      const minorVersion = selectMinorVersion?.minorVersion;

      if (majorVersion && minorVersion) {
        const { content } = await fetchEachUserTerms({
          terms,
          majorVersion,
          minorVersion,
        });

        dispatch(setUserTermsDetails(content));
      }
    } catch (e) {
      throw new UnknownError(e);
    }
  };

export const getUserTerms =
  (terms: UserTermsType): AppThunk =>
  async (dispatch) => {
    try {
      const userTerms = await fetchUserTerms(terms);
      const majorVersion = userTerms[0]?.majorVersion ?? 0;

      dispatch(setUserTerms(userTerms));
      dispatch(setVersion(majorVersion));
      dispatch(getUserTermsDetails(terms));
    } catch (e) {
      throw new UnknownError(e);
    }
  };

export { reducer as userTermsReducer };
