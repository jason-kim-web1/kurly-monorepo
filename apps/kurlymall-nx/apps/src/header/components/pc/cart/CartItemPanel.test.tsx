import { render } from '@testing-library/react';

import CartItemPanel from './CartItemPanel';

describe('CartItemPanel', () => {
  const renderPanel = () =>
    render(
      <CartItemPanel
        productImageUrl={given.productImageUrl}
        productName={given.productName}
        isInCart={given.isInCart}
      />,
    );

  context('when product name is', () => {
    const productName = '[Sea to Table] 쫄깃한 떡이 들어있는 감바스';
    given('productName', () => productName);
    it('render product name', () => {
      const { container } = renderPanel();
      expect(container).toHaveTextContent(productName);
    });
  });

  it('render description', () => {
    const { container } = renderPanel();
    expect(container).toHaveTextContent('장바구니에 상품을 담았습니다.');
  });

  describe('추가하려는 상품들 중에', () => {
    const isInCartInfoText = '이미 담은 상품의 수량을 추가했습니다.';
    context('이미 장바구니에 담긴 상품이 포함되어 있으면', () => {
      given('isInCart', () => true);

      it('이미 상품이 담겨있다는 정보를 보여준다.', () => {
        const { container } = renderPanel();
        expect(container).toHaveTextContent('이미 담은 상품의 수량을 추가했습니다.');
      });
    });

    context('추가하려는 상품들이 기존 장바구니에 없으면', () => {
      given('isInCart', () => false);

      it('이미 상품이 담겨있다는 정보를 보여주지 않는다.', () => {
        const { container } = renderPanel();
        expect(container).not.toHaveTextContent(isInCartInfoText);
      });
    });
  });
});
