import { get, isEmpty } from 'lodash';

import {
  fetchCollectionGroups,
  fetchFilteredProductCount,
  fetchProductCategories,
  fetchProductCategoriesSibling,
  fetchProductCollections,
  fetchProductList,
  fetchCategoryFilterList,
  fetchFilterList,
  ProductVideoData,
} from '../../shared/api';

import type {
  CategoryFilterParam,
  CountProductParam,
  FilterGroup,
  FilterParam,
  FilterValue,
  PageType,
  ProductCategories,
  ProductCollectionGroupsData,
  ProductCollections,
  ProductList,
  ProductListParam,
  ProductSibling,
  ProductVideo,
} from '../list/types';

import type {
  FilterData,
  FilterGroup as FilterGroupApi,
  ProductBannerData,
  ProductListData,
} from '../../shared/api/product/productList';
import { createProductData } from '../../shared/services/product.service';
import { sentryCaptureError } from '../../shared/services';

const getBanner = (banners: ProductBannerData[]) => {
  return banners.map((banner) => ({
    mobileImage: banner.mobile_image,
    eventBannerMobileUrl: banner.event_banner_mobile_url,
    mobileLink: banner.mobile_link,
    pcImage: banner.pc_image,
    pcLink: banner.pc_link,
    eventBannerPcUrl: banner.event_banner_pc_url,
  }));
};

const getVideos = (videos: ProductVideoData[]): ProductVideo[] => {
  return videos.map((v) => ({
    videoUrl: v.video_url,
    videoThumbnailUrl: v.video_thumbnail_url,
  }));
};

export const getProductCategories = async (categoryNo: string): Promise<ProductCategories> => {
  const { data, meta } = await fetchProductCategories(categoryNo);

  return {
    code: data.code,
    isShowAll: data.is_show_all,
    name: data.name,
    parentCodes: data.parent_codes,
    parentNames: data.parent_names,
    rootCategory: {
      banner: getBanner(data.root_category.banners),
      code: data.root_category.code,
      name: data.root_category.name,
    },
    subcategoryDisplayPolicy: data.subcategory_display_policy,
    defaultSortType: meta.default_sort_type,
    deliveryType: meta.delivery_type,
    availableSort: meta.available_sort.map((it) => ({
      type: it.type,
      name: it.name,
    })),
  };
};

// categories
export const getProductCategoriesSibling = async (categoryNo: string): Promise<ProductSibling[]> => {
  const data = await fetchProductCategoriesSibling(categoryNo);

  return data.map(({ code, name, parent_names }) => ({
    code: code,
    name: name,
    parentNames: parent_names,
  }));
};

// collection-groups
export const getCollectionGroups = async (productCode: string): Promise<ProductCollectionGroupsData> => {
  const data = await fetchCollectionGroups(productCode);

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    title: data.title,
    subtitle: data.subtitle,
    designKind: data.design_kind,
    collections: data.collections.map((it) => ({
      id: it.id,
      name: it.name,
      code: it.code,
      title: it.title,
      subtitle: it.subtitle,
      status: it.status,
      controlType: it.control_type,
      sortType: it.sort_type,
      displayScope: it.display_scope,
      designKind: it.design_kind,
      pcCollectionImage: it.collection_thumbnail_pc_url,
      mobileCollectionImage: it.collection_thumbnail_mobile_url,
      purchasableProductsCount: it.purchasable_products_count,
      allProductsCount: it.all_products_count,
      banners: getBanner(it.banners),
      videos: getVideos(it.videos ?? []),
    })),
  };
};

// collections
export const getProductCollections = async (productCode: string): Promise<ProductCollections> => {
  const { data, meta } = await fetchProductCollections(productCode);

  return {
    banner: getBanner(data.banners),
    videos: getVideos(data.videos ?? []),
    code: data.code,
    controlType: data.control_type,
    displayScope: data.display_scope,
    groups: data.groups.map((it) => ({
      name: it.name,
      code: it.code,
    })),
    name: data.name,
    policies: data.policies
      ? data.policies.map((it) => ({
          key: it.key,
          data: {
            categoryCode: it.data.category_code,
          },
        }))
      : [],
    sortType: data.sort_type,
    status: data.status,
    subtitle: data.subtitle,
    title: data.title,
    defaultSortType: meta.default_sort_type,
    availableSort: meta.available_sort.map((it) => ({
      type: it.type,
      name: it.name,
    })),
    designKind: data.design_kind,
  };
};

// filtered category & collection items
export const getProductsCount = async (section: PageType, param: CountProductParam): Promise<number> => {
  const data = await fetchFilteredProductCount(section, param);

  return get(data, 'counts', -1);
};

