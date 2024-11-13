import styled from '@emotion/styled';

import PlusIcon from '../../shared/icons/PlusIcon';

const Container = styled.button`
  display: flex;
  align-items: center;
  height: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;

  > svg {
    margin-right: 6px;
  }
`;

interface Props {
  name: string;
  onClick: () => void;
}

export default function AddButton({ name, onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <PlusIcon />
      {name}
    </Container>
  );
}
