import { useQuery } from '@tanstack/react-query';
import isAfter from 'date-fns/isAfter';
import { useMemo } from 'react';

import { getSecond } from '../../shared/utils/time';
import { fetchBaseContent, fetchMetaData } from '../../shared/api/marketing/marketing.api';
import { ContentBody, ContentData, ContentTypeKey } from '../shared/type';
import { VipLevelType } from '../../member/shared/constants';
import { ContentTypes } from '../shared/constants';

const STALE_TIME = getSecond(60 * 1000);

const getIdArray = (id: string, arr: ContentBody['images'] | ContentBody['buttons']) => {
  if (!arr || arr.length <= 0) return undefined;

  return arr.map((a, idx) => ({
    ...a,
    id: `${id}-${idx}`,
  }));
};

const getContentBody = (cId: string, body?: ContentBody) => {
  if (!body) return {};

  const { images, buttons } = body;
  if (!images && !buttons) return body;

  return {
    ...body,
    ...{ images: getIdArray(`${cId}-img`, images) },
    ...{ buttons: getIdArray(`${cId}-btn`, buttons) },
  };
};

type FetchContentProps = {
  userLevel: VipLevelType | 'common' | 'members';
  queryKey: string[];
  queryMetaKey: string[];
  filePath: string;
};

function useFetchContent<T>({ userLevel, queryKey, queryMetaKey, filePath }: FetchContentProps): ContentData<T> {
  const queryMetaResult = useQuery(queryMetaKey, () => fetchMetaData({ filePath }), {
    staleTime: STALE_TIME,
    enabled: true,
  });

  const { data: metaData, error: metaError } = queryMetaResult;

  let version = '';
  if (metaData) {
    const isUpdateAvailable = isAfter(new Date(), new Date(metaData.updateDate));

    version = isUpdateAvailable ? metaData.updateVersion : metaData.defaultVersion;
  }

  const queryContentKey = [...queryKey, 'content'];

  const queryContentResult = useQuery(queryContentKey, () => fetchBaseContent<T>({ filePath, version }), {
    staleTime: STALE_TIME,
    enabled: !!version,
  });

  const { data, error } = queryContentResult;

  const newData = useMemo(() => {
    const selectedPage = data?.pages.find(({ level }) => level === userLevel);

    const newDataContent =
      selectedPage?.content.map((c) => ({
        ...c,
        body: {
          id: c.id,
          ...getContentBody(c.id, c.body),
        },
      })) || [];

    return { ...data, content: newDataContent };
  }, [data, userLevel]);

  const tabs = useMemo(() => {
    const newDataContent = newData.content;

    const tabInfo = newDataContent?.find(({ type }) => (type as unknown as ContentTypeKey) === ContentTypes.Tabs);

    const tabArray =
      newDataContent
        ?.filter(({ id }) => tabInfo?.body?.tabs?.includes(id))
        .map(({ title, id, badge }) => ({ title, id, badge })) || [];

    return tabArray;
  }, [newData.content]);

  return {
    data: newData,
    tabs,
    error: (error || metaError) as Error,
  };
}

export default useFetchContent;
