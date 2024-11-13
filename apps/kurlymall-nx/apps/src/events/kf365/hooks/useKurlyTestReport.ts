import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { fetchKurlyTestReport } from '../../../shared/api/events/test-report/test-report.api';
import Alert from '../../../shared/components/Alert/Alert';

function useKurlyTestReport() {
  const { data, error } = useQuery(['events', 'test-report'], fetchKurlyTestReport, {
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (error) {
      Alert({
        text: '데이터를 가져오는 도중 오류가 발생했습니다.',
      });
    }
  }, [error]);

  return {
    data: data?.data || [],
    error,
  };
}

export default useKurlyTestReport;
