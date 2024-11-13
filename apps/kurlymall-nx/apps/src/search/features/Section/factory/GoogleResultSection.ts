import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';
import { getProductPurchasableStatus, ProductPurchasableStatus } from '../../../../shared/services/product.service';
import { SnakeCaseStickerList, StickerList } from '../../../../product/types';
import { transformSnakeCaseStickerList } from '../../../../shared/utils/sticker';
import { getStickerText } from '../../../../shared/amplitude/events/getStickerText';

interface GoogleResultSectionItem {
  clusterCenterCode: string;
  isShown: boolean;
  no: number;
  name: string;
  shortDescription: string;
  listImageUrl: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  discountedPrice?: number;
  discountRate: number;
  isBuyNow: boolean;
  isPurchaseStatus: boolean;
  isGiftable: boolean;
  isSoldOut: boolean;
  soldOutTitle: string;
  soldOutText: string;
  restockNotices: {
    indirect: boolean;
    direct: boolean;
  };
  isOnlyAdult: boolean;
  tags: {
    name: string;
    type: string;
  }[];
  sticker: any;
  deliveryType: string;
  isMultiplePrice: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  productStatus: {
    indirect: string;
    direct: string;
  };
  notPurchaseMessages: {
    indirect: string;
    direct: string;
  };
  deliveryTypeNames: string[];
  deliveryTypeInfos: {
    type: string;
    description: string;
  }[];
  stickers: any[];
  position: number;
  reviewCount: string;
  shortUrl: any;
  canRestockNotify: boolean;
  productViewStatus: string;
  notPurchaseMessage: string;
  stickersV2: SnakeCaseStickerList;
}

interface GoogleResultSectionItemViewModel extends SectionItemViewModel, GoogleResultSectionItem {
  _productDetailPageUrl: string;
  _status: ProductPurchasableStatus;
  _stickers: StickerList;
  _deliveryTypeNames: string[];
}

type GoogleResultSectionItemList = GoogleResultSectionItem[];

type GoogleResultSectionItemViewModelList = GoogleResultSectionItemViewModel[];

type GoogleResultSectionInfo = {
  title: string;
};

type GoogleResultSection = Section<
  'GOOGLE_RESULT',
  {
    sectionInfo: GoogleResultSectionInfo;
    items: GoogleResultSectionItemList;
  }
>;

type GoogleResultSectionViewModel = SectionViewModel<
  'GOOGLE_RESULT',
  {
    sectionInfo: GoogleResultSectionInfo;
    items: GoogleResultSectionItemViewModelList;
  }
>;

class GoogleResultSectionViewModelCreator extends TransformableSection {
  static override getImpressionSectionItemEventPayload(
    item: GoogleResultSectionItemViewModel,
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
      sticker: getStickerText(item._stickers),
      delivery_type: '',
      review_count: item.reviewCount,
    };
  }

  transform(section: GoogleResultSection, meta: SectionMeta): GoogleResultSectionViewModel {
    const {
      view: { sectionCode },
      data: { sectionInfo, items },
    } = section;
    const { position, type } = meta;
    const title = sectionInfo.title;
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
        sectionInfo: {
          title,
        },
        items: items.map((item) => {
          const {
            no,
            productViewStatus,
            notPurchaseMessage,
            soldOutText,
            soldOutTitle,
            stickersV2,
            deliveryTypeInfos,
          } = item;
          const itemPosition = item.position;
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
            _stickers: transformSnakeCaseStickerList(stickersV2),
            _deliveryTypeNames: deliveryTypeInfos.map(({ description }) => description),
          };
        }),
      },
    };
  }
}

const isGoogleResultSection = (section: Section<string, unknown>): section is GoogleResultSection =>
  eq(section.view.sectionCode, 'GOOGLE_RESULT');

const isGoogleResultSectionViewModel = (section: Section<string, unknown>): section is GoogleResultSectionViewModel =>
  eq(section.view.sectionCode, 'GOOGLE_RESULT');

const isGoogleResultSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is GoogleResultSectionItemViewModel => eq(sectionItem._sectionCode, 'GOOGLE_RESULT');

export {
  GoogleResultSectionViewModelCreator,
  isGoogleResultSection,
  isGoogleResultSectionViewModel,
  isGoogleResultSectionItemViewModel,
};
export type { GoogleResultSection, GoogleResultSectionViewModel, GoogleResultSectionItemViewModel };
