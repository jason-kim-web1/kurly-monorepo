import type { ProductImageMetaData } from '../types';

export enum Platform {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

export enum ProductImageType {
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  PRODUCT_LIST_ITEM = 'PRODUCT_LIST_ITEM',
  MAIN_PRODUCT_LIST_ITEM = 'MAIN_PRODUCT_LIST_ITEM',
  MAIN_COLLECTION_PRODUCT_NUMBER_LIST_ITEM = 'MAIN_COLLECTION_PRODUCT_NUMBER_LIST_ITEM',
  MAIN_SPECIAL_DEAL_ITEM = 'MAIN_SPECIAL_DEAL_ITEM',
  MAIN_SPECIAL_DEAL_ITEM_1 = 'MAIN_SPECIAL_DEAL_ITEM_1',
  MAIN_SPECIAL_DEAL_ITEM_2 = 'MAIN_SPECIAL_DEAL_ITEM_2',
  MAIN_SPECIAL_DEAL_ITEM_3 = 'MAIN_SPECIAL_DEAL_ITEM_3',
  MAIN_MD_CHOICE_ITEM = 'MAIN_MD_CHOICE_ITEM',
  MAIN_RANDOM_COLLECTION_ARTICLE_ITEM = 'MAIN_RANDOM_COLLECTION_ARTICLE_ITEM',
  MAIN_RANDOM_COLLECTION_NUMBER_ITEM = 'MAIN_RANDOM_COLLECTION_NUMBER_ITEM',
  PRODUCT_DETAIL_RECOMMEND_ITEM = 'PRODUCT_DETAIL_RECOMMEND_ITEM',
}

const BASE_DESKTOP_LIST_ITEM_META: ProductImageMetaData = {
  width: 249,
  height: 320,
  topLeftTextSticker: {
    position: {
      top: 8,
      left: 8,
    },
    padding: {
      x: 8,
      y: 6,
    },
    fontStyle: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '19px',
    },
  },
  bottomCenterTextSticker: {
    padding: {
      x: 0,
      y: 8,
    },
    fontStyle: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '21px',
    },
  },
  bottomRightImageSticker: {
    width: 125,
    height: 125,
  },
  bottomLeftImageSticker: {
    width: 125,
    height: 125,
  },
};

const BASE_MOBILE_MAIN_LIST_ITEM_META: ProductImageMetaData = {
  width: 150,
  height: 195,
  topLeftTextSticker: {
    position: {
      top: 8,
      left: 8,
    },
    padding: {
      x: 6,
      y: 5,
    },
    fontStyle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 'normal',
    },
  },
  bottomCenterTextSticker: {
    padding: {
      x: 0,
      y: 6,
    },
    fontStyle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '16px',
    },
  },
  bottomRightImageSticker: {
    width: 75,
    height: 75,
  },
  bottomLeftImageSticker: {
    width: 75,
    height: 75,
  },
};

const BASE_MOBILE_SPECIAL_DEAL_ITEM_META: ProductImageMetaData = {
  width: 343,
  height: 173,
  topLeftTextSticker: {
    position: {
      top: 8,
      left: 8,
    },
    padding: {
      x: 6,
      y: 5,
    },
    fontStyle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 'normal',
    },
  },
  bottomCenterTextSticker: {
    padding: {
      x: 0,
      y: 6,
    },
    fontStyle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '16px',
    },
  },
  bottomRightImageSticker: {
    width: 86,
    height: 86,
  },
  bottomLeftImageSticker: {
    width: 86,
    height: 86,
  },
};

