import type { TextSticker } from '../../../../../../product/types';
import { isBottomCenterTextSticker, isTopLeftTextSticker } from '../../../../../utils/sticker';
import { TopLeftTextSticker } from './TopLeftTextSticker';
import { BottomCenterTextSticker } from './BottomCenterTextSticker';

interface Props {
  sticker: TextSticker;
}

export const TextTypeSticker = ({ sticker }: Props) => {
  const { type } = sticker;
  if (isTopLeftTextSticker(type)) {
    return <TopLeftTextSticker sticker={sticker} />;
  }
  if (isBottomCenterTextSticker(type)) {
    return <BottomCenterTextSticker sticker={sticker} />;
  }
  return null;
};
