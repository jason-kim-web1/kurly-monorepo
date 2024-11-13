import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useCallback } from 'react';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import ResultContainer from '../../../../src/shared/containers/m/address/ResultContainer';
import { ParsedUrlQuery } from 'querystring';
import { useWebview } from '../../../../src/shared/hooks';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Container = styled.div`
  padding: 0 20px;
  height: calc(100vh - 44px);
`;

export default function ShippingAddressResultPage() {
  const router = useRouter();
  const { isIframe } = router.query as ParsedUrlQuery & { isIframe?: string };
  const webview = useWebview();

  const handleBackButton = useCallback(() => {
    if (isIframe) {
      window.parent.postMessage({ source: 'closeAddressSearch' }, window.location.href);
    } else {
      window.history.back();
    }
  }, [isIframe]);

  return (
    <Wrapper>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton onClick={handleBackButton} />
          </HeaderButtons>
          <HeaderTitle>배송지</HeaderTitle>
        </MobileHeader>
      )}
      <Container>
        <ResultContainer />
      </Container>
    </Wrapper>
  );
}
