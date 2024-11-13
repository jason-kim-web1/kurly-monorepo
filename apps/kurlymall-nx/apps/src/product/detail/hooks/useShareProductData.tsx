import { useQuery } from '@tanstack/react-query';
import { every } from 'lodash';

import { fetchSharedProduct, ShareProductResponse } from '../../../shared/api';
import { useAppSelector } from '../../../shared/store';
import { getMinutes } from '../../../shared/utils/time';
import { ProductDetailKeys } from '../queries';

const STALE_TIME = getMinutes(3);

const createShareProduct = (data: ShareProductResponse) => ({
  no: data.no,
  title: data.title,
  description: data.description,
  horizontalImageUrl: data.horizontal_image_url,
  verticalImageUrl: data.vertical_image_url,
  imageWidth: data.image_width,
  imageHeight: data.image_height,
  productUrl: data.product_url,
  buttonTitle: data.button_title,
  productHorizontalLargeUrl: data.product_horizontal_large_url,
  productVerticalLargeUrl: data.product_vertical_large_url,
});

export default function useShareProductData(contentProductNo: number) {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const queryResult = useQuery(
    ProductDetailKeys.shareProduct(contentProductNo),
    () => fetchSharedProduct(contentProductNo),
    {
      staleTime: STALE_TIME,
      select: createShareProduct,
      enabled: every([hasSession, contentProductNo], Boolean),
    },
  );

  return {
    ...queryResult,
  };
}
