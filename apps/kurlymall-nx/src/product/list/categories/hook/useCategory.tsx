import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAppSelector } from '../../../../shared/store';

import { getProductCategories } from '../../../service/productList.service';

import { categoryQueryKey } from '../../queries';
import { ProductCategories } from '../../types';

type Options = Omit<UseQueryOptions<ProductCategories, AxiosError>, 'initialData'>;

interface Params {
  categoryNo: string;
  options?: Options;
}

export function useCategory({ categoryNo, options }: Params) {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const enabled = !!categoryNo && hasSession && options?.enabled;

  return useQuery<ProductCategories, AxiosError>(
    categoryQueryKey.category(categoryNo),
    () => getProductCategories(categoryNo),
    {
      ...options,
      enabled,
      keepPreviousData: true,
    },
  );
}
