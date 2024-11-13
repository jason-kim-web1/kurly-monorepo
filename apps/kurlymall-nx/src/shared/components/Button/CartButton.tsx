import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';

import CartIcon from '../icons/CartIcon';
import COLOR from '../../constant/colorset';

const Button = styled.button`
  position: relative;
  width: 43px;
  height: 43px;
`;

const Count = styled.span<{ color: 'black' | 'white' }>`
  position: absolute;
  right: 13px;
  top: 11px;
  min-width: 11px;
  padding: 0 2px 0 1px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  box-sizing: content-box;
  letter-spacing: -1px;
  background-color: ${COLOR.kurlyWhite};
  color: ${COLOR.kurlyPurple};

  ::before {
    content: '';
    position: absolute;
    border-radius: 10px;
    top: -2px;
    right: -2px;
    left: -2px;
    bottom: -2px;
    background-color: ${COLOR.kurlyPurple};
    z-index: -1;
  }

  ${({ color }) =>
    color === 'black' &&
    css`
      background-color: ${COLOR.kurlyPurple};
      color: ${COLOR.kurlyWhite};

      ::before {
        background-color: ${COLOR.kurlyWhite};
      }
    `}
`;

const icon = css`
  background-position: left center;
  position: relative;
  z-index: -2;
`;

interface Props {
  className?: string;
  color: 'black' | 'white';
  count: number;
  onClick: () => void;
}

export default forwardRef<HTMLButtonElement, Props>(function CartButton(
  { className, color = 'black', count, onClick }: Props,
  ref,
) {
  return (
    <Button ref={ref} className={className} type="button" onClick={onClick}>
      <CartIcon css={icon} color={color} />
      {count > 0 && <Count color={color}>{count > 99 ? '99+' : count}</Count>}
    </Button>
  );
});

export type { Props as CartButtonProps };
