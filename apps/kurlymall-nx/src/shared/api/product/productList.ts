import axios from 'axios';
import { eq } from 'lodash';

import httpClient from '../../configs/http-client';

import { UnknownError } from '../../errors';

import type {
  CategoryFilterParam,
  CountProductParam,
  FilterParam,
  FilterTemplate,
  PageType,
  ProductListParam,
  FilteredProductsCount,
} from '../../../product/list/types';
import type { BaseResponse } from '../../interfaces';
import type { DeliveryInfoName, DeliveryInfoType, SnakeCaseStickerList } from '../../../product/types';
import { ProductCollectionDesignKind } from '../../../product/list/types';

export interface ProductBannerData {
  mobile_image: string;
  event_banner_mobile_url: string;
  mobile_link: string;
  pc_image: string;
  event_banner_pc_url: string;
  pc_link: string;
}

export interface ProductVideoData {
  video_thumbnail_url: string;
  video_url: string;
}

interface ProductMetaData {
  default_sort_type: string;
  delivery_type?: string;
  available_sort: {
    type: string;
    name: string;
  }[];
}

// # ProductCategories
interface ProductCategoriesData {
  code: string;
  is_show_all: boolean;
  name: string;
  parent_codes: string[];
  parent_names: string[];
  root_category: {
    banners: ProductBannerData[];
    code: string;
    name: string;
  };
  subcategory_display_policy: string;
}

interface ProductCategories {
  data: ProductCategoriesData;
  meta: ProductMetaData;
}

// ProductCollectionGroups
interface ProductCollectionGroups {
  id: number;
  name: string;
  code: string;
  title: string;
  subtitle: string;
  design_kind: string;
  collections: {
    id: number;
    name: string;
    code: string;
    title: string;
    subtitle: string;
    status: boolean;
    control_type: string;
    sort_type: string;
    display_scope: string;
    design_kind: string;
    collection_thumbnail_pc_url: string;
    collection_thumbnail_mobile_url: string;
    purchasable_products_count: number;
    all_products_count: number;
    banners: ProductBannerData[];
    videos?: ProductVideoData[];
  }[];
}

interface ProductCategoriesSibling {
  code: string;
  name: string;
  parent_names: string[];
}

// # ProductCollections
interface ProductCollectionsData {
  banners: ProductBannerData[];
  videos?: ProductVideoData[];
  code: string;
  control_type: string;
  display_scope: string;
  groups: {
    name: string;
    code: string;
  }[];
  name: string;
  policies: {
    key: string;
    data: {
      category_code: string;
    };
  }[];
  sort_type: string;
  status: boolean;
  subtitle: string;
  title: string;
  design_kind: ProductCollectionDesignKind;
}

interface ProductCollections {
  data: ProductCollectionsData;
  meta: ProductMetaData;
}

// # ProductList
export interface ProductListData {
  discount_rate: number;
  discounted_price: number | null;
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
  is_sales?: boolean;
  list_image_url: string;
  product_vertical_medium_url: string;
  name: string;
  no: number;
  sales_price: number;
  not_purchase_message: string;
  product_view_status: string;
  short_description: string;
  sold_out_title: string;
  sold_out_text: string;
  sticker: {
    background_color: string;
    content: {
      text: string;
      weight: string;
    }[];
    opacity: number;
  } | null;
  tags: {
    name: string;
    type: string;
  }[];
  delivery_type_names: DeliveryInfoName[];
  delivery_type_infos: DeliveryInfoType[];
  review_count: string;
  stickers_v2: SnakeCaseStickerList;
}

interface ProductListPage {
  current_page: number;
  per_page: number;
  total_pages: number;
  links: {
    previous?: string;
    next?: string;
  };
  count: number;
  total: number;
}
interface ProductListMeta {
  pagination: ProductListPage;
  sort_type: string;
}

interface ProductList {
  data: ProductListData[];
  meta: ProductListMeta;
}

export const fetchProductCategories = async (categoryNo: string): Promise<ProductCategories> => {
  const path = `/collection/v2/home/product-categories/${categoryNo}`;
  try {
    const data = await httpClient.get(path);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

export const fetchProductCategoriesSibling = async (categoryNo: string): Promise<ProductCategoriesSibling[]> => {
  const path = `/collection/v2/home/product-categories/${categoryNo}/product-categories`;
  try {
    const { data } = await httpClient.get(path);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

export const fetchCollectionGroups = async (productCode: string): Promise<ProductCollectionGroups> => {
  const path = `/collection/v2/home/product-collection-groups/${productCode}`;
  try {
    const { data } = await httpClient.get(path);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

export const fetchProductCollections = async (productCode: string): Promise<ProductCollections> => {
  const path = `/collection/v2/home/product-collections/${productCode}`;
  try {
    const { data } = await httpClient.get(path);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

export const fetchProductList = async (param: ProductListParam): Promise<ProductList> => {
  const { section, code, selectedSortType, currentPage, perPage, filters } = param;
  const site = param.siteMain.toLowerCase();
  const path = `/collection/v2/home/sites/${site}/product-${section}/${code}/products?sort_type=${selectedSortType}&page=${currentPage}&per_page=${perPage}&filters=${filters}`;
  try {
    const { data } = await httpClient.get(path);

    return {
      data: data.data,
      meta: data.meta,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

// filter
export interface FilterData {
  data: FilterGroup[];
}

export interface FilterGroup {
  name: string;
  key: string;
  template: FilterTemplate;
  is_quick: boolean;
  values: FilterValue[];
}

interface FilterValue {
  key: string;
  name: string;
  value: string;
  product_counts: number;
  icon_url: string | null;
}

export const fetchFilterList = async ({ site, collectionName }: Omit<FilterParam, 'filters'>): Promise<FilterData> => {
  const path = `/collection/v2/home/sites/${site.toLowerCase()}/product-collections/${collectionName}/filters`;

  try {
    const { data } = await httpClient.get(path);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

export const fetchCategoryFilterList = async ({
  site,
  categoryNo,
}: Omit<CategoryFilterParam, 'filters'>): Promise<FilterData> => {
  const path = `/collection/v2/home/sites/${site.toLowerCase()}/product-categories/${categoryNo}/filters`;

  try {
    const { data } = await httpClient.get(path);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

// filtered category & collection items
export const fetchFilteredCollectionCount = async (param: CountProductParam): Promise<FilteredProductsCount> => {
  const { code, filters } = param;
  const requestUrl = `/collection/v2/home/product-collections/${code}/products/counts-by-filters?filters=${filters}`;

  const { data } = await httpClient.get<BaseResponse<FilteredProductsCount>>(requestUrl);
  return data.data;
};

const fetchFilteredCategoryCount = async (param: CountProductParam): Promise<FilteredProductsCount> => {
  const { code, filters } = param;
  const requestUrl = `/collection/v2/home/product-categories/${code}/products/counts-by-filters?filters=${filters}`;

  const { data } = await httpClient.get<BaseResponse<FilteredProductsCount>>(requestUrl);
  return data.data;
};

export const fetchFilteredProductCount = async (section: PageType, param: CountProductParam) => {
  if (eq(section, 'collections')) {
    return fetchFilteredCollectionCount(param);
  }

  if (eq(section, 'categories')) {
    return fetchFilteredCategoryCount(param);
  }
};
