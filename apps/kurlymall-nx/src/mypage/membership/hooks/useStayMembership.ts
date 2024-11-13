import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import Alert from '../../../shared/components/Alert/Alert';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { redirectTo } from '../../../shared/reducers/page';
import { MYPAGE_PATH } from '../../../shared/constant';

export const useStayMembership = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { return_url: returnUrl } = query as { return_url: string };

  const showStayMembership = () => {
    Alert({
      text: '컬리멤버스 혜택이 유지됩니다.',
    }).then(() => {
      if (isWebview()) {
        appService.closeWebview();
        return;
      }

      if (returnUrl) {
        dispatch(redirectTo({ url: returnUrl }));
        return;
      }

      dispatch(redirectTo({ url: MYPAGE_PATH.myMembership.uri }));
    });
  };

  return { returnUrl, showStayMembership };
};
