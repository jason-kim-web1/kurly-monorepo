import CartDetailResponse from '../../interface/Cart';
import { CartProduct } from '../../interface/CartProduct';
import { CART_DELIVERY_TYPE } from '../CartDeliveryType';
import { CART_PRODUCT_ORDER_STATUS, CART_PRODUCT_ORDER_UNAVAILABLE } from '../CartProductOrderType';
import { CART_STORAGE_TYPE } from '../StorageType';

export const KurlyDeliveryColdProduct: CartProduct = {
  masterProductName: '현아-마스터-등록test-240207-9',
  masterProductCode: 'M00000028217',
  masterProductNo: 1000062516,
  dealProductName: '합주문test-현아-1p-컬리배송-딜1',
  dealProductCode: 'D00000034253',
  dealProductNo: 1000065168,
  contentsProductName: '합주문test-현아-1p-컬리배송',
  contentsProductCode: 'C00000016046',
  contentsProductNo: 1000065169,
  imageUrl: 'https://product-image-dev.kurly.com/product/image/c24b165a-b419-4df8-96bd-744776b17e3a.png',
  productVerticalSmallUrl:
    'https://product-image-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/product/image/c24b165a-b419-4df8-96bd-744776b17e3a.png',
  quantity: 2,
  productPrice: 1000,
  discountPrice: 100,
  retailPrice: 1000,
  minQuantity: 1,
  maxQuantity: null,
  minQuantityInContents: 1,
  maxQuantityInContents: null,
  salesUnit: 1,
  storageType: 'COLD',
  tagNames: ['냉장'],
  isNotEnoughStock: true,
  soldOutText: '',
  soldOutType: 'COMING_SOON',
  pointPolicy: 'MEMBER',
  deliveryPriceType: 'PAY',
  createdAt: '2024-05-14T09:37:41',
  normalOrderTypePolicyInContents: 'DEFAULT',
  deliveryTypeInfos: [
    {
      deliveryType: 'DAWN',
      isDeliveryProduct: false,
    },
  ],
  voucher: null,
  order: {
    status: 'AVAILABLE',
    unavailableTypes: [],
  },
  displayMessage: {
    buyableTarget: {
      text: '[LG전자] 임직원 전용 상품',
      basicStyle: {
        color: '',
        bold: true,
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
  membershipLabels: [
    {
      text: '멤버스',
      textColor: '#FFFFFF',
      backgroundColor: '#4DBED7',
      borderColor: '#4DBED7',
    },
    {
      text: '퍼플 이상',
      textColor: '#5F0080',
      backgroundColor: '#FFFFFF',
      borderColor: '#5F0080',
    },
  ],
  isKurlyFulfillment: true,
};

export const KurlyDeliveryAmbientProduct1: CartProduct = {
  masterProductName: '[생미쉘] 마들렝 250g',
  masterProductCode: 'MK0000055815',
  masterProductNo: 1055815,
  dealProductName: '[생미쉘] 마들렝 250g',
  dealProductCode: 'D00010055815',
  dealProductNo: 10055815,
  contentsProductName: '[생미쉘] 마들렝 250g',
  contentsProductCode: 'MK0000055815',
  contentsProductNo: 5055815,
  imageUrl: 'https://img-cf.kurly.com/shop/data/goods/15953977209l0.jpg',
  productVerticalSmallUrl:
    'https://img-cf.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/shop/data/goods/15953977209l0.jpg',
  quantity: 1,
  productPrice: 4380,
  discountPrice: 0,
  retailPrice: 0,
  minQuantity: 1,
  maxQuantity: null,
  minQuantityInContents: 1,
  maxQuantityInContents: null,
  salesUnit: 1,
  storageType: 'AMBIENT_TEMPERATURE',
  tagNames: ['상온'],
  isNotEnoughStock: false,
  soldOutText: '',
  soldOutType: 'COMING_SOON',
  pointPolicy: 'MEMBER',
  deliveryPriceType: 'PAY',
  createdAt: '2024-05-14T09:53:59',
  normalOrderTypePolicyInContents: 'DEFAULT',
  deliveryTypeInfos: [
    {
      deliveryType: 'DAWN',
      isDeliveryProduct: false,
    },
  ],
  voucher: null,
  order: {
    status: 'AVAILABLE',
    unavailableTypes: [],
  },
  displayMessage: {
    buyableTarget: {
      text: '',
      basicStyle: {
        color: '',
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
  isKurlyFulfillment: true,
};

export const KurlyDeliveryAmbientProduct2: CartProduct = {
  masterProductName: '합주문test-현아-fbk-딜1',
  masterProductCode: 'M00000029118',
  masterProductNo: 1000065170,
  dealProductName: '합주문test-현아-fbk-딜1',
  dealProductCode: 'D00000034254',
  dealProductNo: 1000065171,
  contentsProductName: '합주문test-현아-fbk',
  contentsProductCode: 'C00000016047',
  contentsProductNo: 1000065172,
  imageUrl: 'https://third-party-file-dev.kurly.com/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
  productVerticalSmallUrl:
    'https://third-party-file-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
  quantity: 2,
  productPrice: 100,
  discountPrice: 0,
  retailPrice: 100,
  minQuantity: 1,
  maxQuantity: 999999999,
  minQuantityInContents: 1,
  maxQuantityInContents: 999999999,
  salesUnit: 1,
  storageType: 'AMBIENT_TEMPERATURE',
  tagNames: ['상온'],
  isNotEnoughStock: false,
  soldOutText: '',
  soldOutType: 'COMING_SOON',
  pointPolicy: 'EXCLUDE',
  deliveryPriceType: 'PAY',
  createdAt: '2024-05-14T09:53:06',
  normalOrderTypePolicyInContents: 'DEFAULT',
  deliveryTypeInfos: [
    {
      deliveryType: CART_DELIVERY_TYPE.DAWN,
      isDeliveryProduct: false,
    },
  ],
  voucher: null,
  order: {
    status: 'AVAILABLE',
    unavailableTypes: [],
  },
  displayMessage: {
    buyableTarget: {
      text: '',
      basicStyle: {
        color: '',
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
  isKurlyFulfillment: true,
};

export const KurlyDeliveryFrozenProduct: CartProduct = {
  masterProductName: '현아-마스터-등록test-240207-9',
  masterProductCode: 'M00000028217',
  masterProductNo: 1000062516,
  dealProductName: '합주문test-현아-1p-컬리배송-딜1',
  dealProductCode: 'D00000034253',
  dealProductNo: 1000065169,
  contentsProductName: '합주문test-현아-1p-컬리배송',
  contentsProductCode: 'C00000016046',
  contentsProductNo: 1000065169,
  imageUrl: 'https://product-image-dev.kurly.com/product/image/c24b165a-b419-4df8-96bd-744776b17e3a.png',
  productVerticalSmallUrl:
    'https://product-image-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/product/image/c24b165a-b419-4df8-96bd-744776b17e3a.png',
  quantity: 2,
  productPrice: 1000,
  discountPrice: 0,
  retailPrice: 1000,
  minQuantity: 1,
  maxQuantity: null,
  minQuantityInContents: 1,
  maxQuantityInContents: null,
  salesUnit: 1,
  storageType: 'COLD',
  tagNames: ['냉동'],
  isNotEnoughStock: false,
  soldOutText: '',
  soldOutType: 'COMING_SOON',
  pointPolicy: 'MEMBER',
  deliveryPriceType: 'PAY',
  createdAt: '2024-05-14T09:37:41',
  normalOrderTypePolicyInContents: 'DEFAULT',
  deliveryTypeInfos: [
    {
      deliveryType: CART_DELIVERY_TYPE.DAWN,
      isDeliveryProduct: false,
    },
  ],
  voucher: null,
  order: {
    status: 'AVAILABLE',
    unavailableTypes: [],
  },
  displayMessage: {
    buyableTarget: {
      text: '',
      basicStyle: {
        color: '',
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
  membershipLabels: [
    {
      text: '멤버스',
      textColor: '#FFFFFF',
      backgroundColor: '#4DBED7',
      borderColor: '#4DBED7',
    },
    {
      text: '퍼플 이상',
      textColor: '#5F0080',
      backgroundColor: '#FFFFFF',
      borderColor: '#5F0080',
    },
  ],
  isKurlyFulfillment: true,
};

export const KurlyDeliveryProducts = [
  KurlyDeliveryColdProduct,
  KurlyDeliveryAmbientProduct1,
  KurlyDeliveryAmbientProduct2,
  KurlyDeliveryFrozenProduct,
];

export const PartnerDeliveryDomesticProduct: CartProduct = {
  masterProductName: '합주문test-현아-3p-판매자배송-딜1',
  masterProductCode: 'M00000029120',
  masterProductNo: 1000065176,
  dealProductName: '합주문test-현아-3p-판매자배송-딜1',
  dealProductCode: 'D00000034256',
  dealProductNo: 1000065177,
  contentsProductName: '합주문test-현아-3p-판매자배송-1',
  contentsProductCode: 'C00000016049',
  contentsProductNo: 1000065178,
  imageUrl: 'https://third-party-file-dev.kurly.com/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
  productVerticalSmallUrl:
    'https://third-party-file-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
  quantity: 2,
  productPrice: 100,
  discountPrice: 0,
  retailPrice: 100,
  minQuantity: 1,
  maxQuantity: 999999999,
  minQuantityInContents: 1,
  maxQuantityInContents: 999999999,
  salesUnit: 1,
  storageType: 'AMBIENT_TEMPERATURE',
  tagNames: [],
  isNotEnoughStock: false,
  soldOutText: '',
  soldOutType: 'COMING_SOON',
  pointPolicy: 'EXCLUDE',
  deliveryPriceType: 'PAY',
  createdAt: '2024-05-14T09:29:50',
  normalOrderTypePolicyInContents: 'DEFAULT',
  deliveryTypeInfos: [
    {
      deliveryType: CART_DELIVERY_TYPE.DAWN,
      isDeliveryProduct: false,
    },
  ],
  voucher: null,
  order: {
    status: 'AVAILABLE',
    unavailableTypes: [],
  },
  displayMessage: {
    buyableTarget: {
      text: '',
      basicStyle: {
        color: '',
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
};

export const PartnerDeliveryInternationalProduct: CartProduct = {
  masterProductName: '합주문test-현아-3p-해외직배송-딜1',
  masterProductCode: 'M00000029119',
  masterProductNo: 1000065173,
  dealProductName: '합주문test-현아-3p-해외직배송-B-딜',
  dealProductCode: 'D00000034255',
  dealProductNo: 1000065174,
  contentsProductName: '합주문test-현아-3p-해외직배송-B',
  contentsProductCode: 'C00000016048',
  contentsProductNo: 1000065175,
  imageUrl: 'https://third-party-file-dev.kurly.com/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
  productVerticalSmallUrl:
    'https://third-party-file-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
  quantity: 2,
  productPrice: 100,
  discountPrice: 0,
  retailPrice: 100,
  minQuantity: 1,
  maxQuantity: 999999999,
  minQuantityInContents: 1,
  maxQuantityInContents: 999999999,
  salesUnit: 1,
  storageType: 'AMBIENT_TEMPERATURE',
  tagNames: [],
  isNotEnoughStock: false,
  soldOutText: '',
  soldOutType: 'COMING_SOON',
  pointPolicy: 'EXCLUDE',
  deliveryPriceType: 'PAY',
  createdAt: '2024-05-14T09:30:21',
  normalOrderTypePolicyInContents: 'DEFAULT',
  deliveryTypeInfos: [
    {
      deliveryType: CART_DELIVERY_TYPE.DAWN,
      isDeliveryProduct: false,
    },
  ],
  voucher: null,
  order: {
    status: 'AVAILABLE',
    unavailableTypes: [],
  },
  displayMessage: {
    buyableTarget: {
      text: '',
      basicStyle: {
        color: '',
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
};

export const UnavailableOrderProducts: CartProduct[] = [
  {
    masterProductName: '합주문test-현아-fbk-2-딜1',
    masterProductCode: 'M00000029123',
    masterProductNo: 1000065185,
    dealProductName: '합주문test-현아-fbk-2-딜1',
    dealProductCode: 'D00000034259',
    dealProductNo: 1000065186,
    contentsProductName: '합주문test-현아-fbk-2',
    contentsProductCode: 'C00000016052',
    contentsProductNo: 1000065187,
    imageUrl: 'https://third-party-file-dev.kurly.com/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
    productVerticalSmallUrl:
      'https://third-party-file-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/files/20230424/cfeb0bb3-2595-4a37-a121-6667b5645675.jpeg',
    quantity: 2,
    productPrice: 100,
    discountPrice: 0,
    retailPrice: 100,
    minQuantity: 1,
    maxQuantity: 999999999,
    minQuantityInContents: 1,
    maxQuantityInContents: 999999999,
    salesUnit: 1,
    storageType: 'AMBIENT_TEMPERATURE',
    tagNames: [],
    isNotEnoughStock: false,
    soldOutText: '',
    soldOutType: 'COMING_SOON',
    pointPolicy: 'EXCLUDE',
    deliveryPriceType: 'PAY',
    createdAt: '2024-05-14T09:53:27',
    normalOrderTypePolicyInContents: 'DEFAULT',
    deliveryTypeInfos: [
      {
        deliveryType: CART_DELIVERY_TYPE.DAWN,
        isDeliveryProduct: false,
      },
    ],
    voucher: null,
    order: {
      status: 'UNAVAILABLE',
      unavailableTypes: ['SOLD_OUT'],
    },
    displayMessage: {
      buyableTarget: {
        text: '',
        basicStyle: {
          color: '',
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
    isKurlyFulfillment: true,
  },
  {
    masterProductName: '승진 해외직배송 테스트2 복사등록2 (S)',
    masterProductCode: 'M00000028897',
    masterProductNo: 1000064972,
    dealProductName: '승진 해외직배송 테스트2 복사등록2 (S)',
    dealProductCode: 'D00000034204',
    dealProductNo: 1000064973,
    contentsProductName: '승진 해외직배송 테스트2 복사등록2',
    contentsProductCode: 'C00000016012',
    contentsProductNo: 1000064975,
    imageUrl:
      'https://third-party-file-dev.kurly.com/files/b1fd9931-2c7c-464d-b252-8e281f6ee492/77a2bcf6-c4b4-4006-880a-147ef07ffb21.png',
    productVerticalSmallUrl:
      'https://third-party-file-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/files/b1fd9931-2c7c-464d-b252-8e281f6ee492/77a2bcf6-c4b4-4006-880a-147ef07ffb21.png',
    quantity: 2,
    productPrice: 1200,
    discountPrice: 0,
    retailPrice: 1230,
    minQuantity: 1,
    maxQuantity: null,
    minQuantityInContents: 1,
    maxQuantityInContents: null,
    salesUnit: 1,
    storageType: 'AMBIENT_TEMPERATURE',
    tagNames: [],
    isNotEnoughStock: false,
    soldOutText: '매주 수요일 24시 이후 입고 예정',
    soldOutType: 'COMING_SOON',
    pointPolicy: 'EXCLUDE',
    deliveryPriceType: 'FREE',
    createdAt: '2024-05-14T09:29:30',
    normalOrderTypePolicyInContents: 'DEFAULT',
    deliveryTypeInfos: [
      {
        deliveryType: CART_DELIVERY_TYPE.DAWN,
        isDeliveryProduct: false,
      },
    ],
    voucher: null,
    order: {
      status: 'UNAVAILABLE',
      unavailableTypes: ['NOT_CART_ITEM'],
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
  },
  {
    masterProductName: '멀티딜테스트 (S)',
    masterProductCode: 'M00000029106',
    masterProductNo: 1000065097,
    dealProductName: '멀티딜테스트 (S)',
    dealProductCode: 'D00000034215',
    dealProductNo: 1000065099,
    contentsProductName: '멀티딜테스트',
    contentsProductCode: 'C00000016019',
    contentsProductNo: 1000065101,
    imageUrl:
      'https://third-party-file-dev.kurly.com/files/b1fd9931-2c7c-464d-b252-8e281f6ee492/77a2bcf6-c4b4-4006-880a-147ef07ffb21.png',
    productVerticalSmallUrl:
      'https://third-party-file-dev.kurly.com/cdn-cgi/image/width=120,height=156,fit=crop,quality=85/files/b1fd9931-2c7c-464d-b252-8e281f6ee492/77a2bcf6-c4b4-4006-880a-147ef07ffb21.png',
    quantity: 2,
    productPrice: 100,
    discountPrice: 0,
    retailPrice: 100,
    minQuantity: 1,
    maxQuantity: null,
    minQuantityInContents: 1,
    maxQuantityInContents: null,
    salesUnit: 1,
    storageType: 'AMBIENT_TEMPERATURE',
    tagNames: [],
    isNotEnoughStock: false,
    soldOutText: '매주 수요일 24시 이후 입고 예정',
    soldOutType: 'COMING_SOON',
    pointPolicy: 'EXCLUDE',
    deliveryPriceType: 'FREE',
    createdAt: '2024-05-13T16:45:52',
    normalOrderTypePolicyInContents: 'DEFAULT',
    deliveryTypeInfos: [
      {
        deliveryType: CART_DELIVERY_TYPE.DAWN,
        isDeliveryProduct: false,
      },
    ],
    voucher: null,
    order: {
      status: 'UNAVAILABLE',
      unavailableTypes: ['NOT_CART_ITEM'],
    },
    displayMessage: {
      buyableTarget: {
        text: '컬리멤버스, 라벤더, 더퍼플 전용상품',
        basicStyle: {
          color: '',
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
  },
];

export const CART_DETAIL_RESPONSE: CartDetailResponse = {
  meta: {
    legacyCouponMessage: '',
    isEarlyBird: true,
    activatedContinuity: false,
  },
  totalCount: 11,
  displayMessage: {
    deliveryNotice: {
      text: '',
    },
  },
  kurlyDelivery: {
    displayName: '샛별배송',
    productCount: 4,
    deliveryPricePolicy: {
      deliveryPrice: 3000,
      deliveryPriceFreeCriteria: 40000,
      deliveryPriceFreeReasonType: null,
      deliveryPriceFreeReasonName: null,
      deliveryPriceFreeMessage: null,
      isShowProgressBar: false,
    },
    storageTypes: [
      {
        displayName: '냉장 상품',
        groupType: 'COLD',
        productCount: 1,
        products: [KurlyDeliveryColdProduct],
      },
      {
        displayName: '상온 상품',
        groupType: 'AMBIENT_TEMPERATURE',
        productCount: 2,
        products: [KurlyDeliveryAmbientProduct1, KurlyDeliveryAmbientProduct2],
      },
      {
        displayName: '냉동 상품',
        groupType: 'FROZEN',
        productCount: 1,
        products: [KurlyDeliveryFrozenProduct],
      },
    ],
  },
  partnerDomesticDelivery: {
    displayName: '판매자배송',
    productCount: 1,
    partners: [
      {
        displayName: '주식회사 카카오게임즈',
        partnerId: 'f32f7917-a73d-4368-bf46-bb9a3b70d231',
        partnerName: '주식회사 카카오게임즈',
        deliveryPricePolicy: {
          deliveryPrice: 0,
          deliveryPriceFreeCriteria: 0,
          deliveryPriceFreeReasonType: null,
          deliveryPriceFreeReasonName: null,
          deliveryPriceFreeMessage: null,
          isShowProgressBar: false,
        },
        productCount: 1,
        products: [PartnerDeliveryDomesticProduct],
      },
    ],
  },
  partnerInternationalDelivery: {
    displayName: '해외직배송',
    productCount: 1,
    partners: [
      {
        displayName: '주식회사 카카오게임즈',
        partnerId: 'f32f7917-a73d-4368-bf46-bb9a3b70d231',
        partnerName: '주식회사 카카오게임즈',
        deliveryPricePolicy: {
          deliveryPrice: 0,
          deliveryPriceFreeCriteria: 0,
          deliveryPriceFreeReasonType: null,
          deliveryPriceFreeReasonName: null,
          deliveryPriceFreeMessage: null,
          isShowProgressBar: false,
        },
        productCount: 1,
        products: [PartnerDeliveryInternationalProduct],
      },
    ],
  },
  unavailableOrders: {
    displayName: '품절/구매불가',
    productCount: 5,
    products: UnavailableOrderProducts,
  },
};

export const soldOutCartProduct: CartProduct = {
  ...KurlyDeliveryColdProduct,
  soldOutText: '매주 수요일 24시 이후 입고 예정',
  storageType: CART_STORAGE_TYPE.AMBIENT_TEMPERATURE,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT],
  },
};

export const notPurchasableCartProduct: CartProduct = {
  ...KurlyDeliveryColdProduct,
  soldOutText: '',
  storageType: CART_STORAGE_TYPE.AMBIENT_TEMPERATURE,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.INCORRECT_DELIVERY_TYPE],
  },
};

export const membersOnlyCartProduct: CartProduct = {
  ...KurlyDeliveryColdProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SUBSCRIBED],
  },
  displayMessage: {
    buyableTarget: {
      basicStyle: {
        color: '#000000',
        bold: false,
      },
      replaceStyles: [],
      text: '멤버스 전용 상품',
    },
  },
  membershipLabels: [
    {
      backgroundColor: '#4DBED7',
      borderColor: '#4DBED7',
      text: '멤버스',
      textColor: '#111111',
    },
  ],
};

export const vipOnlyCartProduct: CartProduct = {
  ...KurlyDeliveryColdProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VIP],
  },
  displayMessage: {
    buyableTarget: {
      basicStyle: {
        color: '#000000',
        bold: false,
      },
      replaceStyles: [],
      text: 'VIP 전용 상품',
    },
  },
  membershipLabels: [
    {
      backgroundColor: '#4DBED7',
      borderColor: '#4DBED7',
      text: 'VIP',
      textColor: '#111111',
    },
  ],
};

export const membersAndSoldoutCartProduct: CartProduct = {
  ...membersOnlyCartProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SUBSCRIBED, CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT],
  },
};

export const vipAndSoldoutCartProduct: CartProduct = {
  ...vipOnlyCartProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VIP, CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT],
  },
};

export const vvipAndSoldoutCartProduct: CartProduct = {
  ...vipOnlyCartProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VVIP, CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT],
  },
};

export const onlySpecificUserCartProduct: CartProduct = {
  ...vipOnlyCartProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SUBSCRIBED,
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VIP,
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VVIP,
    ],
  },
};

export const specificUserAndSoldOutCartProduct: CartProduct = {
  ...vipOnlyCartProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SUBSCRIBED,
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VIP,
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VVIP,
      CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT,
    ],
  },
};

export const membersAndNotPurchaseCartProduct: CartProduct = {
  ...membersOnlyCartProduct,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_LOVERS,
      CART_PRODUCT_ORDER_UNAVAILABLE.INCORRECT_DELIVERY_TYPE,
    ],
  },
  displayMessage: {
    buyableTarget: {
      basicStyle: {
        color: '#000000',
        bold: false,
      },
      replaceStyles: [],
      text: '러버스 전용 상품',
    },
  },
  membershipLabels: [
    {
      text: '러버스',
      textColor: '#111111',
      backgroundColor: '#FFFFFF',
      borderColor: '#5F0080',
    },
  ],
};

export const notPurchasableAndSoldout: CartProduct = {
  ...KurlyDeliveryColdProduct,
  soldOutText: '매주 수요일 24시 이후 입고 예정',
  storageType: CART_STORAGE_TYPE.AMBIENT_TEMPERATURE,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT, CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SHOWN],
  },
};

export const membersAndSoldoutAndNotPurchasable: CartProduct = {
  ...KurlyDeliveryColdProduct,
  soldOutText: '매주 수요일 24시 이후 입고 예정',
  storageType: CART_STORAGE_TYPE.AMBIENT_TEMPERATURE,
  order: {
    status: CART_PRODUCT_ORDER_STATUS.UNAVAILABLE,
    unavailableTypes: [
      CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT,
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SHOWN,
      CART_PRODUCT_ORDER_UNAVAILABLE.NOT_LOVERS,
    ],
  },
  displayMessage: {
    buyableTarget: {
      basicStyle: {
        color: '#000000',
        bold: false,
      },
      replaceStyles: [],
      text: '러버스 전용 상품',
    },
  },
  membershipLabels: [
    {
      text: '러버스',
      textColor: '#111111',
      backgroundColor: '#FFFFFF',
      borderColor: '#5F0080',
    },
  ],
};

export const EMPTY_CART_DETAIL_RESPONSE: CartDetailResponse = {
  meta: {
    legacyCouponMessage: '',
    isEarlyBird: true,
    activatedContinuity: false,
  },
  totalCount: 0,
  displayMessage: {
    deliveryNotice: {
      text: '',
    },
  },
  kurlyDelivery: null,
  partnerDomesticDelivery: null,
  partnerInternationalDelivery: null,
  unavailableOrders: null,
};
