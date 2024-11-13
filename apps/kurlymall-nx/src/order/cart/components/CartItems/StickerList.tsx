import styled from '@emotion/styled';

import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

export const STICKER_SIZE = {
  SMALL: 'small',
  LARGE: 'large',
} as const;

export type SizeType = typeof STICKER_SIZE[keyof typeof STICKER_SIZE];

const Wrapper = styled(Typography)<{ isSmallSticker: boolean }>`
  display: flex;

  > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${vars.spacing.$4} ${vars.spacing.$8};
    border-radius: ${vars.radius.$6};
    font-size: ${vars.fontSize.$12};

    > svg {
      margin-right: ${vars.spacing.$2};
    }

    ${({ isSmallSticker }) =>
      isSmallSticker &&
      css`
        padding: 3px ${vars.spacing.$6};
        border-radius: ${vars.radius.$4};
        font-size: ${vars.fontSize.$10};
      `}
  }

  > * + * {
    margin-left: 4px;
  }
`;

interface StickerProps {
  size: SizeType;
  children: ReactNode;
}
export default function StickerList({ size, children }: StickerProps) {
  const isSmallSticker = size === STICKER_SIZE.SMALL;

  return (
    <Wrapper
      isSmallSticker={isSmallSticker}
      as={'span'}
      variant={isSmallSticker ? `$xsmallSemibold` : `$smallSemibold`}
    >
      {children}
    </Wrapper>
  );
}
