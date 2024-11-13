import { createSelector, createSlice } from '@reduxjs/toolkit';

import { isEmpty, head, chain, map, chunk, range, size } from 'lodash';

import {
  ChangedMainSite,
  MainSection,
  MainSectionType,
  MainSite,
  MdChoicesOption,
  MdChoicesPayload,
} from './interfaces/MainSection.interface';
import {
  getClosingSalePayload,
  getInstagramReviewPayload,
  getMainBannerPayload,
  getMainLineBannerPayload,
  getMainMdChoicesPayload,
  getMainPopupNotices,
  getMainRecipes,
  getMainSections,
  getMainSpecialDealsPayload,
  getMdChoiceProducts,
  getRandomCollectionPayload,
  getTodayRecommendProductPayload,
  getRandomCollectionArticlePayload,
  getGroupCollectionCirclePayload,
  getMainCarouselBannerPayload,
  getMainCarouselHorizontalBannerPayload,
  getQuickMenusPayload,
  getMabCollectionPayload,
  createSectionKey,
  getRandomCollectionNumberPayload,
  getGroupCollectionNumberPayload,
} from './service/main.service';
import { AppThunk } from '../shared/store';
import { mainSiteThemeMap, SiteTheme } from './theme';
import { MainPopupNotice } from './interfaces/PopupNotice.interface';
import { Awaited } from '../shared/types';

const MAIN_PAGINATION_COUNT = 5;

const initialSections: MainSection<unknown>[] = [
  {
    id: 0,
    key: `0_MAIN_BANNERS`,
    hasLoaded: true,
    isLoading: false,
    isError: false,
    type: 'MAIN_BANNERS',
    panelId: '1',
  },
];

export interface MainState {
  site: MainSite;
  changedSite: ChangedMainSite;
  theme: SiteTheme;
  sections: MainSection<unknown>[];
  sectionsStatus: 'IDLE' | 'LOADING';
  sectionKeys: string[];
  sectionPages: string[][];
  maxSectionPage: number;
  sectionDictionary: {
    [key: string]: MainSection<unknown>;
  };
  popupNotices: MainPopupNotice[];
  cartDialog: {
    selectedContentProductNo: number | null;
  };
}

type SectionIdentifier = Pick<MainSection<unknown>, 'id' | 'type' | 'key' | 'panelId'>;
type LoadingFn<T> = (site: MainSite, sectionIdentifier: SectionIdentifier) => () => Promise<T>;

const normalizeSections = (sections: MainSection<unknown>[]) =>
  chain(sections)
    .map((section) => {
      const { key } = section;
      return [
        key,
        {
          ...section,
          key,
        },
      ];
    })
    .fromPairs()
    .value();

const initialSection = head(initialSections) as MainSection<unknown>;
const initialSectionKey = createSectionKey({
  id: initialSection.id,
  type: initialSection.type,
  panelId: '1',
});

export const initialState: MainState = {
  site: 'MARKET',
  changedSite: 'NOTCHANGED',
  theme: mainSiteThemeMap.MARKET,
  sections: initialSections,
  sectionsStatus: 'IDLE',
  sectionKeys: [],
  sectionPages: [],
  maxSectionPage: 0,
  sectionDictionary: {
    [initialSectionKey]: initialSection,
  },
  popupNotices: [],
  cartDialog: {
    selectedContentProductNo: null,
  },
};

