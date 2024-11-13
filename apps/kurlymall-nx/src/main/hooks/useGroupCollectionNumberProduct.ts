import { useQuery } from '@tanstack/react-query';

import type { MainSite } from '../interfaces/MainSection.interface';
import { fetchGroupCollectionNumberProduct } from '../../shared/api/main/main.api';
import { createMainProductData } from '../service/main.service';
import { queryKeys } from '../constants';

const useGroupCollectionNumberProduct = (
  site: MainSite,
  sectionId: number,
  collectionCode: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: queryKeys.groupCollectionNumberProductList(site, sectionId, collectionCode),
    queryFn: () => fetchGroupCollectionNumberProduct(site, sectionId, collectionCode),
    select: (data) => data.map(createMainProductData),
    enabled,
  });
};

export { useGroupCollectionNumberProduct };
