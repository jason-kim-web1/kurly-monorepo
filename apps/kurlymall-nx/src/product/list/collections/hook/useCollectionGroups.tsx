import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { get } from 'lodash';

import { useAppSelector } from '../../../../shared/store';
import { getCollectionGroups } from '../../../service/productList.service';
import { collectionQueryKey } from '../../queries';
import type { ProductCollectionGroupsData } from '../../types';

type Options = Omit<UseQueryOptions<ProductCollectionGroupsData, AxiosError>, 'initialData'>;

interface Params {
  collectionGroupsCode: string;
  options?: Options;
}

export const collectionGroupsQueryKeys = (collectionGroupsCode: string) =>
  collectionQueryKey.collectionGroups(collectionGroupsCode);
export const collectionGroupsQueryFn = (collectionGroupsCode: string) => () =>
  getCollectionGroups(collectionGroupsCode);

export function useCollectionGroups({ collectionGroupsCode, options }: Params) {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const enabled = !!collectionGroupsCode && hasSession && options?.enabled;
  const queryResult = useQuery<ProductCollectionGroupsData, AxiosError>(
    collectionGroupsQueryKeys(collectionGroupsCode),
    collectionGroupsQueryFn(collectionGroupsCode),
    {
      ...options,
      enabled,
    },
  );
  const { data } = queryResult;
  const collectionGroups = data ? data.collections : [];
  const collectionGroupTitle = get(data, 'title', '');
  return {
    ...queryResult,
    collectionGroups,
    collectionGroupTitle,
  };
}
