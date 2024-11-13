import { productDeliveryInfo } from './productDeliveryInfo';
import { DELIVERY_GUIDE_TYPE, SupportDeliveryPolicy } from '../../../../shared/constant';

describe('productDeliveryInfo', () => {
  context('deliveryTypeInfos가 빈 배열인 경우', () => {
    given('typeInfos', () => []);
    it('빈 정보를 반환한다.', () => {
      const { deliveryName, deliveryGuide, isDelivery } = productDeliveryInfo(given.typeInfos);

      expect(deliveryName).toBe('');
      expect(deliveryGuide).toBe('');
      expect(isDelivery).toBe(true);
    });
  });

  context('deliveryTypeInfos가 빈 배열이 아닌 경우', () => {
    context.each([
      {
        type: SupportDeliveryPolicy.DAWN,
        description: DELIVERY_GUIDE_TYPE.DAWN,
        guide: '23시 전 주문 시 내일 아침 7시 전 도착 (대구·부산·울산 샛별배송 운영시간 별도 확인)',
      },
      {
        type: SupportDeliveryPolicy.DAY_PARCEL,
        description: DELIVERY_GUIDE_TYPE.DAY_PARCEL,
        guide: '23시 전 주문 시 내일 밤 12시 전 도착',
      },
      {
        type: SupportDeliveryPolicy.NORMAL_PARCEL,
        description: DELIVERY_GUIDE_TYPE.NORMAL_PARCEL,
        guide: '주문 후 2~5일 배송',
      },
      {
        type: SupportDeliveryPolicy.GOURMET_DELIVERY,
        description: DELIVERY_GUIDE_TYPE.GOURMET_DELIVERY,
        guide: '예약일 배송',
      },
      {
        type: SupportDeliveryPolicy.INSTALLATION_DELIVERY,
        description: DELIVERY_GUIDE_TYPE.INSTALLATION_DELIVERY,
        guide: '담당자 연락 후 방문',
      },
      {
        type: SupportDeliveryPolicy.QUICK_DELIVERY,
        description: DELIVERY_GUIDE_TYPE.QUICK_DELIVERY,
        guide: '주문 당일 배송',
      },
      {
        type: SupportDeliveryPolicy.INTERNATIONAL_DIRECT,
        description: DELIVERY_GUIDE_TYPE.INTERNATIONAL_DIRECT,
        guide: '주문 후 영업일 6일 이내 배송',
      },
    ])('배송 타입이 배송 유형인경우', ({ type, description, guide }) => {
      given('typeInfos', () => [
        {
          type,
          description,
          guide,
        },
      ]);

      it('isDelivery를 true로 반환하고 나머지 배송 정보는 그대로 반환한다.', () => {
        const { deliveryName, deliveryGuide, isDelivery } = productDeliveryInfo(given.typeInfos);
        expect(deliveryName).toBe(`${description}`);
        expect(deliveryGuide).toBe(`${guide}`);
        expect(isDelivery).toBe(true);
      });
    });
    context.each([
      {
        type: SupportDeliveryPolicy.ONLINE_TICKET,
        description: DELIVERY_GUIDE_TYPE.ONLINE_TICKET,
        guide: '알림톡/문자발송 또는 현장수령',
      },
      {
        type: SupportDeliveryPolicy.AIRLINE_TICKET,
        description: DELIVERY_GUIDE_TYPE.AIRLINE_TICKET,
        guide: '알림톡 또는 문자 발송',
      },
      {
        type: SupportDeliveryPolicy.SELF_PICKUP_WINE,
        description: DELIVERY_GUIDE_TYPE.SELF_PICKUP_WINE,
        guide: '매장 직접 방문 후 수령',
      },
    ])('배송 타입이 무배송 유형인경우', ({ type, description, guide }) => {
      given('typeInfos', () => [
        {
          type,
          description,
          guide,
        },
      ]);
      it('isDelivery를 false로 반환하고 나머지 배송 정보는 그대로 반환한다.', () => {
        const { deliveryName, deliveryGuide, isDelivery } = productDeliveryInfo(given.typeInfos);
        expect(deliveryName).toBe(`${description}`);
        expect(deliveryGuide).toBe(`${guide}`);
        expect(isDelivery).toBe(false);
      });
    });
  });
});
