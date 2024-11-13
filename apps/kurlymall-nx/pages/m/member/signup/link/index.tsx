import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';

import LinkAccountFormContainer from '../../../../../src/member/signup/link/containers/LinkAccountFormContainer';

import { iconInfo } from '../../../../../src/shared/images';

import { AppState } from '../../../../../src/shared/store';

import { loadLinkableAccounts, setValue } from '../../../../../src/member/signup/reducers/slice';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import { redirectTo } from '../../../../../src/shared/reducers/page';

import { useScreenName } from '../../../../../src/shared/hooks';
import { SnsSyncSuccess, ViewSnsSync } from '../../../../../src/shared/amplitude/events';
import { amplitudeService, ScreenName } from '../../../../../src/shared/amplitude';
import { loadSocialLoginTokenFromSessionStorage } from '../../../../../src/member/login/services/login.services';

const MainContent = styled.div`
  height: 100%;
  padding: 36px 20px 40px 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  margin-bottom: 12px;
  > span {
    color: #5f0080;
  }
`;

const SubTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #666666;
  margin-bottom: 18px;
`;

const InquiryBox = styled.div`
  padding: 16px;
  background-color: #fafafa;
  border-radius: 6px;
  display: flex;
`;

const InquiryText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #999999;
  > a {
    color: #5f0080;
  }
`;

const IconInfo = styled.div`
  margin-top: 2px;
  margin-right: 6px;
  width: 14px;
  height: 14px;
  background: url('${iconInfo}') 0 0 no-repeat;
  vertical-align: top;
  background-size: cover;
  flex-shrink: 0;
`;

const LoginSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  color: #999999;
  padding: 11px 0px 9px 0;
  margin-bottom: 20px;
  span {
    width: 1px;
    height: 12px;
    background-color: #dddddd;
    margin: 0 8px;
  }
`;

export default function LinkPage() {
  useScreenName(ScreenName.SNS_SYNC);

  const dispatch = useDispatch();

  const { link } = useSelector(({ social }: AppState) => social);

  const router = useRouter();

  useEffect(() => {
    void amplitudeService.logEvent(new ViewSnsSync());
    dispatch(
      setValue({
        socialLoginToken: loadSocialLoginTokenFromSessionStorage(),
      }),
    );
    dispatch(loadLinkableAccounts({ provider: 'kakao' }));
  }, [dispatch]);

  useEffect(() => {
    if (link.status === 'SUCCESS') {
      amplitudeService.logEvent(
        new SnsSyncSuccess({
          joinPath: 'kakao',
        }),
      );
      Alert({
        text: '카카오 계정이 연결되었습니다.',
      }).then(() => {
        if (router.isReady) {
          const { return_url: returnUrl } = router.query as { return_url: string };
          if (returnUrl) {
            dispatch(redirectTo({ url: returnUrl, isExternal: true }));
            return;
          }
        }
        dispatch(redirectTo({ url: '/', isExternal: true }));
      });
    }
  }, [link.status, dispatch, router.isReady]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>SNS 계정 연결</HeaderTitle>
      </MobileHeader>

      <MainContent>
        <Title>
          <span>{link.matchingData}</span> 으로
          <br /> 가입된 회원 정보가 있습니다.
        </Title>
        <SubTitle>아이디를 선택 후 비밀번호를 입력하시면 기존 회원으로 서비스 사용이 가능합니다.</SubTitle>

        <LinkAccountFormContainer />

        <LoginSearch>
          <a href="/member/find/id">아이디 찾기</a>
          <span />
          <a href="/member/find/password">비밀번호 찾기</a>
        </LoginSearch>

        <InquiryBox>
          <IconInfo />
          <InquiryText>
            아이디가 다르거나 가입한 적이 없을 경우 고객센터 <a href="tel:16441107">1644-1107</a>로 문의주세요.
          </InquiryText>
        </InquiryBox>
      </MainContent>
    </>
  );
}
