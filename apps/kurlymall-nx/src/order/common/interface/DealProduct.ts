import { Status } from '../constants/Status';
import { StorageType } from '../constants/StorageType';

export interface InvoiceOfDealProduct {
  invoiceNo: string;
  extraCourierCode: string;
}

export interface DealProduct {
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  quantity: number;
  displayPrice: number;
  displayDiscountPrice: number;
  paymentPrice: number;
  imageUrl: string;
  storageType: StorageType;
  status: Status;
  isGiveawayProduct: boolean;
  invoice: InvoiceOfDealProduct | null;
  /** 주문내역 상세 - (pms 대응) 장바구니 담을수 있는 상품인지 여부 */
  isAddBackToCart?: boolean;
  categoryIds: number[] | null;
}

export type DealProducts = DealProduct[];
