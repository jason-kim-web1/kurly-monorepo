import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { INTRODUCE_IMAGE_URL } from '../../constants';

const InnerLink = styled.a<{ marginLeft: number }>`
  margin-left: ${({ marginLeft }) => marginLeft}px;
  padding-right: 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${COLOR.kurlyPurple};
  background: url(${INTRODUCE_IMAGE_URL.icoArrowPurple}) no-repeat 100% 50% / 5px 8px;
`;

interface Props {
  url: string;
  urlText?: string;
  marginLeft?: number;
}

export default function IntroduceMoreLink({ url, urlText, marginLeft = 0 }: Props) {
  return (
    <Link href={url} passHref>
      <InnerLink href={url} marginLeft={marginLeft}>
        {urlText}
      </InnerLink>
    </Link>
  );
}
