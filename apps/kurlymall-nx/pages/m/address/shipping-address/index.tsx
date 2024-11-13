import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import SearchContainer from '../../../../src/shared/containers/SearchContainer';

import { ParsedUrlQuery } from 'querystring';
import { loadSession } from '../../../../src/shared/reducers/auth';
import { useWebview } from '../../../../src/shared/hooks';

const Wrapper = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const Container = styled.div`
  height: calc(100vh - 44px);
`;

export default function ShippingAddressPage() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (isIframe) {
      dispatch(loadSession());
    }
  }, [dispatch, isIframe]);

  const SearchAddress = useCallback(
    () => (
      <Wrapper>
        {webview ? (
          <SearchContainer />
        ) : (
          <>
            <MobileHeader>
              <HeaderButtons position="left">
                <BackButton onClick={handleBackButton} />
              </HeaderButtons>
              <HeaderTitle>주소 검색</HeaderTitle>
            </MobileHeader>
            <Container>
              <SearchContainer />
            </Container>
          </>
        )}
      </Wrapper>
    ),
    [handleBackButton, webview],
  );

  return <SearchAddress />;
}
