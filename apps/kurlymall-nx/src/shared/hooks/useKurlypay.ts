import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';

import { isWebview } from '../../../util/window/getDevice';
import { fetchKurlypayAccessToken, fetchKurlypayToken } from '../api/kurlypay/kurlypay';

import Alert from '../components/Alert/Alert';
import appService from '../services/app.service';
import { getKurlypayPageUrl } from '../utils/getKurlypayPageUrl';

export const KURLYPAY_PAGES = {
  mypage: 'mypage',
  registration: 'registration',
  leave: 'leave',
  cashReceipt: 'cashReceipt',
  reserves: 'reserves',
} as const;

export type KurlypayPage = typeof KURLYPAY_PAGES[keyof typeof KURLYPAY_PAGES];
export default function useKurlypay() {
  /**
   * 컬리페이 팝업전 인증 처리
   */
  const getKurlypayTokenQuerystring = async () => {
    try {
      const { expireAt, ...exceptExpireAt } = await fetchKurlypayToken();
      return Object.entries(exceptExpireAt)
        .map((value) => value.join('='))
        .join('&');
    } catch {
      Alert({
        text: '컬리페이 인증에 실패 하였습니다.',
      });
    }
  };

  /**
   * 컬리페이 인증
   */
  const authKurlypay = useCallback(async (): Promise<{
    accessToken?: string;
    errorCode?: string;
  }> => {
    try {
      const { accessToken } = await fetchKurlypayAccessToken();
      return {
        accessToken,
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ code: string; message: string }>;
        return {
          errorCode: error.response?.data.code,
        };
      }
      throw e;
    }
  }, []);

  /**
   * 컬리페이 팝업 호출
   * @param page 'mypage' : 마이페이지 | 'registration' : 결제수단 등록 | 'leave' : 탈퇴 | 'cashReceipt' : 현금영수증 | 'reserves' : 적립금 | 'registration_bank' : 결제수단 계좌만 등록 | 'registration_card' : 결제수단 카드만 등록
   * @param returnUrl 처리후 반환 주소
   * @param pageName 이벤트페이지 key
   * @param isGiftCardOrder 상품권 주문 여부
   * @param deviceId 간편결제 무인증에 사용
   */
  const openKurlypayPage = async ({
    page,
    returnUrl,
    pageName = '',
    isGiftCardOrder = false,
    deviceId = '',
  }: {
    page: KurlypayPage;
    returnUrl: string;
    pageName?: string;
    isGiftCardOrder?: boolean;
    deviceId?: string;
  }) => {
    const tokenQuerystring = await getKurlypayTokenQuerystring();
    const url = getKurlypayPageUrl({
      page,
      returnUrl,
      pageName,
      tokenQuerystring,
      isGiftCardOrder,
      deviceId,
    });

    if (isWebview()) {
      appService.openWebview({
        url,
        title: '컬리페이 팝업',
        is_modal: true,
      });

      return;
    }

    /**
     * MEMO:
     * safari (ios,mac) 에서는 비동기 액션 뒤에 띄우는 팝업을 사용자가 의도한 팝업으로 인지 하지 않고, 차단 시킵니다
     * 따라서 해당 click 액션 스레드를 분리시켜 동작 시키게 합니다.
     * 다른 방법으론, window.open 을 먼저 띄우고 url을 변경 할 수 있습니다
     * 논의 스레드: https://github.com/thefarmersfront/kurlymall-nx/pull/4998#discussion_r1156845368
     */
    setTimeout(() => {
      window.open(url, '_blank');
    }, 0);
  };

  const getReturnUrl = (url: string) => {
    return `${window.location.origin}${url}`;
  };

  return { openKurlypayPage, getReturnUrl, authKurlypay };
}
