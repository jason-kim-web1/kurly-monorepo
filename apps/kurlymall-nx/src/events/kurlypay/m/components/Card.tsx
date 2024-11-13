import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import EventImage from '../../shared/components/EventImage';
import { CARD_TEXT } from '../../shared/constants/alternativeText';
import { EVENT_PATH, getPageUrl } from '../../../../shared/constant';
import { useWebview } from '../../../../shared/hooks';
import appService from '../../../../shared/services/app.service';
import { redirectTo } from '../../../../shared/reducers/page';

const BenefitButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 7vw;
  width: 100%;
  height: 15vw;
  font-size: 0;
`;

export default function Card() {
  const dispatch = useDispatch();
  const isWebView = useWebview();

  const handleClickBenefit = () => {
    if (isWebView) {
      appService.openWebview({
        url: `${window.location.origin}${EVENT_PATH.plcc.uri}`,
        title: '컬리카드 신청 페이지',
        is_modal: true,
      });
      return;
    }

    dispatch(
      redirectTo({
        url: getPageUrl(EVENT_PATH.plcc),
      }),
    );
  };

  return (
    <>
      <EventImage imageName="img_card" imageHeight={'139vw'} altText={CARD_TEXT} />
      <BenefitButton onClick={handleClickBenefit}>컬리페이 가입하기</BenefitButton>
    </>
  );
}
