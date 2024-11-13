import type { StorageType } from '../../shared/enums';
import type { DeliveryInfoName, DeliveryInfoType, StickerList } from '../types';
import type { MembershipLabel } from '../../shared/interfaces';
import { MEMBERSHIP_PURCHASE_ALERT_TYPE } from '../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import type { SnakeToCamelCaseNested } from '../../shared/types';
import type { ProductDetailGiveawayContentsBoxData } from '../../shared/api';

export type ProductRetailPriceType = number | null;
export type ProductBasePriceType = number;
export type ProductDiscountedPriceType = number | null;

export type MembershipPurchasePopupType = keyof typeof MEMBERSHIP_PURCHASE_ALERT_TYPE;
export interface MembershipPurchaseAlertInfo {
  title: string;
  text: string;
  type: MembershipPurchasePopupType;
}
export interface PointBanner {
  isShow: boolean;
  text: string;
  contents: {
    id: string;
    body: string;
    color: string;
    font: string;
    size: number;
    type: string;
  }[];
}

export interface DealProduct {
  no: number;
  name: string;
  isExpectedPoint: boolean;
  expectedPoint: number;
  expectedPointRatio: number;
  retailPrice: ProductRetailPriceType;
  basePrice: ProductBasePriceType;
  discountedPrice: ProductDiscountedPriceType;
  discountRate: number;
  buyUnit: number;
  quantity: number;
  isSoldOut: boolean;
  minEa: number;
  maxEa: number;
  canRestockNotify: boolean;
  isPurchaseStatus: boolean;
  isGiftable: boolean;
  isOnlyAdult: boolean;
  masterProductCode: string;
  masterProductName: string;
  canPurchaseLevel: boolean;
  canPurchaseLevelText: MembershipPurchaseAlertInfo;
  membershipLabels: MembershipLabel[];
  pointBanner: PointBanner;
  isFreeDelivery: boolean;
  categoryIds: number[];
}

export interface ProductInfoDictionaryItem {
  title: string;
  description: string;
}

export type GroupKeyType = 'TEXT' | 'IMAGE' | 'YEAR_MONTH_DAY';

export type ContentType = 'SINGLE' | 'MULTI' | 'OPTION' | 'CALENDAR';

export type DirectOrderType = 'DEFAULT' | 'SINGLE_DIRECT_ORDER' | 'MULTIPLE_DIRECT_ORDER';

export interface GroupKey {
  title: string;
  descriptionType: GroupKeyType;
}

export interface GroupMemberSubOption {
  description: string | null;
  imageUrl?: string;
  contentsProductNo?: number;
  isSoldOut?: boolean;
  isPurchaseStatus?: boolean;
  prices?: {
    retailPrice: ProductRetailPriceType;
    basePrice: ProductBasePriceType;
    discountedPrice: ProductDiscountedPriceType;
    discountedRate: number;
  } | null;
  subOptions?: GroupMemberSubOption[];
}

export interface GroupMember {
  description: string;
  subOptions: GroupMemberSubOption[];
}

export interface GroupProduct {
  groupKeys: GroupKey[];
  groupMembers: GroupMember[];
}

export interface Option {
  id: number;
  value: string;
  name: string;
  disabled: boolean;
  imageUrl?: string;
}

export interface ProductDetailNotice {
  dealProductNo: number;
  dealProductName: string;
  notices: ProductInfoDictionaryItem[];
}

export type ProductDetailExceptionLabel = 'MANUAL_ORDER' | 'KURLY_PASS' | 'MEMBER_LABEL' | 'REFRESH_PACKAGE' | null;

export interface MemberCoupon {
  newbieLimitDatetime: string | null;
  newbieMinPrice: number;
}

export interface ProductDetailContentProps {
  legacyContent: string | null;
  legacyEventBanner: string;
  legacyPiImages: string[];
  partnersContent: PartnersContent | null;
  giveawayContentsBox: ProductDetailGiveawayContentsBox;
}

