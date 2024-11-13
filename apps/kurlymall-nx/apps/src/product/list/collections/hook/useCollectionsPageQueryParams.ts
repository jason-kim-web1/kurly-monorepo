import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { parseQueryString } from '../../../../shared/utils/parseQueryString';
import { getSanitizedValue, getSanitizedMainSite } from '../../../../shared/utils/getSanitizedValues';
import { parseFilterData } from '../../shared/util/parseFilterData';
import { MAIN_SITE } from '../../../../main/constants';
import type { MainSite } from '../../../../main/interfaces/MainSection.interface';

export const useCollectionListPageQueryParams = () => {
  const { query } = useRouter();
  const { site, collectionName, filters = '', collectionGroupsCode, collection = '' } = parseQueryString(query);

  const parsedFilter = useMemo(() => parseFilterData(filters), [filters]);
  const mainSite = useMemo(
    () =>
      getSanitizedValue<MainSite>({
        value: site,
        defaultValue: MAIN_SITE.MARKET,
        fn: getSanitizedMainSite,
      }),
    [site],
  );

  return {
    site: mainSite,
    collectionName,
    filters: parsedFilter,
    collectionGroupsCode,
    collection,
  };
};
