import styled from '@emotion/styled';

import { Delete24x24 } from '../../../../../../shared/images';

const Button = styled.button`
  width: 24px;
  height: 24px;
  margin-left: 30px;
`;

const Img = styled.img``;

interface Props {
  onClick(): void;
}

export default function RemoveButton({ onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <Img src={Delete24x24} alt="remove_button" />
    </Button>
  );
}
