import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { chain, get } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { parseQueryString } from '../../../shared/utils/parseQueryString';
import { getProductList } from '../../service/productList.service';
import { productsQueryKey } from '../queries';
import { getDefaultPerPage } from '../shared/util/getDefaultPerPage';

import type { PageType, ProductList } from '../types';
import type { MainSite } from '../../../main/interfaces/MainSection.interface';

interface Params {
  section: Exclude<PageType, 'search'>;
  code: string;
  defaultSortType: string;
  currentSite?: MainSite;
  enabledCondition?: boolean;
}

const getFlattenProductList = (data: InfiniteData<ProductList> | undefined) =>
  chain(data)
    .get('pages')
    .map((args) => get(args, 'products'))
    .flatten()
    .value();

export default function useInfiniteProductList({
  section,
  code,
  defaultSortType,
  currentSite,
  enabledCondition = true,
}: Params) {
  const site = useAppSelector(({ main }) => main.site);
  const siteValue = !!currentSite ? currentSite : site;
  const { query } = useRouter();
  const defaultPerPage = getDefaultPerPage(section);

  const {
    filters = '',
    per_page: perPageQuery = defaultPerPage,
    sorted_type: sortedType = defaultSortType,
  } = parseQueryString(query);

  const perPage = Number(perPageQuery);

  const params = {
    section,
    code,
    selectedSortType: sortedType,
    perPage,
    filters,
    siteMain: siteValue,
  };

  const queryResult = useInfiniteQuery<ProductList>(
    productsQueryKey.infiniteProductList(section, code, perPage, sortedType, filters, siteValue),
    ({ pageParam = 1 }) =>
      getProductList({
        currentPage: pageParam,
        ...params,
      }),
    {
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      enabled: enabledCondition,
      getPreviousPageParam: (firstPage) => {
        const { currentPage } = firstPage.meta.pagination;
        return currentPage > 0 ? currentPage : undefined;
      },
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.meta.pagination;
        return currentPage + 1 <= totalPages ? currentPage + 1 : undefined;
      },
    },
  );

  const { data } = queryResult;
  const totalProductsCount = chain(data).get('pages').head().get('meta').get('pagination').get('total', 0).value();

  const flattenProductList = getFlattenProductList(data);

  return {
    ...queryResult,
    flattenProductList,
    totalProductsCount,
  };
}
