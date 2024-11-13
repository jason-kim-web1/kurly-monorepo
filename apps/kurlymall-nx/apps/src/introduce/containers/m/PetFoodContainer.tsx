import { head } from 'lodash';

import { INTRODUCE_PATH } from '../../../shared/constant';
import { PET_FOOD } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/m/SymbolIcon';
import { PetFood } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function PetFoodContainer() {
  const petFood = head(PET_FOOD);

  if (!petFood) {
    return null;
  }

  const { title, text } = petFood;

  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.petFood.name}>
        <PetFood fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <StandardSubPageLayout title={title} text={text} />
    </>
  );
}
