import { INTRODUCE_PATH } from '../../../shared/constant';
import {
  DOMESTIC,
  FOREIGN,
  PRODUCTION_PROCESS_DOMESTIC,
  PRODUCTION_PROCESS_FOREIGN,
  PRODUCTION_PROCESS_TEXT,
} from '../../constants/SubPageContent';
import CertifyContent from '../../components/pc/CertifyContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { ProcessIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function ProductionProcessContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.productionProcess.name}>
        <ProcessIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={PRODUCTION_PROCESS_TEXT}>
        {PRODUCTION_PROCESS_DOMESTIC.map(({ id, imgUrl, imgWidth, imgHeight, title, text }) => (
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
      <CertifyMarkLayout type={FOREIGN}>
        {PRODUCTION_PROCESS_FOREIGN.map(({ id, imgUrl, imgWidth, imgHeight, title, text }) => (
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
