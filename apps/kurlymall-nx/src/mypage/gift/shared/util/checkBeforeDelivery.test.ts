import { OrderStatus } from '../enum/GiftOrderStatus.enum';
import { checkBeforeDelivery } from './checkBeforeDelivery';

describe('checkBeforeDelivery Test', () => {
  context('주문 완료 상태인 경우', () => {
    given('orderDetailStatus', () => OrderStatus.COMPLETED);
    it('false를 return 한다.', () => {
      expect(checkBeforeDelivery(given.orderDetailStatus)).toBeTruthy();
    });
  });

  context('배송준비중 상태인 경우', () => {
    given('orderDetailStatus', () => OrderStatus.PRODUCING);
    it('false를 return 한다.', () => {
      expect(checkBeforeDelivery(given.orderDetailStatus)).toBeTruthy();
    });
  });

  context('배송중 상태인 경우', () => {
    given('orderDetailStatus', () => OrderStatus.DELIVERING);
    it('true를 return 한다.', () => {
      expect(checkBeforeDelivery(given.orderDetailStatus)).toBeFalsy();
    });
  });

  context('배송완료 상태인 경우', () => {
    given('orderDetailStatus', () => OrderStatus.DELIVERED);
    it('true를 return 한다.', () => {
      expect(checkBeforeDelivery(given.orderDetailStatus)).toBeFalsy();
    });
  });
  context('취소접수 상태인 경우', () => {
    given('orderDetailStatus', () => OrderStatus.REFUND_REQUESTED);
    it('true를 return 한다.', () => {
      expect(checkBeforeDelivery(given.orderDetailStatus)).toBeFalsy();
    });
  });

  context('취소완료 상태인 경우', () => {
    given('orderDetailStatus', () => OrderStatus.REFUNDED);
    it('true를 return 한다.', () => {
      expect(checkBeforeDelivery(given.orderDetailStatus)).toBeFalsy();
    });
  });
});