const { actions, reducer } = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSite(state, { payload }: { payload: MainSite }) {
      state.site = payload;
    },
    setChangedSite(state, { payload }: { payload: ChangedMainSite }) {
      state.changedSite = payload;
    },
    setTheme(state, { payload }: { payload: SiteTheme }) {
      state.theme = payload;
    },
    initSections(state) {
      state.sections = initialSections;
      state.sectionDictionary = { [initialSectionKey]: initialSection };
      state.sectionKeys = [initialSectionKey];
      state.sectionsStatus = 'LOADING';
      state.maxSectionPage = 0;
      state.sectionPages = [];
    },
    setSections(
      state,
      {
        payload,
      }: {
        payload: {
          sections: MainSection<unknown>[];
          sectionDictionary: { [key: string]: MainSection<unknown> };
          sectionKeys: string[];
          sectionPages: string[][];
          maxSectionPage: number;
        };
      },
    ) {
      const { sections, sectionDictionary, sectionKeys, sectionPages, maxSectionPage } = payload;
      state.sections = sections;
      state.sectionDictionary = sectionDictionary;
      state.sectionKeys = sectionKeys;
      state.sectionsStatus = 'IDLE';
      state.sectionPages = sectionPages;
      state.maxSectionPage = maxSectionPage;
    },
    setSectionLoading(state, { payload }: { payload: { sectionKey: string; isLoading: boolean } }) {
      const { isLoading, sectionKey } = payload;
      const target = state.sectionDictionary[sectionKey];

      if (!target) {
        return;
      }

      target.isLoading = isLoading;
    },
    setSectionError(state, { payload }: { payload: string }) {
      const target = state.sectionDictionary[payload];
      if (!target) {
        return;
      }
      target.isError = true;
    },
    setHasLoaded(state, { payload }: { payload: { sectionKey: string; hasLoaded: boolean } }) {
      const { sectionKey, hasLoaded } = payload;
      const target = state.sectionDictionary[sectionKey];
      if (!target) {
        return;
      }
      target.hasLoaded = hasLoaded;
    },
    loadSectionPayload(state, { payload }: { payload: { sectionKey: string; sectionPayload: unknown } }) {
      const { sectionKey, sectionPayload } = payload;
      const target = state.sectionDictionary[sectionKey];
      if (!target) {
        return;
      }
      target.payload = sectionPayload;
      target.isLoading = false;
    },
    setPopupNotices(state, { payload }) {
      state.popupNotices = payload;
    },
  },
});

const {
  loadSectionPayload,
  setSectionError,
  setSectionLoading,
  initSections,
  setSections,
  setHasLoaded,
  setSite,
  setChangedSite,
  setTheme,
  setPopupNotices,
} = actions;

export const initializeMainSite =
  (prevSite: MainSite, site: MainSite, isMain: boolean): AppThunk =>
  async (dispatch) => {
    const diffSite = prevSite !== site;
    dispatch(setChangedSite(diffSite ? site : 'NOTCHANGED'));
    dispatch(setSite(site));
    dispatch(setTheme(mainSiteThemeMap[site]));

    if (isMain) {
      dispatch(initSections());
    }
  };

export const initializeMainSection = (): AppThunk => async (dispatch, getState) => {
  dispatch(initSections());
  const { site } = getState().main;
  const sections = await getMainSections(site);
  const sectionDictionary = normalizeSections(sections);
  const sectionKeys = map(sections, ({ key }) => key);
  const sectionPages = chunk(sectionKeys, MAIN_PAGINATION_COUNT);
  const maxSectionPage = size(sectionPages);
  dispatch(setSections({ sections, sectionDictionary, sectionKeys, sectionPages, maxSectionPage }));
};

const loadMainBanners: LoadingFn<Awaited<ReturnType<typeof getMainBannerPayload>>> = (site, sectionIdentifier) => {
  const { id } = sectionIdentifier;
  return () => getMainBannerPayload(site, id);
};

const loadMainCarouseBanners: LoadingFn<Awaited<ReturnType<typeof getMainCarouselBannerPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getMainCarouselBannerPayload(site, id);
};

const loadMainCarouseHorizontalBanners: LoadingFn<
  Awaited<ReturnType<typeof getMainCarouselHorizontalBannerPayload>>
> = (site, sectionIdentifier) => {
  const { id } = sectionIdentifier;
  return () => getMainCarouselHorizontalBannerPayload(site, id);
};

