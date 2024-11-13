import { useMutation } from '@tanstack/react-query';

import { updateInquiryProduct } from '../services';
import { PutInquiryProductFormParam } from '../../../../shared/api/mypage/inquiry-products';

export interface UpdateMutateParams {
  productNo: number;
  contentId: number;
  formData: PutInquiryProductFormParam;
}

const useInquiryProductUpdateMutation = () => {
  return useMutation((params: UpdateMutateParams) => {
    const { productNo, contentId, formData } = params;
    return updateInquiryProduct(productNo, contentId, formData);
  });
};

export default useInquiryProductUpdateMutation;
