import styled from '@emotion/styled';

import { MouseEvent } from 'react';

import CloseIcon from '../icons/CloseIcon';

const Button = styled.button`
  width: 43px;
  height: 43px;
`;

interface Props {
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function CloseButton({ className, onClick }: Props) {
  return (
    <Button className={className} type="button" onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}
