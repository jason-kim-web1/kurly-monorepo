import styled from '@emotion/styled';

import { Checkbox } from '@thefarmersfront/kpds-react';

import DeleteItemButton from './DeleteItemButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: -5px;
  left: 0;
  right: -6px;
`;

const CheckboxWrapper = styled.div`
  padding-top: 2px;
`;

interface Props {
  checked: boolean;
  onDelete: () => void;
  onChange: (checked: boolean) => void;
}

export default function ItemHeader({ checked, onDelete, onChange }: Props) {
  return (
    <Wrapper>
      <CheckboxWrapper>
        <Checkbox checked={checked} onChange={onChange} />
      </CheckboxWrapper>
      <DeleteItemButton onClick={onDelete} />
    </Wrapper>
  );
}
