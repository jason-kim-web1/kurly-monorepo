import httpClient from '../../configs/http-client';
import { SnakeCaseStickerList } from '../../../product/types';

type FetchRecommendProductsResponse = {
  data: {
    adProducts: {
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
      stickersV2: SnakeCaseStickerList;
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
    }[];
    clickedTogethers: {
      items: {
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
        stickersV2: SnakeCaseStickerList;
      }[];
      selectionPolicy: string;
    };
  };
};

type FetchRecommendProductsOptions = {
  productNo: number;
  adPageId?: string;
  adDeviceId?: string;
};

const fetchRecommendProducts = async ({
  productNo,
  adPageId,
  adDeviceId,
}: FetchRecommendProductsOptions): Promise<FetchRecommendProductsResponse> => {
  const { data } = await httpClient.get<FetchRecommendProductsResponse>(
    `/recommend/v1/related-products/product-detail/${productNo}`,
    {
      headers: {
        'X-KURLY-AD-PAGE-ID': adPageId,
        'X-KURLY-AD-DEVICE-ID': adDeviceId,
      },
    },
  );
  return data;
};

export { fetchRecommendProducts };
export type { FetchRecommendProductsResponse };
