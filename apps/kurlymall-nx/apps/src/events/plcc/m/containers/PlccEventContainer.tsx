import styled from '@emotion/styled';

import { isWebview } from '../../../../../util/window/getDevice';

import { zIndex } from '../../../../shared/styles';
import PlccBox from '../../pc/components/plccBox';
import PlccBtn from '../../pc/components/PlccBtn';
import {
  BENEFIT_02_TEXT,
  CARD_DESIGN_TITLE_TEXT,
  PLCC_EVENT_NOTICE,
  MAIN_IMAGE_TEXT,
  BENEFIT_01_TEXT,
} from '../../shared/alternativeText';
import { bgColor01, bgColor02, bgColor03 } from '../../shared/constant';
import CardSlide from '../components/cardSlide';

/** ios safeArea 대응위한 bottom value 계산 */
const getBottom = () => (isWebview() ? 'env(safe-area-inset-bottom)' : `calc(45px + env(safe-area-inset-bottom))`);

const Wrapper = styled.div`
  font-family: 'AppleSDGothicNeo';
  background-color: ${bgColor03};
`;

const FloatingArea = styled.div`
  position: sticky;
  bottom: ${getBottom()};
  width: 100vw;
  z-index: ${zIndex.floatingButton};
  button {
    width: 100vw;
    height: 15vw;
    padding: 0;
    border-radius: 0;
    span {
      font-size: 4.4vw;
    }
  }
`;

export default function PlccEventContainer() {
  return (
    <Wrapper>
      <PlccBox height="120vw" backgroundColor={bgColor01} src="m/202403/m-01.jpg" alt={MAIN_IMAGE_TEXT} />
      <PlccBox height="200vw" backgroundColor={bgColor01} src="m/202407/m-02.jpg" alt={BENEFIT_01_TEXT} />
      <PlccBox height="108.1vw" backgroundColor={bgColor01} src="m/202403/m-03.jpg" alt={BENEFIT_02_TEXT} />
      <PlccBox height="39.6vw" backgroundColor={bgColor02} src="m/m-05.jpg" alt={CARD_DESIGN_TITLE_TEXT} />
      <CardSlide />
      <PlccBox height="219.7vw" backgroundColor={bgColor03} src="m/202407/m-06.jpg" alt={PLCC_EVENT_NOTICE} />
      <FloatingArea>
        <PlccBtn />
      </FloatingArea>
    </Wrapper>
  );
}
