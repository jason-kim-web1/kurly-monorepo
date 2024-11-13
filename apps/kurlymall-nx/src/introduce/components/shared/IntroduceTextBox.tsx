import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import ArrowIcon from './ArrowIcon';

const Container = styled.div<{ paddingBottom?: number }>`
  padding-bottom: ${({ paddingBottom }) => (paddingBottom ? paddingBottom : 25)}px;

  &:last-of-type {
    padding-bottom: 0;
  }
`;

const InnerLink = styled.a<{ fontWeight?: number; fontSize?: number }>`
  display: flex;
  align-items: center;
  margin-top: 18px;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${COLOR.kurlyPurple};
`;

interface Props {
  paddingBottom?: number;
  fontWeight?: number;
  fontSize?: number;
  url?: string;
  urlText?: string;
  children: ReactNode;
}

export default function IntroduceTextBox({ paddingBottom, fontWeight, fontSize = 13, url, urlText, children }: Props) {
  return (
    <Container paddingBottom={paddingBottom}>
      {children}
      {url && (
        <InnerLink href={url} fontWeight={fontWeight} fontSize={fontSize}>
          {urlText}
          <ArrowIcon />
        </InnerLink>
      )}
    </Container>
  );
}
