import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useRouter } from 'next/router';

import MembersContainer from '../../../../../src/member/find/id/success/containers/MembersContainer';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import Button from '../../../../../src/shared/components/Button/Button';
import MobileFooter from '../../../../../src/shared/components/layouts/MobileFooter';

import { useWebview, useScreenName } from '../../../../../src/shared/hooks';

import { AppState } from '../../../../../src/shared/store';
import { requestToSendMembersByEmail } from '../../../../../src/member/find/reducers/find.slice';

import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../../src/shared/services/app.service';

import COLOR from '../../../../../src/shared/constant/colorset';

import { amplitudeService, ScreenName } from '../../../../../src/shared/amplitude';
import { SelectFindPassword, SelectViewAllId } from '../../../../../src/shared/amplitude/events';
import { redirectTo } from '../../../../../src/shared/reducers/page';
import { COMMON_PATH, getPageUrl } from '../../../../../src/shared/constant';

const SuccessContent = styled.div`
  height: 100%;
  padding: 0 20px 0;
`;

const Title = styled.div`
  padding-top: 30px;
  font-weight: 600;
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

const ButtonWrap = styled.div({
  width: '100%',
  paddingBottom: 'calc(42px + constant(safe-area-inset-bottom))',
  backgroundColor: `${COLOR.kurlyWhite}`,
  '> button:first-of-type': {
    marginBottom: '10px',
  },
});

const footer = css`
  padding-left: 20px;
  padding-right: 20px;
`;

export default function IdByEmailSuccessPage() {
  useScreenName(ScreenName.FIND_ID);

  const webview = useWebview();
  const dispatch = useDispatch();
  const { members } = useSelector((state: AppState) => state.find);

  const router = useRouter();
  const { by } = router.query;

  const handleClickFindPassword = () => {
    amplitudeService.logEvent(new SelectFindPassword());

    dispatch(
      redirectTo({
        url: '/m/member/find/password',
      }),
    );
  };

  const handleClickFindIdDetails = () => {
    amplitudeService.logEvent(new SelectViewAllId());

    dispatch(requestToSendMembersByEmail());
  };

  const handleClickLogin = () => {
    if (isWebview()) {
      appService.closeWebview();
      return;
    }

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
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>아이디 찾기</HeaderTitle>
        </MobileHeader>
      )}

      <SuccessContent>
        <Title>
          고객님의 컬리 계정을 찾았습니다.
          <SubTitle>아이디 확인 후 로그인해 주세요.</SubTitle>
        </Title>

        <MembersContainer />
      </SuccessContent>
      <MobileFooter css={footer} height={130}>
        <ButtonWrap>
          {by === 'email' && <Button text="아이디 전체보기" theme="secondary" onClick={handleClickFindIdDetails} />}
          {by === 'mobile' && <Button text="비밀번호 찾기" theme="secondary" onClick={handleClickFindPassword} />}
          <Button text="로그인" onClick={handleClickLogin} />
        </ButtonWrap>
      </MobileFooter>
    </>
  );
}
