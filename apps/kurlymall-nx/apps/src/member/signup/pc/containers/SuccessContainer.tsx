import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import { useAppSelector } from '../../../../shared/store';
import useSuccessSignup from '../../hook/useSuccessSignup';
import { SUCCESS_SIGN_UP } from '../../constants';

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
  background-color: ${COLOR.gradeToolTipBg};
  border-top: 2px solid ${COLOR.kurlyGray700};
  border-bottom: 1px solid ${COLOR.kurlyGray700};
`;

const Title = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 500;
`;

const MemberInfo = styled.div`
  width: 600px;
  margin: 0 auto;
  border-top: 2px solid #6a3664;
  color: ${COLOR.kurlyGray700};
`;

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  text-align: left;
  border-bottom: 1px solid #6a3664;
`;

const InfoTitle = styled.div`
  width: 130px;
  padding: 20px 0 20px 20px;
  font-weight: 600;
`;

const InfoDesc = styled.div`
  padding: 20px 0;
  font-size: 13px;
`;

const Buttons = styled.div`
  display: flex;
  padding: 30px 10px 0;
  > button {
    margin: 0 3px;
    > span {
      font-size: 13px;
    }
  }
`;

const SuccessContainer = () => {
  const info = useAppSelector(({ member }) => member.info);
  const { handleClickEventButton, handleClickMypageButton, handleClickMyKurlyStyleButton } = useSuccessSignup();

  return (
    <Container>
      <Title>회원가입이 완료되었습니다.</Title>
      <MemberInfo>
        {info && (
          <>
            <InfoItem>
              <InfoTitle>아이디</InfoTitle>
              <InfoDesc>{info.id}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>이름</InfoTitle>
              <InfoDesc>{info.name}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>이메일</InfoTitle>
              <InfoDesc>{info.email}</InfoDesc>
            </InfoItem>
          </>
        )}
        <Buttons>
          <Button
            text={SUCCESS_SIGN_UP.NEW_MEMBER_COUPON}
            theme={'secondary'}
            radius={3}
            height={46}
            onClick={handleClickEventButton}
          />
          <Button
            text={SUCCESS_SIGN_UP.MY_KURLY_STYLE}
            theme={'secondary'}
            radius={3}
            height={46}
            onClick={handleClickMyKurlyStyleButton}
          />
          <Button text={SUCCESS_SIGN_UP.MY_PAGE} radius={3} height={46} onClick={handleClickMypageButton} />
        </Buttons>
      </MemberInfo>
    </Container>
  );
};

export default SuccessContainer;
