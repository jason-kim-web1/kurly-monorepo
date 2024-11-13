import { INTRODUCE_PATH } from '../../../shared/constant';
import { JAPANESE_FOOD } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { JapanFood } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function JapaneseFoodContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.japaneseFood.name}>
        <JapanFood fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      {JAPANESE_FOOD.map(({ id, title, text }) => (
        <StandardSubPageLayout key={id} title={title} text={text} />
      ))}
    </>
  );
}
