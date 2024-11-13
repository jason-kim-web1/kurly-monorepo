import { useCallback, useContext } from 'react';

import { AddressContext } from '../context/addressContext';
import Alert from '../../../shared/components/Alert/Alert';
import { ADDRESS_PATH, MAX_ADDRESS_TEXT } from '../../../shared/constant';

function useIframeAddressHandler() {
  const {
    isFullyData,
    actions: { setShowIframe, setIframeUrl },
  } = useContext(AddressContext);

  const handleShowIframe = useCallback(() => {
    if (isFullyData) {
      Alert({
        text: MAX_ADDRESS_TEXT,
      });

      return;
    }

    setIframeUrl(`${ADDRESS_PATH.add.uri}?isIframe=true`);
    setShowIframe(true);
  }, [isFullyData, setIframeUrl, setShowIframe]);

  const handleModifyIframe = useCallback(
    (addressNo: number) => {
      setIframeUrl(`${ADDRESS_PATH.update.uri}?addressNo=${addressNo}&isMypage=true`);
      setShowIframe(true);
    },
    [setIframeUrl, setShowIframe],
  );

  return {
    isFullyData,
    handleShowIframe,
    handleModifyIframe,
  };
}

export default useIframeAddressHandler;
