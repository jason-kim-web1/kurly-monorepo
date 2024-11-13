import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../../../shared/constant/colorset';
import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../../../shared/enums';
import { getReceivePlaceMessage, getVisibleListStyle } from '../../../../shared/utils/getReceivePlaceMessage';

import CommonIconInfo from '../../../../../../shared/components/icons/CommonIconInfo';

const Container = styled.div`
  margin: 12px 0;
  padding: 16px;
  border-radius: 4px;
  background-color: rgba(95, 0, 128, 0.04);
`;

const Title = styled.strong`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  padding-bottom: 5px;
  font-weight: 500;
  color: ${COLOR.kurlyPurple};
  span {
    margin-right: 5px;
  }
`;

const Text = styled.li<{ visibleListStyle: boolean }>`
  position: relative;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyPurple};
  margin-bottom: 4px;

  ${({ visibleListStyle }) =>
    visibleListStyle &&
    css`
      padding-left: 13px;
      ::before {
        content: '';
        position: absolute;
        top: 7px;
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
