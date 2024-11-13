import { useQuery } from '@tanstack/react-query';
import { get, isUndefined } from 'lodash';

import { fetchMyKurlyStyleProfile } from '../../../shared/api';
import { useAppSelector } from '../../../shared/store';
import type { MyKurlyStyleProfile } from '../../../shared/interfaces';

const getHasProfile = (data?: MyKurlyStyleProfile): boolean => {
  if (isUndefined(data)) {
    return false;
  }
  return get(data, 'hasProfile', false);
};

export const useMyKurlyStyleProfile = () => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(
    ['member', 'proxy', 'profile', 'v1', 'my-kurly-style', 'status'],
    fetchMyKurlyStyleProfile,
    {
      enabled: hasSession,
    },
  );
  const { data } = queryResult;
  const hasProfile = getHasProfile(data);
  return {
    ...queryResult,
    hasProfile,
  };
};
