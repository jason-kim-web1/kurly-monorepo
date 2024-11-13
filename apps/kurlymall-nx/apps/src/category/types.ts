import { MainSite } from '../main/interfaces/MainSection.interface';
import { PrimaryCategory } from '../shared/reducers/category';

interface ScrollToFn {
  (code: string, behavior: ScrollBehavior, delay?: number): void;
}

interface CategoryMenuImperativeRef {
  scrollToCode: ScrollToFn;
}

interface SiteCategorySelectedCodeContext {
  getAllCode: () => Record<MainSite, string>;
  getCode: (site: MainSite) => string;
  setCode: (site: MainSite, code: string) => void;
}

interface RecommendCategoryDisplay extends Pick<PrimaryCategory, 'name' | 'isNew'> {
  subCategoryGroups: PrimaryCategory[];
  readonly code: 'recommend';
  readonly isRecommend: true;
}

interface MainCategoryBanner {
  url: string;
  imgUrl: string;
  text: string;
  subtext: string;
}

interface MainCategoryQuickMenu {
  id: string;
  title: string;
  imgUrl: string | null;
  lottieUrl: string | null;
  lottieLoop: number | null;
  url: string;
  bigBanner: {
    imgUrl: string;
    url: string | null;
  } | null;
  isNew?: boolean;
}

export type {
  CategoryMenuImperativeRef,
  SiteCategorySelectedCodeContext,
  RecommendCategoryDisplay,
  ScrollToFn,
  MainCategoryBanner,
  MainCategoryQuickMenu,
};
