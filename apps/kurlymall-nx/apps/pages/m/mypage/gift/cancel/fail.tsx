import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../../src/shared/store';
import { GIFT_PATH, getPageUrl } from '../../../../../src/shared/constant';

import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import CancelFailContainer from '../../../../../src/mypage/gift/m/cancel/containers/CancelFailContainer';
import { redirectTo } from '../../../../../src/shared/reducers/page';

export default function MypageGiftCancelFailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { failMessage } = useAppSelector(({ mypageGiftCancel }) => mypageGiftCancel);

  const moveBack = () => {
    if (isEmpty(failMessage)) {
      dispatch(
        redirectTo({
          url: getPageUrl(GIFT_PATH.list),
        }),
      );
      return;
    }
    router.back();
  };

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={moveBack} />
        </HeaderButtons>
        <HeaderTitle>주문 취소 실패</HeaderTitle>
      </MobileHeader>
      <CancelFailContainer />
    </>
  );
}
