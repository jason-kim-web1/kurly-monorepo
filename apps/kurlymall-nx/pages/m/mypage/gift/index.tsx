import useLoadKakao from '../../../../src/shared/hooks/useLoadKakao';
import { useGiftRelease } from '../../../../src/mypage/gift/shared/hooks/useGiftRelease';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButton from '../../../../src/shared/components/Button/CartButton';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import GiftOrderListContainer from '../../../../src/mypage/gift/shared/containers/list/GiftOrderListContainer';
import Loading from '../../../../src/shared/components/Loading/Loading';
import useHeaderCartIcon from '../../../../src/order/cart/hooks/useHeaderCartIcon';

export default function MypageGiftOrderPage() {
  useLoadKakao();
  const { moveCart, basketCount } = useHeaderCartIcon();
  const { isReleased } = useGiftRelease();

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>선물 내역</HeaderTitle>
        <HeaderButtons position="right">
          <CartButton count={basketCount} onClick={moveCart} color="black" />
        </HeaderButtons>
      </MobileHeader>
      <AuthContainer loginRequired>{isReleased ? <GiftOrderListContainer /> : <Loading />}</AuthContainer>
    </>
  );
}
