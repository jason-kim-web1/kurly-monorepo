import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { getProductPurchasableStatus, ProductPurchasableStatus } from '../../../../shared/services/product.service';
import { SnakeCaseStickerList, StickerList } from '../../../../product/types';
import { transformSnakeCaseStickerList } from '../../../../shared/utils/sticker';

interface ProductListSectionItem {
  clusterCenterCode: string;
  isShown: boolean;
  no: number;
  name: string;
  shortDescription: string;
  listImageUrl: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  discountedPrice: any;
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
  stickersV2: SnakeCaseStickerList;
  position: number;
  reviewCount: string;
  shortUrl: any;
  canRestockNotify: boolean;
  productViewStatus: string;
  notPurchaseMessage: string;
}

interface ProductListSectionItemViewModel extends SectionItemViewModel, ProductListSectionItem {
  _productDetailPageUrl: string;
  _status: ProductPurchasableStatus;
  _stickers: StickerList;
  _deliveryTypeNames: string[];
}

type ProductListSectionItemList = ProductListSectionItem[];

type ProductListSectionItemViewModelList = ProductListSectionItemViewModel[];

type ProductListSection = Section<
  'PRODUCT_LIST',
  {
    items: ProductListSectionItemList;
  }
>;

type ProductListSectionViewModel = SectionViewModel<
  'PRODUCT_LIST',
  {
    items: ProductListSectionItemViewModelList;
  }
>;

class ProductListSectionViewModelCreator extends TransformableSection {
  transform(section: ProductListSection, meta: SectionMeta): ProductListSectionViewModel {
    const {
      view: { sectionCode },
      data: { items },
    } = section;
    const { position, type } = meta;
    return {
      _type: type,
      _id: nanoid(),
      _position: position,
      view: {
        ...section.view,
        sectionCode,
      },
      data: {
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

const isProductListSection = (section: Section<string, unknown>): section is ProductListSection =>
  eq(section.view.sectionCode, 'PRODUCT_LIST');

const isProductListSectionViewModel = (section: Section<string, unknown>): section is ProductListSectionViewModel =>
  eq(section.view.sectionCode, 'PRODUCT_LIST');

const isProductListSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is ProductListSectionItemViewModel => eq(sectionItem._sectionCode, 'PRODUCT_LIST');

export {
  ProductListSectionViewModelCreator,
  isProductListSection,
  isProductListSectionViewModel,
  isProductListSectionItemViewModel,
};
export type { ProductListSection, ProductListSectionViewModel, ProductListSectionItemViewModel };
