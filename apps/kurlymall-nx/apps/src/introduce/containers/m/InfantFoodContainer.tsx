import { head } from 'lodash';

import { INTRODUCE_PATH } from '../../../shared/constant';
import { INFANT_FOOD } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/m/SymbolIcon';
import { InfantFood } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function InfantFoodContainer() {
  const infantFood = head(INFANT_FOOD);

  if (!infantFood) {
    return null;
  }

  const { title, text } = infantFood;

  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.infantFood.name}>
        <InfantFood fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <StandardSubPageLayout title={title} text={text} />
    </>
  );
}
