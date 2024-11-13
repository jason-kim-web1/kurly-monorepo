import { INTRODUCE_PATH } from '../../../shared/constant';
import { FOREIGN, SPECIAL_PRODUCT_FOREIGN, SPECIAL_PRODUCT_TEXT } from '../../constants/SubPageContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import CertifyContent from '../../components/m/CertifyContent';
import SymbolIcon from '../../components/m/SymbolIcon';
import { SpecialIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function SpecialProductContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.specialProduct.name}>
        <SpecialIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <CertifyMarkLayout type={FOREIGN} desc={SPECIAL_PRODUCT_TEXT}>
        {SPECIAL_PRODUCT_FOREIGN.map(({ id, imgUrl, imgWidthMo, imgHeightMo, title, text }) => (
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
