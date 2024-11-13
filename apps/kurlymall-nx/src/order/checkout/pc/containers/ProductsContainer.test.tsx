import { fireEvent, screen, waitFor } from '@testing-library/react';

import ProductsContainer from './ProductsContainer';

import { renderWithProviders } from '../../../../../util/testutil';
import { addComma } from '../../../../shared/services';
import {
  mockCheckoutProductGroupsByDeliveryPolicies,
  mockCheckoutProducts,
  mockGiftCardCheckoutProduct,
  mockGiveawayProducts,
} from '../../../../../fixtures/checkout/checkout-fixtures';
import { CheckoutType } from '../../../../shared/interfaces';
import { LiquidityMessageTextMap } from '../../shared/constants/liquidity-message';

describe('ProductsContainer test', () => {
  const renderProducts = (preloadedState = {}) => renderWithProviders(<ProductsContainer />, { preloadedState });

  it('주문상품 영역을 접고 펼칠 수 있다.', () => {
    const { store } = renderProducts({
      checkout: {
        products: mockCheckoutProducts,
        productGroupsByDeliveryPolicies: mockCheckoutProductGroupsByDeliveryPolicies,
        giveawayProducts: [],
      },
    });

    const { products } = store.getState().checkout;

    const foldIconImage = screen.getByTestId('fold-button');
    const price = `${addComma((products?.[0].price as number) - (products?.[0].discountedPrice as number))}원`;

    expect(screen.queryByText(price)).not.toBeInTheDocument();

    fireEvent.click(foldIconImage);

    expect(screen.queryAllByText(price)[0]).toBeInTheDocument();
  });

  context('주문하는 상품이 없으면', () => {
    it('로딩 UI 를 볼 수 있다.', () => {
      renderProducts({
        checkout: {
          products: [],
          giveawayProducts: [],
        },
      });

      expect(screen.getByText('주문 상품')).toBeInTheDocument();
      expect(screen.getByTestId('loading-checkout-products')).toBeInTheDocument();
    });
  });

  context.each`
    mockProducts | mockProductGroupsByDeliveryPolicies | mockGiveaway | title | orderType
    ${mockCheckoutProducts} | ${mockCheckoutProductGroupsByDeliveryPolicies} | ${[]}  | ${'주문 상품'}  | ${'일반주문'}
    ${mockCheckoutProducts} | ${mockCheckoutProductGroupsByDeliveryPolicies} | ${mockGiveawayProducts}  | ${'주문 상품'} | ${'증정품 포함'}
  `(
    '주문하는 상품이 있으면',
    ({ mockProducts, mockProductGroupsByDeliveryPolicies, mockGiveaway, title, orderType }) => {
      context(`${orderType} 일 경우`, () => {
        it(`${title} title 과 상품정보를 볼 수 있다.`, async () => {
          const { store } = renderProducts({
            checkout: {
              products: mockProducts,
              productGroupsByDeliveryPolicies: mockProductGroupsByDeliveryPolicies,
              giveawayProducts: mockGiveaway,
            },
          });

          const { products } = store.getState().checkout;

          const titleElement = screen.getByText(title);
          const foldIconImage = screen.getByTestId('fold-button');
          const price = `${addComma((products?.[0].price as number) - (products?.[0].discountedPrice as number))}원`;

          // 주문상품 영역을 펼친다.
          fireEvent.click(foldIconImage);

          await waitFor(() => {
            expect(titleElement).toBeInTheDocument();

            expect(screen.getAllByText(price)[0]).toBeInTheDocument();
            expect(screen.queryAllByText(products?.[0].dealProductName as string)[0]).toBeInTheDocument();
          });
        });
      });
    },
  );

  context('상품권 주문이라면', () => {
    it(`"${LiquidityMessageTextMap.KURLY_PAY_ACCOUNT_ONLY}" 문구를 볼 수 있다.`, () => {
      renderProducts({
        checkout: {
          checkoutType: CheckoutType.GIFT_CARD,
          products: mockGiftCardCheckoutProduct,
          productGroupsByDeliveryPolicies: mockCheckoutProductGroupsByDeliveryPolicies,
          giveawayProducts: [],
        },
      });

      expect(screen.getAllByText(LiquidityMessageTextMap.KURLY_PAY_ACCOUNT_ONLY)[0]).toBeInTheDocument();
    });
  });

  context('금 주문이라면', () => {
    it(`"${LiquidityMessageTextMap.KURLY_PAY_ACCOUNT_AND_SELECTED_CARDS}" 문구를 볼 수 있다.`, () => {
      renderProducts({
        checkout: {
          checkoutType: CheckoutType.LIQUIDITY,
          products: mockGiftCardCheckoutProduct,
          productGroupsByDeliveryPolicies: mockCheckoutProductGroupsByDeliveryPolicies,
          giveawayProducts: [],
        },
      });

      expect(screen.getAllByText(LiquidityMessageTextMap.KURLY_PAY_ACCOUNT_AND_SELECTED_CARDS)[0]).toBeInTheDocument();
    });
  });
});
