import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';
import COLOR from '../../../../shared/constant/colorset';

interface ThemePromotionSectionInfo {
  title: string;
  subtitle: string;
  backgroundColor: string;
  fontColor: string;
  hasMore: boolean;
  collectionCode: string;
  isAds: boolean;
}

interface ThemePromotionSectionItem {
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

interface ThemePromotionSectionItemViewModel extends SectionItemViewModel, ThemePromotionSectionItem {
  _productDetailPageUrl: string;
}

type ThemePromotionSectionItemList = ThemePromotionSectionItem[];

type ThemePromotionSectionItemViewModelList = ThemePromotionSectionItemViewModel[];

type ThemePromotionSection = Section<
  'THEME_PROMOTION',
  {
    sectionInfo: ThemePromotionSectionInfo;
    items: ThemePromotionSectionItemList;
  }
>;

type ThemePromotionSectionViewModel = SectionViewModel<
  'THEME_PROMOTION',
  {
    sectionInfo: ThemePromotionSectionInfo;
    items: ThemePromotionSectionItemViewModelList;
  }
>;

class ThemePromotionSectionViewModelCreator extends TransformableSection {
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

  transform(section: ThemePromotionSection, meta: SectionMeta): ThemePromotionSectionViewModel {
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

const isThemePromotionSection = (section: Section<string, unknown>): section is ThemePromotionSection =>
  eq(section.view.sectionCode, 'THEME_PROMOTION');

const isThemePromotionSectionViewModel = (
  section: Section<string, unknown>,
): section is ThemePromotionSectionViewModel => eq(section.view.sectionCode, 'THEME_PROMOTION');

const isThemePromotionSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is ThemePromotionSectionItemViewModel => eq(sectionItem._sectionCode, 'THEME_PROMOTION');

export {
  ThemePromotionSectionViewModelCreator,
  isThemePromotionSection,
  isThemePromotionSectionViewModel,
  isThemePromotionSectionItemViewModel,
};
export type { ThemePromotionSection, ThemePromotionSectionViewModel, ThemePromotionSectionItemViewModel };
