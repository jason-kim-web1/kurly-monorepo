import { useQueryClient, useMutation } from '@tanstack/react-query';

import { BLOCK_LOCK_NUMBER_KEY } from './key';
import { postVerificationNumberVerification } from '../../../../shared/api/members/block.api';

function usePostVerificationNumberVerification() {
  const queryClient = useQueryClient();

  return useMutation(postVerificationNumberVerification, {
    onSuccess() {
      queryClient.invalidateQueries(BLOCK_LOCK_NUMBER_KEY);
    },
  });
}

export default usePostVerificationNumberVerification;
