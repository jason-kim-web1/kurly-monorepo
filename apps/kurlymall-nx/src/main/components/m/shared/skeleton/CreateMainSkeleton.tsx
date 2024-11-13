import { ReactElement } from 'react';

import styled from '@emotion/styled';

import type { MainSectionType } from '../../../../interfaces/MainSection.interface';
import SectionHeaderSkeleton from './SectionHeaderSkeleton';
import ProductListSkeleton from './ProductListSkeleton';
import MainLineBannerSkeleton from './MainLineBannerSkeleton';
import MainBannerCarouselSkeleton from './MainBannerCarouselSkeleton';
import MainBannerCarouselHorizontalSkeleton from '../../carousel-banner-horizontal/MainBannerCarouselHorizontalSkeleton';
import SpecialDealsSkeleton from './SpecialDealsSkeleton';
import MdOptionListSkeleton from './MdOptionListSkeleton';
import MainRecipesSkeleton from './MainRecipesSkeleton';
import CollectionListCircleSkeleton from './CollectionListCircleSkeleton';
import RandomCollectionArticleSkeleton from './RandomCollectionArticleSkeleton';
import MainQuickMenuSkeleton from './MainQuickMenuSkeleton';
import COLOR from '../../../../../shared/constant/colorset';
import { RandomCollectionNumberSkeleton } from '../../../shared/random-collection-number/RandomCollectionNumberSkeleton';
import { GroupCollectionNumberSkeleton } from '../../../shared/group-collection-number/skeleton/GroupCollectionNumberSkeleton';

const SkeletonMainBanner = styled.div`
  height: 90.6667vw;
  background-color: ${COLOR.kurlyGray200};
`;

function NormalSkeleton() {
  return (
    <>
      <SectionHeaderSkeleton />
      <ProductListSkeleton />
    </>
  );
}

function TodayRecommendProducts() {
  return (
    <>
      <SectionHeaderSkeleton isMore={false} isSubTitle={false} />
      <ProductListSkeleton />
    </>
  );
}

function MdChoicesSkeleton() {
  return (
    <>
      <SectionHeaderSkeleton isMore={false} isSubTitle={false} />
      <MdOptionListSkeleton />
    </>
  );
}

function Empty() {
  return <></>;
}

const mainSkeletons: Record<MainSectionType, ReactElement> = {
  CLOSING_SALE: <NormalSkeleton />,
  MD_CHOICES: <MdChoicesSkeleton />,
  TODAY_RECOMMEND_PRODUCTS: <TodayRecommendProducts />,
  RANDOM_COLLECTION: <NormalSkeleton />,
  RANDOM_COLLECTION_NUMBER: <RandomCollectionNumberSkeleton />,
  MAIN_BANNERS: <SkeletonMainBanner />,
  MAIN_BANNER_CAROUSEL: <MainBannerCarouselSkeleton />,
  MAIN_BANNER_CAROUSEL_HORIZONTAL: <MainBannerCarouselHorizontalSkeleton />,
  LINE_BANNERS: <MainLineBannerSkeleton />,
  SPECIAL_DEALS: <SpecialDealsSkeleton />,
  RECIPES: <MainRecipesSkeleton />,
  GROUP_COLLECTION_CIRCLE: <CollectionListCircleSkeleton />,
  GROUP_COLLECTION_PRODUCT_NUMBER: <GroupCollectionNumberSkeleton />,
  RANDOM_COLLECTION_ARTICLE: <RandomCollectionArticleSkeleton />,
  BAND_BANNER: <Empty />,
  LIST_PRODUCT: <Empty />,
  REVIEW_PRODUCTS: <Empty />,
  KURLY_ONLY: <Empty />,
  KURLY_TREND_RANKING: <Empty />,
  CATEGORY_RANKING: <Empty />,
  TIME_RANKING: <Empty />,
  INSTAGRAM_REVIEW: <Empty />,
  MAB_COLLECTION: <Empty />,
  QUICK_MENU: <MainQuickMenuSkeleton />,
};

export function createMainSkeleton(type: MainSectionType) {
  return mainSkeletons[type] || <Empty />;
}
