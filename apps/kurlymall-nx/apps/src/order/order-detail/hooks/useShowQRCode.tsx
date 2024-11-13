import { useEffect } from 'react';
import { isFunction } from 'lodash';

import useToggle from '../../checkout/shared/hooks/useToggle';
import QRCodeAlert from '../components/PickupInfo/QRCodeAlert';
import { ImageFormat } from '../../../../@types/images';

interface Props {
  qrImage: string | null;
  qrImageType: ImageFormat | null;
  text?: string;
  callback?: () => void;
}

export default function useShowQRCode({ qrImage, qrImageType, text, callback }: Props) {
  const { isOpen: isShow, open, close } = useToggle(false);

  useEffect(() => {
    if (!isShow || !qrImage || !qrImageType) {
      return;
    }

    close();

    (async () => {
      await QRCodeAlert({
        text,
        qrImage,
        qrImageType,
      });

      if (isFunction(callback)) {
        callback();
      }
    })();
  }, [callback, close, isShow, qrImage, qrImageType, text]);

  const showQRCode = () => {
    open();
  };

  return {
    showQRCode,
  };
}
