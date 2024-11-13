import { useQuery } from '@tanstack/react-query';

import { fetchMemberBlockReason } from '../../../../shared/api/members/block.api';
import { BLOCK_REASON_KEY } from './key';
import { getLockedToken } from '../service';

export default function useGetMemberBlockReason() {
  const lockedToken = getLockedToken();

  const queryResult = useQuery([...BLOCK_REASON_KEY, lockedToken], () => fetchMemberBlockReason(lockedToken), {
    enabled: !!lockedToken,
  });

  return { ...queryResult };
}
