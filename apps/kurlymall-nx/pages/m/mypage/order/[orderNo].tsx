import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useEffect } from 'react';

import { ParsedUrlQuery } from 'querystring';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSidePropsWithRefreshToken } from '../../../../src/server/webview';
import { amplitudeService, ScreenName } from '../../../../src/shared/amplitude';
import { ViewOrderSheetDetail } from '../../../../src/shared/amplitude/events/ViewOrderSheetDetail';
import { useAppLinkFallback } from '../../../../src/shared/hooks/useAppLinkFallback';
import deepLinkUrl from '../../../../src/shared/constant/deepLink';
import TopBar, { BUTTON_TYPE } from '../../../../src/shared/components/KPDS/TopBar';
import OrderDetail from '../../../../src/order/order-detail/components/OrderDetail';
interface Props {
  accessToken: string;
}

const Wrapper = styled.div`
  min-height: 100vh;
`;

export default function MypageOrderPage({ accessToken }: Props) {
  const router = useRouter();
  const { query } = router;

  const { orderNo, forward } = query as ParsedUrlQuery & {
    orderNo: string;
    forward?: string;
  };

  useAppLinkFallback(deepLinkUrl.ORDER_DETAIL + orderNo, { tryOnLoad: /^app$/i.test(forward || '') });

  useEffect(() => {
    amplitudeService.setScreenName(ScreenName.ORDER_SHEET_DETAIL);
    amplitudeService.logEvent(new ViewOrderSheetDetail());
  }, []);

  return (
    <Wrapper>
      <TopBar type={BUTTON_TYPE.back}>주문 내역 상세</TopBar>
      <AuthContainer loginRequired appToken={accessToken}>
        <OrderDetail groupOrderNo={Number(orderNo)} />
      </AuthContainer>
    </Wrapper>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
