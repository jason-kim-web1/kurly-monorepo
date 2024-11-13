import { BranchEvent } from '..';

interface ContentItem {
  $canonical_identifier: string;
  $sku: number;
  $price: number;
  $quantity: number;
  $currency: string;
  $product_name: string;
}

export class ViewItem extends BranchEvent<void, ContentItem[]> {
  constructor(contentItems: ContentItem[]) {
    super('VIEW_ITEM', undefined, contentItems);
  }
}
