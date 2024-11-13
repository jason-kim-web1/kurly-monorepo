import { ignoreError } from '../../../shared/utils/general';
import Pixel from '../../../shared/pixel/PixelService';
import { PIXEL_EVENT_TITLE } from '../../../shared/pixel/constants/pixelEventTitle';

const PLUS_PACK = '2';

/**
 *
 * @param couponPackId 사용자가 선택한 쿠폰팩 ID
 * @description 간편가입의 경우에는 쿠폰팩 선택이 없으므로, default coupon pack(CORE)이 선택됩니다.
 */
export const logEventPixelSubscribe = (couponPackId?: string) => {
  const couponPack = couponPackId === PLUS_PACK ? 'PLUS' : 'CORE';

  ignoreError(() => Pixel.logEvent(PIXEL_EVENT_TITLE.SUBSCRIBE, { content_name: couponPack }));
};
