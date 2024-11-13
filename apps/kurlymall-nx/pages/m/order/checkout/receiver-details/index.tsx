import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import ReceiverDetailsContainer from '../../../../../src/order/checkout/shared/containers/ReceiverDetailsContainer';

import { useAppSelector } from '../../../../../src/shared/store';
import { useWebview } from '../../../../../src/shared/hooks';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { setAccessToken } from '../../../../../src/shared/reducers/auth';
import appService from '../../../../../src/shared/services/app.service';
import { ParsedUrlQuery } from 'querystring';
import { OrderTypes } from '../../../../../src/order/checkout/shared/utils';
import { setOrderType } from '../../../../../src/order/checkout/shared/reducers/checkout.slice';

export default function ReceiverDetailsPage({ accessToken }: WebviewServerSideProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const webview = useWebview();
  const { orderType } = router.query as ParsedUrlQuery & { orderType?: OrderTypes };

  const moveBack = () => {
    router.back();
  };

  useEffect(() => {
    if (webview) {
      appService.changeTitle('배송 요청사항');
    }
  }, [webview]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    dispatch(
      setAccessToken({
        accessToken,
        isGuest: false,
      }),
    );
  }, [accessToken, dispatch]);

  useEffect(() => {
    dispatch(setOrderType(orderType ?? OrderTypes.CHECKOUT));
  }, [dispatch, orderType]);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={moveBack} />
          </HeaderButtons>
          <HeaderTitle>배송 요청사항</HeaderTitle>
        </MobileHeader>
      )}
      {hasSession && <ReceiverDetailsContainer />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
