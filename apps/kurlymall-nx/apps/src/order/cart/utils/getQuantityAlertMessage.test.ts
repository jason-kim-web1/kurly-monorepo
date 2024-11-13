import { getQuantityAlertMessage } from './getQuantityAlertMessage';

const fixture = {
  dealProductName: '쉐브르 치즈',
  contentsProductName: '컨텐츠 이름',
  minQuantity: 1,
  maxQuantity: 10,
  stock: 100000,
  contents: {
    minQuantity: 1,
    maxQuantity: null,
    normalOrderTypePolicy: 'DEFAULT',
    giftOrderTypePolicy: null,
  },
};

describe('getQuantityAlertMessage', () => {
  context('이벤트 상품이면', () => {
    given('product', () => ({
      ...fixture,
      voucher: {
        type: 'LUCKY_BOX',
      },
    }));

    it('알림 메시지를 보여준다.', () => {
      const result = getQuantityAlertMessage({
        quantity: 2,
        item: given.product,
      });

      expect(result).toStrictEqual({
        text: '쉐브르 치즈 상품의 최대 구매 수량은 1개 입니다.',
        changedQuantity: 1,
      });
    });
  });

  context('선택된 개수가 아이템 최소수량보다 적은 경우', () => {
    given('product', () => ({
      ...fixture,
      minQuantity: 3,
    }));

    it('알림 메시지를 보여준다.', () => {
      const result = getQuantityAlertMessage({
        quantity: 2,
        item: given.product,
      });

      expect(result).toStrictEqual({
        text: '쉐브르 치즈 상품의 최소 구매 수량은 3개 입니다.',
        changedQuantity: 3,
      });
    });
  });

  context('선택된 개수가 아이템 최대수량보다 많은 경우', () => {
    given('product', () => ({
      ...fixture,
      maxQuantity: 5,
    }));

    it('알림 메시지를 반환한다.', () => {
      const result = getQuantityAlertMessage({
        quantity: 10000000,
        item: given.product,
      });

      expect(result).toStrictEqual({
        text: '쉐브르 치즈 상품의 최대 구매 수량은 5개 입니다.',
        changedQuantity: 5,
      });
    });
  });

  context('선택된 개수가 재고보다 많은 경우', () => {
    given('product', () => ({
      ...fixture,
      isNotEnoughStock: true,
    }));

    it('알림 메시지를 반환한다.', () => {
      const result = getQuantityAlertMessage({
        quantity: 10,
        item: given.product,
      });

      expect(result).toStrictEqual({
        text: '쉐브르 치즈 상품의 잔여 재고는 5개 미만입니다.',
        changedQuantity: 5,
      });
    });
  });

  context('최대수량, 최소수량, 재고 관련문제가 없으면', () => {
    given('product', () => ({
      ...fixture,
      maxQuantity: null,
    }));

    it('알림 메시지가 없다.', () => {
      const result = getQuantityAlertMessage({
        quantity: 5,
        item: given.product,
      });

      expect(result).toStrictEqual({
        text: '',
        changedQuantity: 5,
      });
    });
  });
});
