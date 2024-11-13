import styled from '@emotion/styled';

import { ForwardedRef, forwardRef } from 'react';

import { zIndex } from '../../styles';
import COLOR from '../../constant/colorset';
import MenuIcon from '../icons/userMenu/MenuIcon';

import { TabName } from '../../amplitude';
import ScrollEventTopButton from '../Scroll/ScrollEventTopButton';
import { useUserMenuButtons } from '../../hooks/useUserMenuButtons';

const Wrapper = styled.div`
  position: fixed;
  z-index: ${zIndex.fixedHeader};
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 45px;
  border-top: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.tabBg};
  @supports (height: constant(safe-area-inset-bottom)) {
    height: calc(45px + constant(safe-area-inset-bottom));
  }
  @supports (height: env(safe-area-inset-bottom)) {
    height: calc(45px + env(safe-area-inset-bottom));
  }
`;

const Gutter = styled.div`
  @supports (height: constant(safe-area-inset-bottom)) {
    height: calc(45px + constant(safe-area-inset-bottom));
  }
  @supports (height: env(safe-area-inset-bottom)) {
    height: calc(45px + env(safe-area-inset-bottom));
  }
`;

interface Props {
  isGutter?: boolean;
  preserveVisibility?: (type: 'IDLE' | 'PRESERVE' | 'TOP') => void;
}

function UserMenu({ preserveVisibility, isGutter = true }: Props, ref: ForwardedRef<HTMLDivElement>) {
  const {
    activeButtonType,
    movePage,
    categoryPath,
    handleClickSearch,
    handleClickHome,
    hasNew,
    isCurrentSearchPage,
    myKurlyPath,
  } = useUserMenuButtons({
    onClickHome: () => {
      preserveVisibility?.('TOP');
    },
  });

  return (
    <>
      <Wrapper ref={ref}>
        <ScrollEventTopButton>
          <MenuIcon active={activeButtonType === 'home'} type="home" onClick={handleClickHome} />
          <MenuIcon
            active={activeButtonType === 'category'}
            type="category"
            onClick={() => movePage(TabName.CATEGORY, categoryPath)}
          />
          <MenuIcon active={isCurrentSearchPage} type="search" onClick={handleClickSearch} />
          <MenuIcon
            active={activeButtonType === 'myPage'}
            type="mykurly"
            onClick={() => movePage(TabName.MY_KURLY, myKurlyPath)}
            badge={hasNew}
          />
        </ScrollEventTopButton>
      </Wrapper>
      {isGutter ? <Gutter /> : null}
    </>
  );
}

export default forwardRef(UserMenu);
