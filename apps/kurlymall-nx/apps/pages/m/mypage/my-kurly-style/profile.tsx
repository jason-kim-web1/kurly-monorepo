import { useRouter } from 'next/router';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';

import ProfileContainer from '../../../../src/mypage/my-kurly-style/m/containers/ProfileContainer';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

export default function MyKurlyStyleProfilePage() {
  useScreenName(ScreenName.MY_KURLY_STYLE);
  const router = useRouter();

  return (
    router.isReady && (
      <AuthContainer loginRequired>
        <ProfileContainer />
      </AuthContainer>
    )
  );
}
