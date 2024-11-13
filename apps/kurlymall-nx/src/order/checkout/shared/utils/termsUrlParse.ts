import { isPC } from '../../../../../util/window/getDevice';
import { isProduction } from '../../../../shared/configs/config';

/**
 * 주문서의 개인 정보 제공 약관의 파일 url을 PC, MW 환경에 맞추어 변환해준다.
 *
 * @param {string} url
 * @returns PC, MW에 따라 res.kurly.com 경로로 변환
 */
export const termsUrlParse = (url: string) => {
  if (isProduction()) {
    return isPC ? url : url.replace('order/', 'order/app/');
  }

  return isPC
    ? url.replace('/terms/order/', '/test/terms/order/')
    : url.replace('/terms/order/', '/test/terms/order/app/');
};
