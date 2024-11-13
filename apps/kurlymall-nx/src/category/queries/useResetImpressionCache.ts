import { useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';

import { MainSite } from '../../main/interfaces/MainSection.interface';

import { keys } from './keys';

const sites: Lowercase<MainSite>[] = ['market', 'beauty'];

const useResetImpressionCache = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    sites.forEach((site) => {
      void queryClient.resetQueries(keys.IMPRESSION(site));
    });
  }, [queryClient]);
};

export { useResetImpressionCache };
