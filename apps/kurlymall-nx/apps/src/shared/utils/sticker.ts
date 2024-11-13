import { chain, eq, get, some } from 'lodash';
import curry from 'lodash/fp/curry';

import {
  ImageSticker,
  SnakeCaseImageSticker,
  SnakeCaseSticker,
  SnakeCaseStickerList,
  SnakeCaseTextSticker,
  Sticker,
  StickerList,
  StickerTypeEnum,
  TextSticker,
} from '../../product/types';
import snakeToCamel from './snakeToCamelCase';
import { isNotNull } from './lodash-extends';

export const isSnakeCaseImageSticker = (sticker: SnakeCaseSticker): sticker is SnakeCaseImageSticker =>
  some([StickerTypeEnum.BOTTOM_LEFT_IMAGE, StickerTypeEnum.BOTTOM_RIGHT_IMAGE], (type) =>
    eq(get(sticker, 'type'), type),
  );

export const isSnakeCaseTextSticker = (sticker: SnakeCaseSticker): sticker is SnakeCaseTextSticker =>
  some([StickerTypeEnum.TOP_LEFT_TEXT, StickerTypeEnum.BOTTOM_CENTER_TEXT], (type) => eq(get(sticker, 'type'), type));

export const isImageSticker = (sticker: Sticker): sticker is ImageSticker =>
  some([StickerTypeEnum.BOTTOM_LEFT_IMAGE, StickerTypeEnum.BOTTOM_RIGHT_IMAGE], (type) =>
    eq(get(sticker, 'type'), type),
  );

export const isTextSticker = (sticker: Sticker): sticker is TextSticker =>
  some([StickerTypeEnum.TOP_LEFT_TEXT, StickerTypeEnum.BOTTOM_CENTER_TEXT], (type) => eq(get(sticker, 'type'), type));

export const isStickerType = curry((type: StickerTypeEnum, target: unknown) => eq(type, target));

export const isTopLeftTextSticker = isStickerType(StickerTypeEnum.TOP_LEFT_TEXT);
export const isBottomCenterTextSticker = isStickerType(StickerTypeEnum.BOTTOM_CENTER_TEXT);
export const isBottomLeftImageSticker = isStickerType(StickerTypeEnum.BOTTOM_LEFT_IMAGE);
export const isBottomRightImageSticker = isStickerType(StickerTypeEnum.BOTTOM_RIGHT_IMAGE);

export const transformSnakeCaseImageSticker = (sticker: SnakeCaseImageSticker): ImageSticker =>
  snakeToCamel<ImageSticker>(sticker);

export const transformSnakeCaseTextSticker = (sticker: SnakeCaseTextSticker): TextSticker =>
  snakeToCamel<TextSticker>(sticker);

export const transformSnakeCaseSticker = (sticker: SnakeCaseSticker): Sticker | null => {
  if (isSnakeCaseImageSticker(sticker)) {
    return transformSnakeCaseImageSticker(sticker);
  }
  if (isSnakeCaseTextSticker(sticker)) {
    return transformSnakeCaseTextSticker(sticker);
  }
  return null;
};

export const transformSnakeCaseStickerList = (stickerList: SnakeCaseStickerList): StickerList =>
  chain(stickerList).map(transformSnakeCaseSticker).filter(isNotNull).value() as StickerList;
