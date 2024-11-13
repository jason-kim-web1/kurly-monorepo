import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { calculatedPriceFixture } from '../../../../../fixtures';
import { addComma } from '../../../../shared/services';

import PriceContainer from './PriceContainer';
import useBenefit from '../../shared/hooks/useBenefit';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';

const mockStore = configureStore(getDefaultMiddleware());
// eslint-disable-next-line @typescript-eslint/no-var-requires

jest.mock('react-redux');
jest.mock('../../shared/hooks/useBenefit');
jest.mock('../../../shared/shared/hooks/useMembersBanner');

describe('PriceContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  given('price', () => calculatedPriceFixture);
  given('isGiftCardOrder', () => false);
  given('usedPoint', () => 10);
  given('percent', () => 1);

  const renderPriceContainer = () => render(<PriceContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        price: given.price,
        isGiftCardOrder: given.isGiftCardOrder,
        usedPoint: given.usedPoint,
      },
      auth: {
        isGuest: false,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useBenefit as jest.Mock).mockImplementation(() => ({
      percent: given.percent,
      isExpectedPoint: true,
    }));
    (useMembersBanner as jest.Mock).mockImplementation(() => ({
      membersBanner: undefined,
      goToMembership: jest.fn(),
    }));
  });

  it('주문금액을 볼 수 있다', () => {
    const { container } = renderPriceContainer();
    const { totalPrice, discountPrice } = given.price;

    expect(container).toHaveTextContent('주문금액');
    expect(container).toHaveTextContent(`${addComma(totalPrice - discountPrice)}원`);
  });

  it('상품금액을 볼 수 있다', () => {
    const { container } = renderPriceContainer();
    const { totalPrice } = given.price;

    expect(container).toHaveTextContent('상품금액');
    expect(container).toHaveTextContent(`${addComma(totalPrice)}원`);
  });

  it('상품할인금액을 볼 수 있다', () => {
    const { container } = renderPriceContainer();
    const { discountPrice } = given.price;

    expect(container).toHaveTextContent('주문금액');
    expect(container).toHaveTextContent(`${addComma(discountPrice)}원`);
  });

  context('상품권을 주문하는 경우', () => {
    given('isGiftCardOrder', () => true);

    it('카드즉시할인 영역을 볼 수 없다.', () => {
      const { container } = renderPriceContainer();

      expect(container).not.toHaveTextContent('카드즉시할인');
    });

    it('컬리카드 적립혜택 영역을 볼 수 없다.', () => {
      const { container } = renderPriceContainer();

      expect(container).not.toHaveTextContent('컬리카드 결제 시');
    });
  });

  context('배송비 무료 사유가 없으면', () => {
    given('price', () => ({
      ...calculatedPriceFixture,
      deliveryPriceDiscountReason: '',
    }));

    it('배송비를 볼 수 있다', () => {
      const { container } = renderPriceContainer();
      const { deliveryPrice } = given.price;

      expect(container).toHaveTextContent('배송비');
      expect(container).toHaveTextContent(`${addComma(deliveryPrice)}원`);
    });
  });

  context('배송비 무료 사유 - 컬리패스가 존재하면', () => {
    given('price', () => ({
      ...calculatedPriceFixture,
      deliveryPriceDiscountReason: 'KURLY_PASS_ACTIVATED',
    }));

    it('무료 (컬리패스)를 볼 수 있다', () => {
      const { container } = renderPriceContainer();

      expect(container).toHaveTextContent('배송비');
      expect(container).toHaveTextContent('무료 (컬리패스)');
    });
  });

  context('배송비 무료 사유 - 상품권이 존재하면', () => {
    given('price', () => ({
      ...calculatedPriceFixture,
      deliveryPriceDiscountReason: 'KURLY_GIFT_CARD_ACTIVATED',
    }));

    it('배송비 0원을 볼 수 있다', () => {
      const { container } = renderPriceContainer();

      expect(container).toHaveTextContent('배송비');
      expect(container).toHaveTextContent('0원');
    });
  });

  context('회원이면', () => {
    given('percent', () => 1);
    given('usedPoint', () => 10);
    given('price', () => calculatedPriceFixture);

    it('쿠폰할인 영역을 볼 수 있다', () => {
      const { container } = renderPriceContainer();
      const { couponDiscountPrice } = given.price;

      expect(container).toHaveTextContent('쿠폰할인');
      expect(container).toHaveTextContent(`${addComma(couponDiscountPrice)}원`);
    });

    it('적립금 · 컬리캐시 영역을 볼 수 있다', () => {
      const { container } = renderPriceContainer();

      expect(container).toHaveTextContent('적립금 · 컬리캐시');
      expect(container).toHaveTextContent(`${addComma(given.usedPoint)}원`);
      expect(container).toHaveTextContent(`구매 시${addComma(given.price.expectedPoint)}원(${given.percent}%)`);
    });
  });

  it('최종 결제 금액을 볼 수 있다', () => {
    const { container } = renderPriceContainer();
    const { paymentPrice } = given.price;

    expect(container).toHaveTextContent('최종결제금액');
    expect(container).toHaveTextContent(`${addComma(paymentPrice)}원`);
  });
});
