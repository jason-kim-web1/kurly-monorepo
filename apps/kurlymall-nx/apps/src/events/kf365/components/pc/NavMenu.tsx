import styled from '@emotion/styled';

import { Link } from 'react-scroll';

import { speed } from '../../../../shared/styles';

import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import { FreshCertifyInfo, PC_NAV_IMG_URL } from '../../constants';

const Container = styled.div`
  position: sticky;
  top: 56px;
  z-index: 2;
  background-color: #b7afc4;
`;

const NavManu = styled.div`
  overflow: hidden;
  width: 936px;
  height: 65px;
  margin: 0 auto;
  display: flex;
`;

const MenuItem = styled(Link)`
  display: block;
  overflow: hidden;
  width: 468px;
  height: 65px;
  background: url(${PC_NAV_IMG_URL}) no-repeat;
  cursor: pointer;

  &:hover,
  &.active {
    background-position-y: -65px;
  }

  &:last-of-type {
    background-position-x: 100%;
  }
`;

interface Props {
  navigatorMenu: FreshCertifyInfo[];
}

export default function NavMenu({ navigatorMenu }: Props) {
  return (
    <Container>
      <NavManu>
        {navigatorMenu.map(({ id, name }) => (
          <MenuItem key={id} to={id} offset={-120} spy smooth duration={speed.scroll}>
            <ScreenOut>{name}</ScreenOut>
          </MenuItem>
        ))}
      </NavManu>
    </Container>
  );
}
