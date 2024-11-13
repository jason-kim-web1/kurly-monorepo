import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { MYPAGE_PATH, MEMBERSHIP_PATH, USER_MENU_PATH, COMMON_PATH } from '../../shared/constant';
import { isWebview } from '../../../util/window/getDevice';
import deepLinkUrl from '../../shared/constant/deepLink';
import { LAST_VIEWING_CONTENT_NO } from '../components/Cart/MembershipOnlyProductAlert/constants';
import { loadSessionStorage, removeSessionStorage } from '../services/session.storage.service';
import { redirectTo } from '../reducers/page';

export default function useNavigator() {
  const { push, asPath } = useRouter();
  const dispatch = useDispatch();

  const goToMembership = () => {
    push(MEMBERSHIP_PATH.membership.uri);
  };

  const goToMyMembership = () => {
    push(MYPAGE_PATH.myMembership.uri);
  };

  const goToHome = () => {
    const targetUrl = isWebview() ? deepLinkUrl.HOME : USER_MENU_PATH.home.uri;
    push(targetUrl);
  };

  const goToShopping = () => {
    const lastViewingContentNo = loadSessionStorage(LAST_VIEWING_CONTENT_NO);

    if (!lastViewingContentNo) {
      goToHome();
      return;
    }
    removeSessionStorage(LAST_VIEWING_CONTENT_NO);
    push(`/goods/${lastViewingContentNo}`);
  };

  const goToLogin = () => {
    dispatch(
      redirectTo({
        url: COMMON_PATH.login.uri,
        query: {
          internalUrl: asPath,
        },
      }),
    );
  };

  return { goToMembership, goToMyMembership, goToHome, goToShopping, goToLogin };
}
