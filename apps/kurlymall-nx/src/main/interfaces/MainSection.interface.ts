import { ProductData } from '../../shared/interfaces';

export type MainSite = 'MARKET' | 'BEAUTY';

export type ChangedMainSite = MainSite | 'NOTCHANGED';

export type MainSectionType =
  | 'MAIN_BANNERS'
  | 'TODAY_RECOMMEND_PRODUCTS'
  | 'BAND_BANNER'
  | 'LINE_BANNERS'
  | 'SPECIAL_DEALS'
  | 'LIST_PRODUCT'
  | 'MD_CHOICES'
  | 'REVIEW_PRODUCTS'
  | 'RECIPES'
  | 'KURLY_ONLY'
  | 'KURLY_TREND_RANKING'
  | 'CATEGORY_RANKING'
  | 'TIME_RANKING'
  | 'RANDOM_COLLECTION'
  | 'RANDOM_COLLECTION_NUMBER'
  | 'CLOSING_SALE'
  | 'INSTAGRAM_REVIEW'
  | 'RANDOM_COLLECTION_ARTICLE'
  | 'GROUP_COLLECTION_CIRCLE'
  | 'GROUP_COLLECTION_PRODUCT_NUMBER'
  | 'MAIN_BANNER_CAROUSEL'
  | 'MAIN_BANNER_CAROUSEL_HORIZONTAL'
  | 'MAB_COLLECTION'
  | 'QUICK_MENU';

export type MainSectionDesignType = 'NUMBER';

export interface MainSection<T> {
  id: number;
  type: MainSectionType;
  isLoading: boolean;
  isError: boolean;
  hasLoaded: boolean;
  panelId: string;
  key: string;
  payload?: T;
  url?: string;
}

export interface MainBannerData {
  id: number;
  imageUrl: string;
  link: string;
  mainBannerPcUrl: string;
  mainBannerMobileUrl: string;
}

interface MainBanner {
  banners: MainBannerData[];
}

export type MainSectionBanner = MainSection<MainBanner>;

export interface MainBannerDataCarousel {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  mainVerticalBannerPcUrl: string;
  mainVerticalBannerMobileUrl: string;
}

export interface BannerCarousel {
  id: number;
  title: string;
  subtitle: string;
  collectionCode: string;
  banners: MainBannerDataCarousel[];
}

export type MainSectionBannerCarousel = MainSection<BannerCarousel>;

export interface MainBannerDataCarouselHorizontal {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  mainHorizontalBannerMobileUrl: string;
  mainHorizontalBannerPcUrl: string;
}

export interface BannerCarouselHorizontal {
  id: number;
  title: string;
  subtitle: string;
  collectionCode: string;
  banners: MainBannerDataCarouselHorizontal[];
}

export type MainSectionBannerCarouselHorizontal = MainSection<BannerCarouselHorizontal>;

export interface QuickMenuData {
  title: string;
  imageUrl: string;
  resizedImageUrl: string;
  lottieUrl: string;
  lottieLoop: number | null;
  link: string;
  isNew: boolean;
}

interface QuickMenu {
  id: number;
  templateCode: string;
  templateType: string;
  title: string;
  subtitle: string;
  data: {
    maxMenuCount: number;
    rows: QuickMenuData[][];
  };
}

export type QuickMenuSection = MainSection<QuickMenu>;

interface TodayRecommendation {
  title: string;
  products: ProductData[];
}

export type MainTodayRecommendationSection = MainSection<TodayRecommendation>;

interface RandomCollection {
  products: ProductData[];
  title: string;
  subtitle: string;
  collectionCode: string;
  hasMore: boolean;
  landingUrl?: string;
}

export type MainRandomCollectionSection = MainSection<RandomCollection>;

export interface RandomCollectionArticle {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  mainImageDescriptionMobileUrl: string;
  mainImageDescriptionPcUrl: string;
  collectionCode: string;
  hasMore: boolean;
  products: ProductData[];
  landingUrl?: string;
}

export type MainRandomCollectionArticleSection = MainSection<RandomCollectionArticle>;

export interface GroupCollectionCircleProduct {
  code: string;
  name: string;
  thumbnailImageUrl: string;
  collectionThumbnailMobileUrl: string;
  collectionThumbnailPcUrl: string;
}

export interface GroupCollectionCircle {
  title: string;
  subtitle: string;
  collectionCode: string;
  hasMore: boolean;
  landingUrl: string;
  collections: GroupCollectionCircleProduct[];
}

export type MainGroupCollectionCircleSection = MainSection<GroupCollectionCircle>;

export type Collection = {
  code: string;
  name: string;
};

export interface GroupCollectionNumber {
  id: number;
  title: string;
  subtitle: string;
  collectionGroupCode: string;
  collectionCode: string;
  landingUrl: string;
  products: ProductData[];
  collections: Collection[];
}

export type MainGroupCollectionNumberSection = MainSection<GroupCollectionNumber>;

interface LineBanner {
  bannerId: number;
  title: string;
  link: string;
  bannerType?: 'IMAGE' | 'TEXT';
  image: {
    imageUrl: string;
    mainLineBannerMobileUrl: string;
    mainLineBannerPcUrl: string;
  };
  text: {
    subtitle: string;
    textColor: string;
    backgroundColor: string;
  };
}

export type MainLineBannerSection = MainSection<LineBanner>;

export interface SpecialDealProduct extends ProductData {
  quantity: number;
}

export interface SpecialDealPayload {
  title: string;
  subtitle: string;
  additionalText: string;
  deals: {
    dealExpireTime: string;
    dealExpired: boolean;
    soldOutContent: string;
    soldOutTitle: string;
    isSoldOut: boolean;
    thumbnailImageUrl: string;
    productHorizontalLargeUrl: string;
    isDisplayTime: boolean;
    product: SpecialDealProduct;
  }[];
}

export type MainSpecialDealsSection = MainSection<SpecialDealPayload>;

export interface MdChoicesOption {
  code: string;
  name: string;
  link: string;
  selected: boolean;
  products: ProductData[];
  loading: boolean;
}

export interface MdChoicesPayload {
  title: string;
  subtitle: string;
  additionalText: string | null;
  options: MdChoicesOption[];
}

export type MainMdChoicesSection = MainSection<MdChoicesPayload>;

interface ClosingSalePayload {
  title: string;
  subtitle: string;
  collectionCode: string;
  products: ProductData[];
  hasMore: boolean;
  landingUrl?: string;
}

export type MainClosingSaleSection = MainSection<ClosingSalePayload>;

export interface MainRecipeData {
  no: number;
  title: string;
  link: string;
  imageUrl: string;
  mainRecipeUrl: string;
}

interface MainRecipesPayload {
  title: string;
  subtitle: string;
  recipes: MainRecipeData[];
}

export type MainRecipesSection = MainSection<MainRecipesPayload>;

interface MainInstagramReviewPayload {
  title: string;
  subtitle: string;
  reviews: {
    landingUrl: string;
    imageUrl: string;
  }[];
}

export type MainInstagramReviewSection = MainSection<MainInstagramReviewPayload>;
