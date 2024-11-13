import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';

import { fetchCategory } from '../api';

import { isPC } from '../../../util/window/getDevice';
import { MainSite } from '../../main/interfaces/MainSection.interface';

export type CategoryKindType = 'product_category' | 'product_collection' | 'product_collection_group' | 'url';

export interface Category {
  kind: CategoryKindType;
  code: string;
  name: string;
}

export interface CategoryBanner {
  mobileImageUrl: string;
  mobileLink: string;
  subTitle: string;
  title: string;
}

export interface PrimaryCategory extends Category {
  position: number;
  pcIconUrl: string;
  pcIconActiveUrl: string;
  mobileIconUrl: string;
  mobileIconActiveUrl: string;
  mobileIconV2Url: string;
  thumbnailUrl: string;
  isNew: boolean;
  isShowAll: boolean;
  subCategoryGroups: Category[];
  mobileLink: string;
  mobileLottieUrl: string;
  mobileLottieLoop: null | number;
  banners: CategoryBanner[];
}

export interface CategoryMeta {
  recommendCategoriesName: string;
  recommend: {
    pcIconUrl: string;
    pcIconActiveUrl: string;
  };
  isNew: {
    iconUrl: string;
  };
}

export interface SiteCategoryState {
  categories: PrimaryCategory[];
  categoriesMeta: CategoryMeta;
  quick: PrimaryCategory[];
}

export type CategoryState = {
  [key in MainSite]: SiteCategoryState;
};

const getInitialSiteCategoryState = (): SiteCategoryState => ({
  categories: [],
  categoriesMeta: {
    recommendCategoriesName: '',
    recommend: {
      pcIconUrl: '',
      pcIconActiveUrl: '',
    },
    isNew: {
      iconUrl: '',
    },
  },
  quick: [],
});

export const initialState: CategoryState = {
  MARKET: getInitialSiteCategoryState(),
  BEAUTY: getInitialSiteCategoryState(),
};

const { actions, reducer } = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (
      state,
      { payload: { site, values } }: { payload: { site: MainSite; values: SiteCategoryState } },
    ) => ({
      ...state,
      [site]: values,
    }),
    resetCategory: (state) => {
      state.MARKET = getInitialSiteCategoryState();
      state.BEAUTY = getInitialSiteCategoryState();
    },
  },
});

export const resetCategories = (): AppThunk => async (dispatch) => {
  dispatch(actions.resetCategory());
};

export const loadCategories =
  (targetSite?: MainSite): AppThunk =>
  async (dispatch, getState) => {
    const { site: stateSite } = getState().main;
    const site = targetSite || stateSite;

    const categories = await fetchCategory(site.toLowerCase());
    const { categoriesMeta } = categories;
    const { isNew } = categoriesMeta;

    dispatch(
      actions.setCategory({
        site,
        values: {
          ...categories,
          categoriesMeta: {
            ...categoriesMeta,
            isNew: {
              iconUrl: isPC ? isNew.pcIconUrl : isNew.mobileIconUrl,
            },
          },
        },
      }),
    );
  };

const selectCategory = ({ category }: RootState) => category;

export const targetSiteCategorySelector = (site: MainSite) =>
  createSelector([selectCategory], (categoryState) => categoryState[site]);

export const currentSiteCategorySelector = createSelector(
  ({ main, category }: RootState) => ({ main, category }),
  ({ main, category }) => category[main.site],
);

export { actions };
export default reducer;
