import { ReactElement } from 'react';

import styled from '@emotion/styled';

import type { MainSectionType } from '../../../../interfaces/MainSection.interface';
import SectionHeaderSkeleton from './SectionHeaderSkeleton';
import ProductListSkeleton from './ProductListSkeleton';
import MainBannerCarouselSkeleton from '../../carousel-banner/MainBannerCarouselSkeleton';
import MainBannerCarouselHorizontalSkeleton from '../../carousel-banner-horizontal/MainBannerCarouselHorizontalSkeleton';
import SpecialDealsSkeleton from './SpecialDealsSkeleton';
import RecipeListSkeleton from '../../recipes/RecipeListSkeleton';
import CollectionListCircleSkeleton from './CollectionListCircleSkeleton';
import CollectionListArticleSkeleton from './CollectionListArticleSkeleton';
import CollectionArticleHeaderSkeleton from './CollectionArticleHeaderSkeleton';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import InstagramReviewSkeleton from './InstagramReviewSkeleton';
import COLOR from '../../../../../shared/constant/colorset';
import { RandomCollectionNumberSkeleton } from '../../../shared/random-collection-number/RandomCollectionNumberSkeleton';
import { GroupCollectionNumberSkeleton } from '../../../shared/group-collection-number/skeleton/GroupCollectionNumberSkeleton';

const MainBannerSkeletonWrapper = styled.div`
  min-width: 1050px;
  height: 370px;
  margin: 0 auto 40px;
`;

const SkeletonCenter = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const SkeletonCircleWrapper = styled.div`
  min-width: 1050px;
  padding-top: 10px;
  background-color: ${COLOR.bg};
`;

function MainBannerSkeleton() {
  return (
    <MainBannerSkeletonWrapper>
      <SkeletonLoading height={370} />
    </MainBannerSkeletonWrapper>
  );
}

function NormalSkeleton() {
  return (
    <SkeletonCenter>
      <SectionHeaderSkeleton />
      <ProductListSkeleton />
    </SkeletonCenter>
  );
}

function RecipesSkeleton() {
  return (
    <SkeletonCenter>
      <SectionHeaderSkeleton />
      <RecipeListSkeleton />
    </SkeletonCenter>
  );
}

function CircleSkeleton() {
  return (
    <SkeletonCircleWrapper>
      <SectionHeaderSkeleton />
      <CollectionListCircleSkeleton />
    </SkeletonCircleWrapper>
  );
}

function LineBannerSkeleton() {
  return (
    <SkeletonCenter>
      <SkeletonLoading width={1050} height={140} />
    </SkeletonCenter>
  );
}

function CarouseBannerSkeleton() {
  return (
    <SkeletonCenter>
      <MainBannerCarouselSkeleton />
    </SkeletonCenter>
  );
}

function CarouseBannerHorizontalSkeleton() {
  return (
    <SkeletonCenter>
      <MainBannerCarouselHorizontalSkeleton />
    </SkeletonCenter>
  );
}

function SpecialSkeleton() {
  return (
    <SkeletonCenter>
      <SpecialDealsSkeleton />
    </SkeletonCenter>
  );
}

function ArticleSkeleton() {
  return (
    <SkeletonCenter>
      <CollectionArticleHeaderSkeleton />
      <CollectionListArticleSkeleton />
    </SkeletonCenter>
  );
}

function InstagramSkeleton() {
  return (
    <SkeletonCenter>
      <InstagramReviewSkeleton />
    </SkeletonCenter>
  );
}

function Empty() {
  return <></>;
}

const mainSkeletons: Record<MainSectionType, ReactElement> = {
  CLOSING_SALE: <NormalSkeleton />,
  MD_CHOICES: <NormalSkeleton />,
  TODAY_RECOMMEND_PRODUCTS: <NormalSkeleton />,
  RANDOM_COLLECTION: <NormalSkeleton />,
  RANDOM_COLLECTION_NUMBER: <RandomCollectionNumberSkeleton />,
  MAB_COLLECTION: <NormalSkeleton />,
  MAIN_BANNERS: <MainBannerSkeleton />,
  MAIN_BANNER_CAROUSEL: <CarouseBannerSkeleton />,
  MAIN_BANNER_CAROUSEL_HORIZONTAL: <CarouseBannerHorizontalSkeleton />,
  LINE_BANNERS: <LineBannerSkeleton />,
  SPECIAL_DEALS: <SpecialSkeleton />,
  RECIPES: <RecipesSkeleton />,
  GROUP_COLLECTION_CIRCLE: <CircleSkeleton />,
  GROUP_COLLECTION_PRODUCT_NUMBER: <GroupCollectionNumberSkeleton />,
  RANDOM_COLLECTION_ARTICLE: <ArticleSkeleton />,
  INSTAGRAM_REVIEW: <InstagramSkeleton />,
  BAND_BANNER: <Empty />,
  LIST_PRODUCT: <Empty />,
  REVIEW_PRODUCTS: <Empty />,
  KURLY_ONLY: <Empty />,
  KURLY_TREND_RANKING: <Empty />,
  CATEGORY_RANKING: <Empty />,
  TIME_RANKING: <Empty />,
  QUICK_MENU: <Empty />,
};

export function createMainSkeletonPC(type: MainSectionType) {
  return mainSkeletons[type] || <Empty />;
}
