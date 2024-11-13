import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import ProductInquiryListContainer from '../../../../../src/product/board/inquiry/m/ProductInquiryListContainer';
import { setAccessToken } from '../../../../../src/shared/reducers/auth';
import { extractAuthentication } from '../../../../../src/shared/utils/token';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function ProductInquiryWebviewPage({ accessToken }: WebviewServerSideProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { productNo, productName } = router.query as { productNo: string; productName: string };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const token = extractAuthentication(accessToken);
    dispatch(setAccessToken(token));
  }, [accessToken, dispatch]);

  if (!accessToken || !router.isReady) {
    return null;
  }

  return (
    <Container>
      <ProductInquiryListContainer productNo={Number(productNo)} productName={productName} />
    </Container>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
