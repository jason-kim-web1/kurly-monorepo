import { useQuery } from '@tanstack/react-query';

import { fetchAppConfig } from '../../../api/app-config/AppConfig';
import { isPC } from '../../../../../util/window/getDevice';

const useAppConfigSiteInfos = (enabled = !isPC) => {
  return useQuery({
    queryKey: ['app-config', 'site-infos'],
    queryFn: fetchAppConfig,
    enabled,
    select: (response) => response?.siteInfos || [],
  });
};

export { useAppConfigSiteInfos };
