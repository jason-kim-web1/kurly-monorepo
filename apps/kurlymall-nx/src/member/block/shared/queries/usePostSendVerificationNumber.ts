import { useQueryClient, useMutation } from '@tanstack/react-query';

import { BLOCK_LOCK_NUMBER_KEY } from './key';
import { postSendVerificationNumber } from '../../../../shared/api/members/block.api';

function usePostSendVerificationNumber() {
  const queryClient = useQueryClient();

  return useMutation(postSendVerificationNumber, {
    onSuccess() {
      queryClient.invalidateQueries(BLOCK_LOCK_NUMBER_KEY);
    },
  });
}

export default usePostSendVerificationNumber;
