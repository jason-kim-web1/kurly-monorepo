import type {
  MainClosingSaleSection,
  MainGroupCollectionCircleSection,
  MainLineBannerSection,
  QuickMenuSection,
  MainMdChoicesSection,
  MainRandomCollectionArticleSection,
  MainRandomCollectionSection,
  MainRecipesSection,
  MainSection,
  MainSectionBanner,
  MainSectionBannerCarousel,
  MainSpecialDealsSection,
  MainTodayRecommendationSection,
  MainSectionBannerCarouselHorizontal,
  MainGroupCollectionNumberSection,
} from '../../interfaces/MainSection.interface';

import MainBanner from './banner/MainBanner';
import MainBannerCarouselHorizontal from './carousel-banner-horizontal/MainBannerCarouselHorizontal';
import MainBannerCarousel from './carousel-banner/MainBannerCarousel';
import RandomCollectionSection from './random-collection/RandomCollectionSection';
import TodayRecommendProducts from './today-recommendation/TodayRecommendProducts';
import MainLineBanner from './line-banner/MainLineBanner';
import SpecialDeals from './special-deals/SpecialDeals';
import MdChoicesContainer from './md-choices/MdChoicesContainer';
import ClosingSaleContainer from './closing-sale/ClosingSaleContainer';
import MainRecipesContainer from './recipes/MainRecipesContainer';
import RandomCollectionArticle from './collection-article/RandomCollectionArticle';
import GroupCollectionCircle from './collection-circle/GroupCollectionCircle';
import MainQuickMenuContainer from './quick-menu/MainQuickMenuContainer';
import RandomCollectionNumberSection from '../shared/random-collection-number/Section';
import GroupCollectionNumberSection from '../shared/group-collection-number/Section';

interface Props {
  section: MainSection<unknown>;
  measure(): void;
}

export default function MainSectionList({ section, measure }: Props) {
  switch (section.type) {
    case 'MAIN_BANNERS':
      return <MainBanner section={section as MainSectionBanner} />;
    case 'MAIN_BANNER_CAROUSEL':
      return <MainBannerCarousel section={section as MainSectionBannerCarousel} />;
    case 'MAIN_BANNER_CAROUSEL_HORIZONTAL':
      return <MainBannerCarouselHorizontal section={section as MainSectionBannerCarouselHorizontal} />;
    case 'TODAY_RECOMMEND_PRODUCTS':
      return <TodayRecommendProducts section={section as MainTodayRecommendationSection} />;
    case 'RANDOM_COLLECTION':
    case 'MAB_COLLECTION':
      return <RandomCollectionSection section={section as MainRandomCollectionSection} />;
    case 'RANDOM_COLLECTION_NUMBER':
      return <RandomCollectionNumberSection section={section as MainRandomCollectionSection} />;
    case 'LINE_BANNERS':
      return <MainLineBanner section={section as MainLineBannerSection} />;
    case 'SPECIAL_DEALS':
      return <SpecialDeals section={section as MainSpecialDealsSection} />;
    case 'MD_CHOICES':
      return <MdChoicesContainer section={section as MainMdChoicesSection} measure={measure} />;
    case 'CLOSING_SALE':
      return <ClosingSaleContainer section={section as MainClosingSaleSection} />;
    case 'RECIPES':
      return <MainRecipesContainer section={section as MainRecipesSection} />;
    case 'RANDOM_COLLECTION_ARTICLE':
      return <RandomCollectionArticle section={section as MainRandomCollectionArticleSection} />;
    case 'GROUP_COLLECTION_CIRCLE':
      return <GroupCollectionCircle section={section as MainGroupCollectionCircleSection} />;
    case 'GROUP_COLLECTION_PRODUCT_NUMBER':
      return <GroupCollectionNumberSection section={section as MainGroupCollectionNumberSection} measure={measure} />;
    case 'QUICK_MENU':
      return <MainQuickMenuContainer section={section as QuickMenuSection} />;
    default:
      return null;
  }
}
