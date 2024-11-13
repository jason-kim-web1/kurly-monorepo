import { isPickupProducts } from './isPickupProducts';

import { mockDealProductsWithPickupProduct, mockDealProductWithoutPickupProduct } from '../../../../../fixtures';

describe('isPickupProducts', () => {
  context('픽업 상품이면', () => {
    it('true를 return 한다', () => {
      const result = isPickupProducts(mockDealProductsWithPickupProduct);

      expect(result).toBeTruthy();
    });
  });

  context('픽업 상품이 아니면', () => {
    it('false를 return 한다', () => {
      const result = isPickupProducts(mockDealProductWithoutPickupProduct);

      expect(result).toBeFalsy();
    });
  });
});
