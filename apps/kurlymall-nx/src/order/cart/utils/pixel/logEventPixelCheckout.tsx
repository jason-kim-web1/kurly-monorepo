import { PIXEL_EVENT_TITLE } from '../../../../shared/pixel/constants/pixelEventTitle';
import Pixel from '../../../../shared/pixel/PixelService';
import { ignoreError } from '../../../../shared/utils/general';

export const logEventPixelCheckout = (
  paymentPrice: number,
  dealProducts: { dealProductNo: number; quantity: number; dealProductName?: string }[],
) => {
  ignoreError(() => {
    Pixel.logEvent(PIXEL_EVENT_TITLE.INITIATE_CHECKOUT, {
      content_ids: dealProducts.map(({ dealProductNo }) => dealProductNo),
      contents: dealProducts.map(({ dealProductNo: id, quantity, dealProductName: content_name = '' }) => ({
        id,
        quantity,
        content_name,
      })),
      currency: 'KRW',
      num_items: dealProducts.length,
      value: paymentPrice,
    });
  });
};
