import { KurlyWebSdkError } from '@thefarmersfront/kurly-web-sdk';

import Alert from '../../shared/components/Alert/Alert';

/**
 * 게임 웹뷰에서의 KurlyWebSdkError를 처리합니다.
 * @param error KurlyWebSdkError Class
 */
export const handleKurlyWebSdkError = (error: KurlyWebSdkError) => {
  if (error.errorType === 'NOT_SUPPORTED') {
    Alert({ text: '컬리 앱에서 이용할 수 있습니다.' });
  } else if (error.errorType === 'APP_VERSION') {
    Alert({ text: '앱 버전 업그레이드가 필요합니다.' });
  }
};
