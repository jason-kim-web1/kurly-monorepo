import axios from 'axios';

import { UnknownError } from '../../../errors';
import { API_URL } from '../../../configs/config';
import type { DeliveryInfoName, SnakeCaseStickerList } from '../../../../product/types';
import { ProductViewStatusCode } from '../../../interfaces';

interface CollectionSetProductItemResponse {
  can_restock_notify: boolean;
  delivery_type_names: DeliveryInfoName[];
  discount_rate: number;
  discounted_price: number;
  group_product: {
    is_group: boolean;
    is_not_representative: boolean;
  };
  is_buy_now: boolean;
  is_giftable: boolean;
  is_multiple_price: boolean;
  is_only_adult: boolean;
  is_purchase_status: boolean;
  is_sales: boolean;
  is_sold_out: boolean;
  list_image_url: string;
  meta: {
    is_fixed: boolean;
    position: number;
  };
  name: string;
  no: number;
  not_purchase_message: string;
  product_vertical_medium_url: string;
  product_view_status: ProductViewStatusCode;
  review_count: string;
  sales_price: number;
  short_description: string;
  sold_out_text: string;
  sold_out_title: string;
  sticker: {
    background_color: string;
    content: {
      text: string;
      weight: string;
    }[];
    opacity: number;
  } | null;
  stickers: unknown;
  stickers_v2: SnakeCaseStickerList;
  tags: {
    name: string;
    type: string;
  }[];
}

const fetchCollectionSet = async (
  accessToken: string,
  code: string,
): Promise<{ collectionCode: string; products: CollectionSetProductItemResponse[] }[]> => {
  const requestURL = `/marketing-event-api/v1/collection-meta/${code}/collection-set`;
  try {
    const { data } = await axios.get(`${API_URL}${requestURL}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new UnknownError(error as Error);
  }
};

export type { CollectionSetProductItemResponse };
export { fetchCollectionSet };
