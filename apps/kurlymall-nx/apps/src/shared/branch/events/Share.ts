import { BranchEvent } from '..';

interface EventData {
  description: 'PRODUCT';
}

interface ContentItem {
  $canonical_identifier: string;
  $sku: number;
  $product_name: string;
}

export class Share extends BranchEvent<EventData, ContentItem[]> {
  constructor(eventData: EventData, contentItems: ContentItem[]) {
    super('SHARE', eventData, contentItems);
  }
}
