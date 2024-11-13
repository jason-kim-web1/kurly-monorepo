import { useMutation } from '@tanstack/react-query';

import { removeInquiryProduct } from '../services';

interface DeleteMutateParams {
  productNo: number;
  contentId: number;
}

const useInquiryProductDeleteMutation = () => {
  return useMutation((params: DeleteMutateParams) => {
    const { productNo, contentId } = params;
    return removeInquiryProduct(productNo, contentId);
  });
};

export default useInquiryProductDeleteMutation;
