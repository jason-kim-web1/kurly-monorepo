import { PRODUCT_PATH } from '../../../shared/constant';

export const getDetailUrl = (contentsProductNo: number) => {
  return `${PRODUCT_PATH.detail.uri}/${contentsProductNo}`;
};
