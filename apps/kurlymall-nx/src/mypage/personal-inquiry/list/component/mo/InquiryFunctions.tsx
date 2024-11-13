import styled from '@emotion/styled';
import { MouseEvent } from 'react';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Button = styled.button({
  padding: '0 7px',
  border: 'none',
  fontSize: '14px',
  color: '#999999',
  backgroundColor: 'transparent',
});

const Divider = styled.div({
  width: '1px',
  height: '12px',
  backgroundColor: '#eeeeee',
});

interface Props {
  className?: string;
  onClickUpdate(): void;
  onClickDelete(): void;
}

export default function InquiryFunctions({ className, onClickUpdate, onClickDelete }: Props) {
  const handleClickUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClickUpdate();
  };

  const handleClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClickDelete();
  };

  return (
    <Container className={className}>
      <Button onClick={handleClickUpdate} type="button">
        수정
      </Button>
      <Divider />
      <Button onClick={handleClickDelete} type="button">
        삭제
      </Button>
    </Container>
  );
}
