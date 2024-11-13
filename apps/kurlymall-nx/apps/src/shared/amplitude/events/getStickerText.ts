import { chain, eq, get, head, some } from 'lodash';

import { Sticker, StickerTypeEnum } from '../../../product/types/sticker';

export function getStickerText(stickers: Sticker[]) {
  return chain(stickers)
    .filter(({ type }) =>
      some([StickerTypeEnum.TOP_LEFT_TEXT, StickerTypeEnum.BOTTOM_CENTER_TEXT], (targetType) => eq(targetType, type)),
    )
    .map((sticker) => get(head(get(sticker, 'content.contents')), 'text'))
    .compact()
    .join('|')
    .value();
}
