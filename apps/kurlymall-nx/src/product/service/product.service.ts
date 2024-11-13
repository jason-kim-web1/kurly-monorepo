import { chain, get, isArray, isNull, map, size } from 'lodash';
import { nanoid } from 'nanoid';
import DOMPurify from 'isomorphic-dompurify';

import {
  DealProductResponse,
  fetchPickedProduct,
  fetchProductDetail,
  getFile,
  PartnersContentModuleData,
  ProductDetailContentData,
  ProductDetailData,
  ProductDetailMetaData,
} from '../../shared/api';
import { Grade } from '../../shared/enums';
import type { DealProduct, PartnersContent, PartnersContentBlockType, ProductProps } from '../detail/types';
import { getContentType } from './getContentType';
import { CONTENT_PRODUCT_MAX_QUANTITY, DEAL_PRODUCT_MAX_QUANTITY } from '../product.constant';
import getIsDirectOrder from './getIsDirectOrder';
import { convertToCamelKeys, convertNestedKeysToCamelCase } from '../../shared/utils/convert-to-camel-keys';
import { ENVIRONMENT, GIFT_DELIVERY_NOTICE } from '../../shared/configs/config';
import { getShallowObjectToStringWithNewLine, joinByNewLine } from '../../shared/utils/valueToStringWithNewLine';
import { HTML_SANITIZE_ALLOWED_URI_REGEXP } from '../../shared/constant';
import snakeToCamel from '../../shared/utils/snakeToCamelCase';
import { transformSnakeCaseStickerList } from '../../shared/utils/sticker';
import { fetchRecommendProducts, FetchRecommendProductsResponse } from '../../shared/api/product/recommend';
import { amplitudeService } from '../../shared/amplitude';
import type { StickerList } from '../types';

const getFoundModuleDataImage = (module: PartnersContentModuleData, target: 'pc_image' | 'mobile_image') =>
  module.data.find((it) => it[target])?.[target] || '';

const parsedPartnersContentModuleImage = (modules: PartnersContentModuleData[]) => {
  return modules.map((module) => {
    const pcImage = getFoundModuleDataImage(module, 'pc_image');
    const mobileImage = getFoundModuleDataImage(module, 'mobile_image');

    return {
      [module.module_type]: { pcImage, mobileImage },
    };
  });
};

export const getParsedPartnersContent = (partnersContents: ProductDetailContentData[]) => {
  if (!isArray(partnersContents)) {
    return null;
  }

  return partnersContents.reduce((acc, { block_type, modules }) => {
    return { ...acc, [block_type]: [...parsedPartnersContentModuleImage(modules)] };
  }, {}) as PartnersContent;
};

export const getPartnersImagesByDevice = (
  partnersContent: PartnersContent,
  blockType: PartnersContentBlockType,
  isPC: boolean,
) => {
  const targetImage = isPC ? 'pcImage' : 'mobileImage';
  return (
    partnersContent?.[blockType]
      ?.filter((it) => it.IMAGE)
      .reduce((acc, bodyImage) => {
        return [...acc, bodyImage.IMAGE[targetImage]];
      }, [] as string[]) || []
  );
};

const assertNotGiftable = (isGitable: boolean) => !isGitable;
const createDealProduct = (dealProduct: DealProductResponse) => ({
  ...dealProduct,
  quantity: 0,
  maxEa: dealProduct.max_ea || DEAL_PRODUCT_MAX_QUANTITY, // 0 혹은 null 이 들어오면 최대구매수량 무제한
  categoryIds: dealProduct.category_ids || [],
});

const createDealProducts = (dealProducts: DealProductResponse[]) =>
  chain(dealProducts)
    .filter((deal) => assertNotGiftable(deal.is_giftable))
    .map(createDealProduct)
    .map((deal) => convertNestedKeysToCamelCase<DealProduct, DealProductResponse>(deal))
    .value();

export const getPurifiedProductDetailContents = (html: string) => {
  return DOMPurify.sanitize(html, {
    FORCE_BODY: true,
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    ALLOWED_URI_REGEXP: HTML_SANITIZE_ALLOWED_URI_REGEXP,
  });
};

const getJoinOrder = (
  isJoinOrder: boolean,
  data: ProductDetailData['join_order'] | null,
): ProductProps['joinOrder'] => {
  if (!isJoinOrder || isNull(data)) {
    return null;
  }
  return {
    banner: {
      isShow: get(data, 'banner.is_show', false),
      text: get(data, 'banner.text', ''),
      contents: get(data, 'banner.contents', []),
    },
  };
};

const SHOWABLE_PRICE = {
  retail_price: 'retailPrice',
  base_price: 'basePrice',
  discounted_price: 'discountedPrice',
} as const;

