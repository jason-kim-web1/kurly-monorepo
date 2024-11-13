import httpClient from '../../configs/http-client';

import { UnknownError } from '../../errors';

interface RequestBody {
  param: {
    dealProductNo: number;
    contentProductNo: number | null;
    quantity: number;
  }[];
}

export const postDirectOrder = async (param: RequestBody) => {
  const url = '/cart/v1/cart-items/direct';

  try {
    return await httpClient.post(url, { param });
  } catch (err) {
    throw new UnknownError(err);
  }
};
