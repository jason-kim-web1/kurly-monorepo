import { useEffect, useRef, useState } from 'react';

import { isNull } from 'lodash';

import styled from '@emotion/styled';

import { Link } from 'react-scroll';

import { speed } from '../../../../shared/styles';

import { useAppSelector } from '../../../../shared/store';

import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import { kurlyFreshImgUrl, NavigatorMenu } from '../../constants';

const NavWrapper = styled.div<{ headerHeight: number }>`
  position: sticky;
  top: ${({ headerHeight }) => headerHeight}px;
  z-index: 10;
`;

const NavManu = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const MenuItem = styled(Link)`
  flex: 1;
  height: 100%;
`;

const NavImg = styled.img`
  width: 100%;
`;

interface Props {
  webview: boolean;
  navigatorMenu: NavigatorMenu[];
}

export default function NavMenu({ webview, navigatorMenu }: Props) {
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);

  const imgRef = useRef<HTMLImageElement>(null);

  const [scrollOffset, setScrollOffset] = useState(0);

  const [navImgIndex, setNavImgIndex] = useState(1);

  const headerHeight = webview ? 0 : mobileHeaderHeight;

  const menuActive = (to: string, id: string, index: number) => {
    return to === id && setNavImgIndex(index + 1);
  };

  useEffect(() => {
    if (isNull(imgRef.current)) {
      return;
    }
    setScrollOffset(imgRef.current.clientHeight + headerHeight);
  }, [headerHeight]);

  return (
    <NavWrapper headerHeight={headerHeight}>
      <NavImg ref={imgRef} src={`${kurlyFreshImgUrl}/m/tab_menu${navImgIndex}_v1.jpg`} alt="KF365 성적서 메뉴" />
      <NavManu>
        {navigatorMenu.map(({ id, name }, index) => (
          <MenuItem
            key={id}
            to={id}
            spy
            smooth
            offset={-scrollOffset}
            duration={speed.scroll}
            onSetActive={(to) => menuActive(to, id, index)}
          >
            <ScreenOut>{name}</ScreenOut>
          </MenuItem>
        ))}
      </NavManu>
    </NavWrapper>
  );
}
