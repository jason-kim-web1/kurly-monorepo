import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import NotiCenterContainer from '../../../src/mypage/noti-center/components/NotiCenterContainer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

export default function NotiCenter() {
  useScreenName(ScreenName.NOTIFICATION_CENTER);

  return (
    <AuthContainer loginRequired>
      <NotiCenterContainer />
    </AuthContainer>
  );
}
