import 'moment/locale/ko';
import styled from '@emotion/styled';

import GiftStatusArea from '../components/mobile/GiftStatusArea';
import GiftMessageArea from '../components/mobile/Receiver/GiftMessageArea';

const Background = styled.div`
  position: relative;
  overflow: hidden;
  background: url('https://res.kurly.com/kurly/img/2021/gift_received_left.svg') 0 0 no-repeat;
  background-size: 188px 522px;
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    width: 188px;
    height: 522px;
    background: url('https://res.kurly.com/kurly/img/2021/gift_received_right.svg') 100% 0 no-repeat;
    content: '';
  }
`;

export default function InformationContainer() {
  return (
    <Background>
      <GiftStatusArea />
      <GiftMessageArea />
    </Background>
  );
}
