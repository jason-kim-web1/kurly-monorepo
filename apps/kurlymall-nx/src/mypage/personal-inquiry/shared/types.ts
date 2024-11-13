import { OrderType } from '../../../shared/constant/order';

export interface MemberOrderProductData {
  contentsProductNo: null | number;
  contentsProductName: null | string;
  createdDateTime: string;
  dealProductNo: number;
  dealProductName: string;
  quantity: number;
  paymentAmount: number;
  imageUrl: string;
  orderedDatetime: string;
}

export interface MemberOrderProduct extends MemberOrderProductData {
  selected: boolean;
  orderNo: number;
}

export interface MemberOrderData {
  orderNo: number;
  products: MemberOrderProductData[];
}

export interface MemberOrder {
  orderNo: number;
  orderType: OrderType;
  products: MemberOrderProduct[];
  selected: boolean;
  folded: boolean;
}
