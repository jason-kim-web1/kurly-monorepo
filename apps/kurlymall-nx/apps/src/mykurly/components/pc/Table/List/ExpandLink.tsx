import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

interface ExpandLinkProps {
  onClick: () => void;
}

const ExpandLink = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export default function TableExpandLink({ children, onClick }: PropsWithChildren<ExpandLinkProps>) {
  return <ExpandLink onClick={onClick}>{children}</ExpandLink>;
}
