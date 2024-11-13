import { AxiosError } from 'axios';

import { GiftCartNotExistsError, UnauthenticatedError } from '../errors';
import { ProductNotForSale } from '../errors/ProductNotSelling';

export const handleGiftCartNotExists = (err: AxiosError) => {
  if (err.response?.data.code === '5004' || err.response?.data.code === '5101' || err.response?.data.code === '4015') {
    throw new GiftCartNotExistsError(err);
  }
};

export const handleProductNotForSale = (err: AxiosError) => {
  if (err.response?.data.code === '5101') {
    throw new ProductNotForSale(err);
  }
};

export const handleUnauthenticated = (err: Error) => {
  if (err instanceof UnauthenticatedError) {
    throw err;
  }
};

export const handleCouponNotExist = (err: AxiosError) => {
  if (err.response?.data.code === '5202') {
    throw new Error('존재하지 않는 쿠폰입니다.');
  }
};
