import { useCallback, useEffect } from 'react';

import { logEventPixelSearch } from '../shared/utils/pixel/logEventPixelSearch';
import { UnSpecifiedSectionList } from '../features/Section/factory';

export const useSearchPixel = ({
  listSections,
  isFetching,
  isPreviousKeyword,
  searchKeyword,
}: {
  listSections?: UnSpecifiedSectionList;
  isFetching: boolean;
  isPreviousKeyword: boolean;
  searchKeyword: string;
}) => {
  const sendPixelEvent = useCallback(() => {
    logEventPixelSearch(listSections, searchKeyword);
  }, [listSections, searchKeyword]);

  useEffect(() => {
    // 검색결과 API의 Fetching이 끝나고, 직전검색키워드가 아니면 픽셀 이벤트를 발생시킨다.
    if (isFetching || isPreviousKeyword) return;

    sendPixelEvent();
  }, [isFetching, isPreviousKeyword, sendPixelEvent]);
};
