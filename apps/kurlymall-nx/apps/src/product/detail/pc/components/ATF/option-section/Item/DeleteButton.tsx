import styled from '@emotion/styled';

import { DealDelete24x24 } from '../../../../../../../shared/images';

const Button = styled.button`
  width: 24px;
  height: 24px;
`;

interface Props {
  onClick(): void;
}

export default function DeleteButton({ onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <img src={DealDelete24x24} alt="삭제 버튼" />
    </Button>
  );
}
