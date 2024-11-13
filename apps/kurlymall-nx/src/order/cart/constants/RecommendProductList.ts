import { DeliveryPricePolicy, MembershipLabel as ProductLabel } from '../../../shared/interfaces';

export interface RecommendProductsRequest {
  address: string;
  addressDetail?: string;
}

export type FirstProductType = 'frequently_purchase' | 'closing_sale' | 'bargain';

export type BottomType = 'frequently_purchase' | 'alternative_product';

export interface RecommendProductListResponse {
  title: string;
  products: Products[];
  firstProductType: FirstProductType;
  bottomType: BottomType;
}

export interface Products {
  dealProductNo: number;
  dealProductName: string;
  productImageUrl: string;
  productVerticalSmallUrl: string;
  // NOTE: 장바구니TF 이후 라벨 텍스트에 포함되어 내려옵니다.
  purchaseCount: number;
  discountRate: number;
  productPrice: number;
  deliveryPriceType: DeliveryPricePolicy;
  labels: ProductLabel[];
  categoryIds: number[];
}

export interface Product extends Omit<Products, 'discountRate'> {
  discountRate: number | null;
  isFreeShipping: boolean;
}
export interface RecommendProductList {
  title: string;
  productList: Product[] | null;
  firstProductType?: FirstProductType;
  bottomType?: BottomType;
}
