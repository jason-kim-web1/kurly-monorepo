import { INTRODUCE_PATH } from '../../../shared/constant';
import { DOMESTIC, HEALTH_FOOD_DOMESTIC, HEALTH_FOOD_TEXT } from '../../constants/SubPageContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import CertifyContent from '../../components/m/CertifyContent';
import SymbolIcon from '../../components/m/SymbolIcon';
import { HealthIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function HealthFunctionalFoodContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.healthFunctionalFood.name}>
        <HealthIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={HEALTH_FOOD_TEXT}>
        {HEALTH_FOOD_DOMESTIC.map(({ id, imgUrl, imgWidthMo, imgHeightMo, title, text }) => (
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
