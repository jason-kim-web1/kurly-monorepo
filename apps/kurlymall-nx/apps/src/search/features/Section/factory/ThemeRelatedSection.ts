import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';
import { ThemePromotionSectionItemViewModel } from './ThemePromotionSection';
import COLOR from '../../../../shared/constant/colorset';

interface ThemeRelatedSectionInfo {
  title: string;
  subtitle: string;
  backgroundColor: string;
  fontColor: string;
  hasMore: boolean;
  collectionCode: string;
  isAds: boolean;
}

interface ThemeRelatedSectionItem {
  productNo: number;
  productName: string;
  salesPrice: number;
  discountedPrice?: number;
  discountRate: number;
  productVerticalMediumUrl: string;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
}

interface ThemeRelatedSectionItemViewModel extends SectionItemViewModel, ThemeRelatedSectionItem {
  _productDetailPageUrl: string;
}

type ThemeRelatedSectionItemList = ThemeRelatedSectionItem[];

type ThemeRelatedSectionItemViewModelList = ThemeRelatedSectionItemViewModel[];

type ThemeRelatedSection = Section<
  'THEME_RELATED',
  {
    sectionInfo: ThemeRelatedSectionInfo;
    items: ThemeRelatedSectionItemList;
  }
>;

type ThemeRelatedSectionViewModel = SectionViewModel<
  'THEME_RELATED',
  {
    sectionInfo: ThemeRelatedSectionInfo;
    items: ThemeRelatedSectionItemViewModelList;
  }
>;

class ThemeRelatedSectionViewModelCreator extends TransformableSection {
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

  transform(section: ThemeRelatedSection, meta: SectionMeta): ThemeRelatedSectionViewModel {
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
          backgroundColor: sectionInfo.backgroundColor || COLOR.bgLightGray,
          fontColor: sectionInfo.fontColor || COLOR.kurlyGray800,
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

const isThemeRelatedSection = (section: Section<string, unknown>): section is ThemeRelatedSection =>
  eq(section.view.sectionCode, 'THEME_RELATED');

const isThemeRelatedSectionViewModel = (section: Section<string, unknown>): section is ThemeRelatedSectionViewModel =>
  eq(section.view.sectionCode, 'THEME_RELATED');

const isThemeRelatedSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is ThemeRelatedSectionItemViewModel => eq(sectionItem._sectionCode, 'THEME_RELATED');

export {
  ThemeRelatedSectionViewModelCreator,
  isThemeRelatedSection,
  isThemeRelatedSectionViewModel,
  isThemeRelatedSectionItemViewModel,
};
export type { ThemeRelatedSection, ThemeRelatedSectionViewModel, ThemeRelatedSectionItemViewModel };
