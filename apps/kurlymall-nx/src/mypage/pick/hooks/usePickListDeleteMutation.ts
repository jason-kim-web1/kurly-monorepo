import { useMutation } from '@tanstack/react-query';

import { putPickToggle } from '../../../shared/api';

interface DeleteMutateParams {
  productNo: number;
  isPick: boolean;
}

export default function usePickListDeleteMutation() {
  return useMutation((params: DeleteMutateParams) => {
    const { productNo, isPick } = params;
    return putPickToggle({
      productNo,
      isPick,
    });
  });
}
