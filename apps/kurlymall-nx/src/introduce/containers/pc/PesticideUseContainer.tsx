import { head } from 'lodash';

import { INTRODUCE_PATH } from '../../../shared/constant';
import { PESTICIDE_USE } from '../../constants/SubPageContent';
import StandardSubPageLayout from './StandardSubPageLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { PesticideUse } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function PesticideUseContainer() {
  const pesticideUse = head(PESTICIDE_USE);

  if (!pesticideUse) {
    return null;
  }

  const { title, text } = pesticideUse;

  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.pesticideUse.name}>
        <PesticideUse fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      <StandardSubPageLayout title={title} text={text} />
    </>
  );
}
