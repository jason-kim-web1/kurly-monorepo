import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import Alert from '../../../shared/components/Alert/Alert';
import { ADDRESS_PATH, MAX_ADDRESS_LIST_LENGTH, MAX_ADDRESS_TEXT } from '../../../shared/constant';
import openNewWindow from '../../../shared/utils/open-new-window';
import { MYPAGE_ADDRESS_QUERY_KEY } from './useAddressListQuery';
import { updateChangeCurrentAddress } from '../../../shared/services/shippingAddress.service';

export default function useAddressHandler() {
  const queryClient = useQueryClient();

  const openWindow = (url: string) => {
    openNewWindow({
      url,
      name: 'kurly-shipping-address',
      option: {
        width: 530,
        height: 570,
      },
    });
  };

  const onUpdateRecentAddress = useCallback(
    async (no: number, isChecked = false) => {
      if (isChecked) {
        return;
      }
      await updateChangeCurrentAddress(no);
      await Alert({
        text: '배송지 선택이 완료 되었습니다',
      });
      await queryClient.invalidateQueries(MYPAGE_ADDRESS_QUERY_KEY);
    },
    [queryClient],
  );

  const openAddressModify = (no: number) => {
    const url = `${ADDRESS_PATH.update.uri}?addressNo=${no}&isMypage=true`;
    openWindow(url);
  };

  const openInsertAddress = (addressLength = 0) => {
    if (addressLength >= MAX_ADDRESS_LIST_LENGTH) {
      Alert({
        text: MAX_ADDRESS_TEXT,
      });

      return;
    }

    const url = ADDRESS_PATH.add.uri;
    openWindow(url);
  };

  return {
    onUpdateRecentAddress,
    openAddressModify,
    openInsertAddress,
  };
}
