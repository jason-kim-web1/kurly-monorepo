import { useQuery } from '@tanstack/react-query';
import type { QueryStatus } from '@tanstack/react-query';

import { useCallback } from 'react';

import { useAppSelector } from '../../../../shared/store';

import { getFilterList } from '../../../service/productList.service';

import { filterQueryKey } from '../../queries';
import { FilterGroup } from '../../types';

interface Params {
  collectionName: string;
  productListQueryStatus: QueryStatus;
}

export function useCollectionFilter({ collectionName, productListQueryStatus }: Params) {
  const site = useAppSelector(({ main }) => main.site);
  return useQuery<FilterGroup[]>(
    filterQueryKey.collectionFilter(site, collectionName),
    useCallback(() => getFilterList({ site, collectionName }), [collectionName, site]),
    {
      enabled: !!collectionName && productListQueryStatus === 'success',
    },
  );
}
