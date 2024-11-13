import styled from '@emotion/styled';

import {
  BENEFIT_02_TEXT,
  CARD_DESIGN_TITLE_TEXT,
  PLCC_EVENT_NOTICE,
  MAIN_IMAGE_TEXT,
  BENEFIT_01_TEXT,
} from '../../shared/alternativeText';
import { bgColor01, bgColor02, bgColor03 } from '../../shared/constant';
import CardSlide from '../components/cardSlide';
import PlccBox from '../components/plccBox';
import PlccBtn from '../components/PlccBtn';

const Wrapper = styled.div`
  font-family: 'AppleSDGothicNeo';
  padding-bottom: 160px;
  background-color: ${bgColor03};
  button {
    display: block;
    width: 480px;
    height: 72px;
    margin: 0 auto;
  }
`;

export default function PlccEventContainer() {
  return (
    <Wrapper>
      <PlccBox height="28.4vw" backgroundColor={bgColor01} src="pc/202403/pc-01.jpg" alt={MAIN_IMAGE_TEXT} />
      <PlccBox height="56.3vw" backgroundColor={bgColor01} src="pc/202407/pc-02.jpg" alt={BENEFIT_01_TEXT} />
      <PlccBox height="33.7vw" backgroundColor={bgColor01} src="pc/202403/pc-03.jpg" alt={BENEFIT_02_TEXT} />
      <PlccBox height="12.2vw" backgroundColor={bgColor02} src="pc/pc-05.jpg" alt={CARD_DESIGN_TITLE_TEXT} />
      <CardSlide />
      <PlccBox height="42.9vw" backgroundColor={bgColor03} src="pc/202407/pc-06.jpg" alt={PLCC_EVENT_NOTICE} />
      <PlccBtn />
    </Wrapper>
  );
}
