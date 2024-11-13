import {
  buildFormattedDateInString,
  getCartButtonText,
  getContentsSoldOutGuideText,
  getDealDisabledText,
  getFormattedDate,
} from './productDetailState';
import { addComma } from '../../../../shared/services';

describe('getDealDisabledText,', () => {
  it('품절이 아니며, 구매불가 상품인 경우', () => {
    const isSoldOut = false;
    const isPurchaseStatus = false;

    const result = getDealDisabledText({ isSoldOut, isPurchaseStatus });

    expect(result).toBe('구매불가');
  });

  it('품절이며, 구매불가 상품인 경우', () => {
    const isSoldOut = true;
    const isPurchaseStatus = false;

    const result = getDealDisabledText({ isSoldOut, isPurchaseStatus });

    expect(result).toBe('구매불가');
  });

  it('품절이 아니며, 구매가능 상품인 경우', () => {
    const isSoldOut = false;
    const isPurchaseStatus = true;

    const result = getDealDisabledText({ isSoldOut, isPurchaseStatus });

    expect(result).toBe(null);
  });

  it('품절이며, 구매가능 상품인 경우', () => {
    const isSoldOut = true;
    const isPurchaseStatus = true;

    const result = getDealDisabledText({ isSoldOut, isPurchaseStatus });

    expect(result).toBe('품절');
  });
});

describe('getCartButtonText', () => {
  context('일반상품이 바로구매가 아니고 구매가능상태에 초기에는 ', () => {
    given('isDirectOrder', () => false);
    given('isProductDisabled', () => false);

    it('"장바구니 담기"를 리턴한다. ', () => {
      const result = getCartButtonText({
        isDirectOrder: given.isDirectOrder,
        isProductDisabled: given.isProductDisabled,
        totalPrice: 0,
        totalQuantity: 0,
      });

      expect(result).toBe('장바구니 담기');
    });

    context('상품을 1개 선택하면 ', () => {
      given('totalQuantity', () => 1);

      it('총 가격이 18,000원이면, "18,000원 장바구니 담기"를 리턴한다. ', () => {
        given('totalPrice', () => 18000);
        const result = getCartButtonText({
          isDirectOrder: given.isDirectOrder,
          isProductDisabled: given.isProductDisabled,
          totalPrice: given.totalPrice,
          totalQuantity: given.totalQuantity,
        });

        expect(result).toBe(`${addComma(given.totalPrice)}원 장바구니 담기`);
      });

      it('총 가격이 0원이면, "0원 장바구니 담기"를 리턴한다. ', () => {
        given('totalPrice', () => 0);
        const result = getCartButtonText({
          isDirectOrder: given.isDirectOrder,
          isProductDisabled: given.isProductDisabled,
          totalPrice: given.totalPrice,
          totalQuantity: given.totalQuantity,
        });

        expect(result).toBe(`${addComma(given.totalPrice)}원 장바구니 담기`);
      });
    });

    context('상품을 1개 이상 선택하지 않으면, ', () => {
      given('totalQuantity', () => 0);
      given('totalPrice', () => 0);

      it('"장바구니 담기"를 리턴한다. ', () => {
        const result = getCartButtonText({
          isDirectOrder: given.isDirectOrder,
          isProductDisabled: given.isProductDisabled,
          totalPrice: given.totalPrice,
          totalQuantity: given.totalQuantity,
        });

        expect(result).toBe('장바구니 담기');
      });
    });
  });

  describe('바로구매 상품이면', () => {
    given('isDirectOrder', () => true);
    given('isProductDisabled', () => false);

    it('"바로구매"를 리턴한다. ', () => {
      const result = getCartButtonText({
        isDirectOrder: given.isDirectOrder,
        isProductDisabled: given.isProductDisabled,
        totalPrice: 0,
        totalQuantity: 0,
      });

      expect(result).toBe('바로구매');
    });

    context('1개 이상 상품을 선택하면, ', () => {
      given('totalQuantity', () => 1);

      it('총 가격이 18,000원이면, "18,000원 바로구매"를 리턴한다. ', () => {
        given('totalPrice', () => 18000);

        const result = getCartButtonText({
          isDirectOrder: given.isDirectOrder,
          isProductDisabled: given.isProductDisabled,
          totalPrice: given.totalPrice,
          totalQuantity: given.totalQuantity,
        });

        expect(result).toBe(`${addComma(given.totalPrice)}원 바로구매`);
      });

      it('총 가격이 0원이면, "0원 바로구매"를 리턴한다. ', () => {
        given('totalPrice', () => 0);
        const result = getCartButtonText({
          isDirectOrder: given.isDirectOrder,
          isProductDisabled: given.isProductDisabled,
          totalPrice: given.totalPrice,
          totalQuantity: given.totalQuantity,
        });

        expect(result).toBe(`${addComma(given.totalPrice)}원 바로구매`);
      });
    });

    context('상품을 선택하지 않으면, ', () => {
      given('totalQuantity', () => 0);
      given('totalPrice', () => 0);

      it('"바로구매"를 리턴한다. ', () => {
        const result = getCartButtonText({
          isDirectOrder: given.isDirectOrder,
          isProductDisabled: given.isProductDisabled,
          totalPrice: given.totalPrice,
          totalQuantity: given.totalQuantity,
        });

        expect(result).toBe('바로구매');
      });
    });
  });
});

