import { useQuery } from '@tanstack/react-query';

import type { BaseResponse } from '../../../shared/interfaces';
import httpClient from '../../../shared/configs/http-client';

type ReviewProduct = {
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  productImageUrl: string;
};

function useReviewProduct(contentsProductNo: number, dealProductNo: number) {
  return useQuery(['my-page', 'review', contentsProductNo, dealProductNo], async () => {
    const url = `product-review/v1/contents-products/${contentsProductNo}/deal-products/${dealProductNo}`;
    const { data } = await httpClient.get<BaseResponse<ReviewProduct>>(url);
    return data.data;
  });
}

export default useReviewProduct;
