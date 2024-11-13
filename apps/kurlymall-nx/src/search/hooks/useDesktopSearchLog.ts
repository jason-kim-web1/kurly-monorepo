import { useQueryClient } from '@tanstack/react-query';
import { eq, get } from 'lodash';

import type { SectionItemViewModel } from '../features/Section/factory';
import { ignoreError } from '../../shared/utils/general';
import { isDefined } from '../../shared/utils/typeGuard';

type LogHistoryId = string;

type LogHistoryItem = {
  selectSectionItem: boolean;
  selectSectionItemShortCut: boolean;
  impressionSectionItem: boolean;
};

const DEFAULT_LOG_HISTORY_ITEM = {
  selectSectionItem: false,
  selectSectionItemShortCut: false,
  impressionSectionItem: false,
};

type LogHistory = Record<string, LogHistoryItem>;

type LogHistoryKey = keyof LogHistoryItem;

type DesktopSearchOptions = {
  keyword: string;
  sortTypeName: string;
};

const LOG_HISTORY_KEY_TYPE = {
  IMPRESSION_SECTION_ITEM: 'impressionSectionItem',
  SELECT_SECTION_ITEM: 'selectSectionItem',
  SELECT_SECTION_ITEM_SHORT_CUT: 'selectSectionItemShortCut',
} as const;

const LOG_HISTORY_QUERY_KEY = ['pc', 'log', 'search', 'history'];

const checkLogHistoryData = (data: unknown): data is LogHistory => isDefined(data);

const useDesktopSearchLog = () => {
  const queryClient = useQueryClient();

  const getLogHistory = (): LogHistory => {
    const data = queryClient.getQueryData<LogHistory>(LOG_HISTORY_QUERY_KEY);
    return data || {};
  };

  const checkAlreadyLogged = (id: LogHistoryId, type: LogHistoryKey) => {
    const logHistory = getLogHistory();
    return get(logHistory, `${id}.${type}`, false);
  };

  const setLogHistoryItem = (id: LogHistoryId, historyItem: Partial<LogHistoryItem>) => {
    queryClient.setQueryData(LOG_HISTORY_QUERY_KEY, (prev) => {
      if (!checkLogHistoryData(prev)) {
        return {
          [id]: {
            ...DEFAULT_LOG_HISTORY_ITEM,
            ...historyItem,
          },
        };
      }
      const prevHistoryItem = prev[id] || DEFAULT_LOG_HISTORY_ITEM;
      return {
        ...prev,
        [id]: {
          ...prevHistoryItem,
          ...historyItem,
        },
      };
    });
  };

  const createLogHistoryId = (searchOptions: DesktopSearchOptions, item?: SectionItemViewModel): string => {
    const { keyword, sortTypeName } = searchOptions;
    const base = [keyword, sortTypeName];
    if (!item) {
      return base.join('_');
    }
    return [...base, item._logId].join('_');
  };

  const log = (id: LogHistoryId, type: LogHistoryKey, f: () => void) => {
    const isImpressionSectionItem = eq(type, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION_ITEM);
    if (isImpressionSectionItem && checkAlreadyLogged(id, type)) {
      return;
    }
    ignoreError(() => {
      setLogHistoryItem(id, {
        [type]: true,
      });
      f();
    });
  };

  return { createLogHistoryId, log } as const;
};

export { useDesktopSearchLog, LOG_HISTORY_KEY_TYPE };