export const createProductDetailData = (data: ProductDetailData, meta: ProductDetailMetaData): ProductProps => {
  const dealProductLength = data.deal_products.length;
  const isGroupProduct = data.is_group_product;
  const groupKeys = data.group_products.group_keys.map((it) => ({
    title: it.title,
    descriptionType: it.description_type,
  }));
  const isJoinOrder = get(data, 'is_join_order', false);
  const returnInfo = data.return_info;
  return {
    allergy: data.allergy,
    isExpectedPoint: data.is_expected_point || false,
    expectedPoint: data.expected_point || 0,
    expectedPointRatio: data.expected_point_ratio || 0,
    isMultiplePrice: data.is_multiple_price ?? false,
    dealProducts: createDealProducts(data.deal_products),
    deliveryTypeNames: (data.delivery_type_infos || []).map(({ description }) => description),
    deliveryTypeInfos: data.delivery_type_infos,
    showablePrices: {
      salesPrice: data.showable_prices.sales_price,
      basePrice: data.showable_prices.base_price,
      retailPrice: data.showable_prices.retail_price,
    },
    showablePricesInToolTip: data.showable_prices_tooltip.map((priceName) => SHOWABLE_PRICE[priceName]),
    retailPrice: data.retail_price,
    basePrice: data.base_price,
    discountedPrice: data.discounted_price,
    discountRate: data.discount_rate,
    expirationDate: data.expiration_date,
    extraInfos: data.extra_infos,
    guide: joinByNewLine(data.guides),
    isPurchaseStatus: data.is_purchase_status,
    isGiftable: data.is_giftable,
    isOnlyAdult: data.is_only_adult,
    isReservable: data.is_reservable,
    reservationPossibleDates: data.reservation_possible_dates,
    isSoldOut: data.is_sold_out,
    mainImageUrl: data.main_image_url,
    shareImageUrl: data.share_image_url,
    originalImageUrl: data.original_image_url,
    maxEa: data.max_ea || CONTENT_PRODUCT_MAX_QUANTITY,
    minEa: data.min_ea,
    name: data.name,
    no: data.no,
    notSalesText: data.not_sales_text,
    soldOutText: data.is_sold_out ? data.sold_out_text : '',
    contentType: getContentType({ dealProductLength, isGroupProduct, groupKeys }),
    isGroupProduct: isGroupProduct,
    groupProduct: {
      groupKeys: groupKeys,
      groupMembers: data.group_products.group_members.map((groupMember) => ({
        description: groupMember.description,
        subOptions: groupMember.sub_options.map((it) => ({
          description: it.description,
          imageUrl: it.image_url,
          contentsProductNo: it.contents_product_no,
          isSoldOut: it.is_sold_out,
          isPurchaseStatus: it.is_purchase_status,
          prices: it.prices
            ? {
                basePrice: it.prices?.base_price,
                retailPrice: it.prices?.retail_price,
                discountedPrice: it.prices?.discounted_price,
                discountedRate: it.prices?.discount_rate,
              }
            : null,
        })),
      })),
    },
    storageTypes: data.storage_type,
    productNotice: data.product_notice.map((notice) => convertToCamelKeys(notice)),
    productOrigin: data.product_origin,
    reviewCount: data.review_count || 0,
    shortDescription: data.short_description,
    todayBrix: data.today_brix,
    salesUnit: data.sales_unit,
    volume: data.volume,
    canRestockNotify: data.can_restock_notify,
    productDetail: {
      legacyContent: data.product_detail.legacy_content
        ? getPurifiedProductDetailContents(data.product_detail.legacy_content)
        : null,
      legacyPiImages: data.product_detail.legacy_pi_images,
      legacyEventBanner: data.product_detail.legacy_event_banner,
      partnersContent: getParsedPartnersContent(data.product_detail.content),
      giveawayContentsBox: snakeToCamel(data.product_detail.giveaway_contents_box),
    },
    legacyPromotion: data.legacy_promotion,
    exceptionLabel: data.exception_label,
    isInquiryWritable: meta.is_inquiry_writable,
    isReviewWritable: meta.is_review_writable,
    afterSaleServiceInfo: getShallowObjectToStringWithNewLine(data.after_sale_service_info),
    sellerName: (data.seller_names ?? []).join(', '),
    memberCoupon: {
      newbieLimitDatetime: data.member_coupon.newbie_limit_datetime,
      newbieMinPrice: data.member_coupon.newbie_min_price,
    },
    isDirectOrder: getIsDirectOrder(data.direct_order_type),
    directOrderType: data.direct_order_type,
    sellerNotice: data.seller_profile || [],
    isThirdPart: data.is_third_part || false,
    productSites: data.sites || [],
    plcc: {
      isShown: data.kurly_plcc?.is_shown,
      plccUrl: data.kurly_plcc?.url,
      benefits: data.kurly_plcc?.benefits,
    },
    isJoinOrder,
    joinOrder: getJoinOrder(isJoinOrder, get(data, 'join_order', null)),
    stickers_v2: transformSnakeCaseStickerList(get(data, 'stickers')),
    productVerticalLargeUrl: data.product_vertical_large_url || '',
    productVerticalSmallUrl: data.product_vertical_small_url || '',
    productHorizontalLargeUrl: data.product_horizontal_large_url || '',
    pointBanner: {
      isShow: data.point_banner.is_show,
      text: data.point_banner.text,
      contents: data.point_banner.contents,
    },
    isFreeDelivery: data.is_free_delivery || false,
    returnInfo: {
      address: returnInfo.address || '',
      oneWayCost: returnInfo.one_way_cost || 0,
      roundTripCost: returnInfo.round_trip_cost || 0,
    },
    categoryIds: data.category_ids || [],
  };
};

