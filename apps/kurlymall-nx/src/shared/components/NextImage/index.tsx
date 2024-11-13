import Image, { ImageProps } from 'next/image';
import { css } from '@emotion/react';
import { isFunction, isEmpty } from 'lodash';

import { SyntheticEvent, useState, useEffect } from 'react';

import imageLoader from '../../utils/image-loader';
import { NoMainImageLogo } from '../../images';

const imageDisSelectStyle = css`
  user-select: none;
  -webkit-user-drag: none;
`;

interface Props extends ImageProps {
  disableImageDrag?: boolean;
  fallbackImageSrc?: string;
}

const NextImage = ({
  disableImageDrag = false,
  fallbackImageSrc = NoMainImageLogo,
  onError,
  src,
  alt = '',
  ...otherProps
}: Props) => {
  const [internalSrc, setInternalSrc] = useState(src);
  const handleErrorCapture = (event: SyntheticEvent<HTMLImageElement>) => {
    setInternalSrc(fallbackImageSrc);
    if (!isFunction(onError)) {
      return;
    }
    onError(event);
  };

  useEffect(() => {
    setInternalSrc(src);
  }, [src]);

  if (isEmpty(internalSrc)) {
    return null;
  }

  return (
    <Image
      alt={alt}
      src={internalSrc}
      loader={imageLoader}
      css={disableImageDrag ? imageDisSelectStyle : {}}
      onErrorCapture={handleErrorCapture}
      {...otherProps}
    />
  );
};

export default NextImage;
