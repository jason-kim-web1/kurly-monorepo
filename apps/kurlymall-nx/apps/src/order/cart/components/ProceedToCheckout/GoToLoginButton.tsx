import { Button } from '@thefarmersfront/kpds-react';

import useRedirectToLogin from '../../../common/hooks/useRedirectToLogin';
import { ButtonStyle } from './ButtonStyle';

export default function GoToLoginButton() {
  const { redirectToLogin } = useRedirectToLogin();

  return (
    <Button css={ButtonStyle} _type={'primary'} onClick={redirectToLogin}>
      로그인
    </Button>
  );
}
