import { INTRODUCE_PATH } from '../../../shared/constant';
import { DOMESTIC, ECO_PLANTATION_DOMESTIC, ECO_PLANTATION_TEXT } from '../../constants/SubPageContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import CertifyContent from '../../components/m/CertifyContent';
import SymbolIcon from '../../components/m/SymbolIcon';
import { GrowthIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function EcoPlantationBreedingContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.ecoPlantationBreeding.name}>
        <GrowthIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={ECO_PLANTATION_TEXT}>
        {ECO_PLANTATION_DOMESTIC.map(({ id, imgUrl, title, text }) => (
          <CertifyContent key={id} imgUrl={imgUrl} title={title} text={text} />
        ))}
      </CertifyMarkLayout>
    </>
  );
}
