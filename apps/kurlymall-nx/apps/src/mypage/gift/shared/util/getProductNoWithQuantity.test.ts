import { ordersFixture } from '../fixtures/orders.fixture';
import { getProductNoWithQuantity } from './getProductNoWithQuantity';

describe('getProductNoWithQuantity Test', () => {
  given('orders', () => ordersFixture);

  it('딜 번호와 개수만 포함된 object를 확인할 수 있다.', () => {
    const productNoWithQuantity = getProductNoWithQuantity({ orders: given.orders });

    expect(productNoWithQuantity).toEqual([
      {
        dealProductNo: 10001,
        quantity: 1,
      },
      {
        dealProductNo: 10002,
        quantity: 1,
      },
      {
        dealProductNo: 10003,
        quantity: 1,
      },
      {
        dealProductNo: 10004,
        quantity: 1,
      },
      {
        dealProductNo: 10005,
        quantity: 1,
      },
    ]);
  });
});
