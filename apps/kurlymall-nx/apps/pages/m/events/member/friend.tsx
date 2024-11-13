import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import Footer from '../../../../src/footer/components/m/Footer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../src/server/webview';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import FriendContainer from '../../../../src/events/member-benefit/containers/m/FriendContainer';
import PageMetaData from '../../../../src/shared/components/PageMeta/PageMetaData';
import { LOVERS_META_INFO } from '../../../../src/events/member-benefit/constants';
import { MEMBER_BENEFIT_PATH } from '../../../../src/shared/constant';
import { DEFAULT_KEYWORDS } from '../../../../src/shared/constant/page-meta';
import { BUTTON_TYPE } from '../../../../src/shared/services';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';
import { useWebview } from '../../../../src/shared/hooks';

const headerTitle = '친구초대';

export default function MemberBenefitInviteFriendPage({ accessToken }: WebviewServerSideProps) {
  const webview = useWebview();

  const { appToken } = useAppToken({ accessToken });

  return (
    <>
      <PageMetaData
        title={LOVERS_META_INFO.title}
        description={LOVERS_META_INFO.description}
        image={LOVERS_META_INFO.image}
        url={MEMBER_BENEFIT_PATH.friend.uri}
        keyword={DEFAULT_KEYWORDS}
      />

      <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} rightButtonTypes={['cart']} />

      <AuthContainer appToken={appToken}>
        <FriendContainer />
      </AuthContainer>

      {!webview && (
        <>
          <Footer />
          <UserMenu />
        </>
      )}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
