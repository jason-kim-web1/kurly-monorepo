import { createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

import {
  getPrivacyPolicy,
  getMyInfo,
  getProfile,
  getRecommendProduct,
} from '../../shared/services/myKurlyStyle.service';
import { PrivacyPolicy, MyKurlyStyle, Profile, RecommendProducts } from '../../shared/interfaces/MyKurlyStyle';
import { GenderType } from '../../shared/interfaces/GenderType';
import { PrivacyPolicyStatus, PrivacyPolicyStatusType } from '../../shared/interfaces/PrivacyPolicyStatusType';

export interface MyKurlyStyleState {
  privacyPolicy: PrivacyPolicy;
  myKurlyStyleInformation: MyKurlyStyle;
  profile: Profile;
  originalProfile: string;
  recommendProduct: RecommendProducts;
  checkedState: boolean;
  loading: boolean;
}

const DEFAULT_MY_KURLY_STYLE = {
  birthYear: null,
  gender: null,
  hasToddler: false,
  openProfile: true,
  privacyPolicyStatus: PrivacyPolicyStatus.AGREE,
  sites: [],
};

const initialState: MyKurlyStyleState = {
  privacyPolicy: {
    description: '',
    items: '',
    period: '',
    purpose: '',
  },
  myKurlyStyleInformation: {
    ...DEFAULT_MY_KURLY_STYLE,
  },
  profile: {
    id: '',
    name: '',
    hasProfile: false,
    description: '',
    thumbnailImages: [
      {
        type: '',
        url: '',
      },
    ],
    categories: [
      {
        id: '',
        name: '',
        title: '',
        description: '',
        inputType: '',
        textLayout: null,
        selectLayout: {
          min: 0,
          max: 0,
          templateTypes: {
            hasNotProfile: 'BUTTON',
            hasProfile: 'BUTTON',
          },
        },
        segments: [
          {
            id: '',
            name: '',
            description: null,
            thumbnailImages: null,
            selected: false,
          },
        ],
      },
    ],
  },
  originalProfile: '',
  recommendProduct: {
    memberName: '',
    products: [],
  },
  checkedState: true,
  loading: true,
};

const { actions, reducer } = createSlice({
  name: 'myKurlyStyle',
  initialState,
  reducers: {
    setPrivacyPolicy: (draftState, { payload: privacyPolicy }) => {
      draftState.privacyPolicy = privacyPolicy;
    },
    setMyInfo: (draftState, { payload: myKurlyStyle }) => {
      draftState.myKurlyStyleInformation = {
        ...myKurlyStyle,
        birthYear: draftState.myKurlyStyleInformation.birthYear ?? myKurlyStyle.birthYear,
        gender: draftState.myKurlyStyleInformation.gender ?? myKurlyStyle.gender,
      };
    },

    updateSiteInformation: (draftState, { payload: myKurlyStyle }) => {
      draftState.myKurlyStyleInformation.sites = myKurlyStyle.sites;
    },

    updateBirthYear: (draftState, { payload: birthYear }: { payload: number | null }) => {
      draftState.myKurlyStyleInformation.birthYear = birthYear;
    },
    updateGender: (draftState, { payload: gender }: { payload: GenderType | null }) => {
      draftState.myKurlyStyleInformation.gender = gender;
    },
    updateHasToddler: (draftState, { payload: hasToddler }: { payload: boolean }) => {
      draftState.myKurlyStyleInformation.hasToddler = hasToddler;
    },
    updateOpenProfile: (draftState, { payload: openProfile }: { payload: boolean }) => {
      draftState.myKurlyStyleInformation.openProfile = openProfile;
    },
    updatePrivacyPolicy: (draftState, { payload: privacyPolicyStatus }: { payload: PrivacyPolicyStatusType }) => {
      draftState.myKurlyStyleInformation.privacyPolicyStatus = privacyPolicyStatus;
    },
    updateProfileState: (
      draftState,
      { payload: { segmentId, selected } }: { payload: { segmentId: string; selected: boolean } },
    ) => {
      const segment = draftState.profile.categories
        .map((category) => category.segments)
        .flat()
        .find((seg) => seg.id === segmentId);

      if (segment) {
        segment.selected = !selected;
      }
    },
    resetProfileState: (draftState, { payload: { categoryId } }: { payload: { categoryId: string } }) => {
      const segments = draftState.profile.categories.find(({ id }) => id === categoryId)?.segments;

      if (segments) {
        segments.forEach((segment) => {
          segment.selected = false;
        });
      }
    },
    setProfile: (draftState, { payload: profile }) => {
      draftState.profile = profile;
      draftState.originalProfile = JSON.stringify(profile);
    },
    setMyKurlyStyleYearBirth: (draftState, { payload: birthYear }: { payload: number }) => {
      draftState.myKurlyStyleInformation.birthYear = birthYear;
    },
    setRecommendProduct: (draftState, { payload: recommendProduct }) => {
      draftState.recommendProduct = recommendProduct;
    },
    updateCheckedState: (draftState, { payload: checkedState }: { payload: boolean }) => {
      draftState.checkedState = checkedState;
    },
    setLoading: (draftState, { payload: loading }) => {
      draftState.loading = loading;
    },
    clearInfo: (draftState) => {
      draftState.myKurlyStyleInformation = {
        birthYear: null,
        gender: null,
        hasToddler: false,
        openProfile: true,
        privacyPolicyStatus: 'AGREE',
        sites: [],
      };
    },
    clearRecommendProduct: (draftState) => {
      draftState.recommendProduct = {
        memberName: '',
        products: [],
      };
    },
  },
});

export const {
  setPrivacyPolicy,
  setMyInfo,
  updateSiteInformation,
  updateBirthYear,
  updateGender,
  updateHasToddler,
  updateOpenProfile,
  updatePrivacyPolicy,
  updateProfileState,
  resetProfileState,
  setProfile,
  setRecommendProduct,
  updateCheckedState,
  setLoading,
  clearInfo,
  clearRecommendProduct,
} = actions;

export const loadPrivacyPolicy = () => async (dispatch: Dispatch) => {
  const privacyPolicy = await getPrivacyPolicy();
  dispatch(setPrivacyPolicy(privacyPolicy));
};

export const updateSiteInfo = () => async (dispatch: Dispatch) => {
  const myKurlyStyleInformation = await getMyInfo();
  dispatch(updateSiteInformation(myKurlyStyleInformation));
  dispatch(setLoading(false));
};

export const loadMyInfo = () => async (dispatch: Dispatch) => {
  const myKurlyStyleInformation = await getMyInfo();
  dispatch(setMyInfo(myKurlyStyleInformation));
  dispatch(setLoading(false));
};

export const loadProfile = (siteId: string) => async (dispatch: Dispatch) => {
  const profile = await getProfile(siteId);
  dispatch(setProfile(profile));
};

export const loadRecommendProduct = (siteId: string, hasProfile: boolean) => async (dispatch: Dispatch) => {
  const recommendProduct = await getRecommendProduct(siteId, hasProfile);
  dispatch(setRecommendProduct(recommendProduct));
};

export default reducer;
