import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import Accordion from '../../common/components/Accordion';
import BaseWrapper from '../../common/components/BaseWrapper';
import RegularDetailRow from './DetailRow/RegularDetailRow';
import { OrderDetail } from '../interface/OrderDetail';
import BoldDetailRow from './DetailRow/BoldDetailRow';
import useOrderInfo from '../hooks/useOrderInfo';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
`;

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
  ordererName: OrderDetail['ordererName'];
  paymentCompletedAt: OrderDetail['paymentCompletedAt'];
}
const TITLE = '주문정보';

const OrderInfo = ({ groupOrderNo, ordererName, paymentCompletedAt }: Props) => {
  const { isOpen, toggleWithAmplitude, formattedPaymentCompletedAt } = useOrderInfo(paymentCompletedAt);

  return (
    <Accordion
      title={TITLE}
      isOpen={isOpen}
      onClick={() => {
        toggleWithAmplitude(TITLE);
      }}
    >
      <Wrapper>
        <BoldDetailRow title="주문번호" content={groupOrderNo} />
        <RegularDetailRow title="보내는분" content={ordererName} />
        <RegularDetailRow title="결제 일시" content={formattedPaymentCompletedAt} />
      </Wrapper>
    </Accordion>
  );
};

export default OrderInfo;
