import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import EventImage from '../../shared/components/EventImage';
import { FAQ_TEXT } from '../../shared/constants/alternativeText';
import { useWebview } from '../../../../shared/hooks';
import appService from '../../../../shared/services/app.service';
import { BOARD_PATH, getPageUrl } from '../../../../shared/constant';
import FaqAlternativeText from '../../shared/components/FaqAlternativeText';
import { redirectTo } from '../../../../shared/reducers/page';

const FaqButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 7vw;
  width: 100%;
  height: 22vw;
  font-size: 0;
`;

export default function Faq() {
  const dispatch = useDispatch();
  const isWebView = useWebview();

  const handleClickFaq = () => {
    if (isWebView) {
      appService.openWebview({
        url: `${window.location.origin}${BOARD_PATH.faq.uri}`,
        title: '자주하는 질문',
        is_modal: true,
      });
      return;
    }
    dispatch(
      redirectTo({
        url: getPageUrl(BOARD_PATH.faq),
      }),
    );
  };

  return (
    <>
      <EventImage imageName="img_faq" imageHeight={'313vw'} altText={FAQ_TEXT} />
      <FaqAlternativeText />
      <FaqButton onClick={handleClickFaq}>자주하는 질문 더 보러가기</FaqButton>
    </>
  );
}
