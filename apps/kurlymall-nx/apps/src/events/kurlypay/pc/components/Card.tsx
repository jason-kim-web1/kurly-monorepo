import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import EventImage from '../../shared/components/EventImage';
import { CARD_TEXT } from '../../shared/constants/alternativeText';
import { EVENT_PATH, getPageUrl } from '../../../../shared/constant';
import { redirectTo } from '../../../../shared/reducers/page';

const BenefitButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 42px;
  width: 300px;
  height: 75px;
  font-size: 0;
`;

export default function Card() {
  const dispatch = useDispatch();

  const handleClickBenefit = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(EVENT_PATH.plcc),
      }),
    );
  };

  return (
    <>
      <EventImage imageName="img_card" imageHeight={'819px'} altText={CARD_TEXT} isPC />
      <BenefitButton onClick={handleClickBenefit}>컬리페이 가입하기</BenefitButton>
    </>
  );
}
