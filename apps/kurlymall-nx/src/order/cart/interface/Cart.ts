import { CartStorageGroupType } from '../constants/StorageGroupType';
import { CartProduct } from './CartProduct';

interface CartMetaData {
  legacyCouponMessage: string;
  isEarlyBird: boolean;
  activatedContinuity: boolean;
}

interface CartMessage {
  deliveryNotice?: {
    text: string;
  };
}

export interface DeliveryInfo {
  displayName: string;
  productCount: number;
}

export const DELIVERY_FREE_TYPE = {
  KURLY_PASS: 'KURLY_PASS',
  MEMBER_BENEFIT_POLICY: 'MEMBER_BENEFIT_POLICY',
};

type deliveryFreeType = typeof DELIVERY_FREE_TYPE[keyof typeof DELIVERY_FREE_TYPE];

export interface DeliveryPricePolicyType {
  deliveryPrice: number;
  deliveryPriceFreeCriteria: number;
  deliveryPriceFreeReasonName: string | null;
  deliveryPriceFreeReasonType: deliveryFreeType | null;
  deliveryPriceFreeMessage: string | null;
  isShowProgressBar: boolean;
}

interface DeliveryPricePolicy {
  deliveryPricePolicy: DeliveryPricePolicyType;
}

export type StorageType = DeliveryInfo & {
  groupType: CartStorageGroupType;
  products: CartProduct[];
};

export interface StorageTypes {
  storageTypes: StorageType[];
}

export type PartnerType = DeliveryPricePolicy &
  DeliveryInfo & {
    partnerId: string;
    partnerName: string;
    products: CartProduct[];
  };

export interface Partners {
  partners: PartnerType[];
}

export type UnavailableType = DeliveryInfo & {
  products: CartProduct[];
};

export type KurlyDeliveryListType = (DeliveryInfo & DeliveryPricePolicy & StorageTypes) | null;
export type PartnerDeliveryType = (DeliveryInfo & Partners) | null;
export type UnavailableOrdersType = UnavailableType | null;

export default interface CartDetailResponse {
  meta: CartMetaData;
  totalCount: number;
  displayMessage: CartMessage;
  /** 컬리배송 */
  kurlyDelivery: KurlyDeliveryListType;
  /** 판매자 배송 */
  partnerDomesticDelivery: PartnerDeliveryType;
  /** 해외 직배송 */
  partnerInternationalDelivery: PartnerDeliveryType;
  /** 구매불가 */
  unavailableOrders: UnavailableOrdersType;
}
