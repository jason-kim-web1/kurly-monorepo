import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';
import type { BaseResponse } from '../../interfaces';
import type { Collection, MainSite } from '../../../main/interfaces/MainSection.interface';
import type { DeliveryInfoName, DeliveryInfoType, SnakeCaseStickerList } from '../../../product/types';
import { mainSiteKeyMap } from '../../../main/service/main.service';

const createApiEntryPath = (key: string) => `/main/v3/sites/${key}/sections`;

export interface MainBaseResponse<T> {
  data: T;
  meta: {
    panel_id: string;
  };
}
interface MainSectionResponseData {
  id: number;
  url: string;
  design_type: string;
}

export async function fetchMainSections(key: string) {
  const path = createApiEntryPath(key);
  try {
    const { data } = await httpClient.get<MainBaseResponse<MainSectionResponseData[]>>(path);
    return {
      data: data.data,
      meta: data.meta,
    };
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface MainBannerResponseData {
  id: string;
  link: string;
  image_url: string;
  main_banner_pc_url: string;
  main_banner_mobile_url: string;
}

export async function fetchMainBanners(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/main-banner`;
  try {
    const { data } = await httpClient.get<BaseResponse<{ data: MainBannerResponseData[] }>>(path);
    return data.data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface CarouselBannerResponseData {
  id: string;
  title: string;
  subtitle: string;
  data: {
    id: string;
    title: string;
    subtitle: string;
    link: string;
    image_url: string;
    main_vertical_banner_pc_url: string;
    main_vertical_banner_mobile_url: string;
  }[];
}

export async function fetchMainCarouselBanners(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/main-banner-carousel`;
  try {
    const { data } = await httpClient.get<BaseResponse<CarouselBannerResponseData>>(path);
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface CarouselHorizontalBannerResponseData {
  id: string;
  title: string;
  subtitle: string;
  data: {
    id: string;
    title: string;
    subtitle: string;
    link: string;
    image_url: string;
    main_horizontal_banner_mobile_url: string;
    main_horizontal_banner_pc_url: string;
  }[];
}

export async function fetchMainCarouselHorizontalBanners(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/main-banner-carousel-horizontal`;
  try {
    const { data } = await httpClient.get<BaseResponse<CarouselHorizontalBannerResponseData>>(path);
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface QuickMenuResponseRowItem {
  title: string;
  main_icon_url: string;
  image_url: string;
  lottie_url: string;
  lottie_loop: number | null;
  link: string;
  is_new: boolean;
}

interface QuickMenuResponseData {
  id: string;
  title: string;
  subtitle: string;
  additional_text: string | null;
  event_code: string;
  template_code: string;
  template_type: string;
  data: {
    max_menu_count: number;
    rows: QuickMenuResponseRowItem[][];
  };
}

export async function fetchQuickMenus(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/quick-menu?use_multiline=true`;
  try {
    const { data } = await httpClient.get<BaseResponse<QuickMenuResponseData>>(path);
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export interface MainProductResponseData {
  discount_rate: number;
  discounted_price: number;
  group_product: {
    is_group: boolean;
    is_not_representative: boolean;
  };
  can_restock_notify: boolean;
  is_buy_now: boolean;
  is_giftable: boolean;
  is_multiple_price: boolean;
  is_only_adult: boolean;
  is_purchase_status: boolean;
  is_shown: boolean;
  is_sold_out: boolean;
  list_image_url: string;
  name: string;
  no: number;
  original_price: number;
  sales_price: number;
  not_purchase_message: string;
  product_view_status: string;
  short_description: string;
  sold_out_title: string;
  sold_out_text: string;
  tags: {
    name: string;
    type: string;
  }[];
  delivery_type_names: DeliveryInfoName[];
  delivery_type_infos: DeliveryInfoType[];
  review_count: string;
  product_vertical_medium_url: string;
  stickers_v2: SnakeCaseStickerList;
}

interface MainSectionBaseResponse<T> {
  id: number;
  title: string;
  subtitle: string;
  additional_text: string | null;
  event_code: string;
  template_code: string;
  template_type: string;
  data: T;
}

interface ListProductsData {
  collection_code: string;
  has_more: boolean;
  products: MainProductResponseData[];
}

type ListProductSectionResponse = MainSectionBaseResponse<ListProductsData>;

interface TodayRecommendProductsResponse {
  data: {
    additional_text: string;
    data: MainProductResponseData[];
    event_code: string;
    id: number;
    subtitle: string;
    template_code: string;
    template_type: string;
    title: string;
  };
  meta: {
    campaign_policy_key: string;
    cluster_center_code: string;
    delivery_type: string;
    recipe: string;
  };
}

export async function fetchTodayRecommendProducts(
  key: string,
  sectionId: number,
): Promise<TodayRecommendProductsResponse> {
  const path = `${createApiEntryPath(key)}/${sectionId}/today-recommendation`;
  try {
    const { data } = await httpClient.get<TodayRecommendProductsResponse>(path);
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export async function fetchRandomCollectionProducts(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/random-collection`;
  try {
    const { data } = await httpClient.get<BaseResponse<ListProductSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export async function fetchRandomCollectionNumberProducts(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/random-collection-number`;
  try {
    const { data } = await httpClient.get<BaseResponse<ListProductSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export async function fetchMabCollectionProducts(key: string, sectionId: number, panelId: string) {
  const queryStringPanelId = panelId ? `?panel_id=${panelId}` : '';
  const path = `${createApiEntryPath(key)}/${sectionId}/mab-collection${queryStringPanelId}`;
  try {
    const { data } = await httpClient.get<BaseResponse<ListProductSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface RandomCollectionArticleData {
  image_url: string;
  main_image_description_mobile_url: string;
  main_image_description_pc_url: string;
  description: string;
  collection_code: string;
  has_more: boolean;
  products: MainProductResponseData[];
}

type RandomCollectionArticleResponse = MainSectionBaseResponse<RandomCollectionArticleData>;

export async function fetchRandomCollectionArticle(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/random-collection-article`;
  try {
    const { data } = await httpClient.get<BaseResponse<RandomCollectionArticleResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface GroupCollectionCircleData {
  collection_group_code: string;
  has_more: boolean;
  collections: {
    code: string;
    name: string;
    thumbnail_image_url: string;
    collection_thumbnail_mobile_url: string;
    collection_thumbnail_pc_url: string;
  }[];
}

type GroupCollectionCircleResponse = MainSectionBaseResponse<GroupCollectionCircleData>;

export async function fetchGroupCollectionCircle(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/group-collection-circle`;
  try {
    const { data } = await httpClient.get<BaseResponse<GroupCollectionCircleResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface GroupCollectionNumberData {
  collection_group_code: string;
  collection_code: string;
  collections: Collection[];
}

type GroupCollectionNumberResponse = MainSectionBaseResponse<GroupCollectionNumberData>;

export async function fetchGroupCollectionNumber(key: MainSite, sectionId: number) {
  const path = `${createApiEntryPath(mainSiteKeyMap[key])}/${sectionId}/group-collection-product-number`;
  try {
    const { data } = await httpClient.get<BaseResponse<GroupCollectionNumberResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export async function fetchGroupCollectionNumberProduct(key: MainSite, sectionId: number, collectionCode: string) {
  const path = `${createApiEntryPath(mainSiteKeyMap[key])}/${sectionId}/collections/${collectionCode}/products`;
  try {
    const { data } = await httpClient.get<BaseResponse<MainProductResponseData[]>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface LineBannerData {
  background_color: string;
  id: string;
  link: string;
  subtitle: string;
  text_color: string;
  title: string;
  image_url: string;
  main_line_banner_mobile_url: string;
  main_line_banner_pc_url: string;
}

type LineBannerSectionResponse = MainSectionBaseResponse<LineBannerData>;

export async function fetchMainLineBannerSection(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/random-line-banner`;
  try {
    const { data } = await httpClient.get<BaseResponse<LineBannerSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface SpecialDealData {
  product: MainProductResponseData;
  quantity: number;
  sold_out_content: string;
  thumbnail_image_url: string;
  product_horizontal_large_url: string;
  deal_type: string;
  is_sold_out: boolean;
  promotion_end_time: string;
  sold_out_title: string;
  is_display_time: boolean;
}

type SpecialDealsSectionResponse = MainSectionBaseResponse<SpecialDealData[]>;

export async function fetchMainSpecialDealsSection(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/special-deal`;
  try {
    const { data } = await httpClient.get<BaseResponse<SpecialDealsSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface MdChoicesResponse {
  id: number;
  title: string;
  subtitle: string;
  additional_text: string | null;
  template_code: string;
  template_type: string;
  event_code: string;
  data: {
    default_code: string;
    md_choices: {
      code: string;
      name: string;
      link: string;
    }[];
  };
}

export async function fetchMainMdChoicesSection(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/md-choice`;
  try {
    const { data } = await httpClient.get<BaseResponse<MdChoicesResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export async function fetchMdChoiceProducts(
  key: string,
  sectionId: number,
  code: string,
): Promise<MainProductResponseData[]> {
  const path = `${createApiEntryPath(key)}/${sectionId}/md-choices/${code}/products`;
  try {
    const { data } = await httpClient.get<BaseResponse<MainProductResponseData[]>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

export async function fetchClosingSaleProducts(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/closing-sale`;
  try {
    const { data } = await httpClient.get<BaseResponse<ListProductSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface RecipeResponseData {
  no: number;
  link: string;
  title: string;
  image_url: string;
  main_recipe_url: string;
}

type RecipesSectionResponse = MainSectionBaseResponse<RecipeResponseData[]>;

export async function fetchMainRecipes(key: string, sectionId: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/kurly-recipe`;
  try {
    const { data } = await httpClient.get<BaseResponse<RecipesSectionResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}

interface InstagramReviewResponse {
  title: string;
  subtitle: string;
  reviews: {
    landing_url: string;
    thumbnail_image_url: string;
  }[];
}

export async function fetchInstagramReviews() {
  const path = '/main/v1/main/instagram-reviews';
  try {
    const { data } = await httpClient.get<BaseResponse<InstagramReviewResponse>>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
}
