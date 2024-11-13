import { BaseResponse } from '../../../shared/interfaces';
import { DeliveryGroups } from '../../common/interface/DeliveryGroup';

// TODO 날짜 검색 필터 타입 추가 필요

export interface Order {
  groupOrderNo: number;
  paymentCompletedAt: string;
  deliveryGroups: DeliveryGroups;
  isSelfCancelable: boolean;
}

export type Orders = Order[];

export interface Pagination {
  hasNext: true;
  totalPage: number;
  currentPage: number;
  limit: number;
  startDate: string;
  endDate: string;
}

export interface OrderList {
  items: Orders | [];
  pagination: Pagination;
}

export type OrderListResponse = BaseResponse<OrderList>;
