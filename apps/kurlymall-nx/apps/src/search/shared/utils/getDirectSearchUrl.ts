import { PRODUCT_PATH } from '../../../shared/constant';

const getDirectSearchProductUrl = (productNo: number) => {
  return `${PRODUCT_PATH.detail.uri}/${productNo}`;
};

export { getDirectSearchProductUrl };
