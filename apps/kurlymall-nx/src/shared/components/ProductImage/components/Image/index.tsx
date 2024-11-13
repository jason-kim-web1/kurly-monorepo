import { css } from '@emotion/react';
import { eq } from 'lodash';

import { AspectRatio } from '../../../AspectRatio';
import NextImage from '../../../NextImage';
import { useProductImageBase } from '../../ProductImageBase';
import { ProductImageType } from '../../constants';
import type { ChildrenOnlyProps } from '../../../../types';

const rootStyle = css`
  &:hover {
    img {
      transform: scale(1.02);
      transition: all 0.3s ease-in-out 0s;
    }
  }
`;

const Image = ({ children }: ChildrenOnlyProps) => {
  const { src, imageMetaData, type, alt } = useProductImageBase();
  const { width, height } = imageMetaData;
  const isProductDetail = eq(type, ProductImageType.PRODUCT_DETAIL);
  return (
    <div css={isProductDetail ? null : rootStyle}>
      <AspectRatio ratio={width / height}>
        <NextImage src={src} layout="fill" objectFit="cover" disableImageDrag alt={alt} />
        {children}
      </AspectRatio>
    </div>
  );
};

export { Image };
