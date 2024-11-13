import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useAppSelector } from '../../../shared/store';
import { parseQueryString } from '../../../shared/utils/parseQueryString';
import { getProductList } from '../../service/productList.service';

import { productsQueryKey } from '../queries';
import { getDefaultPerPage } from '../shared/util/getDefaultPerPage';
import { PageType, ProductList } from '../types';

interface Params {
  section: Exclude<PageType, 'search'>;
  code: string;
  defaultSortType: string;
  enabled?: boolean;
}

export default function useProductList({ section, code, defaultSortType, enabled = true }: Params) {
  const site = useAppSelector(({ main }) => main.site);
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const { query } = useRouter();
  const defaultPerPage = getDefaultPerPage(section);

  const {
    filters = '',
    page = '1',
    per_page: perPage = defaultPerPage,
    sorted_type: sortedType = defaultSortType,
  } = parseQueryString(query);

  return useQuery<ProductList>(
    productsQueryKey.paginatedProductList(section, code, Number(page), Number(perPage), sortedType, filters),
    () =>
      getProductList({
        section,
        code,
        selectedSortType: sortedType,
        currentPage: Number(page),
        perPage: Number(perPage),
        filters,
        siteMain: site,
      }),
    {
      enabled: hasSession && enabled,
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );
}
