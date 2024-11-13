import { MYPAGE_ORDER_NO_SUCCESS_MESSAGE } from '../../checkout/shared/constants/copy-alert-message';
import copyText from '../utils/copyText';

export function useClickCopyOrderNo() {
  const handleClickCopyOrderNo = (groupOrderNo: number) => {
    copyText({
      text: groupOrderNo.toString(),
      messageOnSuccess: MYPAGE_ORDER_NO_SUCCESS_MESSAGE,
    });
  };

  return { handleClickCopyOrderNo: (groupOrderNo: number) => handleClickCopyOrderNo(groupOrderNo) };
}
