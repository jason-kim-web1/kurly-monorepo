import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { logImpressionSection, logImpressionSectionItem } from '../amplitude/events';
import { keys } from './keys';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import { useAppSelector } from '../../shared/store';

const generateSiteId = (id: string, site: MainSite) => `${id}-${site}`;

const useImpressionLogPolicy = () => {
  const queryClient = useQueryClient();
  const site = useAppSelector(({ main }) => main.site);

  const queryKey = useMemo(() => keys.IMPRESSION(site.toLowerCase() as Lowercase<MainSite>), [site]);

  const { data } = useQuery(queryKey, {
    queryFn: (): string[] => [],
    initialData: (): string[] => [],
  });

  const onEmptyHistory = (id: string, cb: () => void) => {
    if (data.includes(id)) return;

    queryClient.setQueryData<string[]>(queryKey, (prevData) => {
      if (!prevData) return [id];
      return Array.from(new Set([...prevData, id]));
    });

    cb();
  };

  const actions = {
    logSection: (id: string, ...params: Parameters<typeof logImpressionSection>) => {
      onEmptyHistory(generateSiteId(id, site), () => {
        logImpressionSection(...params);
      });
    },
    logSectionItem: (id: string, ...params: Parameters<typeof logImpressionSectionItem>) => {
      onEmptyHistory(generateSiteId(id, site), () => {
        logImpressionSectionItem(...params);
      });
    },
  };

  return {
    ...actions,
  };
};

export { useImpressionLogPolicy };
