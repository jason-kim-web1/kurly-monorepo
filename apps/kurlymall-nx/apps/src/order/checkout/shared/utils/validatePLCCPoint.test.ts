import { validateAvailablePLCCPoint, validateProductPrice } from './validatePLCCPoint';
import {
  mockAvailablePLCCPointProducts,
  mockUnavailablePLCCPointProducts,
  mockUnavailablePricePLCCPointProducts,
} from '../../../../../fixtures';

describe('validateAvailablePLCCPoint - PLCC 포인트 사용가능 테스트', () => {
  context('validateAvailablePLCCPoint', () => {
    context('함께구매 주문이라면', () => {
      given('params', () => ({
        products: mockAvailablePLCCPointProducts,
        plccDiscountPrice: 30000,
        isJoinOrder: true,
      }));

      it('불가능 상태를 반환한다.', () => {
        const state = validateAvailablePLCCPoint(given.params);
        expect(state).toBeFalsy();
      });
    });

    context('전통주,와인 상품만 구매한다면', () => {
      given('params', () => ({
        products: mockUnavailablePLCCPointProducts,
        plccDiscountPrice: 30000,
        isJoinOrder: false,
      }));

      it('불가능 상태를 반환한다', () => {
        const state = validateAvailablePLCCPoint(given.params);
        expect(state).toBeFalsy();
      });
    });
    context('전통주,와인 외 상품을 같이 구매한다면', () => {
      given('params', () => ({
        products: mockAvailablePLCCPointProducts,
        plccDiscountPrice: 30000,
        isJoinOrder: false,
      }));

      it('가능 상태를 반환한다', () => {
        const state = validateAvailablePLCCPoint(given.params);
        expect(state).toBeTruthy();
      });
    });

    context('사용할 수 있는 포인트가 없으면', () => {
      given('params', () => ({
        products: mockAvailablePLCCPointProducts,
        plccDiscountPrice: 0,
        isJoinOrder: false,
      }));

      it('불가능 상태를 반환한다', () => {
        const state = validateAvailablePLCCPoint(given.params);

        expect(state).toBeFalsy();
      });
    });

    context('사용할 수 있는 포인트가 존재하면 (초기값 30,000원)', () => {
      given('params', () => ({
        products: mockAvailablePLCCPointProducts,
        plccDiscountPrice: 30000,
        isJoinOrder: false,
      }));

      it('가능 상태를 반환한다', () => {
        const state = validateAvailablePLCCPoint(given.params);

        expect(state).toBeTruthy();
      });
    });
  });
});

context('validateProductPrice', () => {
  context('전통주, 와인 상품과 일반상품을 같이 구매하는데', () => {
    context('주류 금액을 제외하고 31,000원 이상이면', () => {
      given('params', () => ({
        products: mockAvailablePLCCPointProducts,
        plccDiscountPrice: 30000,
      }));

      it('가능 상태를 반환한다', () => {
        const state = validateProductPrice(given.params);

        expect(state).toBeTruthy();
      });
    });
    context('주류 금액을 제외하고 31,000원 이하이면', () => {
      given('params', () => ({
        products: mockUnavailablePricePLCCPointProducts,
        plccDiscountPrice: 30000,
      }));

      it('불가능 상태를 반환한다', () => {
        const state = validateProductPrice(given.params);

        expect(state).toBeFalsy();
      });
    });
  });
});
