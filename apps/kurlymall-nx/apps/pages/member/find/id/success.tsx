import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import MembersContainer from '../../../../src/member/find/id/success/containers/MembersContainer';

import Button from '../../../../src/shared/components/Button/Button';
import Header from '../../../../src/header/components/Header';

import { AppState } from '../../../../src/shared/store';
import { requestToSendMembersByEmail } from '../../../../src/member/find/reducers/find.slice';

import COLOR from '../../../../src/shared/constant/colorset';
import Footer from '../../../../src/footer/components/Footer';

import { useScreenName } from '../../../../src/shared/hooks';
import { amplitudeService, ScreenName } from '../../../../src/shared/amplitude';
import { SelectFindPassword, SelectViewAllId } from '../../../../src/shared/amplitude/events';
import { COMMON_PATH, getPageUrl } from '../../../../src/shared/constant';
import { redirectTo } from '../../../../src/shared/reducers/page';

const Content = styled.div`
  min-width: 1050px;
  padding: 50px 0;
  background-color: white;
`;

const ContentArea = styled.div`
  max-width: 400px;
  padding: 0 30px 30px 30px;
  margin: auto;
  position: relative;
  background-color: white;
`;

const Title = styled.div`
  padding-top: 30px;
  font-weight: 500;
  font-size: 17px;
  line-height: 23px;
`;

const SubTitle = styled.div`
  display: block;
  padding-top: 4px;
  font-weight: 400;
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 18px;
`;

const ButtonWrap = styled.div`
  margin-top: 60px;
  > button:first-of-type {
    margin-bottom: 10px;
  }
`;

export default function IdByEmailSuccessPage() {
  useScreenName(ScreenName.FIND_ID);

  const dispatch = useDispatch();
  const { members } = useSelector((state: AppState) => state.find);

  const router = useRouter();
  const { by } = router.query;

  const handleClickFindPassword = () => {
    amplitudeService.logEvent(new SelectFindPassword());

    dispatch(
      redirectTo({
        url: '/member/find/password',
      }),
    );
  };

  const handleClickFindIdDetails = () => {
    amplitudeService.logEvent(new SelectViewAllId());

    dispatch(requestToSendMembersByEmail());
  };

  const handleClickLogin = () => {
    dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.login) }));
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isEmpty(members)) {
      router.back();
    }
  }, [router.isReady]);

  return (
    <>
      <Header />
      <Content>
        <ContentArea>
          <Title>
            고객님의 컬리 계정을 찾았습니다.
            <SubTitle>아이디 확인 후 로그인해 주세요.</SubTitle>
          </Title>

          <MembersContainer />

          <ButtonWrap>
            {by === 'email' && <Button text="아이디 전체보기" theme="secondary" onClick={handleClickFindIdDetails} />}
            {by === 'mobile' && <Button text="비밀번호 찾기" theme="secondary" onClick={handleClickFindPassword} />}
            <Button text="로그인" onClick={handleClickLogin} />
          </ButtonWrap>
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
