import { BusinessType } from '../enums';

export const BusinessTypeTextMap: Record<BusinessType, string> = {
  KURLY_NON_DELIVERY: '컬리에서 매입/판매하지만 실물이 아니라 배송하지 않는 형태 (1P)',
  KURLY_FULFILLMENT: '컬리에서 매입/판매하고, 컬리 물류센터를 통해서 배송되는 형태 (1P)',
  KURLY_MANUAL_PROCESSING:
    '컬리에서 매입/판매하고, 컬리 물류센터에서 풀필먼트가 처리되긴 하지만 이 과정이 자동화되지 않고 운영자에 의해수동으로 처리되는 타입',
  PARTNER_NON_DELIVERY: '외부 파트너가 매입/판매하지만 실물이 없어 배송하지 않는 형태 (3P)',
  PARTNER_FULFILLMENT: '외부 파트너가 매입/판매하고, 자체적으로 배송하는 형태 (3P)',
  PARTNER_KURLY_CONSIGNMENT: '외부 파트너가 매입/판매하지만 물류생산및 배송은 컬리가 위탁하는 형태 (3P - 1PL)',
  PARTNER_MANUAL_PROCESSING:
    '파트너 판매이며, 상품은 배송함이지만 실제로 미식딜리버리와 설치배송같이 주문에선 배송하지 않는 형태, 또는 예약일이 고객과 별도 연락인 경우',
};
