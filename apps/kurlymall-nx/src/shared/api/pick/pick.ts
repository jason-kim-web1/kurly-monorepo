import { handleUnauthenticated } from '../../error-handlers';
import { handleProductDetailLikeError } from '../../error-handlers/ProductDetailErrorHandlers';
import { UnknownError } from '../../errors';

import { BaseResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';

const PICK_URL = '/member/proxy/pick';

export const PRODUCT_STATUS = {
  BUY_POSSIBLE: 'BUY_POSSIBLE', // 구매 가능
  BUY_IMPOSSIBLE: 'BUY_IMPOSSIBLE', // 구매 불가
  SOLD_OUT: 'SOLD_OUT', // 품절
  BLOCK_ZIPCODE: 'BLOCK_ZIPCODE', // 지역제한
  NO_DATA: 'NO_DATA', // 정보 없음
} as const;

interface PickProductServerResponse {
  no: number;
  name: string;
  product_view_status: 'BUY_POSSIBLE' | 'BUY_IMPOSSIBLE' | 'SOLD_OUT' | 'BLOCK_ZIPCODE';
  sales_price: number;
  discounted_price: number | null;
  discount_rate: number;
  sold_out_title: string | null;
  not_purchase_message: string | null;
  is_buy_now: boolean;
  can_restock_notify: boolean;
  is_giftable: boolean;
  list_image_url: string;
  product_vertical_small_url: string;
  create_at: string;
  group_product: {
    is_group: boolean;
  };
  is_multiple_price: boolean;
  is_only_adult: boolean;
}

export interface PickProduct {
  no: number;
  name: string;
  status: 'BUY_POSSIBLE' | 'BUY_IMPOSSIBLE' | 'SOLD_OUT' | 'BLOCK_ZIPCODE';
  salesPrice: number;
  discountedPrice: number | null;
  discountRate: number;
  soldOutTitle: string | null;
  notPurchaseMessage: string | null;
  isBuyNow: boolean;
  canStockedNotify: boolean;
  isGiftable: boolean;
  listImageUrl: string;
  productVerticalSmallUrl: string;
  createdAt: string;
  isGroupProduct: boolean;
  isMultiplePrice: boolean;
  isAdultProduct: boolean;
}

const PRODUCT_STATUS_TEXT_MAP: Record<keyof typeof PRODUCT_STATUS, string> = {
  BUY_POSSIBLE: '',
  BUY_IMPOSSIBLE: '(구매불가)',
  SOLD_OUT: '(품절)',
  BLOCK_ZIPCODE: '',
  NO_DATA: '',
};

export type PickProductExtend = PickProduct & {
  isValidProduct: boolean;
  isUnavailable: boolean;
  isBuyPossible: boolean;
  isSoldOut: boolean;
  productName: string;
};

const getPickProductName = (name: string, status: keyof typeof PRODUCT_STATUS): string => {
  const targetStatus = PRODUCT_STATUS_TEXT_MAP[status];
  if (targetStatus) {
    return `${targetStatus} ${name}`;
  }
  return `${name}`;
};

export const fetchPickedProducts = async (): Promise<PickProductExtend[]> => {
  const url = `${PICK_URL}/v1/picks/products`;

  try {
    const { data } = await httpClient.get<BaseResponse<PickProductServerResponse[]>>(url);

    const sortedProducts = data.data.reduce(
      (acc: PickProductExtend[][], cur: PickProductServerResponse) => {
        const parsedProduct = {
          no: cur.no,
          name: cur.name,
          status: cur.product_view_status,
          salesPrice: cur.sales_price,
          discountedPrice: cur.discounted_price,
          discountRate: cur.discount_rate,
          soldOutTitle: cur.sold_out_title,
          notPurchaseMessage: cur.not_purchase_message,
          isBuyNow: cur.is_buy_now,
          canStockedNotify: cur.can_restock_notify,
          isGiftable: cur.is_giftable,
          listImageUrl: cur.list_image_url,
          createdAt: cur.create_at,
          isGroupProduct: cur.group_product?.is_group,
          isMultiplePrice: cur.is_multiple_price,
          isAdultProduct: cur.is_only_adult,
          productVerticalSmallUrl: cur.product_vertical_small_url,
        };

        const { name, status } = parsedProduct;

        const isValidProduct = status !== PRODUCT_STATUS.BUY_IMPOSSIBLE && status !== PRODUCT_STATUS.BLOCK_ZIPCODE;
        const isUnavailable = status === PRODUCT_STATUS.BUY_IMPOSSIBLE || status === PRODUCT_STATUS.BLOCK_ZIPCODE;
        const isBuyPossible = status === PRODUCT_STATUS.BUY_POSSIBLE;
        const isSoldOut = status === PRODUCT_STATUS.SOLD_OUT;

        const product = {
          ...parsedProduct,
          isValidProduct,
          isUnavailable,
          isBuyPossible,
          isSoldOut,
          productName: getPickProductName(name, status),
        };

        if (isSoldOut) {
          acc[1].push(product);
        } else if (isUnavailable) {
          acc[2].push(product);
        } else {
          acc[0].push(product);
        }

        return acc;
      },
      [[], [], []],
    );
    // 0: 구매가능 상품, 1: 품절 상품, 2: 구매 불가 상품 or 데이터 없음

    return sortedProducts.flat();
  } catch (error) {
    handleUnauthenticated(error as Error);
    throw new UnknownError(error);
  }
};

export const putPickToggle = async ({ productNo, isPick }: { productNo: number; isPick: boolean }) => {
  const url = `${PICK_URL}/v1/picks/products/${productNo}`;

  try {
    await httpClient.put<BaseResponse<void>>(url, {
      is_pick: isPick,
    });
  } catch (error) {
    handleUnauthenticated(error);
    throw new UnknownError(error);
  }
};

export interface PickedProductResponse {
  data: {
    is_picked: boolean;
  };
  is_picked: false;
  message: string | null;
  success: boolean;
}

export const fetchPickedProduct = async ({ productNo }: { productNo: number }): Promise<PickedProductResponse> => {
  const url = `${PICK_URL}/v1/picks/products/${productNo}/picked`;

  try {
    const { data } = await httpClient.get<BaseResponse<PickedProductResponse>>(url);

    return data.data;
  } catch (error) {
    throw new UnknownError(error as Error);
  }
};

export const putPickProduct = async ({ productNo, isPicked }: { productNo: number; isPicked: boolean }) => {
  const url = `${PICK_URL}/v1/picks/products/${productNo}`;

  try {
    await httpClient.put(url, {
      is_pick: isPicked,
    });
  } catch (error) {
    throw handleProductDetailLikeError(error);
  }
};

export const fetchPickCount = async () => {
  const url = `${PICK_URL}/v1/picks/products/count`;
  try {
    const { data } = await httpClient.get<BaseResponse<{ count: number }>>(url);
    return data.data.count;
  } catch (err) {
    throw new UnknownError(err);
  }
};
