import { MouseEvent } from 'react';

import styled from '@emotion/styled';

const Container = styled.div({
  padding: '30px 0 42px 0',
});

interface ButtonProps {
  disabled: boolean;
}

const Button = styled.button(({ disabled }: ButtonProps) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: disabled ? '#dddddd' : '#5f0080',
  color: 'white',
  height: '3.25rem',
  borderRadius: '6px !important',
  fontSize: '0.938rem',
  border: disabled ? '1px solid #dddddd' : '',
}));

interface Props {
  onError(): void;
  active: boolean;
}

export default function InquirySubmitButton({ onError, active }: Props) {
  const handleClickSubmit = (e: MouseEvent) => {
    onError();
    e.stopPropagation();
  };

  return (
    <Container>
      <Button type="submit" onClick={handleClickSubmit} disabled={!active}>
        등록하기
      </Button>
    </Container>
  );
}