export interface AcceptedProduct {
  allergy: string | null;
  isMultiplePrice: boolean;
  showablePrices: ProductShowablePrices;
  showablePricesInToolTip: ProductShowablePriceName[];
  retailPrice: ProductRetailPriceType;
  basePrice: ProductBasePriceType;
  discountedPrice: ProductDiscountedPriceType;
  discountRate: number;
  isExpectedPoint: boolean;
  expectedPoint: number;
  expectedPointRatio: number;
  expirationDate: string | null;
  extraInfos: ProductInfoDictionaryItem[];
  guide: string;
  isDirectOrder: boolean;
  isOnlyAdult: boolean;
  isGiftable: boolean;
  isPurchaseStatus: boolean;
  isSoldOut: boolean;
  mainImageUrl: string;
  name: string;
  no: number;
  soldOutText: string;
  notSalesText: string;
  contentType: ContentType;
  groupProduct: GroupProduct;
  isGroupProduct: boolean;
  storageTypes: StorageType[];
  productOrigin: string | null;
  shortDescription: string;
  todayBrix: string | null;
  salesUnit: string | null;
  canRestockNotify: boolean;
  volume: string | null;
  exceptionLabel: ProductDetailExceptionLabel;
  afterSaleServiceInfo: string;
  deliveryTypeInfos: DeliveryInfoType[];
  deliveryTypeNames: DeliveryInfoName[];
  sellerName: string;
  memberCoupon: MemberCoupon;
  legacyPromotion: LegacyPromotionType;
  directOrderType: DirectOrderType;
  productDetail: ProductDetailContentProps;
  productNotice: ProductDetailNotice[];
  isInquiryWritable: boolean;
  isReviewWritable: boolean;
  reviewCount: number;
  sellerNotice: ProductInfoDictionaryItem[];
  isThirdPart: boolean;
  productSites: ProductSiteType[];
  dealProducts: DealProduct[];
  stickers_v2: StickerList;
  productVerticalLargeUrl: string;
  productVerticalSmallUrl: string;
  productHorizontalLargeUrl: string;
  pointBanner: PointBanner;
  isFreeDelivery: boolean;
  returnInfo: ProductReturnInfo;
}

export type PartnersContentBlockType =
  | 'NOTICE'
  | 'INTRO'
  | 'CHECKPOINT'
  | 'BODY'
  | 'CERTIFICATION'
  | 'TIP1'
  | 'PICK'
  | 'TIP2'
  | 'NOTE'
  | 'RECIPE'
  | 'BRAND'
  | 'PRODUCT_IMAGE'
  | 'HTML';

export type PartnersContentModuleType =
  | 'IMAGE'
  | 'TITLE'
  | 'TEXT_EDITOR'
  | 'BANNER'
  | 'VIDEO'
  | 'EWG_ELEMENTS'
  | 'HTML'
  | 'CAPTION'
  | 'CERTIFICATION'
  | 'FOOD_MATERIALS'
  | 'PRODUCT_INFORMATION';

export type PartnersContentModule = {
  [k in PartnersContentModuleType]: {
    pcImage: string;
    mobileImage: string;
  };
};

export type PartnersContent =
  | {
      [k in PartnersContentBlockType]: PartnersContentModule[];
    }
  | null;

export type ProductDetailGiveawayContentsBox =
  | SnakeToCamelCaseNested<ProductDetailGiveawayContentsBoxData>
  | undefined
  | null;

export type ProductSiteType = 'MARKET' | 'BEAUTY';

export type ProductShowablePriceName = 'retailPrice' | 'basePrice' | 'discountedPrice';

export interface ProductShowablePrices {
  salesPrice: number;
  basePrice: number | null;
  retailPrice: number | null;
}

export interface ProductReturnInfo {
  address: string;
  oneWayCost: number;
  roundTripCost: number;
}

