import styled from '@emotion/styled';
import { useState } from 'react';

import { useAppSelector } from '../../../../../shared/store';

import ReceiverNotice from './ReceiverNotice';
import Collapse from '../../../../../shared/components/Collapse/Collapse';
import { Divider } from '../../../../../shared/components/Divider/Divider';

const Wrapper = styled.div`
  position: relative;
  padding: 0 20px 20px;
`;

const Info = styled.dl`
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5;
  padding-top: 13px;
  display: flex;
  flex-direction: row;
  dt {
    width: 104px;
    margin-right: 16px;
    white-space: nowrap;
    color: #666;
  }
  dd {
    font-weight: 400;
    color: #333;
    word-break: break-all;
  }
`;

const MessageArea = styled.div`
  overflow: hidden;
  padding: 16px 20px;
  margin-top: 13px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  background: #faf3ff;
`;

const Message = styled.blockquote`
  padding-top: 11px;
  font-size: 14px;
  line-height: 19px;
  color: #333;
  word-break: break-word;
`;

const ReceiverName = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: #5f0080;
`;

export default function Receiver() {
  const { message, recipientName, notificationType } = useAppSelector(({ mypageGift }) => mypageGift.orderDetails);
  const method = notificationType === 'SMS' ? '연락처' : '카카오톡';
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <Collapse title="받으실 분 정보" summary="" onClick={() => setToggle((value: boolean) => !value)} opened={toggle}>
        <Wrapper>
          <Info>
            <dt>받으실 분</dt>
            <dd>
              {recipientName} ({method})
            </dd>
          </Info>
          {message && (
            <MessageArea>
              <ReceiverName>TO. {recipientName}</ReceiverName>
              <Message>{message}</Message>
            </MessageArea>
          )}
        </Wrapper>
      </Collapse>
      <Divider />
      <ReceiverNotice />
      <Divider />
    </>
  );
}
