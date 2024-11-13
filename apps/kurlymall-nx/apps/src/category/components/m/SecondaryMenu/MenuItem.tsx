import { PropsWithChildren } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { vars } from '@thefarmersfront/kpds-css';

const Wrapper = styled.p`
  padding: 0.625rem 0.5rem;
  border-radius: 0.5rem;
  background-color: ${vars.color.background.$background1};
  transition: background-color 0.2s ease-out;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:active {
    background-color: ${vars.color.main.$secondaryContainer};
  }
`;

const linkStyle = css`
  display: block;

  :not(:last-of-type) {
    margin-bottom: ${vars.spacing.$4};
  }
`;

export default function MenuItem({
  children,
  link,
  onClick,
}: PropsWithChildren<{ link: string; onClick: () => void }>) {
  return (
    <Link href={link} passHref>
      <a href={link} onClick={onClick} css={linkStyle}>
        <Wrapper>{children}</Wrapper>
      </a>
    </Link>
  );
}
