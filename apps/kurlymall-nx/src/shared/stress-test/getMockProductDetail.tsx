import PRODUCT_MOCK_DATA from './product_5094163.json';
import { createProductDetailData } from '../../product/service/product.service'; // 12 KB

import { ProductDetailResponse } from '../../shared/api';

export default function getMockProductDetail() {
  const { data, meta } = PRODUCT_MOCK_DATA as unknown as ProductDetailResponse;
  return createProductDetailData(data, meta);
}
