import styled from '@emotion/styled';

import CompanyMenuItem from './CompanyMenuItem';
import { CompanyItem } from '../../content/footerInfo';

const CompanyMenuWrap = styled.ul`
  overflow: hidden;
  width: 100%;
  list-style: none;
`;

interface Props {
  menuList: CompanyItem[];
}

export default function CompanyMenu({ menuList }: Props) {
  return (
    <CompanyMenuWrap>
      {menuList.map((menu) => (
        <CompanyMenuItem key={menu.link} menu={menu} />
      ))}
    </CompanyMenuWrap>
  );
}
