import { useMutation } from '@tanstack/react-query';

import { postAddCartItems } from '../api/postAddCartItems';

export default function useAddToCartMutation() {
  return useMutation({
    mutationFn: postAddCartItems,
  });
}
