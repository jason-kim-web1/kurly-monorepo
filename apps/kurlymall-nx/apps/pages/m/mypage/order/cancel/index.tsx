import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../../src/shared/services/app.service';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import CancelContainer from '../../../../../src/mypage/order/m/cancel/containers/CancelContainer';

export default function OrderCancelPage() {
  const router = useRouter();

  const moveDetailPage = () => {
    router.back();
  };

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('주문 취소');
    }
  }, []);

  if (isWebview()) {
    return (
      <AuthContainer loginRequired>
        <CancelContainer />
      </AuthContainer>
    );
  }

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={moveDetailPage} />
        </HeaderButtons>
        <HeaderTitle>주문 취소</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        <CancelContainer />
      </AuthContainer>
    </>
  );
}
