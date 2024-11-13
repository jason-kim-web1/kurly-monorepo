import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';

interface PurchasedRecentSectionItem {
  productNo: number;
  productName: string;
  salesPrice: number;
  discountedPrice: any;
  discountRate: number;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  purchasedCount: number;
  productVerticalSmallUrl: string;
}

interface PurchasedRecentSectionItemViewModel extends SectionItemViewModel, PurchasedRecentSectionItem {
  _productDetailPageUrl: string;
}

type PurchasedRecentSectionItemList = PurchasedRecentSectionItem[];

type PurchasedRecentSectionItemViewModelList = PurchasedRecentSectionItemViewModel[];

type PurchasedRecentSection = Section<
  'PURCHASED_RECENT',
  {
    title: string;
    items: PurchasedRecentSectionItemList;
  }
>;

type PurchasedRecentSectionViewModel = SectionViewModel<
  'PURCHASED_RECENT',
  {
    title: string;
    items: PurchasedRecentSectionItemViewModelList;
  }
>;

class PurchasedRecentSectionViewModelCreator extends TransformableSection {
  static override getImpressionSectionItemEventPayload(
    item: PurchasedRecentSectionItemViewModel,
  ): PartialImpressionSectionItemPayload {
    return {
      item_position: item._position,
      content_id: item.productNo,
      content_name: item.productName,
      sales_price: item.salesPrice,
      price: item.discountedPrice || item.salesPrice,
      position: 0,
      is_soldout: false,
      is_gift_purchase: false,
      sticker: '',
      delivery_type: '',
      review_count: 0,
    };
  }

  transform(section: PurchasedRecentSection, meta: SectionMeta): PurchasedRecentSectionViewModel {
    const {
      view: { sectionCode },
      data: { title, items },
    } = section;
    const { position, type } = meta;
    return {
      _title: title,
      _type: type,
      _id: nanoid(),
      _position: position,
      view: {
        ...section.view,
        sectionCode,
      },
      data: {
        title,
        items: items.map((item, index) => {
          const { productNo } = item;
          const itemPosition = index + 1;
          return {
            ...item,
            _logId: `${itemPosition}_${productNo}`,
            _id: nanoid(),
            _sectionCode: sectionCode,
            _position: itemPosition,
            _productDetailPageUrl: `/goods/${productNo}`,
          };
        }),
      },
    };
  }
}

const isPurchasedRecentSection = (section: Section<string, unknown>): section is PurchasedRecentSection =>
  eq(section.view.sectionCode, 'PURCHASED_RECENT');

const isPurchasedRecentSectionViewModel = (
  section: Section<string, unknown>,
): section is PurchasedRecentSectionViewModel => eq(section.view.sectionCode, 'PURCHASED_RECENT');

const isPurchasedRecentSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is PurchasedRecentSectionItemViewModel => eq(sectionItem._sectionCode, 'PURCHASED_RECENT');

export {
  PurchasedRecentSectionViewModelCreator,
  isPurchasedRecentSection,
  isPurchasedRecentSectionViewModel,
  isPurchasedRecentSectionItemViewModel,
};
export type { PurchasedRecentSection, PurchasedRecentSectionViewModel, PurchasedRecentSectionItemViewModel };
