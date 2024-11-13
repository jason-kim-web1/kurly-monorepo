import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import Accordion from '../../common/components/Accordion';
import BaseWrapper from '../../common/components/BaseWrapper';
import RegularDetailRow from './DetailRow/RegularDetailRow';
import { OrderDetail } from '../interface/OrderDetail';
import useAdditionalInfo from '../hooks/useAdditionalInfo';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
`;

interface Props {
  deliveryMessageTimeType: OrderDetail['receiver']['deliveryMessageTimeType'];
}

const TITLE = '추가정보';

const AdditionalInfo = ({ deliveryMessageTimeType }: Props) => {
  const { isOpen, toggleWithAmplitude, deliveryMessageTimeText } = useAdditionalInfo(deliveryMessageTimeType);

  return (
    <Accordion title={TITLE} isOpen={isOpen} onClick={() => toggleWithAmplitude(TITLE)}>
      <Wrapper>
        {deliveryMessageTimeText && <RegularDetailRow title="메세지 전송 시점" content={deliveryMessageTimeText} />}
        <RegularDetailRow title="미배송 시 조치방법" content="결제수단으로 환불" />
      </Wrapper>
    </Accordion>
  );
};

export default AdditionalInfo;
