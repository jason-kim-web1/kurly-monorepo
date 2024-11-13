import { ButtonHTMLAttributes, memo } from 'react';
import { css } from '@emotion/react';

import styled from '@emotion/styled';

import EventIcon from '../../../../shared/components/icons/EventIcon';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const CategoryButton = styled.button<{
  color?: string;
  active?: boolean;
}>(
  ({ active, color = COLOR.kurlyPurple, disabled = false }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 48px;
    border-radius: 4px;
    border: 1px solid ${COLOR.kurlyGray250};
    font-size: 14px;
    font-weight: 600;

    ${isPC &&
    css`
      font-weight: 500;
    `}

    ${active &&
    css`
      color: ${COLOR.kurlyWhite};
      background: ${color};
      border-color: ${color};
    `}

    ${disabled &&
    css`
      color: ${COLOR.lightGray};
      border-color: ${COLOR.kurlyGray250};
    `}
  `,
);

const eventIconStyle = css`
  position: absolute;
  right: 10px;
  top: -7px;
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  active: boolean;
  color?: string;
  disabled?: boolean;
  hasEvent?: boolean;
  onClick(): void;
}

function PaymentMethodCategoryButton({
  className,
  testId,
  children,
  active,
  color,
  hasEvent,
  disabled = false,
  onClick,
}: Props) {
  return (
    <CategoryButton
      type="button"
      className={className}
      data-testid={testId}
      color={color}
      active={active}
      onClick={onClick}
      disabled={disabled}
    >
      {hasEvent && <EventIcon css={eventIconStyle} />}
      {children}
    </CategoryButton>
  );
}

export default memo(PaymentMethodCategoryButton);
