import { validateDealProductQuantity } from './validate-deal-product-quantity';

describe('수량 검증 테스트-장바구니 스탭퍼, 상품상세 스탭퍼', () => {
  describe('딜 상품 수량 검증', () => {
    context('딜 상품의 최소 구매 수량 보다 적으면', () => {
      given('product', () => ({
        quantity: 2,
        dealProductName: 'dealProductName',
        dealProductLimit: {
          min: 3,
          max: null,
        },
      }));

      it('최소 구매 수량 알럿을 띄운다.', () => {
        const result = validateDealProductQuantity(given.product);
        const { dealProductName, dealProductLimit } = given.product;

        expect(result).toStrictEqual({
          text: `${dealProductName} 상품의 최소 구매 수량은 ${dealProductLimit.min}개 입니다.`,
          changedQuantity: dealProductLimit.min,
        });
      });
    });

    context('딜 상품의 최대 구매 가능 수량 보다 많으면', () => {
      given('product', () => ({
        quantity: 9999,
        dealProductName: 'dealProductName',
        dealProductLimit: {
          min: 1,
          max: 3,
        },
      }));

      it('최대 구매 수량 알럿을 띄운다.', () => {
        const result = validateDealProductQuantity(given.product);
        const { dealProductName, dealProductLimit } = given.product;

        expect(result).toStrictEqual({
          text: `${dealProductName} 상품의 최대 구매 수량은 ${dealProductLimit.max}개 입니다.`,
          changedQuantity: dealProductLimit.max,
        });
      });
    });

    context('딜 상품의 최대 구매 가능 수량이 정해져 있지 않으면', () => {
      given('product', () => ({
        quantity: 9999,
        dealProductName: 'dealProductName',
        dealProductLimit: {
          min: 1,
          max: null,
        },
      }));

      it('알럿이 뜨지 않는다.', () => {
        const result = validateDealProductQuantity(given.product);
        expect(result).toStrictEqual({
          text: '',
          changedQuantity: given.product.quantity,
        });
      });
    });
  });
});
