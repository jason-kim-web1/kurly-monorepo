import styled from '@emotion/styled';

import PersonalInquiryListContainer from '../../../../src/mypage/personal-inquiry/list/container/PersonalInquiryListContainer';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import PersonalInquiryList from '../../../../src/mypage/personal-inquiry/list/component/mo/PersonalInquiryList';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

const Container = styled.div`
  position: relative;
`;

export default function PersonalInquiryListPage() {
  useScreenName(ScreenName.PERSONAL_INQUIRY_HISTORY);

  return (
    <Container>
      <MobileHeader visibleBanner={false}>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>1:1 문의</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        <PersonalInquiryListContainer>
          <PersonalInquiryList />
        </PersonalInquiryListContainer>
      </AuthContainer>
    </Container>
  );
}
