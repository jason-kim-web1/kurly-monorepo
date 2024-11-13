import { useRouter } from 'next/router';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import CancelSuccessContainer from '../../../../../src/mypage/gift/m/cancel/containers/CancelSuccessContainer';

export default function MypageGiftCancelSuccessPage() {
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
        <HeaderTitle>주문 취소 완료</HeaderTitle>
      </MobileHeader>
      <CancelSuccessContainer />
    </>
  );
}
