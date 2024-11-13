import {
  ANIMATION_CHANGE_RATIO,
  ANIMATION_START_RATIO,
  CHIP_THUMB_WRAPPER_HEIGHT,
  CHIP_THUMBNAIL_IMAGE_SIZE,
  CIRCLE_THUMB_WRAPPER_HEIGHT,
  CIRCLE_THUMBNAIL_IMAGE_SIZE,
  THUMB_CHANGE_SCROLL_RANGE,
} from '../collections/constants';

// 썸네일 컬렉션에 관련된 css 정보를 리턴하는 custom hook
export const useThumbCollection = () => {
  const opacity = {
    input: [
      0,
      THUMB_CHANGE_SCROLL_RANGE * ANIMATION_START_RATIO,
      THUMB_CHANGE_SCROLL_RANGE * ANIMATION_CHANGE_RATIO,
      THUMB_CHANGE_SCROLL_RANGE,
    ],
    output: [1, 1, 0, 1],
  };

  const imageSize = {
    input: [
      THUMB_CHANGE_SCROLL_RANGE * ANIMATION_CHANGE_RATIO,
      THUMB_CHANGE_SCROLL_RANGE * ANIMATION_CHANGE_RATIO + 0.1,
    ],
    output: [CIRCLE_THUMBNAIL_IMAGE_SIZE, CHIP_THUMBNAIL_IMAGE_SIZE],
  };

  const wrapHeight = {
    input: [THUMB_CHANGE_SCROLL_RANGE * ANIMATION_START_RATIO, THUMB_CHANGE_SCROLL_RANGE],
    output: [CIRCLE_THUMB_WRAPPER_HEIGHT, CHIP_THUMB_WRAPPER_HEIGHT],
  };

  return { opacity, imageSize, wrapHeight };
};
