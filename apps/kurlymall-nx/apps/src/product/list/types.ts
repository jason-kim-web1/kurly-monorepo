import type { ProductData } from '../../shared/interfaces';
import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { ProductSelectData, ProductStatus } from '../../shared/interfaces';
import type { DeliveryInfoName, StickerList } from '../types';

// common
interface ProductBannerData {
  mobileImage: string;
  eventBannerMobileUrl: string;
  mobileLink: string;
  pcImage: string;
  eventBannerPcUrl: string;
  pcLink: string;
}

interface ProductVideo {
  videoThumbnailUrl: string;
  videoUrl: string;
}

interface ProductAvailableSort {
  type: string;
  name: string;
}

interface ProductMetaData {
  defaultSortType: string;
  availableSort: ProductAvailableSort[];
  deliveryType?: string;
}

interface ProductSibling {
  code: string;
  name: string;
  parentNames?: string[];
}

interface ProductListPage {
  currentPage: number;
  perPage: number;
  totalPages: number;
  links?: {
    previous?: string;
    next?: string;
  };
  count?: number;
  total?: number;
}

interface ProductListMeta {
  pagination: ProductListPage;
  sortType: string;
}

interface ProductList {
  products: ProductData[];
  meta: ProductListMeta;
}

type PageType = 'categories' | 'collections' | 'search';

type ProductListType = 'categories' | 'collection' | 'collection-groups';

// categories
interface ProductCategoriesData {
  code: string;
  isShowAll: boolean;
  name: string;
  parentCodes: string[];
  parentNames: string[];
  rootCategory: {
    banner: ProductBannerData[];
    code: string;
    name: string;
  };
  subcategoryDisplayPolicy: string;
}

type ProductCategories = ProductCategoriesData & ProductMetaData;

// collection-group
interface ProductCollectionGroups {
  id: number;
  name: string;
  code: string;
  title: string;
  subtitle: string;
  status: boolean;
  controlType: string;
  sortType: string;
  displayScope: string;
  designKind: string;
  pcCollectionImage: string;
  mobileCollectionImage: string;
  purchasableProductsCount: number;
  allProductsCount: number;
  banners: ProductBannerData[];
  videos: ProductVideo[];
}

interface ProductCollectionGroupsData {
  id: number;
  name: string;
  code: string;
  title: string;
  subtitle: string;
  designKind: string;
  collections: ProductCollectionGroups[];
}

// collections
interface ProductCollectionsPoliciesData {
  key: string;
  data: {
    categoryCode: string;
  };
}

type ProductCollectionDesignKind = 'default' | 'number';

interface ProductCollectionsData {
  banner: ProductBannerData[];
  videos: ProductVideo[];
  code: string;
  controlType: string;
  displayScope: string;
  groups: ProductSibling[];
  name: string;
  policies: ProductCollectionsPoliciesData[];
  sortType: string;
  status: boolean;
  subtitle: string;
  title: string;
  designKind: ProductCollectionDesignKind;
}

type ProductCollections = ProductCollectionsData & ProductMetaData;

// page export
interface ProductListPagination {
  currentPage: number;
  totalProductsCount: number;
  totalPages: number;
}

interface ProductListPageType {
  type: PageType;
  code: string;
}

interface ProductListParam {
  siteMain: MainSite;
  section?: PageType;
  code?: string;
  currentPage?: number;
  perPage?: number;
  selectedSortType?: string;
  filters?: string;
  qvt?: string;
}

// filter
interface FilterParam {
  site: MainSite;
  collectionName: string;
}

interface CategoryFilterParam {
  site: MainSite;
  categoryNo: string;
}

type FilterTemplate = 'radio_button' | 'checkbox' | 'sorted_checkbox' | 'promotion';

const FILTER_TEMPLATE: Record<Uppercase<FilterTemplate>, FilterTemplate> = {
  RADIO_BUTTON: 'radio_button',
  CHECKBOX: 'checkbox',
  SORTED_CHECKBOX: 'sorted_checkbox',
  PROMOTION: 'promotion',
};

interface FilterGroup {
  name: string;
  key: string;
  template: FilterTemplate;
  isQuick: boolean;
  values: FilterValue[];
  groupByKey: { [key: string]: FilterValue };
  groupByInitialCharacter: Map<string, string[]>;
  keyList: string[];
  sortedKeyList: string[];
}
interface FilterValue {
  key: string;
  name: string;
  value: string;
  productCounts: number;
  iconUrl: string | null;
}

interface ActiveFilterNameWithHref {
  name: string;
  href: {
    pathname: string;
    query: {
      filters: string;
    };
  };
}

interface MobileActiveFilterNameWithHref extends ActiveFilterNameWithHref {
  groupKey: string;
  template: FilterTemplate;
  filterKey: string;
}

type CountProductParam = {
  code: string;
  filters?: string;
};

interface FilteredProductsCount {
  counts: number;
}

interface ProductCardProps {
  index?: number;
  productNo: number;
  imageUrl: string;
  name: string;
  price: number;
  discount: {
    price: number | null;
    rate: number;
  };
  status: ProductStatus;
  isGroupProduct: boolean;
  canRestockNotify: boolean;
  isBuyNow: boolean;
  reviewCount: string;
  className?: string;
  deliveryTypeNames: DeliveryInfoName[];
  tags?: {
    name: string;
    type: string;
  }[];
  isMultiplePrice?: boolean;
  queryId?: string;
  isGiftable: boolean;
  stickers_v2: StickerList;
  shortDescription?: string;
  handleLinkClick(selectLink: ProductSelectData): void;
  selectProduct(selectShortcut: ProductSelectData): void;
  ranking?: number;
}

interface MainCollectionGroupsProps {
  code: string;
  site: MainSite;
}

export type {
  ProductBannerData,
  ProductAvailableSort,
  ProductMetaData,
  ProductSibling,
  ProductListMeta,
  ProductList,
  PageType,
  ProductListType,
  ProductCategoriesData,
  ProductCategories,
  ProductCollectionGroups,
  ProductCollectionGroupsData,
  ProductCollectionsPoliciesData,
  ProductCollectionsData,
  ProductCollections,
  ProductListPagination,
  ProductListPageType,
  ProductListParam,
  FilterParam,
  CategoryFilterParam,
  FilterTemplate,
  FilterGroup,
  FilterValue,
  ActiveFilterNameWithHref,
  MobileActiveFilterNameWithHref,
  CountProductParam,
  FilteredProductsCount,
  ProductCardProps,
  MainCollectionGroupsProps,
  ProductCollectionDesignKind,
  ProductVideo,
};

export { FILTER_TEMPLATE };