export interface ProductProps {
  allergy: string | null;
  isMultiplePrice: boolean;
  dealProducts: DealProduct[];
  deliveryTypeNames: DeliveryInfoName[];
  deliveryTypeInfos: DeliveryInfoType[];
  showablePrices: ProductShowablePrices;
  showablePricesInToolTip: ProductShowablePriceName[];
  retailPrice: ProductRetailPriceType;
  basePrice: ProductBasePriceType;
  discountedPrice: ProductDiscountedPriceType;
  discountRate: number;
  isExpectedPoint: boolean;
  expectedPoint: number;
  expectedPointRatio: number;
  expirationDate: string | null;
  extraInfos: ProductInfoDictionaryItem[];
  guide: string;
  isDirectOrder: boolean;
  isGiftable: boolean;
  isOnlyAdult: boolean;
  isPurchaseStatus: boolean;
  isReservable: boolean;
  isSoldOut: boolean;
  reservationPossibleDates: string[] | null;
  mainImageUrl: string;
  shareImageUrl: string;
  maxEa: number;
  minEa: number;
  name: string;
  no: number;
  soldOutText: string;
  notSalesText: string;
  originalImageUrl: string;
  isGroupProduct: boolean;
  contentType: ContentType;
  groupProduct: GroupProduct;
  storageTypes: StorageType[];
  productOrigin: string | null;
  reviewCount: number;
  shortDescription: string;
  todayBrix: string | null;
  salesUnit: string | null;
  canRestockNotify: boolean;
  volume: string | null;
  productNotice: ProductDetailNotice[];
  productDetail: ProductDetailContentProps;
  legacyPromotion: LegacyPromotionType;
  exceptionLabel: ProductDetailExceptionLabel;
  isInquiryWritable: boolean;
  isReviewWritable: boolean;
  afterSaleServiceInfo: string;
  sellerName: string;
  memberCoupon: MemberCoupon;
  directOrderType: DirectOrderType;
  sellerNotice: ProductInfoDictionaryItem[];
  isThirdPart: boolean;
  productSites: ProductSiteType[];
  plcc: PlccType;
  // NOTE: 함께구매
  isJoinOrder: boolean;
  joinOrder: JoinOrder | null;
  stickers_v2: StickerList;
  productVerticalLargeUrl: string;
  productVerticalSmallUrl: string;
  productHorizontalLargeUrl: string;
  pointBanner: PointBanner;
  isFreeDelivery: boolean;
  returnInfo: ProductReturnInfo;
  categoryIds: number[];
}

export interface JoinOrder {
  banner: {
    isShow: boolean;
    text: string;
    contents: JoinOrderBannerContentItem[];
  };
}

export interface JoinOrderBannerContentItem {
  id: string;
  body: string;
  color: string;
  font: string;
  type: string;
}

export interface PlccType {
  isShown: boolean;
  plccUrl: string;
  benefits: PlccBenefit[];
}

export interface PlccBenefit {
  type: PlccBenefitType;
  value: number;
  contents: string;
}

export type PlccBenefitType = 'ratio' | 'value';

export type LegacyPromotionType = 'NEWBIE' | 'LUCKY_BOX' | null;

export enum ProductDetailContentType {
  DESCRIPTION = 'description',
  DETAIL = 'detail',
  REVIEW = 'review',
  INQUIRY = 'inquiry',
}

export type ProductDetailMenuType = 'description' | 'detail' | 'review' | 'inquiry';

export type SNSType = 'kakao' | 'line' | 'facebook' | 'twitter';

export interface ViewedProduct {
  no: string;
  thumb: string;
  time: string;
}

export type ProductInfoItemTitleType =
  | '배송'
  | '판매자'
  | '포장타입'
  | '판매단위'
  | '중량/용량'
  | '원산지'
  | '알레르기정보'
  | '유통기한(또는 소비기한)정보'
  | '당도'
  | '안내사항'
  | '판매상태'
  | '입고상태'
  | 'A/S 안내';
