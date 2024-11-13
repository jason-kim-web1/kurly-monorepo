import { useRouter } from 'next/router';
import { useEffect } from 'react';

import appService from '../../../../../src/shared/services/app.service';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import CancelFailContainer from '../../../../../src/mypage/order/m/cancel/containers/CancelFailContainer';
import { useWebview } from '../../../../../src/shared/hooks';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';

export default function OrderCancelFailPage({ accessToken }: WebviewServerSideProps) {
  const isWebview = useWebview();
  const router = useRouter();

  const moveDetailPage = () => {
    router.back();
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isWebview) {
      appService.changeTitle('주문 취소 실패');
      appService.postCancelFail();
    }
  }, [isWebview, router.isReady]);

  return (
    <>
      {!isWebview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={moveDetailPage} />
          </HeaderButtons>
          <HeaderTitle>주문 취소 실패</HeaderTitle>
        </MobileHeader>
      )}
      <AuthContainer appToken={accessToken}>
        <CancelFailContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
