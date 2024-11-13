import { createProductData } from './product.service';

describe('createProductData', () => {
  const notPurchaseMessage = 'Coming Soon';
  const soldOutTitle = '품절 제목';
  const soldOutText = '품절 내용';

  const create = () =>
    createProductData({
      no: 1000002479,
      name: '연두가방백팩_수정금지(콘텐츠그룹/통합CC01용)',
      shortDescription: '',
      listImageUrl: 'https://product-image-dev.kurly.com/product/image/e44ec73a-1be7-497c-9985-432ee3cfefd3.png',
      salesPrice: 15000,
      discountedPrice: 10000,
      discountRate: 33,
      isBuyNow: true,
      isGiftable: false,
      isOnlyAdult: false,
      soldOutTitle,
      soldOutText,
      canRestockNotify: false,
      tags: [],
      sticker: {
        content: [
          {
            text: '연두cc01',
            weight: 'bold',
          },
        ],
        opacity: 90,
        backgroundColor: '#BD76FF',
      },
      isMultiplePrice: false,
      groupProduct: {
        isGroup: true,
        isNotRepresentative: false,
      },
      productViewStatus: given.productViewStatus,
      notPurchaseMessage,
      deliveryTypeNames: ['샛별배송'],
      deliveryTypeInfos: [{ type: 'DAWN', description: '샛별배송' }],
      reviewCount: '0',
    });
  context('when productViewStatus is BUY_POSSIBLE', () => {
    given('productViewStatus', () => 'BUY_POSSIBLE');

    it('status is PURCHASABLE ', () => {
      const data = create();
      expect(data.status.code).toBe('PURCHASABLE');
    });

    it('message is undefined', () => {
      const data = create();
      expect(data.status).toBeDefined();
    });
  });

  context('when productViewStatus is BUY_IMPOSSIBLE', () => {
    given('productViewStatus', () => 'BUY_IMPOSSIBLE');

    it('status', () => {
      const data = create();
      expect(data.status.code).toBe('NOT_PURCHASABLE');
    });

    it('message title', () => {
      const data = create();
      expect(data.status.message?.title).toBe(notPurchaseMessage);
    });

    it('message content', () => {
      const data = create();
      expect(data.status.message?.content).toBe('');
    });
  });

  context('when productViewStatus is SOLD_OUT', () => {
    given('productViewStatus', () => 'SOLD_OUT');

    it('status is SOLD_OUT', () => {
      const data = create();
      expect(data.status.code).toBe('SOLD_OUT');
    });

    it('message title', () => {
      const data = create();
      expect(data.status.message?.title).toBe(soldOutTitle);
    });

    it('message content', () => {
      const data = create();
      expect(data.status.message?.content).toBe(soldOutText);
    });
  });

  context('when productViewStatus is BLOCK_ZIPCODE', () => {
    given('productViewStatus', () => 'BLOCK_ZIPCODE');

    it('status is NOT_DELIVERABLE', () => {
      const data = create();
      expect(data.status.code).toBe('NOT_DELIVERABLE');
    });

    it('message title', () => {
      const data = create();
      expect(data.status.message?.title).toBe(notPurchaseMessage);
    });

    it('message content', () => {
      const data = create();
      expect(data.status.message?.content).toBe('');
    });
  });
});
