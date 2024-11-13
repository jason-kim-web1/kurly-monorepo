import styled from '@emotion/styled';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../shared/store';

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
`;

const MessageArea = styled.div`
  overflow: hidden;
  padding: 15px 16px;
  margin: 0 auto;
  min-height: 78px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  background: #faf3ff;
`;

const Message = styled.blockquote`
  padding-top: 10px;
  font-size: 14px;
  line-height: 19px;
  color: #333;
  word-break: break-word;
`;

const Giver = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: #5f0080;
`;

const GiftDate = styled.div`
  padding-top: 6px;
  font-size: 12px;
  line-height: 20px;
  color: #666;
`;

export default function GiftMessageArea() {
  const { ordererName, message, giftSentDateTime } = useSelector(({ gift }: AppState) => gift.receiver);

  return (
    <Wrapper>
      <MessageArea>
        <Giver>FROM. {ordererName}</Giver>
        {message && <Message>{message}</Message>}
        <GiftDate>선물발신일 {moment(giftSentDateTime).format('ll')}</GiftDate>
      </MessageArea>
    </Wrapper>
  );
}
