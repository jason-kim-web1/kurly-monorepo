import { CartDeliveryPrice } from '../constants/CartDeliveryPriceType';
import { CartProductOrderStatus, CartProductOrderUnavailable } from '../constants/CartProductOrderType';
import { CartProductPointPolicy } from '../constants/CartProductPointPolicyType';
import { CartStorageType } from '../constants/StorageType';
import { CartNormalOrderTypePolicyInContents } from '../constants/CartNormalOrderTypePolicyInContentsType';
import { CartGiftOrderTypePolicyInContentsType } from '../constants/CartGiftOrderTypePolicyInContentsType';
import { CartSoldOut } from '../constants/CartSoldOutType';
import { CartDeliveryType } from '../constants/CartDeliveryType';
import { PromotionType } from '../constants/PromotionType';

export interface CartProductOrder {
  order: {
    status: CartProductOrderStatus;
    unavailableTypes: CartProductOrderUnavailable[];
  };
}

export interface BuyableTarget {
  text: string;
  basicStyle: {
    color: string;
    bold: boolean;
  };
  replaceStyles: {
    text: string;
    color: string;
    bold: boolean;
  }[];
}

export interface CartProductDisplayMessage {
  displayMessage: {
    buyableTarget: BuyableTarget | null;
  };
}
export interface CartProductMembershipLabel {
  text: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

export interface DeliveryTypeInfo {
  deliveryType: CartDeliveryType;
  isDeliveryProduct: boolean;
}

interface Voucher {
  type: PromotionType;
  isExpired: boolean;
  expiredAt: string;
  endDateText: string;
}

export interface CartProduct extends CartProductDisplayMessage, CartProductOrder {
  masterProductName: string;
  masterProductCode: string;
  masterProductNo: number;
  dealProductName: string;
  dealProductCode: string;
  dealProductNo: number;
  contentsProductName: string;
  contentsProductCode: string;
  contentsProductNo: number;
  imageUrl: string;
  productVerticalSmallUrl: string;
  quantity: number;
  productPrice: number;
  discountPrice: number;
  retailPrice: number;
  minQuantity: number;
  maxQuantity: number | null;
  minQuantityInContents: number;
  maxQuantityInContents: number | null;
  salesUnit: number;
  storageType: CartStorageType;
  tagNames: string[];
  isNotEnoughStock: boolean;
  soldOutText: string;
  soldOutType: CartSoldOut;
  pointPolicy: CartProductPointPolicy;
  deliveryPriceType: CartDeliveryPrice;
  createdAt: string;
  normalOrderTypePolicyInContents: CartNormalOrderTypePolicyInContents;
  giftOrderTypePolicyInContents?: CartGiftOrderTypePolicyInContentsType;
  deliveryTypeInfos: DeliveryTypeInfo[];
  voucher: Voucher | null;
  membershipLabels: CartProductMembershipLabel[];
  isKurlyFulfillment: boolean;
}

export interface CartItem {
  dealProductName?: string;
  dealProductNo: number;
  quantity: number;
  createdAt?: string;
}
