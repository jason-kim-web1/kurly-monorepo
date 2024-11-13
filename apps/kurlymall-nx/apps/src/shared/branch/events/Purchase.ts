import { BranchEvent } from '..';

interface EventData {
  transaction_id: string;
  revenue: number;
  shipping: number;
  coupon: string | null;
  currency: string;
}

export interface PurchaseContentItem {
  $price: number;
  $quantity: number;
  $currency: string;
  $sku: number;
  $product_name: string;
}

export interface PurchaseGAContentItem {
  price: number;
  quantity: number;
  item_id: string;
  item_name: string;
  currency: string;
}

export class InitiatePurchase extends BranchEvent<EventData, PurchaseContentItem[]> {
  constructor(eventData: EventData, contentItems: PurchaseContentItem[]) {
    super('INITIATE_PURCHASE', eventData, contentItems);
  }
}

export class Purchase extends BranchEvent<EventData, PurchaseContentItem[]> {
  constructor(eventData: EventData, contentItems: PurchaseContentItem[]) {
    super('PURCHASE', eventData, contentItems);
  }
}
