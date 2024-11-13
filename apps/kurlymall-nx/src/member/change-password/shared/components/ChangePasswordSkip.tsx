import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Button from '../../../../shared/components/Button/Button';
import { setCookie } from '../../../../shared/services';
import { redirectTo } from '../../../../shared/reducers/page';
import { USER_MENU_PATH, getPageUrl } from '../../../../shared/constant';

import { SKIP_COOKIE_NAME } from '../containers/ChangePassword';

const SkipWrapper = styled.div`
  padding: 0 22px 20px;
`;

const SkipInfoText = styled.p`
  font-size: 16px;
`;

const SkipButtonWrapper = styled.div`
  margin-top: 20px;
`;

export default function ChangePasswordSkip() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { return_url: returnUrl } = router.query as { return_url: string };

  const handleSkipButton = useCallback(() => {
    setCookie({ name: SKIP_COOKIE_NAME, value: 'skipChangePassword', days: 30 });

    dispatch(redirectTo({ url: returnUrl || getPageUrl(USER_MENU_PATH.home), isExternal: true }));
  }, [dispatch, returnUrl]);

  return (
    <SkipWrapper>
      <SkipInfoText>
        고객님의 개인 정보를 보호하고, 피해를 예방하기 위하여 비밀번호 변경을 안내드립니다. 현재 비밀번호 변경을 원하지
        않을 경우 &apos;다음에 변경하기&apos; 버튼을 누르면 30일 이후 다시 안내드립니다.
      </SkipInfoText>
      <SkipButtonWrapper>
        <Button text={'다음에 변경하기'} theme={'tertiary'} onClick={handleSkipButton} />
      </SkipButtonWrapper>
    </SkipWrapper>
  );
}
