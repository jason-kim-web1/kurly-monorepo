import { memo, ReactNode } from 'react';

import StickerList, { STICKER_SIZE } from './StickerList';

const TagList = ({ children }: { children: ReactNode }) => {
  return <StickerList size={STICKER_SIZE.LARGE}>{children}</StickerList>;
};

export default memo(TagList);
