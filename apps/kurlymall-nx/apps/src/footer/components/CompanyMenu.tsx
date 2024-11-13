import styled from '@emotion/styled';

import { CompanyItem } from '../content/footerInfo';

const CompanyList = styled.ul`
  display: flex;
  width: 100%;
  padding-bottom: 29px;
`;

const MenuItem = styled.li`
  margin-left: 14px;
  &.bold {
    font-weight: 500;
  }
  &:first-of-type {
    margin-left: 0;
  }
`;

const MenuLink = styled.a`
  font-size: 14px;
  line-height: 18px;
`;

interface Props {
  menuList: CompanyItem[];
}

export default function CompanyMenu({ menuList }: Props) {
  return (
    <CompanyList>
      {menuList.map(({ title, link, isExternalLink, isBold }) => (
        <MenuItem key={title} className={isBold ? 'bold' : ''}>
          <MenuLink href={link} target={isExternalLink ? '_blank' : '_self'}>
            {title}
          </MenuLink>
        </MenuItem>
      ))}
    </CompanyList>
  );
}