// categories + collections
export const createListProduct = (data: ProductListData) =>
  createProductData({
    no: data.no,
    name: data.name,
    shortDescription: data.short_description,
    listImageUrl: data.list_image_url,
    productVerticalMediumUrl: data.product_vertical_medium_url,
    salesPrice: data.sales_price,
    discountedPrice: data.discounted_price,
    discountRate: data.discount_rate,
    isBuyNow: data.is_buy_now,
    isGiftable: data.is_giftable,
    canRestockNotify: data.can_restock_notify,
    isOnlyAdult: data.is_only_adult,
    tags: data.tags,
    productViewStatus: data.product_view_status,
    deliveryTypeNames: (data.delivery_type_infos || []).map(({ description }) => description),
    deliveryTypeInfos: data.delivery_type_infos,
    groupProduct: {
      isGroup: data.group_product.is_group,
      isNotRepresentative: data.group_product.is_not_representative,
    },
    isPurchaseStatus: data.is_purchase_status,
    isSales: data.is_sales,
    isMultiplePrice: data.is_multiple_price,
    notPurchaseMessage: data.not_purchase_message,
    soldOutTitle: data.sold_out_title,
    soldOutText: data.sold_out_text,
    reviewCount: data.review_count,
    stickers_v2: data.stickers_v2,
  });

const aggregateFilter = (aggregationKey: string, filterValues: Map<string, string[]>, valueKey: string) => {
  if (filterValues.has(aggregationKey)) {
    const aggregatedValues = filterValues.get(aggregationKey);

    if (aggregatedValues) {
      return filterValues.set(aggregationKey, [...aggregatedValues, valueKey]);
    }

    return filterValues;
  }

  return filterValues.set(aggregationKey, [valueKey]);
};

export const createGroupByInitialCharacter = (filterGroup: FilterGroupApi) =>
  filterGroup.values.reduce((filterValues: Map<string, string[]>, values) => {
    const { name, value: initialCharacter, key } = values;

    filterValues = aggregateFilter('전체', filterValues, key);

    if (initialCharacter >= 'A' && initialCharacter <= 'Z') {
      sentryCaptureError(`브랜드 필터 ${name}의 value 값이 대문자로 저장되어 있습니다.`);
    }

    if (initialCharacter.toLowerCase() >= 'a' && initialCharacter.toLowerCase() <= 'z') {
      return aggregateFilter('A-Z', filterValues, key);
    }

    if (initialCharacter === '') {
      return aggregateFilter('ETC', filterValues, key);
    }

    return aggregateFilter(initialCharacter, filterValues, key);
  }, new Map());

const createFilterData = (filterGroup: FilterGroupApi) => {
  return {
    key: filterGroup.key,
    name: filterGroup.name,
    template: filterGroup.template,
    isQuick: filterGroup.is_quick,
    values: filterGroup.values.map((value) => {
      return {
        key: value.key,
        name: value.name,
        value: value.value,
        productCounts: value.product_counts,
        iconUrl: value.icon_url,
      };
    }),
    groupByKey: filterGroup.values.reduce((filterValues: { [key: string]: FilterValue }, item) => {
      const { key, name, value, product_counts: productCounts, icon_url: iconUrl } = item;
      filterValues[key] = {
        key,
        name,
        value,
        productCounts,
        iconUrl,
      };
      return filterValues;
    }, {}),
    groupByInitialCharacter: createGroupByInitialCharacter(filterGroup),
    keyList: filterGroup.values.map(({ key }) => key),
    sortedKeyList: [...filterGroup.values]
      .sort((a, b) => {
        if (a.product_counts > b.product_counts) {
          return -1;
        }
        if (a.product_counts < b.product_counts) {
          return 1;
        }
        return 0;
      })
      .map(({ key }) => key),
  };
};

export const getProductList = async (param: ProductListParam): Promise<ProductList> => {
  const { data, meta } = await fetchProductList(param);
  const pageMeta = meta.pagination;

  return {
    products: data.map(createListProduct),
    meta: {
      pagination: {
        count: pageMeta.count,
        perPage: pageMeta.per_page,
        total: pageMeta.total,
        currentPage: pageMeta.current_page,
        totalPages: pageMeta.total_pages,
        links: pageMeta.links
          ? {
              previous: pageMeta.links.previous,
              next: pageMeta.links.next,
            }
          : {},
      },
      sortType: meta.sort_type,
    },
  };
};

// filter
const convertFilterKeys = ({ data }: FilterData) => {
  return data.filter(({ values }) => !isEmpty(values)).map((filterGroup) => createFilterData(filterGroup));
};

export const getFilterList = async ({ site, collectionName }: FilterParam): Promise<FilterGroup[]> => {
  const { data } = await fetchFilterList({ site, collectionName });

  return convertFilterKeys({ data });
};

export const getCategoryFilterList = async ({ site, categoryNo }: CategoryFilterParam): Promise<FilterGroup[]> => {
  const { data } = await fetchCategoryFilterList({ site, categoryNo });

  return convertFilterKeys({ data });
};
