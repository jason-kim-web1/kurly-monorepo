import { ReactNode } from 'react';

import styled from '@emotion/styled';

import SelectionMenu from '../../components/m/SelectionMenu';

const TopMenuContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 44px;
  margin: 0 auto;
  justify-content: flex-end;
`;

interface Props {
  menu: string;
  subMenu?: string;
  children?: ReactNode;
}

export default function IntroduceLayout({ menu, subMenu, children }: Props) {
  return (
    <>
      <TopMenuContainer>
        <SelectionMenu menu={menu} subMenu={subMenu} />
      </TopMenuContainer>
      {children}
    </>
  );
}
