import Link from 'next/link';

import styled from '@emotion/styled';

import { arrow20x20x333 } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

const More = styled.a`
  display: flex;
  justify-content: center;
  width: 516px;
  height: 56px;
  margin: 52px auto 0;
  padding-top: 17px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 3px;
  font-size: 16px;
  color: ${COLOR.kurlyBlack};
  line-height: 20px;
  letter-spacing: -0.25px;
  cursor: pointer;
  :after {
    content: '';
    width: 20px;
    height: 20px;
    background: url(${arrow20x20x333}) no-repeat 50% 50%;
  }
`;

interface Props {
  landingUrl: string;
  onSelectMore?(): void;
}

export default function SectionMore({ landingUrl, onSelectMore }: Props) {
  return (
    <Link href={landingUrl} passHref>
      <More onClick={onSelectMore}>전체보기</More>
    </Link>
  );
}
