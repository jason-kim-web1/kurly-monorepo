import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Button = styled.button({
  padding: '6px 10px',
  border: 'none',
  fontSize: '13px',
  color: COLOR.kurlyGray450,
  backgroundColor: 'transparent',
});

const Divider = styled.div({
  width: '1px',
  height: '12px',
  backgroundColor: COLOR.kurlyGray200,
});

interface Props {
  className?: string;
  onClickUpdate(): void;
  onClickDelete(): void;
}

export default function InquiryFunctions({ className, onClickUpdate, onClickDelete }: Props) {
  return (
    <Container className={className}>
      <Button onClick={onClickUpdate} type="button">
        수정
      </Button>
      <Divider />
      <Button onClick={onClickDelete} type="button">
        삭제
      </Button>
    </Container>
  );
}
