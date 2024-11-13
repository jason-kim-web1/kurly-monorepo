import { format } from 'date-fns';

import { CART_SOLD_OUT } from '../CartSoldOutType';
import { CART_PRODUCT_POINT_POLICY } from '../CartProductPointPolicyType';
import { CART_DELIVERY_PRICE } from '../CartDeliveryPriceType';
import { CART_NORMAL_ORDER_TYPE_POLICY_IN_CONTENTS } from '../CartNormalOrderTypePolicyInContentsType';
import { CART_DELIVERY_TYPE } from '../CartDeliveryType';
import { CART_PRODUCT_ORDER_STATUS } from '../CartProductOrderType';
import { CART_STORAGE_GROUP_TYPE } from '../StorageGroupType';
import { CART_STORAGE_TYPE, CartStorageType } from '../StorageType';
import { KurlyDeliveryListType, PartnerDeliveryType } from '../../interface/Cart';

const CART_TAG_NAME_TYPE = {
  AMBIENT_TEMPERATURE: '상온', // 상온
  COLD: '냉장', // 냉장
  FROZEN: '냉동', // 냉동
} as const;

type CartTagNameType = typeof CART_TAG_NAME_TYPE[keyof typeof CART_TAG_NAME_TYPE];

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomThousand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
};

const getRandomDate = () => {
  const startDate = new Date(2024, 0, 1); // 2024년 1월 1일
  const endDate = new Date(2024, 11, 31); // 2024년 12월 31일
  const diffTime = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * diffTime + startDate.getTime();
  const randomDate = new Date(randomTime);
  return format(randomDate, "yyyy-MM-dd'T'HH:mm:ss");
};

export const generateCartProduct = (key: string, count: number, storageType: CartStorageType) => {
  let tagName: CartTagNameType = CART_TAG_NAME_TYPE.FROZEN;
  if (storageType === CART_STORAGE_TYPE.AMBIENT_TEMPERATURE) {
    tagName = CART_TAG_NAME_TYPE.AMBIENT_TEMPERATURE;
  } else if (storageType === CART_STORAGE_TYPE.COLD) {
    tagName = CART_TAG_NAME_TYPE.COLD;
  }

  return Array.from({ length: count }).map((_, index) => ({
    masterProductName: `master-${key}-${index}`,
    masterProductCode: `M${generateRandomNumber(1000000000, 9999999999)}`,
    masterProductNo: generateRandomNumber(1000000000, 9999999999),
    dealProductName: `deal-${key}-${index}`,
    dealProductCode: `D${generateRandomNumber(1000000000, 9999999999)}`,
    dealProductNo: generateRandomNumber(1000000000, 9999999999),
    contentsProductName: `contents-${key}-${index}`,
    contentsProductCode: `C${generateRandomNumber(1000000000, 9999999999)}`,
    contentsProductNo: generateRandomNumber(1000000000, 9999999999),
    imageUrl: 'https://product-image-dev.kurly.com/product/image/c24b165a-b419-4df8-96bd-744776b17e3a.png',
    productVerticalSmallUrl:
      'https://product-image-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/product/image/c24b165a-b419-4df8-96bd-744776b17e3a.png',
    quantity: generateRandomNumber(1, 10),
    productPrice: generateRandomThousand(1, 10),
    discountPrice: 0,
    retailPrice: 0,
    minQuantity: 1,
    maxQuantity: null,
    minQuantityInContents: 1,
    maxQuantityInContents: null,
    salesUnit: 1,
    storageType,
    tagNames: [tagName],
    isSoldOut: false,
    isNotEnoughStock: false,
    soldOutText: '',
    soldOutType: CART_SOLD_OUT.COMING_SOON,
    pointPolicy: CART_PRODUCT_POINT_POLICY.MEMBER,
    deliveryPriceType: CART_DELIVERY_PRICE.PAY,
    createdAt: getRandomDate(),
    normalOrderTypePolicyInContents: CART_NORMAL_ORDER_TYPE_POLICY_IN_CONTENTS.DEFAULT,
    deliveryTypeInfos: [
      {
        deliveryType: CART_DELIVERY_TYPE.DAWN,
        isDeliveryProduct: false,
      },
    ],
    voucher: null,
    order: {
      status: CART_PRODUCT_ORDER_STATUS.AVAILABLE,
      unavailableTypes: [],
    },
    displayMessage: {
      buyableTarget: {
        text: '컬리멤버스, 라벤더, 더퍼플 전용상품',
        basicStyle: {
          color: '#5F0080',
          bold: false,
        },
        replaceStyles: [
          {
            text: '',
            color: '',
            bold: false,
          },
        ],
      },
    },
    membershipLabels: [],
    isKurlyFulfillment: false,
  }));
};

