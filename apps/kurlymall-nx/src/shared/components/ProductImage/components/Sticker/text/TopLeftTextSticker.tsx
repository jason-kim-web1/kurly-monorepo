import { css } from '@emotion/react';
import { head } from 'lodash';

import type { TextSticker } from '../../../../../../product/types';
import { hexToRgba } from '../../../../../utils/color';
import { useProductImageBase } from '../../../ProductImageBase';

const rootStyle = css`
  position: absolute;
  border-radius: 4px;
  padding: 6px 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  sticker: TextSticker;
}

export const TopLeftTextSticker = ({ sticker }: Props) => {
  const { content } = sticker;
  const { contents, backgroundOpacity, backgroundColorCode } = content;
  const firstContent = head(contents);
  const { imageMetaData } = useProductImageBase();
  const { topLeftTextSticker } = imageMetaData;
  const {
    position: { top, left },
    padding: { x, y },
    fontStyle,
  } = topLeftTextSticker;
  if (!firstContent) {
    return null;
  }
  const { text, fontColorCode, opacity } = firstContent;
  const backgroundColor = hexToRgba(backgroundColorCode, backgroundOpacity);
  const color = hexToRgba(fontColorCode, opacity);
  return (
    <div css={rootStyle} style={{ backgroundColor, top, left, padding: `${y}px ${x}px` }}>
      <p style={{ color, ...fontStyle }}>{text}</p>
    </div>
  );
};
