import { INTRODUCE_PATH } from '../../../shared/constant';
import { DOMESTIC, SAFETY_HYGIENE_DOMESTIC, SAFETY_HYGIENE_TEXT } from '../../constants/SubPageContent';
import CertifyContent from '../../components/m/CertifyContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import SymbolIcon from '../../components/m/SymbolIcon';
import { SafetyIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function SafetyHygieneContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.safetyHygiene.name}>
        <SafetyIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={SAFETY_HYGIENE_TEXT}>
        {SAFETY_HYGIENE_DOMESTIC.map(({ id, imgUrl, imgWidthMo, imgHeightMo, title, text }) => (
          <CertifyContent
            key={id}
            imgUrl={imgUrl}
            imgWidth={imgWidthMo}
            imgHeight={imgHeightMo}
            title={title}
            text={text}
          />
        ))}
      </CertifyMarkLayout>
    </>
  );
}
