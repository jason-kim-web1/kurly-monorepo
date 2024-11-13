import COLOR from './colorset';
import { PackingType } from '../enums';
import { DeliveryType } from '../interfaces/ShippingAddress';

export const KURLY_DELIVERY = {
  direct: '샛별배송',
  indirect: '하루배송',
  disable: '배송불가',
} as const;

// 전체 배송 정책
export const enum SupportDeliveryPolicy {
  DAWN = 'DAWN',
  DAY_PARCEL = 'DAY_PARCEL',
  MANUAL_DAY_PARCEL = 'MANUAL_DAY_PARCEL',
  GOURMET_DELIVERY = 'GOURMET_DELIVERY',
  NORMAL_PARCEL = 'NORMAL_PARCEL',
  INSTALLATION_DELIVERY = 'INSTALLATION_DELIVERY',
  ONLINE_TICKET = 'ONLINE_TICKET',
  AIRLINE_TICKET = 'AIRLINE_TICKET',
  SELF_PICKUP_WINE = 'SELF_PICKUP_WINE',
  QUICK_DELIVERY = 'QUICK_DELIVERY',
  INTERNATIONAL_DIRECT = 'INTERNATIONAL_DIRECT',
}

// 택배사 배송조회 링크
export declare type DeliveryState = 'DELIVERING' | 'NON_DELIVERED' | 'DELIVERED';
export declare type CourierCode = 'KURLY' | 'CJDT' | 'FRESH' | 'LOTTE' | 'HANJIN' | null;
export declare type CourierDeliveryState = '00' | '84' | '91'; // TO DO: 응답값 파악 필요

// 무배송 타입
export declare type NonDeliveryType =
  | 'ONLINE_TICKET' // 온라인 교환권
  | 'AIRLINE_TICKET' // 항공권
  | 'SELF_PICKUP_WINE'; // 셀프픽업-와인

// 컬리 물류 배송 타입
export declare type KurlyDeliveryType =
  | 'DAWN' // 샛별
  | 'DAY_PARCEL' // 하루배송(택배)
  | 'MANUAL_DAY_PARCEL'; // 하루배송(샛별-섭외)

// 파트너 배송 타입
export declare type PartnerDeliveryType =
  | 'GOURMET_DELIVERY' // 미식딜리버리
  | 'NORMAL_PARCEL' // 판매자배송
  | 'INSTALLATION_DELIVERY' // 설치배송
  | 'QUICK_DELIVERY' // 퀵배송
  | 'INTERNATIONAL_DIRECT'; // 해외직배송

// 전체 배송 유형 타입
export declare type SupportDeliveryType = NonDeliveryType | KurlyDeliveryType | PartnerDeliveryType;

export interface DealDeliveryType {
  deliveryType: SupportDeliveryType;
  // 컬리물류 배송 여부
  isDeliveryProduct: boolean;
}

export interface DeliveryStatus {
  invoiceNo: string;
  orderPackingTypeCode: number;
  orderPackingType: PackingType;
  courierCode: CourierCode;
  deliveryState: string;
  courierDeliveryState: CourierDeliveryState;
  createdAt: string;
  updatedAt: string;
  deliveryComplete: boolean;
}

export const DELIVERY_TYPE: Record<DeliveryType, { text: string; color: string }> = {
  direct: {
    color: COLOR.kurlyPurple,
    text: '샛별배송',
  },
  indirect: {
    color: COLOR.kurlyGray600,
    text: '하루배송',
  },
  disable: {
    color: COLOR.invalidRed,
    text: '배송불가',
  },
};

export const deliveryStatus: Record<DeliveryState, string> = {
  DELIVERING: '배송중',
  DELIVERED: '배송완료',
  NON_DELIVERED: '미배송',
};

export const DELIVERY_GUIDE_TYPE = {
  DAWN: '샛별배송',
  DAY_PARCEL: '하루배송',
  MANUAL_DAY_PARCEL: '하루배송',
  NORMAL_PARCEL: '판매자배송',
  GOURMET_DELIVERY: '미식딜리버리',
  ONLINE_TICKET: '온라인교환권',
  AIRLINE_TICKET: '항공권',
  SELF_PICKUP_WINE: '셀프픽업',
  INSTALLATION_DELIVERY: '설치배송',
  QUICK_DELIVERY: '퀵배송',
  INTERNATIONAL_DIRECT: '해외직배송',
} as const;
