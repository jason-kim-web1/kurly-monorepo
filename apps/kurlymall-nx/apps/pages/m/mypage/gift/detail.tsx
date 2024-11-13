import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import GiftOrderDetailContainer from '../../../../src/mypage/gift/shared/containers/detail/GiftOrderDetailContainer';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';

export default function MypageGiftOrderDetailPage() {
  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>선물 내역 상세</HeaderTitle>
        <HeaderButtons position="right">
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>

      <GiftOrderDetailContainer />
    </>
  );
}
