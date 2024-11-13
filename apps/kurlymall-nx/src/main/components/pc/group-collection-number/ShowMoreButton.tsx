import styled from '@emotion/styled';

import Link from 'next/link';

import { ArrowRight } from '../../../../shared/icons';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.a`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 516px;
  height: 56px;
  border-radius: 3px;
  border: solid 1px #e3e3e3;
  cursor: pointer;
`;

const Text = styled.span`
  background-size: 18px 18px;
  font-size: 16px;
  letter-spacing: -0.27px;
  line-height: 15px;
`;

interface Props {
  href: string;
  name: string;
  selectMore(): void;
}

export default function ShowMoreButton({ href, name, selectMore }: Props) {
  return (
    <Link href={href} passHref>
      <Container href={href} onClick={() => selectMore()}>
        <Text>{`${name} 전체보기`}</Text>
        <ArrowRight width={20} height={20} stroke={COLOR.kurlyBlack} />
      </Container>
    </Link>
  );
}
