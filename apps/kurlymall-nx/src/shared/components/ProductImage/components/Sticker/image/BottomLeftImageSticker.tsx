import { css } from '@emotion/react';

import { ImageSticker } from '../../../../../../product/types';
import NextImage from '../../../../NextImage';
import { AspectRatio } from '../../../../AspectRatio';
import { useProductImageBase } from '../../../ProductImageBase';

const rootStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 172px;
`;

interface Props {
  sticker: ImageSticker;
}

export const BottomLeftImageSticker = ({ sticker }: Props) => {
  const { imageMetaData } = useProductImageBase();
  const { bottomLeftImageSticker } = imageMetaData;
  const { width } = bottomLeftImageSticker;
  const { content } = sticker;
  const { imageUrl, opacity } = content;
  return (
    <div css={rootStyle} style={{ width, opacity }}>
      <AspectRatio ratio={1}>
        <NextImage src={imageUrl} layout="fill" objectFit="cover" disableImageDrag />
      </AspectRatio>
    </div>
  );
};
