import { useRouter } from 'next/router';
import { useEffect } from 'react';

import appService from '../../../../../src/shared/services/app.service';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import CancelSuccessContainer from '../../../../../src/mypage/order/m/cancel/containers/CancelSuccessContainer';
import { useWebview } from '../../../../../src/shared/hooks';

export default function OrderCancelSuccessPage() {
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
      appService.changeTitle('주문 취소 완료');
      appService.postCancelSuccess();
    }
  }, [isWebview, router.isReady]);

  if (isWebview) {
    return <CancelSuccessContainer />;
  }

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={moveDetailPage} />
        </HeaderButtons>
        <HeaderTitle>주문 취소 완료</HeaderTitle>
      </MobileHeader>
      <CancelSuccessContainer />
    </>
  );
}
