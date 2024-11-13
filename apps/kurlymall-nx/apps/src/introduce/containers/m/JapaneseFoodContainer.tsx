import { INTRODUCE_PATH } from '../../../shared/constant';
import { JAPANESE_FOOD } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/m/SymbolIcon';
import { JapanFood } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function JapaneseFoodContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.japaneseFood.name}>
        <JapanFood fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      {JAPANESE_FOOD.map(({ id, title, text }) => (
        <StandardSubPageLayout key={id} title={title} text={text} />
      ))}
    </>
  );
}
