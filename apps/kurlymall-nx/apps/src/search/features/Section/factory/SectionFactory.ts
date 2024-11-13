import {
  BannerNoResultSectionViewModelCreator,
  BannerSectionViewModelCreator,
  FilterSectionViewModelCreator,
  KeywordConvertInfoSectionViewModelCreator,
  MarketBestSectionViewModelCreator,
  ProductListSectionViewModelCreator,
  PurchasedRecentSectionViewModelCreator,
  SortSectionViewModelCreator,
  ThemePromotionSectionViewModelCreator,
  ThemeRelatedSectionViewModelCreator,
  isBannerNoResultSection,
  isBannerSection,
  isFilterSection,
  isKeywordConvertInfoSection,
  isMarketBestSection,
  isProductListSection,
  isSortSection,
  isPurchasedRecentSection,
  isThemePromotionSection,
  isThemeRelatedSection,
  isAdSearchSection,
  AdSearchSectionViewModelCreator,
  isNoResultInfoSection,
  NoResultInfoSectionViewModelCreator,
  GoogleResultSectionViewModelCreator,
  isGoogleResultSection,
} from '.';
import type { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';

// NOTE: 원본 섹션 데이터
interface Section<SectionCode extends string, Data> {
  view: {
    sectionCode: SectionCode;
    version: string;
  };
  data: Data;
}

// NOTE: 섹션 뷰 모델 데이터
interface SectionViewModel<SectionCode extends string, SectionData> extends Section<SectionCode, SectionData> {
  _type: string;
  _id: string;
  _position: number;
  _title?: string | null;
  _url?: string;
}

type UnSpecifiedSection = SectionViewModel<string, unknown>;

type UnSpecifiedSectionList = UnSpecifiedSection[];

interface SectionMeta {
  position: number;
  type: string;
}

interface SectionItemViewModel {
  _id: string;
  _position: number;
  _sectionCode: string;
  _logId: string;
}

abstract class TransformableSection {
  static getImpressionSectionItemEventPayload(item: SectionItemViewModel): PartialImpressionSectionItemPayload {
    console.error(item);
    throw new Error('TransformableSection 을 구현한 클래스에서만 사용 가능합니다.');
  }
  abstract transform(section: Section<string, unknown>, meta: SectionMeta): UnSpecifiedSection;
}

class SectionViewModelFactory {
  static getSection(section: Section<string, unknown>, meta: SectionMeta): UnSpecifiedSection {
    if (isBannerNoResultSection(section)) {
      return new BannerNoResultSectionViewModelCreator().transform(section, meta);
    }
    if (isBannerSection(section)) {
      return new BannerSectionViewModelCreator().transform(section, meta);
    }
    if (isFilterSection(section)) {
      return new FilterSectionViewModelCreator().transform(section, meta);
    }
    if (isKeywordConvertInfoSection(section)) {
      return new KeywordConvertInfoSectionViewModelCreator().transform(section, meta);
    }
    if (isMarketBestSection(section)) {
      return new MarketBestSectionViewModelCreator().transform(section, meta);
    }
    if (isProductListSection(section)) {
      return new ProductListSectionViewModelCreator().transform(section, meta);
    }
    if (isPurchasedRecentSection(section)) {
      return new PurchasedRecentSectionViewModelCreator().transform(section, meta);
    }
    if (isSortSection(section)) {
      return new SortSectionViewModelCreator().transform(section, meta);
    }
    if (isThemePromotionSection(section)) {
      return new ThemePromotionSectionViewModelCreator().transform(section, meta);
    }
    if (isThemeRelatedSection(section)) {
      return new ThemeRelatedSectionViewModelCreator().transform(section, meta);
    }
    if (isAdSearchSection(section)) {
      return new AdSearchSectionViewModelCreator().transform(section, meta);
    }
    if (isNoResultInfoSection(section)) {
      return new NoResultInfoSectionViewModelCreator().transform(section, meta);
    }
    if (isGoogleResultSection(section)) {
      return new GoogleResultSectionViewModelCreator().transform(section, meta);
    }
    throw new Error(`${section.view.sectionCode} is invalid`);
  }
}

export { TransformableSection, SectionViewModelFactory };
export type {
  Section,
  SectionMeta,
  SectionViewModel,
  SectionItemViewModel,
  UnSpecifiedSection,
  UnSpecifiedSectionList,
};
