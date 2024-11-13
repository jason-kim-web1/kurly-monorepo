import Link from 'next/link';

import styled from '@emotion/styled';

import { ReactElement } from 'react';

import { arrowTitle } from '../../../../shared/images';

const Container = styled.a<{ pointer?: boolean }>`
  display: block;
  position: relative;
  display: flex;
  min-height: 48px;
  padding: 8px 0 8px 8px;
  ${({ pointer }) => pointer && 'cursor: pointer;'};
`;

const IconArrow = styled.span`
  position: absolute;
  left: 100%;
  top: 9px;
  width: 32px;
  height: 32px;
  display: flex;
`;

interface Props {
  landingUrl?: string;
  children: ReactElement;
  handleSelectTitle?(): void;
}

export default function SectionHeaderTitle({ children, landingUrl, handleSelectTitle }: Props) {
  if (!landingUrl) {
    return <Container>{children}</Container>;
  }

  return (
    <Link href={landingUrl} passHref prefetch={false}>
      <Container href={landingUrl} pointer onClick={handleSelectTitle}>
        {children}
        <IconArrow>
          <img src={arrowTitle} alt="더보기 아이콘" />
        </IconArrow>
      </Container>
    </Link>
  );
}