describe('getFormattedDate', () => {
  context('ISO 8601 형식의 올바른 date값이 들어오면, ', () => {
    given('date', () => '2022-09-20');
    it('yyyy년 MM월 dd일 EEE요일 형태로 반환한다.', () => {
      const result = getFormattedDate(given.date);

      expect(result).toBe('2022년 09월 20일 화요일');
    });
  });

  context('ISO 8601 형식의 올바르지 않은 date값이 들어오면, ', () => {
    given('date', () => '2022-09- 20');
    it('문자열로 그대로 반환한다.', () => {
      const result = getFormattedDate(given.date);

      expect(result).toBe('2022-09- 20');
    });
  });
});

describe('buildFormattedDateInString', () => {
  context('ISO 8601 형식의 올바른 date값이 들어오면, ', () => {
    given('date', () => '2022-09-20');
    it('yyyy년 MM월 dd일 형태로 반환한다.', () => {
      const result = buildFormattedDateInString(given.date);

      expect(result).toBe('2022년 09월 20일');
    });
  });

  context('ISO 8601 형식의 올바른 date값과 함께 문자열이 들어오면, ', () => {
    given('date', () => '2022-09-20 이후 재입고될 예정입니다.');
    it('yyyy년 MM월 dd일 형태와 문자열로 반환한다.', () => {
      const result = buildFormattedDateInString(given.date);

      expect(result).toBe('2022년 09월 20일 이후 재입고될 예정입니다.');
    });
  });
});

describe('getContentsSoldOutGuideText', () => {
  given('isSoldOut', () => false);
  given('soldOutText', () => '2022-09-20 이후 재입고될 예정입니다.');

  context('품절이 아니며 품절문구가 있고 ', () => {
    given('contentType', () => 'SINGLE');
    it('contentType이 SINGLE라면 ""을 반환한다."', () => {
      const result = getContentsSoldOutGuideText({
        contentType: given.contentType,
        isSoldOut: given.isSoldOut,
        soldOutText: given.soldOutText,
      });

      expect(result).toBe('');
    });

    given('contentType', () => 'MULTI');
    it('contentType이 MULTI라면 ""을 반환한다."', () => {
      const result = getContentsSoldOutGuideText({
        contentType: given.contentType,
        isSoldOut: given.isSoldOut,
        soldOutText: given.soldOutText,
      });

      expect(result).toBe('');
    });
  });

  context('품절이 아니고, 품절문구가 있고 ', () => {
    given('contentType', () => 'OPTION');
    it('contentType이 SINGLE 혹은 MULTI이 아닌 경우 ""을 반환한다."', () => {
      const result = getContentsSoldOutGuideText({
        contentType: given.contentType,
        isSoldOut: given.isSoldOut,
        soldOutText: given.soldOutText,
      });

      expect(result).toBe('2022년 09월 20일 이후 재입고될 예정입니다.');
    });
  });

  given('isSoldOut', () => true);
  context('품절이고, 품절문구가 있고', () => {
    given('contentType', () => 'OPTION');
    it('contentType이 SINGLE 혹은 MULTI이 아닌 경우 "2022년 09월 20일 이후 재입고될 예정입니다."을 반환한다."', () => {
      const result = getContentsSoldOutGuideText({
        contentType: given.contentType,
        isSoldOut: given.isSoldOut,
        soldOutText: given.soldOutText,
      });

      expect(result).toBe('2022년 09월 20일 이후 재입고될 예정입니다.');
    });
  });
});
