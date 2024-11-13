import { useEffect } from 'react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../src/shared/store';
import { USER_MENU_PATH } from '../../../src/shared/constant';
import Header from '../../../src/header/components/Header';
import COLOR from '../../../src/shared/constant/colorset';

import Footer from '../../../src/footer/components/Footer';
import Alert from '../../../src/shared/components/Alert/Alert';
import SignupContainer from '../../../src/member/signup/shared/containers/SignupContainer';
import { redirectTo } from '../../../src/shared/reducers/page';

const Content = styled.div`
  min-width: 1050px;
  margin-top: 50px;
  margin-bottom: 60px;
  background-color: ${COLOR.kurlyWhite};
`;

const Title = styled.div`
  margin-bottom: 50px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -1px;
  color: ${COLOR.kurlyGray800};
`;

export default function SignupPage() {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isGuest) {
      Alert({ text: '이미 로그인 상태 입니다.' }).then(() => {
        dispatch(
          redirectTo({
            url: USER_MENU_PATH.home.uri,
            replace: true,
          }),
        );
      });
    }
  }, [dispatch, isGuest]);

  return (
    <>
      <Header />
      <Content>
        <Title>회원가입</Title>
        <SignupContainer />
      </Content>
      <Footer />
    </>
  );
}
