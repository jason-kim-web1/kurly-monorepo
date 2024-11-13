import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import { addComma } from '../../../../../shared/services';
import { GiftOrderStatus } from '../../enum/GiftOrderStatus.enum';
import { GiftProductItem } from '../../../../../shared/api/gift/gift';
import { GiftOrderStatusTextMap } from '../../constants/status';

import OrderItem from './OrderItem';

jest.mock('next/router');

describe('OrderItem 테스트', () => {
  const push = jest.fn();

  const mock: GiftProductItem = {
    dealProductNo: 111,
    dealProductName: '딜명',
    contentsProductName: '컨텐츠명',
    imageUrl: 'url',
    contentsProductNo: 123,
    displayPrice: 1000,
    displayDiscountPrice: 100,
    quantity: 1,
    isGiveawayProduct: false,
  };

  given('product', () => mock);
  given('status', () => GiftOrderStatus.READY_FOR_ACCEPT);

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      query: '',
    }));
  });

  const renderOrderItem = () => render(<OrderItem product={given.product} status={given.status} />);

  context('딜 명과 콘텐츠 명이 같으면', () => {
    given('product', () => ({
      ...mock,
      dealProductName: '같은 이름',
      contentsProductName: '같은 이름',
    }));

    it('딜 명을 가진 링크만 볼 수 있다.', () => {
      const { queryByTestId } = renderOrderItem();

      expect(queryByTestId('deal-name')).toBeInTheDocument();
      expect(queryByTestId('contents-name')).not.toBeInTheDocument();
    });
  });

  context('딜 명과 콘텐츠 명이 다르면', () => {
    given('product', () => ({
      ...mock,
      dealProductName: '같은 이름',
      contentsProductName: '다른 이름',
    }));

    it('딜 명과 콘텐츠 명을 볼 수 있다.', () => {
      const { queryByTestId } = renderOrderItem();

      expect(queryByTestId('deal-name')).toBeInTheDocument();
      expect(queryByTestId('contents-name')).toBeInTheDocument();
    });
  });

  it('주문 상품의 이미지를 보여준다', () => {
    const { getByTestId } = renderOrderItem();

    expect(getByTestId('product-image')).toHaveStyle({
      backgroundImage: given.product.imageUrl,
    });
  });

  it('주문 상품의 주문 갯수를 보여준다', () => {
    const { container } = renderOrderItem();

    expect(container).toHaveTextContent(`${given.product.quantity}개`);
  });

  context.each([
    { status: GiftOrderStatus.READY_FOR_ACCEPT, text: '선물 수락 대기' },
    { status: GiftOrderStatus.DELIVERED, text: '선물 배송' },
    { status: GiftOrderStatus.ACCEPTED, text: '선물 수락' },
    { status: GiftOrderStatus.REJECTED, text: '선물 거절' },
    { status: GiftOrderStatus.CANCELED, text: '선물 취소완료' },
  ])('선물 주문 상태에 따라', ({ status, text }) => {
    given('status', () => status);

    it(`${text}을 볼 수 있다.`, () => {
      const { container } = renderOrderItem();

      expect(container).toHaveTextContent(GiftOrderStatusTextMap[status]);
    });
  });

  context('할인하는 상품을 구매한 경우', () => {
    given('product', () => ({
      ...mock,
      displayPrice: 1000,
      displayDiscountPrice: 100,
    }));

    it('원가와 할인된 가격을 볼 수 있다.', () => {
      const { getByTestId } = renderOrderItem();

      const discountedPrice = getByTestId('goods-price');
      const displayPrice = getByTestId('original-price');

      expect(discountedPrice).toHaveTextContent(
        `${addComma(given.product.quantity * (given.product.displayPrice - given.product.displayDiscountPrice))}원`,
      );
      expect(displayPrice).toHaveTextContent(`${addComma(given.product.displayPrice)}원`);
      expect(displayPrice).toHaveStyle('text-decoration: line-through');
    });
  });

  context('할인하지 않은 상품을 구매한 경우', () => {
    given('product', () => ({
      ...mock,
      displayPrice: 1000,
      displayDiscountPrice: 0,
    }));

    it('원가를 볼 수 있다.', () => {
      const { getByTestId } = renderOrderItem();
      const displayPrice = getByTestId('goods-price');

      expect(displayPrice).toHaveTextContent(`${addComma(given.product.quantity * given.product.displayPrice)}원`);
      expect(displayPrice).not.toHaveStyle('text-decoration: line-through');
    });
  });
});
