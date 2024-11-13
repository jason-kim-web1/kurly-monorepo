import useKurlypay, { KURLYPAY_PAGES, KurlypayPage } from '../../../../shared/hooks/useKurlypay';
import { KURLYPAY_PATH } from '../../../../shared/constant';
import useCheckLogin from './useCheckLogin';

export default function useKurlyPayLink() {
  const { openKurlypayPage, getReturnUrl } = useKurlypay();
  const { checkLogin } = useCheckLogin();

  const goToKurlyPayMain = async () => {
    const isLogin = checkLogin();
    if (!isLogin) {
      return;
    }

    const pageParams: { page: KurlypayPage; returnUrl: string; pageName: string } = {
      page: KURLYPAY_PAGES.mypage,
      returnUrl: getReturnUrl(`${KURLYPAY_PATH.kurlypayDefaultCallback.uri}`),
      pageName: 'service_intro_230410',
    };
    await openKurlypayPage(pageParams);
  };

  return { goToKurlyPayMain };
}