export const generateMockKurlyDelivery = ({
  ambientCount,
  coldCount,
  frozenCount,
}: {
  ambientCount: number;
  coldCount: number;
  frozenCount: number;
}) => {
  const totalProductCount = ambientCount + coldCount + frozenCount;

  const storageTypes = [];
  if (ambientCount > 0) {
    storageTypes.push({
      displayName: '상온 상품',
      groupType: CART_STORAGE_GROUP_TYPE.AMBIENT_TEMPERATURE,
      productCount: ambientCount,
      products: generateCartProduct(
        CART_TAG_NAME_TYPE.AMBIENT_TEMPERATURE,
        ambientCount,
        CART_STORAGE_TYPE.AMBIENT_TEMPERATURE,
      ),
    });
  }

  if (coldCount > 0) {
    storageTypes.push({
      displayName: '냉장 상품',
      groupType: CART_STORAGE_GROUP_TYPE.COLD,
      productCount: coldCount,
      products: generateCartProduct(CART_TAG_NAME_TYPE.COLD, coldCount, CART_STORAGE_TYPE.COLD),
    });
  }

  if (frozenCount > 0) {
    storageTypes.push({
      displayName: '냉동 상품',
      groupType: CART_STORAGE_GROUP_TYPE.FROZEN,
      productCount: frozenCount,
      products: generateCartProduct(CART_TAG_NAME_TYPE.FROZEN, frozenCount, CART_STORAGE_TYPE.FROZEN),
    });
  }

  return {
    displayName: '샛별배송',
    productCount: totalProductCount,
    deliveryPricePolicy: {
      deliveryPrice: 3000,
      deliveryPriceFreeCriteria: 40000,
      deliveryPriceFreeReasonType: null,
      deliveryPriceFreeReasonName: null,
    },
    storageTypes,
  };
};

export const generateMockPartners = ({ type, partnerCount }: { type: string; partnerCount: number }) => {
  return Array.from({ length: partnerCount }).map((_, index) => {
    const idx = index + 1;
    const productCount = 1;

    return {
      displayName: `파트너${idx}-${type}`,
      partnerId: `파트너${idx}-${generateRandomNumber(1000, 9999999999)}`,
      partnerName: `파트너${idx}-name`,
      deliveryPricePolicy: {
        deliveryPrice: 0,
        deliveryPriceFreeCriteria: 0,
        deliveryPriceFreeReasonType: null,
        deliveryPriceFreeReasonName: null,
      },
      productCount,
      products: generateCartProduct(CART_TAG_NAME_TYPE.AMBIENT_TEMPERATURE, productCount, CART_STORAGE_TYPE.COLD),
    };
  });
};

export const generatorCartDetailMockData = ({
  count,
}: {
  count: {
    cold: number;
    ambient: number;
    frozen: number;
    domestic: number;
    international: number;
  };
}) => {
  const totalCount = Object.values(count).reduce((acc, cur) => acc + cur, 0);

  const kurlyDelivery: KurlyDeliveryListType = generateMockKurlyDelivery({
    coldCount: count.cold,
    ambientCount: count.ambient,
    frozenCount: count.frozen,
  });
  const partnerDomesticDelivery: PartnerDeliveryType = {
    displayName: '판매자배송',
    productCount: count.domestic,
    partners: generateMockPartners({ type: '판매자국내', partnerCount: count.domestic }),
  };
  const partnerInternationalDelivery: PartnerDeliveryType = {
    displayName: '해외직배송',
    productCount: count.international,
    partners: generateMockPartners({ type: '판매자해외', partnerCount: count.international }),
  };

  return {
    meta: {
      legacyCouponMessage: '',
      isEarlyBird: true,
      activatedContinuity: false,
    },
    totalCount,
    displayMessage: {
      deliveryNotice: {
        text: '',
      },
    },
    kurlyDelivery,
    partnerDomesticDelivery,
    partnerInternationalDelivery,
    unavailableOrders: null,
  };
};
