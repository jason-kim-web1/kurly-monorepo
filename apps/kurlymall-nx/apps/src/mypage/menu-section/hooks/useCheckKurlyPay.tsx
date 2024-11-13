import useKurlypay, { KURLYPAY_PAGES, KurlypayPage } from '../../../shared/hooks/useKurlypay';
import { KURLYPAY_PATH } from '../../../shared/constant';
import { BADGE_KEY, updateReadBadge } from '../../../shared/api';

type KurlypayMenuName = '결제수단 · 컬리페이' | '적립금 · 컬리캐시';

const KURLYPAY_MENU: Record<KurlypayMenuName, KurlypayPage> = {
  '결제수단 · 컬리페이': KURLYPAY_PAGES.mypage,
  '적립금 · 컬리캐시': KURLYPAY_PAGES.mypage,
};

export const useCheckKurlyPay = () => {
  const { openKurlypayPage, getReturnUrl } = useKurlypay();

  const handleCheckKurlyPay = async (title: string): Promise<boolean> => {
    // const trimmedTitle = title.replace(/\s/gi, '');
    const isKurlyPayMenu = Object.keys(KURLYPAY_MENU).find((key) => title === key);

    if (!isKurlyPayMenu) {
      return false;
    }

    const pageName = KURLYPAY_MENU[isKurlyPayMenu as KurlypayMenuName];
    const pageParams: { page: KurlypayPage; returnUrl: string } = {
      page: pageName,
      returnUrl: getReturnUrl(`${KURLYPAY_PATH.kurlypayDefaultCallback.uri}`),
    };
    await openKurlypayPage(pageParams);
    await updateReadBadge(BADGE_KEY.kurlypay_badge);
    return true;
  };

  return { handleCheckKurlyPay };
};
