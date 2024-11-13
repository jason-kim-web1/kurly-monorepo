import styled from '@emotion/styled';

import { SnsItem } from '../content/footerInfo';

const SnsMenuList = styled.ul`
  display: flex;
`;

const MenuLink = styled.a`
  display: block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface Props {
  menuList: SnsItem[];
}

export default function SnsList({ menuList }: Props) {
  return (
    <SnsMenuList>
      {menuList.map(({ imgPc, link, title }) => (
        <MenuLink key={title} href={link} target="_blank" rel="noreferrer">
          <img src={imgPc} alt={title} />
        </MenuLink>
      ))}
    </SnsMenuList>
  );
}
