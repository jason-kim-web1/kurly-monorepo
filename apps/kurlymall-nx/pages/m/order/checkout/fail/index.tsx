import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useWebview } from '../../../../../src/shared/hooks';
import appService from '../../../../../src/shared/services/app.service';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import FailContainer from '../../../../../src/order/checkout/m/containers/FailContainer';

const Container = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default function FailPage() {
  const webview = useWebview();

  const handleClickClose = () => {
    window.location.assign('/');
  };

  useEffect(() => {
    if (webview) {
      appService.changeTitle('주문 실패');
    }
  }, [webview]);

  return (
    <Container>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={handleClickClose} />
          </HeaderButtons>
          <HeaderTitle>주문 실패</HeaderTitle>
        </MobileHeader>
      )}
      <FailContainer />
    </Container>
  );
}
