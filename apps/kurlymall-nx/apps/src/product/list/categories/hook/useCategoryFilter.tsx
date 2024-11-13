import { useQuery } from '@tanstack/react-query';
import type { QueryStatus } from '@tanstack/react-query';

import { useCallback } from 'react';

import { useAppSelector } from '../../../../shared/store';

import { getCategoryFilterList } from '../../../service/productList.service';

import { filterQueryKey } from '../../queries';
import { FilterGroup } from '../../types';

interface Params {
  categoryNo: string;
  productListQueryStatus: QueryStatus;
}

export function useCategoryFilter({ categoryNo, productListQueryStatus }: Params) {
  const site = useAppSelector(({ main }) => main.site);

  return useQuery<FilterGroup[]>(
    filterQueryKey.categoryFilter(site, categoryNo),
    useCallback(() => getCategoryFilterList({ site, categoryNo }), [categoryNo, site]),
    {
      enabled: !!categoryNo && productListQueryStatus === 'success',
    },
  );
}
