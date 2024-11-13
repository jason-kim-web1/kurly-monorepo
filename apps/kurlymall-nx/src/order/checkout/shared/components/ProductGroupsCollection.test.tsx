import { render } from '@testing-library/react';

import { CheckoutProductItem } from '../../../../shared/interfaces';
import { addComma } from '../../../../shared/services';
import ProductGroup from './ProductGroupsCollection';

describe('ProductGroup 테스트', () => {
  const mock: CheckoutProductItem = {
    id: 5000,
    dealProductName: '방울토마토',
    contentProductNo: 1000,
    contentProductName: 'contentProductName',
    thumbnailUrl: '',
    quantity: 1,
    price: 5000,
    dealProductNo: 1,
    discountedPrice: 0,
    isPickupProduct: false,
    isReservable: false,
    isAlcoholDealProduct: false,
    isGiftCard: false,
  };

  given('productGroupsByDeliveryPolicy', () => {});
  given('isGiveaway', () => false);

  const renderProductGroup = () =>
    render(
      <ProductGroup
        productGroupsByDeliveryPolicy={given.productGroupsByDeliveryPolicy}
        isGiveaway={given.isGiveaway}
      />,
    );

  context('dealProductName과 contentProductName이 같으면', () => {
    given('productGroupsByDeliveryPolicy', () => ({
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [
            {
              ...mock,
              dealProductName: '방울토마토',
              contentProductName: '방울토마토',
            },
          ],
        },
      ],
    }));

    it('contentProductName 정보를 볼 수 없다.', () => {
      const { container, getByTestId } = renderProductGroup();
      const { dealProductName, quantity, price } = given.productGroupsByDeliveryPolicy.productGroups[0].products[0];

      expect(container).toHaveTextContent(dealProductName);
      expect(container).toHaveTextContent(`${addComma(price)}원`);
      expect(container).toHaveTextContent(`${quantity}개`);
      expect(() => getByTestId('content-product-name')).toThrowError();
    });
  });

  context('아이템이 있으면', () => {
    given('productGroupsByDeliveryPolicy', () => ({
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [mock],
        },
      ],
    }));

    it('상품 정보를 볼 수 있다.', () => {
      const { container } = renderProductGroup();
      const { dealProductName, quantity, price } = given.productGroupsByDeliveryPolicy.productGroups[0].products[0];

      expect(container).toHaveTextContent(dealProductName);
      expect(container).toHaveTextContent(`${addComma(price)}원`);
      expect(container).toHaveTextContent(`${quantity}개`);
    });
  });

  context('상품 갯수가 여러개면', () => {
    given('productGroupsByDeliveryPolicy', () => ({
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [
            {
              ...mock,
              quantity: 5,
            },
          ],
        },
      ],
    }));

    it('총 금액을 볼 수 있다', () => {
      const { container } = renderProductGroup();
      const { quantity, price } = given.productGroupsByDeliveryPolicy.productGroups[0].products[0];

      expect(container).toHaveTextContent(`${addComma(price * quantity)}원`);
    });
  });

  context('상품 할인이 있으면', () => {
    given('productGroupsByDeliveryPolicy', () => ({
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [
            {
              ...mock,
              discountedPrice: 1000,
            },
          ],
        },
      ],
    }));

    it('할인 금액을 볼 수 있다', () => {
      const { container } = renderProductGroup();
      const { quantity, price, discountedPrice } = given.productGroupsByDeliveryPolicy.productGroups[0].products[0];

      expect(container).toHaveTextContent(`${addComma((price - discountedPrice) * quantity)}원`);
    });
  });

  context('증정품이면', () => {
    given('isGiveaway', () => true);
    given('productGroupsByDeliveryPolicy', () => ({
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [
            {
              ...mock,
              price: 0,
              discountedPrice: 0,
            },
          ],
        },
      ],
    }));

    it('상품 개수만 보여준다.', () => {
      const { container } = renderProductGroup();

      expect(container).toHaveTextContent('1개');
    });
  });
});
