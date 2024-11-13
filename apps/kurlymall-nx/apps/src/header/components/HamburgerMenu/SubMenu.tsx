import Link from 'next/link';

import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

import { Category, CategoryKindType } from '../../../shared/reducers/category';

import { zIndex } from '../../../shared/styles';
import COLOR from '../../../shared/constant/colorset';
import { getCategorySiteLink } from '../../../category/shared/util/link';
import { MainSite } from '../../../main/interfaces/MainSection.interface';

import { AmplitudeCateogryMenu } from '../../../shared/interfaces/CategoryManu';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SubMenuList = styled.ul`
  width: 266px;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: -1px;
  left: 249px;
  z-index: ${zIndex.headerMenu};
  animation: ${fadeIn} 0.5s linear;
`;

const SubMenuItem = styled.li`
  cursor: pointer;
`;

const MenuLink = styled.div`
  padding: 11px 20px 11px 18px;
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  line-height: 22px;
  :hover {
    > span {
      box-shadow: inset 0px -1px 0px 0px ${COLOR.kurlyPurple};
      font-weight: 500;
      color: ${COLOR.kurlyPurple};
    }
  }
`;

const SubCategoryName = styled.span`
  line-height: 18px;
`;

interface Props {
  parentCode: string;
  parentKind: CategoryKindType;
  parentName: string;
  mainSite: MainSite;
  subCategoryGroups: Category[];
  selectCategory(selectMenu: AmplitudeCateogryMenu): void;
}

export default function SubMenu({
  parentCode,
  parentName,
  parentKind,
  mainSite,
  subCategoryGroups,
  selectCategory,
}: Props) {
  const onSelectMenu = (subCode: string, subName: string) => {
    selectCategory({ eventName: 'select_category', code: parentCode, name: parentName, subCode, subName });
  };

  return (
    <SubMenuList>
      {subCategoryGroups.map(({ kind, code, name }) => (
        <SubMenuItem key={code} onClick={() => onSelectMenu(code, name)}>
          <Link href={getCategorySiteLink({ kind, code, mainSite, parent: { kind: parentKind, code: parentCode } })}>
            <MenuLink>
              <SubCategoryName>{name}</SubCategoryName>
            </MenuLink>
          </Link>
        </SubMenuItem>
      ))}
    </SubMenuList>
  );
}
