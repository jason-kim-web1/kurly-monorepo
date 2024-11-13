import { validateAddToCart } from './validate-add-to-cart';

describe('수량 검증 테스트 - 장바구니 숏컷', () => {
  describe('컨텐츠 상품 수량 검증', () => {
    context('컨텐츠 상품의 최소 구매 수량 보다 적으면', () => {
      given('products', () => ({
        totalCount: 2,
        contentsName: 'contentsName',
        contentsMinEa: 3,
        contentsMaxEa: null,
      }));

      it('최소 구매 수량 알럿 메세지를 return 한다.', () => {
        const result = validateAddToCart({ ...given.products });
        const { contentsName, contentsMinEa } = given.products;

        expect(result).toBe(`${contentsName} 상품의 최소 구매 수량은 ${contentsMinEa}개 입니다.`);
      });
    });

    context('컨텐츠 상품의 최대 구매 가능 수량 보다 많으면', () => {
      given('products', () => ({
        totalCount: 9999,
        contentsName: 'contentsName',
        contentsMaxEa: 3,
        contentsMinEa: 1,
      }));

      it('최대 구매 수량 알럿 메세지를 return 한다.', () => {
        const result = validateAddToCart({ ...given.products });
        const { contentsName, contentsMaxEa } = given.products;

        expect(result).toBe(`${contentsName} 상품의 최대 구매 수량은 ${contentsMaxEa}개 입니다.`);
      });
    });

    context('컨텐츠 상품의 최대 구매 가능 수량이 정해져 있지 않으면', () => {
      given('products', () => ({
        totalCount: 9999,
        contentsName: 'contentsName',
        contentsMinEa: 1,
        contentsMaxEa: null,
      }));

      it('알럿이 뜨지 않는다.', () => {
        const result = validateAddToCart({ ...given.products });
        expect(result).toBe('');
      });
    });
  });
});
