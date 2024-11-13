import {
  UnSpecifiedSectionList,
  isBannerNoResultSectionViewModel,
  isBannerSectionViewModel,
  isKeywordConvertInfoSectionViewModel,
  isMarketBestSectionViewModel,
  isProductListSectionViewModel,
  isPurchasedRecentSectionViewModel,
  isThemePromotionSectionViewModel,
  isThemeRelatedSectionViewModel,
  isAdSearchSectionViewModel,
  isNoResultInfoSectionViewModel,
  isGoogleResultSectionViewModel,
} from '../../factory';
import { BannerNoResultSection } from '../BannerNoResultSection';
import { BannerSection } from '../BannerSection';
import { MarketBestSection } from '../MarketBestSection';
import { ProductListSection } from '../ProductListSection';
import { PurchasedRecentSection } from '../PurchasedRecentSection';
import { ThemePromotionSection } from '../ThemePromotionSection';
import { ThemeRelatedSection } from '../ThemeReleatedSection';
import { KeywordConvertInfoSection } from '../KeywordConvertInfoSection';
import { AdSearchSection } from '../AdSearchSection';
import { NoResultInfoSection } from '../NoResultInfoSection';
import { GoogleResultSection } from '../GoogleResultSection';

type Props = {
  sections: UnSpecifiedSectionList;
};

const SectionList = ({ sections }: Props) => {
  return (
    <>
      {sections.map((section) => {
        const { _id } = section;
        // TODO: SectionLogWrapper
        if (isBannerNoResultSectionViewModel(section)) {
          return <BannerNoResultSection key={_id} section={section} />;
        }
        if (isBannerSectionViewModel(section)) {
          return <BannerSection key={_id} section={section} />;
        }
        if (isKeywordConvertInfoSectionViewModel(section)) {
          return <KeywordConvertInfoSection key={_id} section={section} />;
        }
        if (isMarketBestSectionViewModel(section)) {
          return <MarketBestSection key={_id} section={section} />;
        }
        if (isProductListSectionViewModel(section)) {
          return <ProductListSection key={_id} section={section} />;
        }
        if (isPurchasedRecentSectionViewModel(section)) {
          return <PurchasedRecentSection key={_id} section={section} />;
        }
        if (isThemePromotionSectionViewModel(section)) {
          return <ThemePromotionSection key={_id} section={section} />;
        }
        if (isThemeRelatedSectionViewModel(section)) {
          return <ThemeRelatedSection key={_id} section={section} />;
        }
        if (isAdSearchSectionViewModel(section)) {
          return <AdSearchSection key={_id} section={section} />;
        }
        if (isNoResultInfoSectionViewModel(section)) {
          return <NoResultInfoSection key={_id} section={section} />;
        }
        if (isGoogleResultSectionViewModel(section)) {
          return <GoogleResultSection key={_id} section={section} />;
        }
      })}
    </>
  );
};

export { SectionList };
