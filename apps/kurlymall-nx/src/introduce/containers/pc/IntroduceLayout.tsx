import { ReactNode } from 'react';

import styled from '@emotion/styled';

import { KURLY_NAME } from '../../constants';

import PageLocation from '../../components/pc/PageLocation';
import SelectionMenu from '../../components/pc/SelectionMenu';

const Container = styled.div`
  min-width: 1050px;
  margin: 0 auto;
  padding-top: 30px;
  letter-spacing: -0.05em;
`;

const TopMenuContainer = styled.div`
  display: flex;
  position: relative;
  width: 1050px;
  height: 44px;
  margin: 0 auto 20px;
  justify-content: flex-end;
`;

interface Props {
  menu: string;
  subMenu?: string;
  children?: ReactNode;
}

export default function IntroduceLayout({ menu, subMenu, children }: Props) {
  return (
    <Container>
      <TopMenuContainer>
        <SelectionMenu menu={menu} subMenu={subMenu} />
        {menu !== KURLY_NAME && <PageLocation menu={menu} subMenu={subMenu} />}
      </TopMenuContainer>
      {children}
    </Container>
  );
}
