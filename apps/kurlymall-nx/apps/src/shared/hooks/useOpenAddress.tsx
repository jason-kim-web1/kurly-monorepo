import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../shared/store';

import { ADDRESS_PATH } from '../../shared/constant';

import openNewWindow from '../../shared/utils/open-new-window';

import { isPC } from '../../../util/window/getDevice';
import { redirectTo } from '../../shared/reducers/page';

export default function useOpenAddress() {
  const dispatch = useDispatch();
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  /**
   * 로그인 : 배송지 변경 페이지 이동
   * 비로그인 : 주소 검색페이지로 이동
   */
  const handleOpenAddress = () => {
    const url = isGuest ? ADDRESS_PATH.add.uri : ADDRESS_PATH.list.uri;

    if (isPC) {
      openNewWindow({
        url,
        name: 'kurly-shipping-address',
        option: {
          width: 530,
          height: 570,
        },
      });
      return;
    }

    dispatch(
      redirectTo({
        url,
      }),
    );
  };

  return handleOpenAddress;
}
