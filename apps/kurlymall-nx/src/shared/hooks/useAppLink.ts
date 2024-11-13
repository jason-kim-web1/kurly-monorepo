import { useCallback, useState } from 'react';

import { isAos } from '../../../util/window/getDevice';
import { KURLY_APP_STORE_URL_DICTIONARY } from '../constant/deepLink';
import { tryUriScheme } from '../utils/deep-link';
import Confirm from '../components/Alert/Confirm';

function useAppLink(uriScheme?: string) {
  const [isUriSchemeChecking, setIsUriSchemeChecking] = useState(false);

  const moveToStore = useCallback(() => {
    if (isAos) {
      location.assign(KURLY_APP_STORE_URL_DICTIONARY.ANDROID);
    } else {
      location.assign(KURLY_APP_STORE_URL_DICTIONARY.IOS);
    }
  }, []);

  const onClickOpenApp = useCallback(async () => {
    if (!uriScheme) {
      return;
    }

    setIsUriSchemeChecking(true);

    const isMoved = await tryUriScheme(uriScheme);

    setIsUriSchemeChecking(false);

    if (!isMoved) {
      const { isConfirmed } = await Confirm({
        text: '앱이 설치되어있지 않습니다.\n확인을 누르시면 스토어로 이동합니다',
        showRightButton: true,
        leftButtonText: '취소',
        rightButtonText: '확인',
      });
      if (isConfirmed) {
        moveToStore();
      }
    }
  }, [uriScheme, moveToStore]);

  return {
    isUriSchemeChecking,
    moveToStore,
    onClickOpenApp,
  };
}

export default useAppLink;