const loadQuickMenus: LoadingFn<Awaited<ReturnType<typeof getQuickMenusPayload>>> = (site, sectionIdentifier) => {
  const { id } = sectionIdentifier;
  return () => getQuickMenusPayload(site, id);
};

const loadTodayRecommendProducts: LoadingFn<Awaited<ReturnType<typeof getTodayRecommendProductPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getTodayRecommendProductPayload(site, id);
};

const loadRandomCollectionProducts: LoadingFn<Awaited<ReturnType<typeof getRandomCollectionPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getRandomCollectionPayload(site, id);
};

const loadRandomCollectionNumberProducts: LoadingFn<Awaited<ReturnType<typeof getRandomCollectionNumberPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getRandomCollectionNumberPayload(site, id);
};

const loadRandomCollectionArticle: LoadingFn<Awaited<ReturnType<typeof getRandomCollectionArticlePayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getRandomCollectionArticlePayload(site, id);
};

const loadGroupCollectionCircle: LoadingFn<Awaited<ReturnType<typeof getGroupCollectionCirclePayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getGroupCollectionCirclePayload(site, id);
};

const loadGroupCollectionNumber: LoadingFn<Awaited<ReturnType<typeof getGroupCollectionNumberPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getGroupCollectionNumberPayload(site, id);
};

const loadMainLineBannerSection: LoadingFn<Awaited<ReturnType<typeof getMainLineBannerPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getMainLineBannerPayload(site, id);
};

const loadMainSpecialDealsSection: LoadingFn<Awaited<ReturnType<typeof getMainSpecialDealsPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getMainSpecialDealsPayload(site, id);
};

const loadMdChoicesSection: LoadingFn<Awaited<ReturnType<typeof getMainMdChoicesPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getMainMdChoicesPayload(site, id);
};

const loadClosingSaleProducts: LoadingFn<Awaited<ReturnType<typeof getClosingSalePayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id } = sectionIdentifier;
  return () => getClosingSalePayload(site, id);
};

const loadRecipes: LoadingFn<Awaited<ReturnType<typeof getMainRecipes>>> = (site, sectionIdentifier) => {
  const { id } = sectionIdentifier;
  return () => getMainRecipes(site, id);
};

const loadInstagramReview: LoadingFn<Awaited<ReturnType<typeof getInstagramReviewPayload>>> = () => () =>
  getInstagramReviewPayload();

const loadMabCollectionProducts: LoadingFn<Awaited<ReturnType<typeof getMabCollectionPayload>>> = (
  site,
  sectionIdentifier,
) => {
  const { id, panelId } = sectionIdentifier;
  return () => getMabCollectionPayload(site, id, panelId);
};

const SectionTypeMap = new Map<MainSectionType, LoadingFn<unknown>>([
  ['MAIN_BANNERS', loadMainBanners],
  ['MAIN_BANNER_CAROUSEL', loadMainCarouseBanners],
  ['MAIN_BANNER_CAROUSEL_HORIZONTAL', loadMainCarouseHorizontalBanners],
  ['QUICK_MENU', loadQuickMenus],
  ['LINE_BANNERS', loadMainLineBannerSection],
  ['TODAY_RECOMMEND_PRODUCTS', loadTodayRecommendProducts],
  ['RANDOM_COLLECTION', loadRandomCollectionProducts],
  ['RANDOM_COLLECTION_NUMBER', loadRandomCollectionNumberProducts],
  ['SPECIAL_DEALS', loadMainSpecialDealsSection],
  ['MD_CHOICES', loadMdChoicesSection],
  ['CLOSING_SALE', loadClosingSaleProducts],
  ['RECIPES', loadRecipes],
  ['INSTAGRAM_REVIEW', loadInstagramReview],
  ['RANDOM_COLLECTION_ARTICLE', loadRandomCollectionArticle],
  ['GROUP_COLLECTION_CIRCLE', loadGroupCollectionCircle],
  ['GROUP_COLLECTION_PRODUCT_NUMBER', loadGroupCollectionNumber],
  ['MAB_COLLECTION', loadMabCollectionProducts],
]);

