import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import PersonalInquiryForm from '../../../src/mypage/personal-inquiry/form/components/pc/PersonalInquiryForm';
import PersonalInquiryFormContainer from '../../../src/mypage/personal-inquiry/form/container/PersonalInquiryFormContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import BoardLayout from '../../../src/board/common/BoardLayout';

const ORDER_PRODUCT_PAGE_SIZE = 5;

const Fallback = styled.div`
  width: 100%;
  height: 1050px;
`;

export default function PersonalInquiryFormPage() {
  useScreenName(ScreenName.PERSONAL_INQUIRY_WRITING);

  const { query, isReady } = useRouter();

  const { id }: { id?: string } = query;

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<Fallback />}>
        <BoardLayout title="1:1 문의">
          <PersonalInquiryFormContainer id={Number(id)} orderProductPageSize={ORDER_PRODUCT_PAGE_SIZE}>
            {isReady && <PersonalInquiryForm />}
          </PersonalInquiryFormContainer>
        </BoardLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
