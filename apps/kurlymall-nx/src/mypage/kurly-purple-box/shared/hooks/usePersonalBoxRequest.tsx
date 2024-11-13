import { useCallback, useState } from 'react';

import { last } from 'lodash';

import useToggle from '../../../../order/checkout/shared/hooks/useToggle';

type Image = {
  id: string | number;
  url: string;
  file?: File;
};

export default function usePersonalBoxRequest(images: Image[]) {
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen, toggle } = useToggle();

  const hasImage = images.length > 0;
  const uploadImageFile = last(images)?.file ?? '';
  const imageSrc = last(images)?.url ?? '';

  const handleChangeTermState = () => {
    setIsChecked(!isChecked);
  };
  const handleOpenZoomImageLayer = useCallback(() => {
    if (hasImage) {
      toggle();
    }
  }, [hasImage, toggle]);

  return {
    hasImage,
    isOpen,
    toggle,
    isChecked,
    handleChangeTermState,
    handleOpenZoomImageLayer,
    imageSrc,
    uploadImageFile,
  };
}
