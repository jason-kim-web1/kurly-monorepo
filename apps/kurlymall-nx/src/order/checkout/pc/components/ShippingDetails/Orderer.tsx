import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { appendHyphenToPhoneNumber } from '../../../../../shared/services';

const OrdererInfo = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${COLOR.kurlyGray600};
  line-height: 24px;
`;

interface Props {
  name: string;
  phone: string;
}

export default function Orderer({ name, phone }: Props) {
  if (!name && !phone) {
    return null;
  }

  return (
    <OrdererInfo>
      {name}, {appendHyphenToPhoneNumber(phone)}
    </OrdererInfo>
  );
}
