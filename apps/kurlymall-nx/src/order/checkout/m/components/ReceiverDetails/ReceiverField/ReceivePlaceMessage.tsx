import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../../../shared/constant/colorset';
import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../../../shared/enums';
import { getReceivePlaceMessage, getVisibleListStyle } from '../../../../shared/utils/getReceivePlaceMessage';

import CommonIconInfo from '../../../../../../shared/components/icons/CommonIconInfo';

const Container = styled.div`
  margin: 20px 0 14px;
  padding: 16px;
  border-radius: 6px;
  background-color: rgba(95, 0, 128, 0.04);
`;

const Title = styled.strong`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  padding-bottom: 5px;
  color: ${COLOR.kurlyPurple};
  span {
    margin-right: 5px;
  }
`;

const Text = styled.li<{ visibleListStyle: boolean }>`
  position: relative;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyPurple};
  margin-bottom: 2px;

  ${({ visibleListStyle }) =>
    visibleListStyle &&
    css`
      padding-left: 13px;
      ::before {
        content: '';
        position: absolute;
        top: 9px;
        left: 0;
        width: 3px;
        height: 3px;
        background-color: ${COLOR.loversLavender};
        border-radius: 50%;
      }
    `}
`;

interface Props {
  receivePlace: ReceivePlace;
  frontDoorMethod: FrontDoorMethod;
  pickupDetailCategory: PickupDetailCategory;
}

export default function ReceivePlaceMessage({ receivePlace, frontDoorMethod, pickupDetailCategory }: Props) {
  const messages = getReceivePlaceMessage(receivePlace, frontDoorMethod, pickupDetailCategory);
  const visibleListStyle = getVisibleListStyle(messages);

  return (
    <Container>
      <Title>
        <CommonIconInfo />
        확인해주세요!
      </Title>
      <ul>
        {messages.map((message) => (
          <Text key={message} visibleListStyle={visibleListStyle}>
            {message}
          </Text>
        ))}
      </ul>
    </Container>
  );
}
