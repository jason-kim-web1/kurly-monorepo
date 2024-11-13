import httpClient from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { RecommendProductListResponse, RecommendProductsRequest } from '../constants/RecommendProductList';

export const postRecommendProductList = async (params: RecommendProductsRequest) => {
  const url = '/order/v1/checkout/recommended-products';

  const { data } = await httpClient.post<BaseResponse<RecommendProductListResponse>>(url, params);
  return data.data;
};
