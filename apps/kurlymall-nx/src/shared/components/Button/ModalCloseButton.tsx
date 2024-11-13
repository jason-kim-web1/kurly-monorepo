import styled from '@emotion/styled';

import { MouseEvent } from 'react';

import ModalCloseIcon from '../icons/ModalCloseIcon';

const Button = styled.button`
  width: 44px;
  height: 44px;
`;

interface Props {
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ModalCloseButton({ className, onClick }: Props) {
  return (
    <Button className={className} type="button" onClick={onClick}>
      <ModalCloseIcon />
    </Button>
  );
}
