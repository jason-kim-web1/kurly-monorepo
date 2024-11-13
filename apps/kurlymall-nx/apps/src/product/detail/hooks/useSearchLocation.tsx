import { useDispatch } from 'react-redux';

import Confirm, { closeConfirm } from '../../../shared/components/Alert/Confirm';

import { isPC } from '../../../../util/window/getDevice';
import { ADDRESS_PATH, getPageUrl } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import openNewWindow from '../../../shared/utils/open-new-window';

export default function useSearchLocation() {
  const dispatch = useDispatch();

  const openLocationSearchPopup = () => {
    if (isPC) {
      openNewWindow({
        url: ADDRESS_PATH.add.uri,
        name: 'kurly-shipping-address',
        option: {
          width: 530,
          height: 570,
        },
      });
      return;
    }

    dispatch(redirectTo({ url: getPageUrl(ADDRESS_PATH.add) }));
  };

  const handleClickConfirm = () => {
    closeConfirm();
    openLocationSearchPopup();
  };

  const searchUserLocation = () => {
    Confirm({
      text: '상품 구매를 위한 배송지를 설정해주세요',
      leftButtonText: '취소',
      rightButtonText: '주소검색',
      showRightButton: true,
      onClickLeftButton: () => closeConfirm(),
      onClickRightButton: () => handleClickConfirm(),
    });
  };

  return { searchUserLocation };
}
