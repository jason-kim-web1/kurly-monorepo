import styled from '@emotion/styled';

import { BUTTON_TYPE } from '../../../../src/shared/services';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import FavoriteContainer from '../../../../src/mypage/favorite/shared/containers/FavoriteContainer';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

const Container = styled.main`
  min-height: 100vh;
`;

export default function FavoriteListPage() {
  useScreenName(ScreenName.FREQUENTLY_PURCHASE_PRODUCT_HISTORY);

  return (
    <Container>
      <MobileNavigationBar title="자주 사는 상품" leftButtonType={BUTTON_TYPE.back} />
      <AuthContainer loginRequired>
        <FavoriteContainer />
      </AuthContainer>
      <UserMenu />
    </Container>
  );
}
