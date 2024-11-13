import { ignoreError } from '../../../../../shared/utils/general';
import Pixel from '../../../../../shared/pixel/PixelService';
import { PIXEL_EVENT_TITLE } from '../../../../../shared/pixel/constants/pixelEventTitle';
import type { ProductProps } from '../../../types';
import { convertContentCategory } from '../../../../../order/cart/utils/pixel/logEventPixelAddToCart';

export const logEventPixelViewContents = (product: ProductProps | null) => {
  if (!product) return;

  const { no, name, basePrice, categoryIds } = product;
  const contentCategory = convertContentCategory(categoryIds);

  ignoreError(() =>
    Pixel.logEvent(PIXEL_EVENT_TITLE.VIEW_CONTENT, {
      content_ids: [no],
      contents: [
        {
          id: no,
          quantity: 1,
          content_name: name,
          content_category: contentCategory,
        },
      ],
      content_category: contentCategory,
      content_name: name,
      content_type: 'product',
      currency: 'KRW',
      value: basePrice,
    }),
  );
};
