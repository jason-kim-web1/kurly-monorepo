import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../shared/store';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { redirectToLogin } from '../../../../shared/reducers/page';
import { useWebview } from '../../../../shared/hooks';

export default function useCheckLogin() {
  const dispatch = useDispatch();
  const isWebView = useWebview();
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const checkLogin = () => {
    if (isGuest) {
      if (isWebView) {
        location.href = deepLinkUrl.LOGIN;
        return false;
      }
      dispatch(redirectToLogin());
      return false;
    }
    return true;
  };

  return { checkLogin };
}
