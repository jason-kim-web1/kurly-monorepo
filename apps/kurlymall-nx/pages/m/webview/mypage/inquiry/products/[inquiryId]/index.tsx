import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import COLOR from '../../../../../../../src/shared/constant/colorset';

import AuthContainer from '../../../../../../../src/shared/components/Auth/AuthContainer';
import FormContainer from '../../../../../../../src/mypage/inquiry/productsDetail/containers/m/FormContainer';
import LoadingForm from '../../../../../../../src/mypage/inquiry/productsDetail/components/m/LoadingForm';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${COLOR.bg};
`;

const MyPageInquiryProductsFormPage = () => {
  const { isReady } = useRouter();
  return (
    <Container>
      <AuthContainer loginRequired>{isReady ? <FormContainer /> : <LoadingForm />}</AuthContainer>
    </Container>
  );
};

export default MyPageInquiryProductsFormPage;
