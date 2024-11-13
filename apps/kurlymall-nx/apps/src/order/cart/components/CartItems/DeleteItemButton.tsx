import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Icon } from '@thefarmersfront/kpds-react';

const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

interface Props {
  onClick?: () => void;
}

export default function DeleteItemButton({ onClick }: Props) {
  return (
    <DeleteButton onClick={onClick}>
      <Icon type="Close" size={20} ratio="1:1" fill={vars.color.$gray500} />
    </DeleteButton>
  );
}
