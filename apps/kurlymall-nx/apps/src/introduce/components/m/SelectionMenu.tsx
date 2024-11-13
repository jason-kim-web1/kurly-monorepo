import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { startsWith } from 'lodash';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Link from 'next/link';

import COLOR from '../../../shared/constant/colorset';
import NextImage from '../../../shared/components/NextImage';

import { DEFAULT_ACTIVE_NAME, INTRODUCE_IMAGE_URL, INTRODUCE_MENU } from '../../constants';

import SelectionMenuText from '../shared/SelectionMenuText';
import SelectionMenuDepth from './SelectionMenuDepth';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  color: ${COLOR.kurlyBlack};
`;

const DimdLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.5);
`;

const MenuSelection = styled.button<{ menuOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding-left: 20px;
  line-height: 44px;
  background-color: ${COLOR.kurlyGray150};
  color: ${COLOR.kurlyPurple};
  ${({ menuOpened }) =>
    menuOpened &&
    css`
      background-color: ${COLOR.kurlyGray100};
    `}
  -webkit-tap-highlight-color: transparent;
`;

const ArrowIcon = styled.span<{ menuOpened: boolean }>`
  position: relative;
  width: 44px;
  height: 44px;
  transition: transform 0.25s ease-out;
  transform: rotate(${({ menuOpened }) => (menuOpened ? 0 : '180deg')});
`;

const MenuList = styled.ul<{ menuOpened: boolean }>`
  position: relative;
  z-index: 1;
  overflow: auto;
  height: ${({ menuOpened }) => (menuOpened ? '52vh' : 0)};
  background-color: ${COLOR.kurlyWhite};
  box-shadow: 0 0 20px 0 ${COLOR.lightGray};
  transition: ease-in-out 0.5s;
`;

const MenuItem = styled.li`
  margin: 0 10px;
  border-bottom: 1px solid ${COLOR.lightGray};

  &:last-of-type {
    border-bottom: 0 none;
  }
`;

const InnerLink = styled.a`
  display: flex;
  padding: 18px 5px 18px 10px;
  font-size: 16px;

  &:hover {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
  }
  &:hover > :not(.active)::before {
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${COLOR.kurlyPurple};
    content: '';
  }
`;

interface Props {
  menu: string;
  subMenu?: string;
}

export default function SelectionMenu({ menu, subMenu }: Props) {
  const router = useRouter();

  const [menuOpened, setMenuOpened] = useState(false);
  const [menuSelected, setMenuSelected] = useState(subMenu ? subMenu : menu);

  const handleClickMenu = useCallback(() => {
    setMenuOpened(!menuOpened);
  }, [menuOpened]);

  const handleClickSelected = useCallback((name: string) => {
    setMenuSelected(name);
  }, []);

  const handleClickDimdLayer = useCallback(() => {
    setMenuOpened(false);
  }, []);

  const activeName = useMemo(() => {
    const activeOption = INTRODUCE_MENU.find((it) => startsWith(`/m${it.url}`, router.pathname));

    if (!activeOption) {
      return DEFAULT_ACTIVE_NAME;
    }
    return activeOption.name;
  }, [router.pathname]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleClickDimdLayer);
    return () => {
      router.events.off('routeChangeStart', handleClickDimdLayer);
    };
  }, [handleClickDimdLayer, router.events]);

  return (
    <Container>
      <MenuSelection onClick={handleClickMenu} menuOpened={menuOpened}>
        {menuSelected}
        <ArrowIcon menuOpened={menuOpened}>
          <NextImage src={INTRODUCE_IMAGE_URL.icoArrowOn} layout="fill" objectFit="cover" alt={'메뉴 펼치기/접기'} />
        </ArrowIcon>
      </MenuSelection>
      <MenuList menuOpened={menuOpened}>
        {INTRODUCE_MENU.map(({ id, name, url, subMenuInfo, isExternalLink }) => (
          <MenuItem key={id}>
            <Link href={url} passHref>
              <InnerLink
                href={url}
                target={isExternalLink ? '_blank' : '_self'}
                rel="noreferrer"
                onClick={() => handleClickSelected(name)}
              >
                <SelectionMenuText activeName={activeName} name={name} id={id} isExternalLink={isExternalLink} />
              </InnerLink>
            </Link>
            {subMenuInfo && <SelectionMenuDepth subMenuInfo={subMenuInfo} onClick={handleClickSelected} />}
          </MenuItem>
        ))}
      </MenuList>
      {menuOpened && <DimdLayer onClick={handleClickDimdLayer} />}
    </Container>
  );
}
