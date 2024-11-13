import styled from '@emotion/styled';
import { cloneDeep } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { useCategoriesPageQueries } from '../../categories/Context/CategoriesDataProvider';
import { useSiblingCategory } from '../../categories/hook/useSiblingCategory';
import { LoadingSiblingMenu } from './LoadingList';

const MenuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 180px);
  grid-gap: 16px 83px;
  gap: 16px 83px;
  overflow: hidden;
  margin-top: 28px;
  padding: 30px 40px;
  border: 1px solid ${COLOR.kurlyGray250};
  line-height: 20px;
`;

const MenuItem = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MenuLink = styled.a<{ isCurrent: boolean }>`
  letter-spacing: -1px;
  cursor: pointer;
  ${({ isCurrent }) => (isCurrent ? `font-weight: 700; color: ${COLOR.kurlyPurple};` : '')}
  &:hover {
    font-weight: 700;
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  parentCategoryNo: string;
  isShowAll: boolean;
  onMenuChange: (code: string, name: string) => void;
}

export default function Menu({ parentCategoryNo, isShowAll, onMenuChange }: Props) {
  const { categoryNo: code } = useCategoriesPageQueries();
  const { data: siblingCategoriesData, isLoading: siblingCategoryLoading } = useSiblingCategory({
    categoryNo: parentCategoryNo,
  });

  if (siblingCategoryLoading) {
    return <LoadingSiblingMenu />;
  }

  if (!siblingCategoriesData) {
    return null;
  }

  const siblingCategories = cloneDeep(siblingCategoriesData);

  if (isShowAll) {
    siblingCategories?.unshift({
      code: parentCategoryNo,
      name: '전체보기',
    });
  }

  return (
    <MenuList>
      {siblingCategories.map((it) => (
        <MenuItem key={it.code}>
          <MenuLink isCurrent={it.code === code} onClick={() => onMenuChange(it.code, it.name)}>
            {it.name}
          </MenuLink>
        </MenuItem>
      ))}
    </MenuList>
  );
}
