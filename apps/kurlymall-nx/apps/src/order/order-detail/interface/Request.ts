export interface CheckProductReAddAvailableRequest {
  address: string;
  addressDetail: string;
  dealProducts: {
    dealProductNo: number;
    quantity: number;
    createdAt?: string;
  }[];
}
