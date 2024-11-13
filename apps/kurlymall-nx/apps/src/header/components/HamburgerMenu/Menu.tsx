import styled from '@emotion/styled';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectCategory } from '../../../shared/amplitude/events';
import { AmplitudeCateogryMenu } from '../../../shared/interfaces/CategoryManu';

import PrimaryMenu from './PrimaryMenu';

import { useAppSelector } from '../../../shared/store';
import { currentSiteCategorySelector } from '../../../shared/reducers/category';

const MenuContainer = styled.div`
  max-height: calc(95vh - 55px);
  min-height: 200px;
  position: absolute;
  display: flex;
  top: 46px;
  padding-top: 10px;
`;

export default function Menu() {
  const { categories, categoriesMeta } = useAppSelector(currentSiteCategorySelector);

  const selectCategory = (selectMenu: AmplitudeCateogryMenu) => {
    amplitudeService.logEvent(new SelectCategory({ selectMenu }));
  };

  return (
    <MenuContainer>
      <PrimaryMenu categories={categories} categoriesMeta={categoriesMeta} onSelectCategory={selectCategory} />
    </MenuContainer>
  );
}
