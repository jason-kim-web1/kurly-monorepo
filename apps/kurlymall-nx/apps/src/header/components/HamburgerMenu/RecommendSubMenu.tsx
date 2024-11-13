import Link from 'next/link';

import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

import { PrimaryCategory } from '../../../shared/reducers/category';
import { getCategorySiteLink } from '../../../category/shared/util/link';
import COLOR from '../../../shared/constant/colorset';
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

const SubMenuList = styled.li`
  position: absolute;
  left: 247px;
  top: 0px;
  width: 535px;
  height: 100%;
  padding: 20px 0 0 21px;
  animation: ${fadeIn} 0.5s linear;
`;

const InnerSubMenuList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100;
  overflow-y: auto;
  height: 100%;
`;

const SubMenuItem = styled.div`
  flex: 0 0 126px;
  height: 142px;
  padding: 0 10px 0 0;
`;

const MenuTitle = styled.span`
  font-size: 14px;
  line-height: 18px;
`;

const Menu = styled.div`
  cursor: pointer;
  &:hover > ${MenuTitle} {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
    text-decoration: underline;
  }
`;

const ThumbnailImage = styled.img`
  display: block;
  width: 116px;
  height: 88px;
  margin-bottom: 8px;
`;

interface Props {
  mainSite: MainSite;
  categories: PrimaryCategory[];
  selectCategory(selectMenu: AmplitudeCateogryMenu): void;
}

export default function RecommendSubMenu({ categories, mainSite, selectCategory }: Props) {
  const onSelectMenu = (code: string, name: string) => {
    selectCategory({ eventName: 'select_category', code, name, isRecommend: true });
  };

  return (
    <SubMenuList>
      <InnerSubMenuList>
        {categories.map(({ kind, code, name, thumbnailUrl }) => (
          <SubMenuItem key={code} onClick={() => onSelectMenu(code, name)}>
            <Link href={getCategorySiteLink({ kind, code, mainSite })}>
              <Menu>
                <ThumbnailImage alt={name} src={thumbnailUrl} />
                <MenuTitle>{name}</MenuTitle>
              </Menu>
            </Link>
          </SubMenuItem>
        ))}
      </InnerSubMenuList>
    </SubMenuList>
  );
}
