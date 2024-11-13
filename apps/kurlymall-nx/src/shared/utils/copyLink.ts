import Alert from '../../shared/components/Alert/Alert';
import setClipboard from '../../shared/utils/copy-string';
import { isWebview } from '../../../util/window/getDevice';
import appService from '../../shared/services/app.service';

const DEFAULT_SUCCESS_COPY_LINK_TEXT = '링크가 복사되었습니다.';
const DEFAULT_FAIL_COPY_LINK_TEXT = '링크 복사에 실패 했습니다.';

interface CopyLinkProps {
  link: string;
  successCopyLinkText?: string;
  failCopyLinkText?: string;
}

export default function copyLink({
  link,
  successCopyLinkText = DEFAULT_SUCCESS_COPY_LINK_TEXT,
  failCopyLinkText = DEFAULT_FAIL_COPY_LINK_TEXT,
}: CopyLinkProps) {
  if (!link) {
    Alert({
      text: failCopyLinkText,
    });
    return;
  }

  setClipboard(link);

  if (isWebview()) {
    appService.postToast({
      type: 'success',
      title: successCopyLinkText,
    });
    return;
  }

  Alert({
    text: successCopyLinkText,
  });
}
