import styled from '@emotion/styled';

import { ReactNode } from 'react';

import COLOR from '../../../shared/constant/colorset';

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 50px;
  color: ${COLOR.kurlyPurple};
`;

const Title = styled.h3`
  padding-top: 15px;
  font-weight: 500;
  font-size: 15px;
`;

interface Props {
  title: string;
  children: ReactNode;
}

export default function SymbolIcon({ title, children }: Props) {
  return (
    <IconBox>
      {children}
      <Title>{title}</Title>
    </IconBox>
  );
}
