import styled from '@emotion/styled';

import COLOR from '../../../constant/colorset';

import {
  HomeMenuIcon,
  HomeMenuActiveIcon,
  CategoryMenuIcon,
  CategoryMenuActiveIcon,
  MyPageMenuIcon,
  MyPageMenuActiveIcon,
  SearchMenuActiveIcon,
  SearchMenuIcon,
} from '../../../images';
import { zIndex } from '../../../styles';

type MenuType = 'home' | 'category' | 'search' | 'mykurly';

const ImageUrl: Record<MenuType, { basic: string; active: string; name: string }> = {
  home: {
    basic: HomeMenuIcon,
    active: HomeMenuActiveIcon,
    name: '홈',
  },
  category: {
    basic: CategoryMenuIcon,
    active: CategoryMenuActiveIcon,
    name: '카테고리',
  },
  search: {
    basic: SearchMenuIcon,
    active: SearchMenuActiveIcon,
    name: '검색',
  },
  mykurly: {
    basic: MyPageMenuIcon,
    active: MyPageMenuActiveIcon,
    name: '마이컬리',
  },
};

const Menu = styled.a<{ active: boolean }>`
  position: relative;
  flex: 1 1 25%;
  overflow: hidden;
  height: 100%;
  padding: 0 16px;
  color: ${({ active }) => (active ? COLOR.kurlyPurple : COLOR.kurlyGray800)};
  z-index: ${zIndex.fixedHeader};
  background-color: ${COLOR.tabBg};
`;

const Image = styled.img`
  display: block;
  margin: 10px auto;
`;

const Badge = styled.i`
  position: absolute;
  left: 64%;
  top: 4px;
  width: 6px;
  height: 6px;
  border: 1px solid ${COLOR.loversTag};
  border-radius: 5px;
  background-color: ${COLOR.loversTag};
`;

interface Props {
  type: MenuType;
  active: boolean;
  badge?: boolean;
  onClick: () => void;
}

export default function MenuIcon({ type, active, onClick, badge }: Props) {
  return (
    <Menu active={active} onClick={onClick}>
      <Image src={ImageUrl[type][active ? 'active' : 'basic']} alt={ImageUrl[type].name} />
      {badge && <Badge />}
    </Menu>
  );
}
