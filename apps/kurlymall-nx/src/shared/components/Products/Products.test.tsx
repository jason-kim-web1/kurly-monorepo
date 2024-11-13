import { render } from '@testing-library/react';

import { Product } from '../../interfaces/Product';
import { addComma } from '../../services';

import Products from './Products';

describe('Products', () => {
  const mock: Product = {
    id: '123456',
    dealProductName: '방울토마토',
    contentProductName: '방울토마토',
    thumbnailUrl: '',
    price: 5000,
    quantity: 1,
    discountedPrice: 5000,
  };

  it('renders', () => {
    const products = [mock];
    const { container } = render(<Products products={products} />);

    expect(container).toHaveTextContent(mock.dealProductName);
    expect(container).toHaveTextContent(`${addComma(mock.price)}원`);
    expect(container).toHaveTextContent(`${mock.quantity}개`);
  });

  context('with amount is more than 1', () => {
    it('renders summed price', () => {
      const products = [
        {
          ...mock,
          quantity: 2,
        },
      ];

      const { container } = render(<Products products={products} />);

      expect(container).toHaveTextContent(`${addComma(products[0].price * products[0].quantity)}원`);
    });
  });

  context('with discounted product', () => {
    it('renders discounted price', () => {
      const products = [
        {
          ...mock,
          discountedPrice: 2500,
        },
      ];

      const { container } = render(<Products products={products} />);

      expect(container).toHaveTextContent(`${addComma(products[0].discountedPrice * products[0].quantity)}원`);
    });
  });
});
