import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button from '../../../../../../shared/components/Button/Button';

const Container = styled.div``;

const buttonStyle = css`
  margin: 0 auto;
  font-family: 'Noto Sans KR', serif;
`;

interface Props {
  onClick(): void;
  active: boolean;
}

export default function InputOrderProductBottom({ active, onClick }: Props) {
  return (
    <Container>
      <Button text="확인" width={140} height={44} radius={3} disabled={!active} onClick={onClick} css={buttonStyle} />
    </Container>
  );
}
