import { ReactNode } from 'react';

import styled from '@emotion/styled';

const Button = styled.button({
  border: 'none',
  backgroundColor: 'transparent',
});

const Span = styled.span({
  display: 'flex',
  alignItems: 'center',
});

interface Props {
  onClick(): void;
  type: 'button' | 'submit';
  children: ReactNode;
}

export default function FlexButton({ onClick, type = 'button', children }: Props) {
  return (
    <Button onClick={onClick} type={type}>
      <Span>{children}</Span>
    </Button>
  );
}
