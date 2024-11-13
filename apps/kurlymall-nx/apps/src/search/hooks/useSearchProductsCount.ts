import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { useAppSelector } from '../../shared/store';

import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { productsQueryKey } from '../queries';
import { getSearchProductsCount } from '../service/search.service';

interface SearchProductsQueryParams {
  keyword: string;
  activeFilter: string;
  currentSite?: MainSite;
  defaultSortType?: string;
  qvt?: string;
}

export function useSearchProductsCount({ keyword, activeFilter, currentSite, qvt }: SearchProductsQueryParams) {
  const site = useAppSelector(({ main }) => main.site);
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const siteValue = !!currentSite ? currentSite : site;

  return useQuery<number, AxiosError>(
    productsQueryKey.count('search', keyword, activeFilter, siteValue, qvt),
    () =>
      getSearchProductsCount({
        siteMain: siteValue,
        keyword,
        filters: activeFilter,
        qvt,
      }),
    { enabled: !!keyword && hasSession },
  );
}
