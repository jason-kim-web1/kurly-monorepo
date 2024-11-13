import { getCorrectQuantity } from './getCorrectQuantity';
import { KurlyDeliveryColdProduct } from '../constants/__mocks__/mockCartDetail';

describe('묶음 수량 보정 테스트', () => {
  given('quantity', () => 1);
  given('item', () => KurlyDeliveryColdProduct);

  describe('스탭퍼 + 클릭 : 수량보다 변경 요청 수량이 클 때', () => {
    context('현재 수량 1, 묶음 단위 1, 변경 요청 수량 2', () => {
      given('quantity', () => 2);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 1,
        salesUnit: 1,
      }));

      it('변경 요청 수량을 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(given.quantity);
      });
    });

    context('현재 수량 10, 묶음 단위 5, 변경 요청 수량 15', () => {
      given('quantity', () => 15);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 10,
        salesUnit: 5,
      }));

      it('변경 요청 수량을 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(given.quantity);
      });
    });

    context('현재 수량 1, 묶음 단위 2, 변경 요청 수량 3', () => {
      given('quantity', () => 3);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 1,
        salesUnit: 2,
      }));

      it('묶음 단위에서 가장 가까운 수량인 2를 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(2);
      });
    });

    context('현재 수량 5, 묶음 단위 2, 변경 요청 수량 7', () => {
      given('quantity', () => 7);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 5,
        salesUnit: 2,
      }));

      it('묶음 단위에서 가장 가까운 수량인 6를 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(6);
      });
    });
  });

  describe('스탭퍼 - 클릭 : 수량보다 변경 요청 수량이 작을 때', () => {
    context('현재 수량 5, 묶음 단위 1, 변경 요청 수량 4', () => {
      given('quantity', () => 4);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 5,
        salesUnit: 1,
      }));

      it('변경 요청 수량을 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(given.quantity);
      });
    });

    context('현재 수량 10, 묶음 단위 5, 변경 요청 수량 5', () => {
      given('quantity', () => 5);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 10,
        salesUnit: 5,
      }));

      it('변경 요청 수량을 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(given.quantity);
      });
    });

    context('현재 수량 3, 묶음 단위 2, 변경 요청 수량 1', () => {
      given('quantity', () => 1);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 3,
        salesUnit: 2,
      }));

      it('묶음 단위에서 가장 가까운 수량인 2를 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(2);
      });
    });

    context('현재 수량 9, 묶음 단위 2, 변경 요청 수량 7', () => {
      given('quantity', () => 7);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 9,
        salesUnit: 2,
      }));

      it('묶음 단위에서 가장 가까운 수량인 8를 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(8);
      });
    });

    context('(엣지 케이스) 현재 수량 1, 묶음 단위 2, 변경 요청 수량 -1', () => {
      given('quantity', () => -1);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 1,
        salesUnit: 2,
      }));

      it('묶음 단위 수량을 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(given.item.salesUnit);
      });
    });

    context('현재 수량 2, 묶음 단위 4, 변경 요청 수량 -2', () => {
      given('quantity', () => -2);
      given('item', () => ({
        ...KurlyDeliveryColdProduct,
        quantity: 2,
        salesUnit: 4,
      }));

      it('묶음 단위 수량을 반환한다.', () => {
        const result = getCorrectQuantity({
          quantity: given.quantity,
          item: given.item,
        });

        expect(result).toBe(4);
      });
    });
  });
});
