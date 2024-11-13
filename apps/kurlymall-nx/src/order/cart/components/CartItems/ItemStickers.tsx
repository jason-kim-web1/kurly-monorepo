import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { memo } from 'react';

import StickerList, { STICKER_SIZE } from './StickerList';
import { CartProductMembershipLabel } from '../../interface/CartProduct';

const Wrapper = styled.div`
  margin-bottom: ${vars.spacing.$6};
`;

const Text = styled.span<{ textColor: string; backgroundColor: string; borderColor: string }>`
  ${({ textColor }) =>
    textColor &&
    css`
      color: ${textColor};
    `}

  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}

  ${({ borderColor }) =>
    borderColor &&
    css`
      border: 1px solid ${borderColor};
    `}
`;

const ItemStickers = ({ stickers }: { stickers: CartProductMembershipLabel[] }) => {
  if (isEmpty(stickers)) {
    return null;
  }

  return (
    <Wrapper>
      <StickerList size={STICKER_SIZE.SMALL}>
        {stickers.map(({ text, textColor, backgroundColor, borderColor }) => {
          return (
            <Text key={text} textColor={textColor} backgroundColor={backgroundColor} borderColor={borderColor}>
              {text}
            </Text>
          );
        })}
      </StickerList>
    </Wrapper>
  );
};

export default memo(ItemStickers);
