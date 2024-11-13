import styled from '@emotion/styled';

import { useEffect } from 'react';

import ReactGA from 'react-ga4';

import Button from '../../../../shared/components/Button/Button';
import { useAppSelector } from '../../../../shared/store';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import useSuccessSignup from '../../hook/useSuccessSignup';
import COLOR from '../../../../shared/constant/colorset';
import { SUCCESS_SIGN_UP } from '../../constants';

import Gift from '../../../../shared/icons/Gift';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 112px);
  justify-content: center;
  text-align: center;
`;

const WelcomeMessage = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  p {
    color: ${COLOR.kurlyPurple};
  }
`;

const BenefitTitle = styled.p`
  margin: 15px 0 40px;
  font-size: 15px;
  color: ${COLOR.kurlyGray600};
`;

const BenefitItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 275px;
  height: 60px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  background-color: ${COLOR.bgLightGray};
  padding: 18px 20px 18px 24px;
  ~ li {
    margin-top: 8px;
  }
`;

export default function SimpleSignupSuccessContainer() {
  const info = useAppSelector(({ member }) => member.info);

  useEffect(() => {
    ReactGA.event('sign_up', { method: 'sign_up_kakao' });
  }, []);

  const { handleClickEventButton } = useSuccessSignup();

  return (
    <>
      <Container>
        <WelcomeMessage>
          {info && <p>{info.id} 님,</p>}
          컬리의 회원이 되셨습니다.
        </WelcomeMessage>
        <BenefitTitle>첫 구매 시 드리는 놀라운 혜택</BenefitTitle>
        <ul>
          <BenefitItem>
            {SUCCESS_SIGN_UP.NEW_MEMBER_COUPON}
            <Gift />
          </BenefitItem>
        </ul>
      </Container>
      <MobileFooter>
        <Button text="지금 사러가기" onClick={handleClickEventButton} />
      </MobileFooter>
    </>
  );
}
