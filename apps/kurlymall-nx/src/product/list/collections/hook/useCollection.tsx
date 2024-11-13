import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { eq, get } from 'lodash';

import { useAppSelector } from '../../../../shared/store';
import { getProductCollections } from '../../../service/productList.service';
import { collectionQueryKey } from '../../queries';
import { ProductCollections } from '../../types';
import { COLLECTION_DESIGN_KIND } from '../../../constants';

type Options = Omit<UseQueryOptions<ProductCollections, AxiosError>, 'initialData'>;

interface Params {
  collectionName: string;
  options?: Options;
}

export function useCollection({ collectionName, options }: Params) {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const enabled = !!collectionName && hasSession && options?.enabled;
  const queryResult = useQuery<ProductCollections, AxiosError>(
    collectionQueryKey.collection(collectionName),
    () => getProductCollections(collectionName),
    {
      ...options,
      enabled,
    },
  );
  const { data } = queryResult;
  const isDesignKindNumber = eq(get(data, 'designKind'), COLLECTION_DESIGN_KIND.NUMBER);
  return {
    ...queryResult,
    isDesignKindNumber,
  };
}
