import { PageType } from './types';
import type { MainSite } from '../../main/interfaces/MainSection.interface';

const categoryQueryKey = {
  all: ['product', 'category'],
  category: (categoryNo: string) => [...categoryQueryKey.all, categoryNo],
  siblingCategories: (categoryNo: string) => [...categoryQueryKey.all, 'siblingCategory', categoryNo],
};

const collectionQueryKey = {
  all: ['product', 'collection'],
  collection: (collectionName: string) => [...collectionQueryKey.all, collectionName],
  collectionGroups: (collectionName: string) => [...collectionQueryKey.all, 'groups', collectionName],
};

const filterQueryKey = {
  all: ['product', 'filter'],
  collectionFilter: (site: string, collectionName: string) => [
    ...filterQueryKey.all,
    site,
    'collection',
    collectionName,
  ],
  categoryFilter: (site: string, categoryNo: string) => [...filterQueryKey.all, site, 'category', categoryNo],
};

type SectionType = Exclude<PageType, 'search'>;

const productsQueryKey = {
  all: ['products'],
  infiniteProductList: (
    section: SectionType,
    code: string,
    perPage: number,
    selectedSortType: string,
    filters: string,
    site = '',
  ) => [...productsQueryKey.all, section, code, perPage, selectedSortType, filters, site],
  paginatedProductList: (
    section: SectionType,
    code: string,
    currentPage: number,
    perPage: number,
    selectedSortType: string,
    filters: string,
    site = '',
  ) => [...productsQueryKey.all, section, code, currentPage, perPage, selectedSortType, filters, site],
  count: (section: PageType, code: string, filters: string, site: MainSite, qvt?: string) => [
    ...productsQueryKey.all,
    section,
    'count',
    code,
    filters,
    site,
    qvt,
  ],
};

export { categoryQueryKey, collectionQueryKey, filterQueryKey, productsQueryKey };
