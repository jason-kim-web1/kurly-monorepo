import type { MainSite } from '../main/interfaces/MainSection.interface';

export const productsQueryKey = {
  all: ['products'],
  infiniteProductList: (
    section: 'search',
    keyword: string,
    isLoggedIn: boolean,
    selectedSortType: string,
    filters: string,
    site = '',
    qvt?: string,
  ) => [...productsQueryKey.all, section, keyword, isLoggedIn, selectedSortType, filters, site, qvt],
  normalSearchResult: (
    section: 'search',
    version: string,
    keyword: string,
    isLoggedIn: boolean,
    selectedSortType: string,
    filters: string,
    site = '',
    qvt?: string,
  ) => [...productsQueryKey.all, version, section, keyword, isLoggedIn, selectedSortType, filters, site, qvt],
  paginatedProductList: (
    section: 'search',
    keyword: string,
    isLoggedIn: boolean,
    currentPage: number,
    selectedSortType: string,
    filters: string,
    site = '',
    qvt?: string,
  ) => [...productsQueryKey.all, section, keyword, isLoggedIn, currentPage, selectedSortType, filters, site, qvt],
  count: (section: 'search', keyword: string, filters: string, site: MainSite, qvt?: string) => [
    ...productsQueryKey.all,
    section,
    'count',
    keyword,
    filters,
    site,
    qvt,
  ],
};
