import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { DeleteIcon } from '../../images';

interface Props {
  className?: string;
  id: string;
  ariaLabel: string;
  size?: number;
  deleteIcon?: string;
  onClick(): void;
  onMouseDown?(e: MouseEvent<HTMLButtonElement>): void;
}

const DeleteButton = styled.button<{ size: number; deleteIcon: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  /* right: 47px; header에 있는 경우 */
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background: url(${({ deleteIcon }) => deleteIcon}) no-repeat transparent;
  background-size: ${(props) => props.size}px ${(props) => props.size}px;
  border: none;
`;

export default function Delete({
  className,
  size = 16,
  id,
  deleteIcon = DeleteIcon,
  ariaLabel,
  onClick,
  onMouseDown,
}: Props) {
  return (
    <DeleteButton
      className={className}
      onClick={onClick}
      onMouseDown={onMouseDown}
      size={size}
      deleteIcon={deleteIcon}
      id={id}
      tabIndex={-1}
      aria-label={ariaLabel}
      type="button"
    />
  );
}
