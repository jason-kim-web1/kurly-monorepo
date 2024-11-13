import { INTRODUCE_PATH } from '../../../shared/constant';
import {
  DOMESTIC,
  ECO_ORGANIC_DOMESTIC,
  ECO_ORGANIC_FOREIGN,
  ECO_ORGANIC_TEXT,
  FOREIGN,
} from '../../constants/SubPageContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import CertifyContent from '../../components/m/CertifyContent';
import SymbolIcon from '../../components/m/SymbolIcon';
import { OrganicIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function EcoOrganicContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.ecoOrganic.name}>
        <OrganicIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={ECO_ORGANIC_TEXT}>
        {ECO_ORGANIC_DOMESTIC.map(({ id, imgUrl, title, text }) => (
          <CertifyContent key={id} imgUrl={imgUrl} title={title} text={text} />
        ))}
      </CertifyMarkLayout>
      <CertifyMarkLayout type={FOREIGN}>
        {ECO_ORGANIC_FOREIGN.map(({ id, imgUrl, imgWidthMo, imgHeightMo, title, text }) => (
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
