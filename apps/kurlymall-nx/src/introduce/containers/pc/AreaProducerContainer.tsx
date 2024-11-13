import { INTRODUCE_PATH } from '../../../shared/constant';
import {
  AREA_PRODUCER_DOMESTIC,
  AREA_PRODUCER_FOREIGN,
  AREA_PRODUCER_TEXT,
  DOMESTIC,
  FOREIGN,
} from '../../constants/SubPageContent';
import CertifyContent from '../../components/pc/CertifyContent';
import CertifyMarkLayout from './CertifyMarkLayout';
import SymbolIcon from '../../components/pc/SymbolIcon';
import { ProducerIcon } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

export default function AreaProducerContainer() {
  return (
    <>
      <SymbolIcon title={INTRODUCE_PATH.areaProducer.name}>
        <ProducerIcon fillBg={COLOR.kurlyPurple} fill={COLOR.kurlyWhite} width={56} height={56} />
      </SymbolIcon>
      <CertifyMarkLayout type={DOMESTIC} desc={AREA_PRODUCER_TEXT}>
        {AREA_PRODUCER_DOMESTIC.map(({ id, imgUrl, title, text }) => (
          <CertifyContent key={id} imgUrl={imgUrl} title={title} text={text} />
        ))}
      </CertifyMarkLayout>
      <CertifyMarkLayout type={FOREIGN}>
        {AREA_PRODUCER_FOREIGN.map(({ id, imgUrl, imgWidth, imgHeight, title, text }) => (
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
