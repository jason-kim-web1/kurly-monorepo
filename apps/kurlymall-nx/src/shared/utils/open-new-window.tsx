import Alert from '../components/Alert/Alert';
import { encodeQueryString } from './querystring-encoder';

/**
 * 팝업 윈도우 오픈
 *
 * @param { string } url 팝업 윈도우 URL
 * @param { string } name 팝업 윈도우 name
 * @param { ?object } query 팝업 윈도우 query 예) {returnUrl: `${window.location.origin}/order/checkout`}
 * @param { ?object } 팝업 윈도우 옵션 Object 예) {width: 550, height: 800}
 */

interface Props {
  url: string;
  name: string;
  query?: {
    [key: string]: string | number;
  };
  option?: {
    width: number;
    height: number;
  };
  onClose?: () => void;
  onBlockPopup?: () => void;
  onCloseUseInterval?: boolean;
}

export default function openNewWindow({
  url,
  name,
  query,
  option = {
    width: 440,
    height: 700,
  },
  onClose,
  onBlockPopup,
  onCloseUseInterval = false,
}: Props) {
  const { width, height } = option;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const contentsStyle = `
    .swal2-popup {
      width: auto;
    }
  `;

  const features = `menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,innerWidth=${width},innerHeight=${height},width=${width},height=${height},left=${left},top=${top}`;

  const content = window.open(query ? `${url}${encodeQueryString(query)}` : url, name, features);

  if (content === null || typeof content === 'undefined') {
    setTimeout(() => {
      Alert({
        title: '알림메세지',
        text: `팝업이 차단 기능이 설정되어있습니다.
          차단 기능을 해제(팝업허용) 한 후 다시 이용해주십시오.
          팝업 차단 기능을 해제하지 않으면, 정상적인 결제가 이루어지지 않습니다.`,
        contentsStyle,
      }).then(() => {
        if (onBlockPopup) {
          onBlockPopup();
        }
      });
    }, 1000);

    return;
  }

  if (onCloseUseInterval) {
    const interval = window.setInterval(() => {
      if (content == null || content.closed) {
        window.clearInterval(interval);
        if (onClose) {
          onClose();
        }
      }
    }, 1000);
  } else {
    content?.addEventListener('beforeunload', () => {
      if (onClose) {
        onClose();
      }
    });
  }

  return content;
}
