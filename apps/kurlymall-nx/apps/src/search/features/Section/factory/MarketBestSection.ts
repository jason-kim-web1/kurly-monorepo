import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';
import { getProductPurchasableStatus, ProductPurchasableStatus } from '../../../../shared/services/product.service';

interface MarketBestSectionItem {
  no: number;
  name: string;
  tags: {
    name: string;
    type: string;
  }[];
  sticker?: unknown;
  meta: {
    position: number;
    isFixed: boolean;
  };
  shortDescription: string;
  listImageUrl: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  discountedPrice?: number;
  discountRate: number;
  isBuyNow: boolean;
  isPurchaseStatus: boolean;
  isGiftable: boolean;
  isOnlyAdult: boolean;
  isSoldOut: boolean;
  soldOutTitle: string;
  soldOutText: string;
  canRestockNotify: boolean;
  isMultiplePrice: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  productViewStatus: string;
  notPurchaseMessage: string;
  deliveryTypeNames: string[];
  deliveryTypeInfos: {
    type: string;
    description: string;
  }[];
  isSales: boolean;
  reviewCount: string;
}

interface MarketBestSectionItemViewModel extends SectionItemViewModel, MarketBestSectionItem {
  _productDetailPageUrl: string;
  _status: ProductPurchasableStatus;
  _deliveryTypeNames: string[];
}

type MarketBestSectionItemList = MarketBestSectionItem[];

type MarketBestSectionItemViewModelList = MarketBestSectionItemViewModel[];

type MarketBestSection = Section<
  'MARKET_BEST',
  {
    title: string | null;
    items: MarketBestSectionItemList;
  }
>;

type MarketBestSectionViewModel = SectionViewModel<
  'MARKET_BEST',
  {
    title: string | null;
    items: MarketBestSectionItemViewModelList;
  }
>;

class MarketBestSectionViewModelCreator extends TransformableSection {
  static override getImpressionSectionItemEventPayload(
    item: MarketBestSectionItemViewModel,
  ): PartialImpressionSectionItemPayload {
    return {
      item_position: item._position,
      content_id: item.no,
      content_name: item.name,
      sales_price: item.salesPrice,
      price: item.discountedPrice || item.salesPrice,
      position: null,
      is_soldout: item.isSoldOut,
      is_gift_purchase: item.isGiftable,
      sticker: '',
      delivery_type: '',
      review_count: item.reviewCount,
    };
  }

  transform(section: MarketBestSection, meta: SectionMeta): MarketBestSectionViewModel {
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
        items: items.map((item) => {
          const { no, productViewStatus, notPurchaseMessage, soldOutText, soldOutTitle, deliveryTypeInfos } = item;
          const itemPosition = item.meta.position;
          return {
            ...item,
            _id: nanoid(),
            _logId: `${itemPosition}_${no}`,
            _sectionCode: sectionCode,
            _position: itemPosition,
            _productDetailPageUrl: `/goods/${no}`,
            _status: getProductPurchasableStatus({
              productViewStatus,
              notPurchaseMessage,
              soldOutText,
              soldOutTitle,
            }),
            _deliveryTypeNames: deliveryTypeInfos.map(({ description }) => description),
          };
        }),
      },
    };
  }
}

const isMarketBestSection = (section: Section<string, unknown>): section is MarketBestSection =>
  eq(section.view.sectionCode, 'MARKET_BEST');

const isMarketBestSectionViewModel = (section: Section<string, unknown>): section is MarketBestSectionViewModel =>
  eq(section.view.sectionCode, 'MARKET_BEST');

const isMarketBestSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is MarketBestSectionItemViewModel => eq(sectionItem._sectionCode, 'MARKET_BEST');

export {
  MarketBestSectionViewModelCreator,
  isMarketBestSection,
  isMarketBestSectionViewModel,
  isMarketBestSectionItemViewModel,
};
export type { MarketBestSection, MarketBestSectionViewModel, MarketBestSectionItemViewModel };
