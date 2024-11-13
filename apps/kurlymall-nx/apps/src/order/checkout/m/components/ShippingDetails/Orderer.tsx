import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { appendHyphenToPhoneNumber } from '../../../../../shared/services';

import Empty from './Empty';
import { REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE } from '../../../shared/constants/delivery-request-validate-message';

const OrdererInfo = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  name: string;
  phone: string;
  requiredFillReceiverContact: boolean;
}

export default function Orderer({ name, phone, requiredFillReceiverContact }: Props) {
  if (requiredFillReceiverContact) {
    return (
      <OrdererInfo>
        <Empty text={REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE} fontSize={15} lineHeight={20} />
      </OrdererInfo>
    );
  }

  return (
    <OrdererInfo>
      {name}, {appendHyphenToPhoneNumber(phone)}
    </OrdererInfo>
  );
}
