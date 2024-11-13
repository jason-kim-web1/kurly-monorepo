import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import PersonalInquiryFormContainer from '../../../../src/mypage/personal-inquiry/form/container/PersonalInquiryFormContainer';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import PersonalInquiryForm from '../../../../src/mypage/personal-inquiry/form/components/mo/PersonalInquiryForm';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

const Container = styled.div`
  padding: 0 0.75rem;
`;

const ORDER_PRODUCT_PAGE_SIZE = 15;

export default function Form() {
  useScreenName(ScreenName.PERSONAL_INQUIRY_WRITING);

  const { query, isReady } = useRouter();

  const { id }: { id?: string } = query;

  return (
    <Container>
      <MobileHeader visibleBanner={false}>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>1:1 문의 작성</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        <PersonalInquiryFormContainer id={Number(id)} orderProductPageSize={ORDER_PRODUCT_PAGE_SIZE}>
          {isReady && <PersonalInquiryForm />}
        </PersonalInquiryFormContainer>
      </AuthContainer>
    </Container>
  );
}
