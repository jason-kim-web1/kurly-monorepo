import { useDispatch } from 'react-redux';

import { ScreenName, amplitudeService } from '../../../shared/amplitude';
import { SelectWriteReview } from '../../../shared/amplitude/events/review';
import { redirectTo } from '../../../shared/reducers/page';
import { MYPAGE_PATH, getPageUrl } from '../../../shared/constant';
import { useWebview } from '../../../shared/hooks';
import deepLinkUrl from '../../../shared/constant/deepLink';

/*
 * 후기 작성 시 contents_product_no 가 필수 값 입니다.
 * 앱에서 하위호환성 이슈가 발생할 수 있으므로, 임시로 0으로 지정하였습니다.
 */
const TEMP_CONTENTS_PRODUCT_NO = 0;

export function useWriteRiview() {
  const dispatch = useDispatch();
  const webview = useWebview();

  //TODO: PC 동작 추가
  const writeReview = () => {
    amplitudeService.setScreenName(ScreenName.MY_REVIEWABLE_LIST);
    amplitudeService.logEvent(new SelectWriteReview());

    if (webview) {
      dispatch(
        redirectTo({
          url: deepLinkUrl.REVIEW,
          query: {
            contents_product_no: TEMP_CONTENTS_PRODUCT_NO,
          },
        }),
      );
      return;
    }

    dispatch(
      redirectTo({
        url: getPageUrl(MYPAGE_PATH.review),
      }),
    );
  };
  return {
    writeReview,
  };
}
