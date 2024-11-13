import styled from '@emotion/styled';

import COLOR from '../../../../../src/shared/constant/colorset';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../../src/shared/containers/m/CartButtonContainer';

import UserMenu from '../../../../../src/shared/components/layouts/UserMenu';

import ListContainer from '../../../../../src/mypage/inquiry/products/containers/shared/ListContainer';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${COLOR.bg};
`;

const MobileMyPageInquiryProductsPage = () => {
  return (
    <Container>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>상품문의</HeaderTitle>
        <HeaderButtons position="right">
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>
      <AuthContainer loginRequired>
        <ListContainer />
      </AuthContainer>
      <UserMenu />
    </Container>
  );
};

export default MobileMyPageInquiryProductsPage;