export const ProductImageMetaDataDictionary: {
  [type: string]: {
    [platform: string]: ProductImageMetaData;
  };
} = {
  // NOTE: 일반 상품 목록 (공통)
  [ProductImageType.PRODUCT_LIST_ITEM]: {
    [Platform.DESKTOP]: BASE_DESKTOP_LIST_ITEM_META,
    [Platform.MOBILE]: {
      width: 168,
      height: 218,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 6,
          y: 5,
        },
        fontStyle: {
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: 'normal',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 6,
        },
        fontStyle: {
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: '16px',
        },
      },
      bottomRightImageSticker: {
        width: 84,
        height: 84,
      },
      bottomLeftImageSticker: {
        width: 84,
        height: 84,
      },
    },
  },
  [ProductImageType.MAIN_PRODUCT_LIST_ITEM]: {
    [Platform.DESKTOP]: BASE_DESKTOP_LIST_ITEM_META,
    [Platform.MOBILE]: BASE_MOBILE_MAIN_LIST_ITEM_META,
  },
  [ProductImageType.MAIN_COLLECTION_PRODUCT_NUMBER_LIST_ITEM]: {
    [Platform.DESKTOP]: {
      width: 127,
      height: 169,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 3.5,
          y: 6,
        },
        fontStyle: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '19px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 2,
          y: 6,
        },
        fontStyle: {
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
        },
      },
      bottomLeftImageSticker: {
        width: 64,
        height: 64,
      },
      bottomRightImageSticker: {
        width: 64,
        height: 64,
      },
    },
    [Platform.MOBILE]: {
      width: 109,
      height: 145,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 4,
          y: 4,
        },
        fontStyle: {
          fontSize: '13px',
          fontWeight: 700,
          lineHeight: '18px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 2,
          y: 5,
        },
        fontStyle: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '14px',
        },
      },
      bottomLeftImageSticker: {
        width: 55,
        height: 55,
      },
      bottomRightImageSticker: {
        width: 55,
        height: 55,
      },
    },
  },
  // NOTE: 메인 > MD 초이스 구좌
  [ProductImageType.MAIN_MD_CHOICE_ITEM]: {
    [Platform.DESKTOP]: BASE_DESKTOP_LIST_ITEM_META,
    [Platform.MOBILE]: {
      width: 109,
      height: 145,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 4,
          y: 4,
        },
        fontStyle: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '14px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 2,
          y: 5,
        },
        fontStyle: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '14px',
        },
      },
      bottomRightImageSticker: {
        width: 52,
        height: 52,
      },
      bottomLeftImageSticker: {
        width: 52,
        height: 52,
      },
    },
  },

  // NOTE: 메인 > 스페셜 딜 (PC - 상품 개수에 따른 스타일 차이)
  [ProductImageType.MAIN_SPECIAL_DEAL_ITEM]: {
    [Platform.DESKTOP]: {
      width: 694,
      height: 347,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 4,
          y: 4,
        },
        fontStyle: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '19px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 6,
          y: 6,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 174,
        height: 174,
      },
      bottomLeftImageSticker: {
        width: 174,
        height: 174,
      },
    },
    [Platform.MOBILE]: BASE_MOBILE_SPECIAL_DEAL_ITEM_META,
  },
  [ProductImageType.MAIN_SPECIAL_DEAL_ITEM_1]: {
    [Platform.DESKTOP]: {
      width: 694,
      height: 347,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '19px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 8,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 174,
        height: 174,
      },
      bottomLeftImageSticker: {
        width: 174,
        height: 174,
      },
    },
    [Platform.MOBILE]: BASE_MOBILE_SPECIAL_DEAL_ITEM_META,
  },
  [ProductImageType.MAIN_SPECIAL_DEAL_ITEM_2]: {
    [Platform.DESKTOP]: {
      width: 338,
      height: 434,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '19px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 8,
          y: 8,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 169,
        height: 169,
      },
      bottomLeftImageSticker: {
        width: 169,
        height: 169,
      },
    },
    [Platform.MOBILE]: BASE_MOBILE_SPECIAL_DEAL_ITEM_META,
  },
  [ProductImageType.MAIN_SPECIAL_DEAL_ITEM_3]: {
    [Platform.DESKTOP]: BASE_DESKTOP_LIST_ITEM_META,
    [Platform.MOBILE]: BASE_MOBILE_SPECIAL_DEAL_ITEM_META,
  },

  // NOTE: 메인 > 랜덤 컬렉션 아티클 (스티커 없음)
  [ProductImageType.MAIN_RANDOM_COLLECTION_ARTICLE_ITEM]: {
    [Platform.DESKTOP]: {
      width: 72,
      height: 72,
      topLeftTextSticker: {
        position: {
          top: 16,
          left: 16,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 8,
          y: 8,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 131,
        height: 131,
      },
      bottomLeftImageSticker: {
        width: 131,
        height: 131,
      },
    },
    [Platform.MOBILE]: {
      width: 50,
      height: 50,
      topLeftTextSticker: {
        position: {
          top: 16,
          left: 16,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 8,
          y: 8,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 131,
        height: 131,
      },
      bottomLeftImageSticker: {
        width: 131,
        height: 131,
      },
    },
  },

  // NOTE:  상품 상세
  [ProductImageType.PRODUCT_DETAIL]: {
    [Platform.DESKTOP]: {
      width: 430,
      height: 552,
      topLeftTextSticker: {
        position: {
          top: 16,
          left: 16,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '19px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 10,
        },
        fontStyle: {
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: '23px',
        },
      },
      bottomRightImageSticker: {
        width: 172,
        height: 172,
      },
      bottomLeftImageSticker: {
        width: 172,
        height: 172,
      },
    },
    [Platform.MOBILE]: {
      width: 375,
      height: 489,
      topLeftTextSticker: {
        position: {
          top: 16,
          left: 16,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '13px',
          fontWeight: 700,
          lineHeight: '18px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 8,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 131,
        height: 131,
      },
      bottomLeftImageSticker: {
        width: 131,
        height: 131,
      },
    },
  },
  [ProductImageType.MAIN_RANDOM_COLLECTION_NUMBER_ITEM]: {
    [Platform.DESKTOP]: {
      width: 190,
      height: 234,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 8,
          y: 6,
        },
        fontStyle: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '19px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 10,
        },
        fontStyle: {
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: '23px',
        },
      },
      bottomRightImageSticker: {
        width: 96,
        height: 96,
      },
      bottomLeftImageSticker: {
        width: 96,
        height: 96,
      },
    },
    [Platform.MOBILE]: {
      width: 190,
      height: 234,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 5,
          y: 6,
        },
        fontStyle: {
          fontSize: '13px',
          fontWeight: 700,
          lineHeight: '18px',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 8,
        },
        fontStyle: {
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: '21px',
        },
      },
      bottomRightImageSticker: {
        width: 75,
        height: 75,
      },
      bottomLeftImageSticker: {
        width: 75,
        height: 75,
      },
    },
  },
  [ProductImageType.PRODUCT_DETAIL_RECOMMEND_ITEM]: {
    // NOTE: 2024-06-05 현재 PC 는 지원하지 않음
    [Platform.DESKTOP]: BASE_DESKTOP_LIST_ITEM_META,
    [Platform.MOBILE]: {
      width: 120,
      height: 154,
      topLeftTextSticker: {
        position: {
          top: 8,
          left: 8,
        },
        padding: {
          x: 5,
          y: 6,
        },
        fontStyle: {
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: 'normal',
        },
      },
      bottomCenterTextSticker: {
        padding: {
          x: 0,
          y: 5,
        },
        fontStyle: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '14px',
        },
      },
      bottomRightImageSticker: {
        width: 60,
        height: 60,
      },
      bottomLeftImageSticker: {
        width: 60,
        height: 60,
      },
    },
  },
};
