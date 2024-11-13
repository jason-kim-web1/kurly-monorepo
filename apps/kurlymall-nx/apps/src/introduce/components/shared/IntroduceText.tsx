import { ReactNode } from 'react';

import styled from '@emotion/styled';

const Text = styled.div<{ fontWeight: number; fontSize?: number; align?: string }>`
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: 1.6;
  text-align: ${({ align }) => align};
`;

interface Props {
  fontWeight?: number;
  fontSize?: number;
  align?: string;
  children?: ReactNode;
}

export default function IntroduceText({ fontWeight = 300, fontSize = 14, align, children }: Props) {
  return (
    <Text fontWeight={fontWeight} fontSize={fontSize} align={align}>
      {children}
    </Text>
  );
}