export interface GetProductDetailProps {
  productCode: number;
  accessToken?: string;
  userAgent?: string;
  joinCode?: string;
  isInternal?: boolean;
}

export const getProductDetail = async ({
  productCode,
  accessToken = '',
  userAgent = '',
  joinCode = '',
  isInternal = false,
}: GetProductDetailProps): Promise<ProductProps> => {
  const { data, meta } = await fetchProductDetail({
    productCode,
    accessToken,
    userAgent,
    joinCode,
    isInternal,
  });

  return createProductDetailData(data, meta);
};

export interface ProductReview {
  no: number;
  subject: string;
  userName: string;
  userGrade: Grade;
  type: number;
  isAttach: boolean;
  regDate: number;
  expanded: boolean;
}

interface PickedProduct {
  isPicked: boolean;
}

export const getIsPickedProduct = async ({ productNo }: { productNo: number }): Promise<PickedProduct> => {
  const res = await fetchPickedProduct({ productNo });
  return {
    isPicked: res.is_picked,
  };
};

interface GiftDeliveryNotice {
  startDay: string;
  endDay: string;
}

export const getGiftDeliveryNoticeItem = async (): Promise<GiftDeliveryNotice> => {
  try {
    const res = await getFile<GiftDeliveryNotice>(GIFT_DELIVERY_NOTICE[ENVIRONMENT]);

    return res;
  } catch (error) {
    return { startDay: '', endDay: '' };
  }
};

export type AdProductItem = {
  _id: string;
  _position: number;
  _productDetailUrl: string;
  _deliveryTypeNames: string[];
  no: number;
  name: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  discountedPrice: any;
  discountRate: number;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  deliveryTypeInfos: {
    type: string;
    description: string;
  }[];
  stickersV2: StickerList;
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
};

export type AdProductItemList = AdProductItem[];

export type ClickedTogetherItem = {
  _id: string;
  _position: number;
  _productDetailUrl: string;
  _deliveryTypeNames: string[];
  no: number;
  name: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  discountedPrice?: number;
  discountRate: number;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  deliveryTypeInfos: {
    type: string;
    description: string;
  }[];
  stickersV2: StickerList;
};

export type ClickedTogetherItemList = ClickedTogetherItem[];

export type GetRecommendProducts = {
  adProducts: AdProductItemList;
  clickedTogethers: {
    items: ClickedTogetherItemList;
    selectionPolicy: string;
  };
};

const MIN_RECOMMEND_PRODUCT_COUNT = 3;

// NOTE: 광고 / 추천 상품은 3개 이상 노출
const checkValidRecommendProductCount = (count: number) => count >= MIN_RECOMMEND_PRODUCT_COUNT;

const parseRecommendAdProducts = (
  products: FetchRecommendProductsResponse['data']['adProducts'],
): AdProductItemList => {
  const productCount = size(products);
  if (checkValidRecommendProductCount(productCount)) {
    return products.map((product, i) => ({
      ...product,
      _id: nanoid(),
      _position: i + 1,
      _productDetailUrl: `/goods/${product.no}`,
      _deliveryTypeNames: map(product.deliveryTypeInfos, (item) => get(item, 'description')),
      stickersV2: transformSnakeCaseStickerList(product.stickersV2),
    }));
  }
  return [];
};

const parseRecommendClickedTogethers = (
  products: FetchRecommendProductsResponse['data']['clickedTogethers']['items'],
): ClickedTogetherItemList => {
  const productCount = size(products);
  if (checkValidRecommendProductCount(productCount)) {
    return products.map((product, i) => ({
      ...product,
      _id: nanoid(),
      _position: i + 1,
      _productDetailUrl: `/goods/${product.no}`,
      _deliveryTypeNames: map(product.deliveryTypeInfos, (item) => get(item, 'description')),
      stickersV2: transformSnakeCaseStickerList(product.stickersV2),
    }));
  }
  return [];
};

export const getRecommendProducts = async (productNo: number): Promise<GetRecommendProducts> => {
  const { data } = await fetchRecommendProducts({
    productNo,
    adPageId: amplitudeService.getScreenName(),
    adDeviceId: amplitudeService.getDeviceId(),
  });
  return {
    adProducts: parseRecommendAdProducts(get(data, 'adProducts')),
    clickedTogethers: {
      items: parseRecommendClickedTogethers(get(data, 'clickedTogethers.items')),
      selectionPolicy: data.clickedTogethers.selectionPolicy || '',
    },
  };
};
