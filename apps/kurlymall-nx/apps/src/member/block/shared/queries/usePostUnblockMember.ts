import { useQueryClient, useMutation } from '@tanstack/react-query';

import { BLOCK_LOCK_NUMBER_KEY } from './key';
import { postUnblockMember } from '../../../../shared/api/members/block.api';

function usePostUnblockMember() {
  const queryClient = useQueryClient();

  return useMutation(postUnblockMember, {
    onSuccess() {
      queryClient.invalidateQueries(BLOCK_LOCK_NUMBER_KEY);
    },
  });
}

export default usePostUnblockMember;
