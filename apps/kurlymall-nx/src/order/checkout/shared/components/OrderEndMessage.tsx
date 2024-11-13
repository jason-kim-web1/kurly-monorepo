import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import SuccessIcon from '../../../../shared/components/icons/cart/SuccessIcon';
import { DisplayMessage } from '../../../../shared/interfaces/Payments';
import OrderEndDisplayMessage from './OrderEndDisplayMessage';

const Wrapper = styled.div`
  padding: 30px 0 12px;
  text-align: center;
`;

const Message = styled.div`
  padding-top: 24px;
  font-size: 18px;
  line-height: 26px;
`;

const NameMessage = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;

export default function OrderEndMessage({
  name,
  displayMessages,
}: {
  name: string;
  displayMessages: DisplayMessage[];
}) {
  return (
    <Wrapper>
      <SuccessIcon />
      <Message>
        <NameMessage>{`${name}님의 주문이 완료되었습니다.`}</NameMessage>
        {!isEmpty(displayMessages) &&
          displayMessages.map((displayMessage, index) => (
            <OrderEndDisplayMessage key={index} displayMessage={displayMessage} />
          ))}
      </Message>
    </Wrapper>
  );
}
