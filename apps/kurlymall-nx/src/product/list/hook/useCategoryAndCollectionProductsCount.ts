import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { useAppSelector } from '../../../shared/store';

import type { PageType } from '../types';
import { productsQueryKey } from '../queries';
import { getProductsCount } from '../../service/productList.service';

interface ProductsQueryParams {
  section: PageType;
  code: string;
  activeFilter: string;
}

export function useCategoryAndCollectionProductsCount({ section, code, activeFilter }: ProductsQueryParams) {
  const site = useAppSelector(({ main }) => main.site);
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  return useQuery<number, AxiosError>(
    productsQueryKey.count(section, code, activeFilter, site),
    () =>
      getProductsCount(section, {
        code: code,
        filters: activeFilter,
      }),
    { enabled: !!code && hasSession },
  );
}
