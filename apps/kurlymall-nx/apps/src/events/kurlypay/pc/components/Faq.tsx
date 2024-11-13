import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import EventImage from '../../shared/components/EventImage';
import { FAQ_TEXT } from '../../shared/constants/alternativeText';
import { BOARD_PATH, getPageUrl } from '../../../../shared/constant';
import FaqAlternativeText from '../../shared/components/FaqAlternativeText';
import { redirectTo } from '../../../../shared/reducers/page';

const FaqButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 53px;
  width: 396px;
  height: 85px;
  font-size: 0;
`;

export default function Faq() {
  const dispatch = useDispatch();

  const handleClickFaq = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(BOARD_PATH.faq),
      }),
    );
  };

  return (
    <>
      <EventImage imageName="img_faq" imageHeight={'1050px'} altText={FAQ_TEXT} isPC />
      <FaqAlternativeText />
      <FaqButton onClick={handleClickFaq}>자주하는 질문 더 보러가기</FaqButton>
    </>
  );
}
