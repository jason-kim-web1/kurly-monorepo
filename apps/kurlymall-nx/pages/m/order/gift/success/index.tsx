import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useWebview } from '../../../../../src/shared/hooks';
import appService from '../../../../../src/shared/services/app.service';

import { useAppSelector } from '../../../../../src/shared/store';

import SuccessContainer from '../../../../../src/order/gift/m/containers/SuccessContainer';
import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default function SuccessPage() {
  const webview = useWebview();
  const notificationType = useAppSelector(({ payments }) => payments.paymentsResult.notificationType);
  const title = notificationType === 'KAKAO_TALK' ? '선물 메시지 보내기' : '선물 주문완료';
  const buttonType = notificationType === 'KAKAO_TALK' ? 'none' : 'close';
  const handleClickClose = () => {
    window.location.assign('/');
  };

  useEffect(() => {
    if (!webview) {
      return;
    }

    appService.changeTitle(title);
    appService.setNavigationButton({
      buttonType,
    });
  }, [webview]);

  return (
    <Container>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={handleClickClose} />
          </HeaderButtons>
          <HeaderTitle>{title}</HeaderTitle>
        </MobileHeader>
      )}
      <SuccessContainer />
    </Container>
  );
}
