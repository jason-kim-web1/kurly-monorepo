import { BaseResponse, NormalOrderTypePolicyType, ReorderProduct } from '../../../shared/interfaces';
import { OrderDetail } from './OrderDetail';

export type OrderDetailResponse = BaseResponse<OrderDetail>;

export type CheckProductReAddAvailableResponse = BaseResponse<{
  checkoutType: NormalOrderTypePolicyType | null;
  availableProducts: ReorderProduct[];
  unavailableProducts: ReorderProduct[];
}>;

export type FetchProductsOrderTypePolicyResponse = Array<{
  dealProductNo: number;
  normalOrderTypePolicy: NormalOrderTypePolicyType;
}>;
