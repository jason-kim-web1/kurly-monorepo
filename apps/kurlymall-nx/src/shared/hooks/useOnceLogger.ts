import { useQuery, useQueryClient } from '@tanstack/react-query';
import { get } from 'lodash';

type LogId = string | number;

type LogHistory = {
  [logId: string]: boolean;
};

type LogHandler = (logId: LogId, f: () => void) => void;

const QUERY_KEY_PREFIX = ['logger', 'once'];
const DEFAULT_LOG_HISTORY = {};

/**
 * NOTE: 한번 트리거된 이벤트는 중복으로 집계하지 않도록 처리
 */
const useOnceLogger = (logDomain: string) => {
  const queryKey = [...QUERY_KEY_PREFIX, logDomain];
  const query = useQuery<LogHistory>({
    queryFn: async () => {
      return DEFAULT_LOG_HISTORY;
    },
    queryKey,
  });
  const queryClient = useQueryClient();

  const log: LogHandler = (logId: LogId, f: () => void) => {
    const isAlreadyTriggered = get(query, `data.${logId}`, false);
    if (isAlreadyTriggered) {
      return;
    }
    f();
    queryClient.setQueryData<LogHistory>(queryKey, (prev) => {
      const prevData = prev ? prev : {};
      return {
        ...prevData,
        [logId]: true,
      };
    });
  };

  return { log };
};

export { useOnceLogger };
export type { LogHandler };
