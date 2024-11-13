import { useMemo } from 'react';

import { REQUEST_NEW_PERSONAL_BOX_TEXT, REQUEST_PERSONAL_BOX_TEXT } from '../constants/requestConstant';

export default function usePersonalBoxAlertText(imageUrl: string | undefined) {
  const message = useMemo(() => {
    if (imageUrl) {
      return REQUEST_NEW_PERSONAL_BOX_TEXT;
    } else {
      return REQUEST_PERSONAL_BOX_TEXT;
    }
  }, [imageUrl]);

  return {
    message,
  };
}
