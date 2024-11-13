import { useMemo } from 'react';

import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_PATH } from '../../../shared/constant';
import { INTRODUCE_MENU } from '../../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR.kurlyPurple};
`;

const CurrentLocation = styled.div`
  display: flex;
  font-weight: 500;
`;

const Bracket = styled.span`
  margin: 0 6px;

  &::after {
    content: '>';
  }
`;

interface Props {
  menu: string;
  subMenu?: string;
}

export default function PageLocation({ menu, subMenu }: Props) {
  const parentUrl = useMemo(() => {
    const parentLocation = INTRODUCE_MENU.filter(({ name }) => name === menu);

    return parentLocation[0].url;
  }, [menu]);

  return (
    <Container>
      <Link href={INTRODUCE_PATH.introduce.uri}>컬리소개</Link>
      {subMenu ? (
        <>
          <Bracket />
          <Link href={parentUrl}>{menu}</Link>
          <CurrentLocation>
            <Bracket />
            {subMenu}
          </CurrentLocation>
        </>
      ) : (
        <CurrentLocation>
          <Bracket />
          {menu}
        </CurrentLocation>
      )}
    </Container>
  );
}
