import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';
import { ThemePromotionSectionItemViewModel } from './ThemePromotionSection';
import COLOR from '../../../../shared/constant/colorset';

interface AdSearchSectionInfo {
  title: string;
  subtitle: string;
  backgroundColor: string;
  fontColor: string;
  hasMore: boolean;
  collectionCode: string;
  isAds: boolean;
}

interface AdSearchSectionItem {
  productNo: number;
  productName: string;
  salesPrice: number;
  discountedPrice: any;
  discountRate: number;
  productVerticalMediumUrl: string;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  adInfo: {
    itemId: string;
    impTrackers: string[];
    clickTrackers: string[];
    trackId: string;
    auctionResult: {
      adAccountId: string;
      campaignId: string;
      winPrice: {
        currency: string;
        amountMicro: string;
      };
    };
  };
}

interface AdSearchSectionItemViewModel extends SectionItemViewModel, AdSearchSectionItem {
  _productDetailPageUrl: string;
}

type AdSearchSectionItemList = AdSearchSectionItem[];

type AdSearchSectionItemViewModelList = AdSearchSectionItemViewModel[];

type AdSearchSection = Section<
  'AD_SEARCH',
  {
    sectionInfo: AdSearchSectionInfo;
    items: AdSearchSectionItemList;
  }
>;

type AdSearchSectionViewModel = SectionViewModel<
  'AD_SEARCH',
  {
    sectionInfo: AdSearchSectionInfo;
    items: AdSearchSectionItemViewModelList;
  }
>;

class AdSearchSectionViewModelCreator extends TransformableSection {
  static override getImpressionSectionItemEventPayload(
    item: ThemePromotionSectionItemViewModel,
  ): PartialImpressionSectionItemPayload {
    return {
      item_position: item._position,
      content_id: item.productNo,
      content_name: item.productName,
      sales_price: item.salesPrice,
      price: item.discountedPrice || item.salesPrice,
      // NOTE: THEME_PROMOTION
      position: null,
      // NOTE: THEME_PROMOTION
      is_soldout: false,
      // NOTE: THEME_PROMOTION
      is_gift_purchase: false,
      // NOTE: THEME_PROMOTION
      sticker: '',
      // NOTE: THEME_PROMOTION
      delivery_type: '',
      // NOTE: THEME_PROMOTION
      review_count: 0,
    };
  }

  transform(section: AdSearchSection, meta: SectionMeta): AdSearchSectionViewModel {
    const {
      view: { sectionCode },
      data: { sectionInfo, items },
    } = section;
    const { position, type } = meta;
    return {
      _title: sectionInfo.title,
      _url: `/collections/${sectionInfo.collectionCode}`,
      _type: type,
      _id: nanoid(),
      _position: position,
      view: {
        ...section.view,
        sectionCode,
      },
      data: {
        sectionInfo: {
          ...sectionInfo,
          backgroundColor: COLOR.bgLightGray,
          fontColor: COLOR.kurlyGray800,
        },
        items: items.map((item, index) => {
          const { productNo } = item;
          const itemPosition = index + 1;
          return {
            ...item,
            _id: nanoid(),
            _logId: `${itemPosition}_${productNo}`,
            _sectionCode: sectionCode,
            _position: itemPosition,
            _productDetailPageUrl: `/goods/${productNo}`,
          };
        }),
      },
    };
  }
}

const isAdSearchSection = (section: Section<string, unknown>): section is AdSearchSection =>
  eq(section.view.sectionCode, 'AD_SEARCH');

const isAdSearchSectionViewModel = (section: Section<string, unknown>): section is AdSearchSectionViewModel =>
  eq(section.view.sectionCode, 'AD_SEARCH');

const isAdSearchSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is AdSearchSectionItemViewModel => eq(sectionItem._sectionCode, 'AD_SEARCH');

export {
  AdSearchSectionViewModelCreator,
  isAdSearchSection,
  isAdSearchSectionViewModel,
  isAdSearchSectionItemViewModel,
};
export type { AdSearchSection, AdSearchSectionViewModel, AdSearchSectionItemViewModel };
