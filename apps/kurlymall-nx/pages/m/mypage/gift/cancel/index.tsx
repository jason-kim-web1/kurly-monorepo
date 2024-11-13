import { useRouter } from 'next/router';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import CancelContainer from '../../../../../src/mypage/gift/m/cancel/containers/CancelContainer';

export default function MypageGiftCancelPage() {
  const router = useRouter();

  const moveBack = () => {
    router.back();
  };

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={moveBack} />
        </HeaderButtons>
        <HeaderTitle>주문 취소</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        <CancelContainer />
      </AuthContainer>
    </>
  );
}
