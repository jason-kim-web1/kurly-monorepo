import { useCallback } from 'react';

import { isPC } from '../../../../../util/window/getDevice';
import { ThumbnailImage } from '../../../../shared/interfaces/MyKurlyStyle';

const deviceType = isPC ? 'PC' : 'MOBILE';

export default function useImageUrl(images: ThumbnailImage[]) {
  const imageUrl = useCallback(() => {
    const image = images.find((item) => item.type === deviceType);
    return image?.url;
  }, [images]);

  return {
    imageUrl,
  };
}
