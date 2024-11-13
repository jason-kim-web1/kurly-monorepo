import { Alert } from '@thefarmersfront/kpds-react';

import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import setClipboard from '../../../shared/utils/copy-string';

const DEFAULT_SUCCESS_COPY_LINK_TEXT = '링크가 복사되었습니다.';
const DEFAULT_FAIL_COPY_LINK_TEXT = '링크 복사에 실패 했습니다.';

interface Args {
  text: string;
  messageOnSuccess?: string;
  messageOnFailure?: string;
}

export default function copyText({
  text,
  messageOnSuccess = DEFAULT_SUCCESS_COPY_LINK_TEXT,
  messageOnFailure = DEFAULT_FAIL_COPY_LINK_TEXT,
}: Args) {
  if (!text) {
    Alert({
      contents: messageOnFailure,
    });
    return;
  }

  setClipboard(text);

  if (isWebview()) {
    appService.postToast({
      type: 'success',
      title: messageOnSuccess,
    });
    return;
  }

  Alert({
    contents: messageOnSuccess,
  });
}
