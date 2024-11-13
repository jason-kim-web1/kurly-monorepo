import { INTRODUCE_PATH } from '../../../shared/constant';
import { FOREIGN, SPECIAL_PRODUCT_FOREIGN, SPECIAL_PRODUCT_TEXT } from '../../constants/SubPageContent';
import CertifyContent from '../../components/pc/CertifyContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { SpecialIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function SpecialProductContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.specialProduct.name}>
        <SpecialIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      <CertifyMarkLayout type={FOREIGN} desc={SPECIAL_PRODUCT_TEXT}>
        {SPECIAL_PRODUCT_FOREIGN.map(({ id, imgUrl, imgWidth, imgHeight, title, text }) => (
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
