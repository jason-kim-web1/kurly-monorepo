import Link from 'next/link';

import { isEmpty, head } from 'lodash';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

import { PrimaryCategory, CategoryMeta, CategoryKindType, Category } from '../../../shared/reducers/category';

import { useAppSelector } from '../../../shared/store';
import SubMenu from './SubMenu';
import { getCategorySiteLink } from '../../../category/shared/util/link';
import { getSanitizedMainSite, getSanitizedValue } from '../../../shared/utils/getSanitizedValues';

import { zIndex } from '../../../shared/styles';

import COLOR from '../../../shared/constant/colorset';

import { AmplitudeCateogryMenu } from '../../../shared/interfaces/CategoryManu';
import { MAIN_SITE } from '../../../main/constants';
import type { MainSite } from '../../../main/interfaces/MainSection.interface';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';

const fadeIn = (start: number, width: number) => keyframes`
  from {
    width: ${start}px;
  }
  to {
    width: ${width}px;
  }
`;

const MenuListWrapper = styled.div<{ width: number }>`
  position: relative;
  z-index: ${zIndex.fixedHeader};
  width: ${(props) => props.width + 249}px;
  border: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.kurlyWhite};
  animation: ${(props) => fadeIn(249, props.width)} ${(props) => (props.width === 0 ? '0s' : '0.2s')} linear;
`;

const PrimaryMenuList = styled.ul`
  overflow-y: auto;
  width: 247px;
  height: 100%;
  background-color: ${COLOR.kurlyWhite};
  cursor: pointer;
`;

const SubmenuBackground = styled.li<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 247px;
  background-color: ${COLOR.bgLightGray};
  z-index: -1;
  animation: ${(props) => fadeIn(0, props.width)} 0.2s linear;
`;

const CategoryName = styled.span`
  flex: 1;
  padding: 1px 20px 0 10px;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const PrimaryMenuItem = styled.li<{ isActive: boolean }>`
  padding: 7px 0 9px 14px;
  :hover ${CategoryName} {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
  }
  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${COLOR.bgLightGray};
    > a > span {
      font-weight: 500;
      color: ${COLOR.kurlyPurple};
    }
  `}
`;

const CategoryIcon = styled.img`
  flex: 0;
  width: 24px;
  height: 24px;
`;

const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const CategoryBadge = styled.span<{ url: string }>`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 4px 0 0 6px;
  background: url(${(props) => props.url});
  background-size: contain;
  vertical-align: -1px;
`;

const DEFAULT_SUB_MENU_WIDTH = 268;

interface Props {
  categories: PrimaryCategory[];
  categoriesMeta: CategoryMeta;
  onSelectCategory(selectMenu: AmplitudeCateogryMenu): void;
}

export default function PrimaryMenu({ categories, categoriesMeta, onSelectCategory }: Props) {
  const router = useRouter();
  const { query } = router;
  const { site } = query as { site: string };
  const { site: mainApp } = useAppSelector(({ main }) => main);
  const mainSite =
    mainApp === 'BEAUTY'
      ? mainApp
      : getSanitizedValue<MainSite>({
          value: site,
          defaultValue: MAIN_SITE.MARKET,
          fn: getSanitizedMainSite,
        });

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [subMenuWidth, setSubMenuWidth] = useState(0);

  const handleMouseLeaveMenu = () => {
    setHoveredMenu(null);
    setSubMenuWidth(0);
  };

  const handleMenuMouseEnter = (key: string) => {
    setHoveredMenu(key);
  };

  // 우패널 목록
  const visibleSubMenuItems = useMemo(() => {
    return categories?.find((item) => item.code === hoveredMenu)?.subCategoryGroups ?? [];
  }, [hoveredMenu, categories]);

  useEffect(() => {
    if (isEmpty(visibleSubMenuItems)) {
      setSubMenuWidth(0);
      return;
    }

    setSubMenuWidth(DEFAULT_SUB_MENU_WIDTH);
  }, [visibleSubMenuItems]);

  const handleMenuPrimary = (code: string, name: string) => {
    if (name === '선물하기') {
      return;
    }
    onSelectCategory({ eventName: 'select_primary_category', code, name });
  };

  const handlePrimaryMenu = (
    kind: CategoryKindType,
    code: string,
    isShowAll: boolean,
    subCategoryGroups: Category[],
  ) => {
    const targetCode = kind === 'product_category' && !isShowAll ? head(subCategoryGroups)?.code ?? code : code;
    return getCategorySiteLink({ kind, code: targetCode, mainSite });
  };

  return (
    <MenuListWrapper width={subMenuWidth}>
      <PrimaryMenuList onMouseLeave={handleMouseLeaveMenu}>
        <>
          {categories.map(({ kind, code, name, pcIconUrl, pcIconActiveUrl, isNew, subCategoryGroups, isShowAll }) => {
            const isCurrentCategory = hoveredMenu === code;

            return (
              <PrimaryMenuItem isActive={isCurrentCategory} key={code} onMouseEnter={() => handleMenuMouseEnter(code)}>
                <Link href={handlePrimaryMenu(kind, code, isShowAll, subCategoryGroups)}>
                  <Menu onClick={() => handleMenuPrimary(code, name)}>
                    <CategoryIcon src={isCurrentCategory ? pcIconActiveUrl : pcIconUrl} alt={name} />
                    <CategoryName>
                      {name}
                      {isNew && <CategoryBadge url={categoriesMeta.isNew.iconUrl} />}
                    </CategoryName>
                  </Menu>
                </Link>
                {isCurrentCategory && isNotEmpty(visibleSubMenuItems) && (
                  <SubMenu
                    parentKind={kind}
                    parentCode={code}
                    parentName={name}
                    subCategoryGroups={subCategoryGroups}
                    mainSite={mainSite}
                    selectCategory={onSelectCategory}
                  />
                )}
              </PrimaryMenuItem>
            );
          })}
        </>
        <SubmenuBackground width={subMenuWidth} />
      </PrimaryMenuList>
    </MenuListWrapper>
  );
}
