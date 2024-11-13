import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { LeftButton, RightButton, RightButtonType } from '../constants/mobileWebHeader';
import { ButtonType } from '../../shared/services';

interface MobileWebPropsInterface {
  leftButtonType?: ButtonType;
  onClickLeftButton?: () => void;
  rightButtonTypes?: RightButtonType[];
}

export default function useMobileWebHeaderButton({
  leftButtonType,
  onClickLeftButton,
  rightButtonTypes,
}: MobileWebPropsInterface) {
  const { back } = useRouter();

  const renderLeftButton = useCallback(() => {
    if (!leftButtonType) {
      return null;
    }

    const handleLeftButton = onClickLeftButton ?? back;

    return React.cloneElement(LeftButton[leftButtonType], { onClick: handleLeftButton });
  }, [back, leftButtonType, onClickLeftButton]);

  const renderRightButtons = useCallback(() => {
    return rightButtonTypes?.map((rightButtonType) =>
      React.cloneElement(RightButton[rightButtonType], { key: rightButtonType }),
    );
  }, [rightButtonTypes]);

  return {
    renderLeftButton,
    renderRightButtons,
  };
}
