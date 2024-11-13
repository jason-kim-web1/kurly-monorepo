import { INTRODUCE_PATH } from '../../../shared/constant';
import {
  AREA_PRODUCER_DOMESTIC,
  AREA_PRODUCER_FOREIGN,
  AREA_PRODUCER_TEXT,
  DOMESTIC,
  FOREIGN,
} from '../../constants/SubPageContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import CertifyContent from '../../components/m/CertifyContent';
import SymbolIcon from '../../components/m/SymbolIcon';
import { ProducerIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function AreaProducerContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.areaProducer.name}>
        <ProducerIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={AREA_PRODUCER_TEXT}>
        {AREA_PRODUCER_DOMESTIC.map(({ id, imgUrl, title, text }) => (
          <CertifyContent key={id} imgUrl={imgUrl} title={title} text={text} />
        ))}
      </CertifyMarkLayout>
      <CertifyMarkLayout type={FOREIGN}>
        {AREA_PRODUCER_FOREIGN.map(({ id, imgUrl, imgWidthMo, imgHeightMo, title, text }) => (
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
