import httpClient from '../../configs/http-client';

import { UnknownError } from '../../errors';
import { BaseResponse } from '../../interfaces';

export interface ShareProductResponse {
  no: number;
  title: string;
  description: string;
  horizontal_image_url: string;
  vertical_image_url: string;
  image_width: number;
  image_height: number;
  product_url: string;
  button_title: string;
  product_horizontal_large_url: string;
  product_vertical_large_url: string;
}

export const fetchSharedProduct = async (contentProductNo: number): Promise<ShareProductResponse> => {
  const url = `/showroom/v2/share/${contentProductNo}`;

  try {
    const { data } = await httpClient.get<BaseResponse<ShareProductResponse>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};
