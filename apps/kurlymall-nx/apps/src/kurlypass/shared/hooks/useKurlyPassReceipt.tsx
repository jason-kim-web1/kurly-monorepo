import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useKurlyPassReceipt = ({ loading, onNextPage }: { loading: boolean; onNextPage: () => void }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !loading) {
      onNextPage();
    }
  }, [inView, loading, onNextPage]);

  return { ref };
};
