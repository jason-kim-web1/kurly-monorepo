import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../src/server/webview';
import { useScreenName, useWebview } from '../../../../src/shared/hooks';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { ScreenName } from '../../../../src/shared/amplitude';
import NextGradeContainer from '../../../../src/mypage/next-grade/containers/NextGradeContainer';
import { BUTTON_TYPE } from '../../../../src/shared/services';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';

const headerTitle = '다음 달 나의 예상 등급';

export default function NextGrade({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.MEMBERSHIP_BENEFIT);

  const webview = useWebview();

  return (
    <>
      <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} rightButtonTypes={['cart']} />

      <AuthContainer loginRequired appToken={accessToken}>
        <NextGradeContainer />
      </AuthContainer>

      {!webview && <UserMenu />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
