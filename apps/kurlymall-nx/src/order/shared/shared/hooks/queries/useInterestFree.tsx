import { useQuery } from '@tanstack/react-query';

import { getInterestFreeList } from '../../../../../shared/api';

export const INTEREST_FREE_KEY = ['order', 'checkout', 'interest-free'];

export default function useInterestFree() {
  const queryResult = useQuery(INTEREST_FREE_KEY, getInterestFreeList);

  return {
    interestFreeList: queryResult.isError ? [] : queryResult.data?.interestFreeCards,
  };
}