const internalLoad =
  (sectionKey: string, loadFn: ReturnType<LoadingFn<unknown>>): AppThunk =>
  async (dispatch, getState) => {
    const {
      main: { sectionDictionary },
    } = getState();
    const targetSection = sectionDictionary[sectionKey];
    if (!targetSection) {
      return;
    }
    try {
      dispatch(setSectionLoading({ sectionKey, isLoading: true }));
      const sectionPayload = await loadFn();
      dispatch(
        loadSectionPayload({
          sectionKey,
          sectionPayload,
        }),
      );
    } catch (err) {
      dispatch(setSectionError(sectionKey));
    } finally {
      dispatch(setSectionLoading({ sectionKey, isLoading: false }));
      dispatch(setHasLoaded({ sectionKey, hasLoaded: true }));
    }
  };

//case 'MAB_COLLECTION':
//        dispatch(loadMabCollectionProducts(id, panelId || '1'));
export const loadMainSection =
  (sectionKey: string): AppThunk =>
  (dispatch, getState) => {
    const { sectionDictionary, site } = getState().main;
    const section = sectionDictionary[sectionKey];
    if (!section) {
      // TODO: section 을 찾을 수 없는 경우
      return;
    }
    const { id, type, key, panelId } = section;
    const targetLoadFn = SectionTypeMap.get(type);
    if (!targetLoadFn) {
      return;
    }
    const sectionIdentifier = { id, type, key, panelId };
    const load = targetLoadFn(site, sectionIdentifier);
    dispatch(internalLoad(key, load));
  };

export const selectMdChoiceOption =
  (sectionKey: string, sectionId: number, selectedCode: string): AppThunk =>
  async (dispatch, getState) => {
    const { sectionDictionary, site } = getState().main;
    const section = sectionDictionary[sectionKey];
    if (!section) {
      return;
    }
    // TODO: remove type casting
    const { type, panelId, payload } = section as MainSection<MdChoicesPayload>;
    if (!payload) {
      return;
    }
    const selectedOption = payload.options.find(({ code }) => code === selectedCode);

    if (!selectedOption) {
      return;
    }

    const updateOptions = (options: MdChoicesOption[]) => {
      dispatch(
        loadSectionPayload({
          sectionKey: createSectionKey({
            id: sectionId,
            type,
            panelId,
          }),
          sectionPayload: {
            ...payload,
            options,
          } as MdChoicesPayload,
        }),
      );
    };

    const hasLoaded = !isEmpty(selectedOption.products);

    updateOptions(
      payload.options.map((option) => ({
        ...option,
        loading: option.code === selectedCode ? !hasLoaded : option.loading,
        selected: option.code === selectedCode,
      })),
    );

    if (hasLoaded) {
      return;
    }

    const products = await getMdChoiceProducts(site, section.id, selectedCode);

    updateOptions(
      payload.options.map((option) => ({
        ...option,
        loading: false,
        selected: option.code === selectedCode,
        products: option.code === selectedCode ? products : option.products,
      })),
    );
  };

export const loadMainPopupNotice = (): AppThunk => async (dispatch) => {
  const notices = await getMainPopupNotices();
  dispatch(setPopupNotices(notices));
};

export const removeNoticePopup =
  (targetId: number): AppThunk =>
  (dispatch, getState) => {
    const { popupNotices } = getState().main;
    dispatch(setPopupNotices(popupNotices.filter(({ id }) => id !== targetId)));
  };

export const getSelectionRange = createSelector(
  (main: MainState) => main.sectionPages,
  (_: MainState, page: number) => page,
  (sectionPages, page) => {
    return chain(range(0, page))
      .map((index) => sectionPages[index])
      .flatten()
      .compact()
      .value();
  },
);

export default reducer;
