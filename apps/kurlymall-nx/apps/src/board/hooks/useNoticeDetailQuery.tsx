import { useQuery } from '@tanstack/react-query';

import { getNoticeDetail } from '../board.service';

export default function useNoticeDetailQuery(noticeNo: string) {
  const queryKey = ['board-notice-index', noticeNo];
  return useQuery(queryKey, () => getNoticeDetail(noticeNo), {
    keepPreviousData: true,
    retry: false,
  });
}
