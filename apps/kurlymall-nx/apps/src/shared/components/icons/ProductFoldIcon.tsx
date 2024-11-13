import styled from '@emotion/styled';

import { PcOrderDropButton } from './PcOrderDropButton';

const Button = styled.button`
  border: 0;
  background: none;
  outline: none;
`;

export default function ProductFoldIcon({ expand, onClick }: { expand: boolean; onClick: () => void }) {
  return (
    <Button onClick={onClick} data-testid="fold-button">
      <PcOrderDropButton isOpen={expand} />
    </Button>
  );
}
