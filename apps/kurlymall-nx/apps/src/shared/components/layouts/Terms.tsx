import { css } from '@emotion/react';

import RawHTML from './RawHTML';

interface Props {
  className?: string;
  html: string;
  isGuest?: boolean;
}

const termsStyle = css`
  h1 {
    font-size: 18px;
  }
`;

export default function Terms({ className, html }: Props) {
  return <RawHTML className={className} html={html} css={termsStyle} />;
}
