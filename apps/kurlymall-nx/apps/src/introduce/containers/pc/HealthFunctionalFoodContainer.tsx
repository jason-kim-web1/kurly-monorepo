import { INTRODUCE_PATH } from '../../../shared/constant';
import { DOMESTIC, HEALTH_FOOD_DOMESTIC, HEALTH_FOOD_TEXT } from '../../constants/SubPageContent';
import CertifyContent from '../../components/pc/CertifyContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { HealthIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function HealthFunctionalFoodContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.healthFunctionalFood.name}>
        <HealthIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={HEALTH_FOOD_TEXT}>
        {HEALTH_FOOD_DOMESTIC.map(({ id, imgUrl, imgWidth, imgHeight, title, text }) => (
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
