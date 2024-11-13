import type { Sticker as StickerType } from '../../../../../product/types';
import { isImageSticker, isTextSticker } from '../../../../utils/sticker';
import { TextTypeSticker } from './text';
import { ImageTypeSticker } from './image';

interface Props {
  sticker: StickerType;
}

export const Sticker = ({ sticker }: Props) => {
  if (isTextSticker(sticker)) {
    return <TextTypeSticker sticker={sticker} />;
  }
  if (isImageSticker(sticker)) {
    return <ImageTypeSticker sticker={sticker} />;
  }
  return null;
};
