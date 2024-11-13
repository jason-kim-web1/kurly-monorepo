import { useQuery } from '@tanstack/react-query';
import { isBefore, isAfter } from 'date-fns';

import { getSecond } from '../../shared/utils/time';
import { ENVIRONMENT } from '../../shared/configs/config';
import { VersionInfoUpdate, LegoInfoType } from '../types';
import { fetchLegoInfo, fetchLegoInfoUpdate } from '../../shared/api/lego/lego.api';

const STALE_TIME = getSecond(60 * 1000);

const getDataVersion = (data?: VersionInfoUpdate) => {
  if (!data) {
    return null;
  }

  const { updateInfos, defaultVersion } = data;

  const currentTime = new Date();

  const currentVersion = updateInfos?.reduce((acc: string | undefined, { version, periods }) => {
    const [startDate, endDate] = periods;

    try {
      const isUpdateDate = isAfter(currentTime, new Date(startDate)) && isBefore(currentTime, new Date(endDate));
      return isUpdateDate ? version : acc;
    } catch (err) {
      return acc;
    }
  }, undefined);

  if (currentVersion) {
    return currentVersion;
  }

  return defaultVersion;
};

export function useLegoInfo({ dataId }: { dataId?: string }) {
  const metaQueryKey = ['events', 'lego', 'meta-update'];
  const { data: metaData } = useQuery(metaQueryKey, fetchLegoInfoUpdate, {
    staleTime: STALE_TIME,
    enabled: !!dataId,
  });

  const version = getDataVersion(metaData);

  const queryKey = ['events', 'lego', 'info', version];
  const queryResult = useQuery(queryKey, () => fetchLegoInfo(version ?? ''), {
    staleTime: STALE_TIME,
    enabled: !!version,
  });

  const { data: { data } = { data: undefined }, ...restQueryResult } = queryResult || {};

  const selectedLegoInfo = data?.find((item: LegoInfoType) => item.id === dataId);

  const { legoUrl, legoUrlDev, legoUrlPerf, legoUrlStg, ...restParams } = selectedLegoInfo || data?.[0] || {};
  const urlMap = {
    production: legoUrl,
    stage: legoUrlStg,
    performance: legoUrlPerf,
    development: legoUrlDev,
    localhost: legoUrlDev,
  };

  return { ...restQueryResult, ...restParams, legoUrl: urlMap[ENVIRONMENT] };
}
