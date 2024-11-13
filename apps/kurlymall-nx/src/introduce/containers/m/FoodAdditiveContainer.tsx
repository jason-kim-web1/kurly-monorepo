import { head } from 'lodash';

import { INTRODUCE_PATH } from '../../../shared/constant';
import { FOOD_ADDITIVE } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/m/SymbolIcon';
import { AdditivesFood } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function FoodAdditiveContainer() {
  const foodAdditive = head(FOOD_ADDITIVE);

  if (!foodAdditive) {
    return null;
  }

  const { title, text } = foodAdditive;

  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.foodAdditive.name}>
        <AdditivesFood fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <StandardSubPageLayout title={title} text={text} />
    </>
  );
}
