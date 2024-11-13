import { getContentWithReplaceStyles } from '../../../shared/utils/get-content-with-replace-styles';

import { DeliveryNotice } from '../interface/DeliveryNotice';

export default function getDeliveryNoticeContents(noticeContents: DeliveryNotice) {
  const { replaceStyles, basicStyle, subText } = noticeContents;
  const deliveryText = getContentWithReplaceStyles({ text: noticeContents.text, replaceStyles });

  return { basicStyle, subText, deliveryText };
}
