import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getProductCategoriesSibling } from '../../../service/productList.service';
import { categoryQueryKey } from '../../queries';
import { ProductSibling } from '../../types';

type Option = Omit<UseQueryOptions<ProductSibling[], AxiosError>, 'initialData'>;

interface Params {
  categoryNo?: string;
  options?: Option;
}

export function useSiblingCategory({ categoryNo, options }: Params) {
  return useQuery<ProductSibling[], AxiosError>(
    categoryQueryKey.siblingCategories(categoryNo ?? ''),
    () => getProductCategoriesSibling(categoryNo ?? ''),
    {
      ...options,
    },
  );
}
