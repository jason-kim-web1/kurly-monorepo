import { renderHook } from '@testing-library/react-hooks';

import useUnavailableCartItem from './useUnavailableCartItem';
import {
  membersAndNotPurchaseCartProduct,
  membersAndSoldoutAndNotPurchasable,
  membersAndSoldoutCartProduct,
  membersOnlyCartProduct,
  notPurchasableAndSoldout,
  notPurchasableCartProduct,
  onlySpecificUserCartProduct,
  soldOutCartProduct,
  specificUserAndSoldOutCartProduct,
  vipAndSoldoutCartProduct,
  vipOnlyCartProduct,
  vvipAndSoldoutCartProduct,
} from '../constants/__mocks__/mockCartDetail';

describe('useUnavailableCartItem', () => {
  context('상품 상태가 오직 [품절] 이면', () => {
    it('[품절] case: 품절 정보를 return 한다.', () => {
      const { result } = renderHook(() => useUnavailableCartItem(soldOutCartProduct));

      expect(result.current.title).toBe(`(품절) ${soldOutCartProduct.dealProductName}`);
      expect(result.current.subTitle).toBe(`${soldOutCartProduct.contentsProductName}`);
      expect(result.current.reason).toBe(`${soldOutCartProduct.soldOutText}`);
    });
  });

  context('상품 상태가 [품절, 특정회원] 이면', () => {
    it.each`
      product                              | text
      ${membersAndSoldoutCartProduct}      | ${'[품절, 멤버스] case'}
      ${vipAndSoldoutCartProduct}          | ${'[품절, VIP] case'}
      ${vvipAndSoldoutCartProduct}         | ${'[품절, VVIP] case'}
      ${specificUserAndSoldOutCartProduct} | ${'[품절, 멤버스, VIP, VVIP] case'}
    `('$text: 품절 정보를 return 한다', ({ product }) => {
      const { result } = renderHook(() => useUnavailableCartItem(product));

      expect(result.current.title).toBe(`(품절) ${product.dealProductName}`);
      expect(result.current.subTitle).toBe(`${product.contentsProductName}`);
      expect(result.current.reason).toBe(`${product.soldOutText}`);
      expect(result.current.buyableTarget).toEqual(product.displayMessage.buyableTarget);
    });
  });

  context('상품 상태가 오직 [특정회원] 전용 상품이면', () => {
    it.each`
      product                        | text
      ${membersOnlyCartProduct}      | ${'[멤버스] case'}
      ${vipOnlyCartProduct}          | ${'[VIP] case'}
      ${onlySpecificUserCartProduct} | ${'[멤버스, VIP, VVIP] case'}
    `('$text: 특정회원 구매불가 정보를 return 한다.', ({ product }) => {
      const { result } = renderHook(() => useUnavailableCartItem(product));

      // prefix text 가 존재하지 않는다.
      expect(result.current.title).toBe(`${product.dealProductName}`);
      expect(result.current.subTitle).toBe(`${product.contentsProductName}`);
      expect(result.current.buyableTarget).toEqual(product.displayMessage.buyableTarget);
    });
  });

  context('그 외의 상태이면', () => {
    it.each`
      product                               | text
      ${notPurchasableCartProduct}          | ${'[구매불가(잘못된 배송 유형)] case'}
      ${membersAndNotPurchaseCartProduct}   | ${'[구매불가, 멤버스] case'}
      ${notPurchasableAndSoldout}           | ${'[구매불가, 품절] case'}
      ${membersAndSoldoutAndNotPurchasable} | ${'[구매불가, 품절, 멤버스] case]'}
    `(`$text: 구매불가 정보를 return 한다.`, ({ product }) => {
      const { result } = renderHook(() => useUnavailableCartItem(product));

      expect(result.current.title).toBe(`(구매불가) ${product.dealProductName}`);
      expect(result.current.subTitle).toBe(`${product.contentsProductName}`);
      expect(result.current.reason).toBe(`배송불가 지역 또는 판매종료 상품`);
    });
  });
});
