import { resetPointUsage } from './resetPointUsage';

describe('resetPointUsage', () => {
  context('사용가능적립금 < 상품가격 < 현재 input값인 경우', () => {
    it('사용가능적립금으로 input 값을 리턴한다.', () => {
      const result = resetPointUsage({
        value: 20000,
        price: 7300,
        totalPoint: 3000,
      });

      expect(result).toBe(3000);
    });
  });

  context('상품가격 < 사용가능적립금 < 현재 input값인 경우', () => {
    it('상품가격으로 input 값을 리턴한다.', () => {
      const result = resetPointUsage({
        value: 20000,
        price: 7300,
        totalPoint: 10000,
      });

      expect(result).toBe(7300);
    });
  });

  context('사용가능적립금 < 현재 input값 < 상품가격인 경우', () => {
    it('사용가능적립금으로 input 값을 리턴한다.', () => {
      const result = resetPointUsage({
        value: 20000,
        price: 73000,
        totalPoint: 10000,
      });

      expect(result).toBe(10000);
    });
  });

  context('상품가격 < 현재 input값 < 사용가능적립금인 경우', () => {
    it('상품가격으로 input 값을 리턴한다.', () => {
      const result = resetPointUsage({
        value: 20000,
        price: 7300,
        totalPoint: 100000000,
      });

      expect(result).toBe(7300);
    });
  });

  context('현재 input값이 사용가능적립금, 상품가격보다 작은 경우', () => {
    it('현재 input 값을 그대로 리턴한다.', () => {
      const result = resetPointUsage({
        value: 20,
        price: 7300,
        totalPoint: 100000000,
      });

      expect(result).toBe(20);
    });
  });
});
