import { INTRODUCE_PATH } from '../../../shared/constant';
import { GMO_FOOD } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/m/SymbolIcon';
import { GmoFood } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function GmoFoodContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.gmoFood.name}>
        <GmoFood fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      {GMO_FOOD.map(({ id, title, text }) => (
        <StandardSubPageLayout key={id} title={title} text={text} />
      ))}
    </>
  );
}
