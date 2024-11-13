import { ReactNode } from 'react';

import styled from '@emotion/styled';

const Title = styled.h3<{ fontWeight?: number; fontSize?: number; align?: string; marginBottom?: number }>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: 1.5;
  text-align: ${({ align }) => align};
`;

interface Props {
  fontWeight?: number;
  fontSize?: number;
  align?: string;
  marginBottom?: number;
  children?: ReactNode;
}

export default function IntroduceTitle({ fontWeight = 700, fontSize = 14, align, marginBottom = 10, children }: Props) {
  return (
    <Title fontWeight={fontWeight} fontSize={fontSize} align={align} marginBottom={marginBottom}>
      {children}
    </Title>
  );
}
