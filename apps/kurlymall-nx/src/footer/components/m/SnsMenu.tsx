import styled from '@emotion/styled';

import SnsListItem from './SnsMenuItem';

import { SnsItem } from '../../content/footerInfo';

const SnsMenu = styled.ul`
  display: flex;
  padding-top: 12px;
`;

interface Props {
  menuList: SnsItem[];
}

export default function SnsList({ menuList }: Props) {
  return (
    <SnsMenu>
      {menuList.map((menu) => (
        <SnsListItem key={menu.link} menu={menu} />
      ))}
    </SnsMenu>
  );
}
