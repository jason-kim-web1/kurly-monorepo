import { convertContentItems } from './convert-content-items';

describe('convertContentItems', () => {
  context('contentItems의 key 값 첫 글자에 $ 표시가 들어가 있으면', () => {
    it('key 값 첫 글자에 $표시를 제거하고 contentItems json 문자열을 return 한다.', () => {
      const contentItems = [
        {
          $price: 99000,
          $quantity: 1,
          $currency: 'KRW',
          $sku: 5004001,
          $product_name: '[선물세트] 유명산지 곶감세트 2kg',
          $memberId: 'welcomeuser',
        },
      ];

      const result = convertContentItems(contentItems);

      expect(result).toBe(
        '[{"price":99000,"quantity":1,"currency":"KRW","sku":5004001,"product_name":"[선물세트] 유명산지 곶감세트 2kg","memberId":"welcomeuser"}]',
      );
    });
  });

  context('contentItems의 key 값 첫 글자에 $ 표시가 들어가 있지않으면', () => {
    it('contentItems json 문자열을 return 한다.', () => {
      const contentItems = [
        {
          price: 99000,
          quantity: 1,
          currency: 'KRW',
          sku: 5004001,
          product_name: '[선물세트] 유명산지 곶감세트 2kg',
          memberId: 'welcomeuser',
        },
      ];

      const result = convertContentItems(contentItems);

      expect(result).toBe(
        '[{"price":99000,"quantity":1,"currency":"KRW","sku":5004001,"product_name":"[선물세트] 유명산지 곶감세트 2kg","memberId":"welcomeuser"}]',
      );
    });
  });

  context('contentItems이 Array가 아니면', () => {
    it('빈 배열 json 문자열을 return 한다.', () => {
      const contentItems = {
        price: 99000,
        quantity: 1,
        currency: 'KRW',
        sku: 5004001,
        product_name: '[선물세트] 유명산지 곶감세트 2kg',
        memberId: 'welcomeuser',
      };

      const result = convertContentItems(contentItems);

      expect(result).toBe('[]');
    });
  });

  context('contentItems 값이 없으면', () => {
    it('빈 배열 json 문자열을 return 한다.', () => {
      const result = convertContentItems(null);

      expect(result).toBe('[]');
    });
  });
});
