import { INTRODUCE_PATH } from '../../../shared/constant';
import { DOMESTIC, SAFETY_HYGIENE_DOMESTIC, SAFETY_HYGIENE_TEXT } from '../../constants/SubPageContent';
import CertifyContent from '../../components/pc/CertifyContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { SafetyIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function SafetyHygieneContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.safetyHygiene.name}>
        <SafetyIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={SAFETY_HYGIENE_TEXT}>
        {SAFETY_HYGIENE_DOMESTIC.map(({ id, imgUrl, imgWidth, imgHeight, title, text }) => (
          <CertifyContent
            key={id}
            imgUrl={imgUrl}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            title={title}
            text={text}
          />
        ))}
      </CertifyMarkLayout>
    </>
  );
}
