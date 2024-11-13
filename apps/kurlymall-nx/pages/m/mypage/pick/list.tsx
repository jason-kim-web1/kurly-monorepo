import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import DeliveryLocationContainer from '../../../../src/header/containers/m/DeliveryLocationContainer';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import PickProductsContainer from '../../../../src/mypage/pick/m/containers/PickProductsContainer';

export default function PickListPage() {
  useScreenName(ScreenName.PICK_LIST);
  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>찜한 상품</HeaderTitle>
        <HeaderButtons position="right">
          <DeliveryLocationContainer />
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>
      <AuthContainer loginRequired>
        <PickProductsContainer />
      </AuthContainer>
    </>
  );
}
