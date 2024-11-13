import { QueryClient } from '@tanstack/react-query';

import { LOREAL_BRAND_LIST, LOREAL_TERMS_DETAIL } from '../constants/queryKey';
import { getLorealBrandList, getLorealPrivacyPolicy } from '../../../shared/services/loreal.service';

export const getQueryClient = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(LOREAL_TERMS_DETAIL, getLorealPrivacyPolicy);
  await queryClient.prefetchQuery(LOREAL_BRAND_LIST, getLorealBrandList);
  return queryClient;
};
