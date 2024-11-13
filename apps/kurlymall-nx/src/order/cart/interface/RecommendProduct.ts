import { DeliveryPricePolicy, MembershipLabel as ProductLabel } from '../../../shared/interfaces';

export interface RecommendProductList {
  dealProductNo: number;
  dealProductName: string;
  productImageUrl: string;
  productVerticalSmallUrl: string;
  discountRate: number | null;
  productPrice: number;
  deliveryPriceType: DeliveryPricePolicy;
  isFreeShipping: boolean;
  labels: ProductLabel[];
  categoryIds: number[];
}
