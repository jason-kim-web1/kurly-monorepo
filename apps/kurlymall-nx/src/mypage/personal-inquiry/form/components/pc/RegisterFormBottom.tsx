import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 160px;
  height: 56px;
  padding: 0 10px;
  text-align: center;
  letter-spacing: 0;
  border-radius: 3px !important;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  ${({ disabled }) => ({
    backgroundColor: disabled ? '#dddddd' : '#5f0080',
  })};
`;

const buttonStyle = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
`;

interface Props {
  onError(): void;
  active: boolean;
}

export default function RegisterFormBottom({ active, onError }: Props) {
  const handleClickSubmit = () => {
    onError();
  };

  return (
    <Container>
      <Button type="submit" onClick={handleClickSubmit} disabled={!active} css={buttonStyle}>
        등록
      </Button>
    </Container>
  );
}
