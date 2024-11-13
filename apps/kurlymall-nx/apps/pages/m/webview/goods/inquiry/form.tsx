import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ProductInquiryFormContainer from '../../../../../src/product/board/inquiry/m/form/ProductInquiryFormContainer';
import { extractAuthentication } from '../../../../../src/shared/utils/token';
import { setAccessToken } from '../../../../../src/shared/reducers/auth';
import { modifyProductInquiryForm } from '../../../../../src/product/detail/slice';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';

const Container = styled.div``;

export default function Form({ accessToken }: WebviewServerSideProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { productNo, productName, inquiryId, subject, content, isSecret } = router.query as {
    productNo: string;
    productName: string;
    inquiryId: string;
    subject: string;
    content: string;
    isSecret: string;
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const token = extractAuthentication(accessToken);
    dispatch(setAccessToken(token));
  }, [accessToken, dispatch]);

  const prepareEditMode = useCallback(() => {
    const InquiryIdNumber = Number(inquiryId);

    const isEditMode = router.isReady && InquiryIdNumber > 0;

    if (!isEditMode) {
      return;
    }

    dispatch(
      modifyProductInquiryForm({
        postId: InquiryIdNumber,
        open: true,
        subject,
        content,
        isSecret: isSecret === 'true',
        mode: 'edit',
      }),
    );
  }, [content, dispatch, inquiryId, isSecret, router.isReady, subject]);

  useEffect(() => {
    prepareEditMode();
  }, [prepareEditMode]);

  if (!accessToken) {
    return null;
  }

  return (
    <Container>
      <ProductInquiryFormContainer productNo={Number(productNo)} productName={productName} />
    </Container>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
