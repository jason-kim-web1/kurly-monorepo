import { ImageSticker } from '../../../../../../product/types';
import { BottomLeftImageSticker } from './BottomLeftImageSticker';
import { BottomRightImageSticker } from './BottomRightImageSticker';
import { isBottomLeftImageSticker, isBottomRightImageSticker } from '../../../../../utils/sticker';

export interface ImageTypeStickerProps {
  sticker: ImageSticker;
}

export const ImageTypeSticker = ({ sticker }: ImageTypeStickerProps) => {
  const { type } = sticker;
  if (isBottomLeftImageSticker(type)) {
    return <BottomLeftImageSticker sticker={sticker} />;
  }
  if (isBottomRightImageSticker(type)) {
    return <BottomRightImageSticker sticker={sticker} />;
  }
  return null;
};
