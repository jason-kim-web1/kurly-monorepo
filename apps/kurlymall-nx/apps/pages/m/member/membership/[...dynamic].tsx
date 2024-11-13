import PageMetaData from '../../../../src/shared/components/PageMeta/PageMetaData';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import SubscribeBottomSheet from '../../../../src/member/membership/m/components/SubscribeBottomSheet';
import { MEMBERSHIP_PATH } from '../../../../src/shared/constant';
import { getWebviewServerSidePropsWithRefreshToken, WebviewServerSideProps } from '../../../../src/server/webview';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';
import MembershipLegoView from '../../../../src/member/membership/shared/components/MembershipLegoView';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../src/shared/services';
import { useWebviewTitle } from '../../../../src/shared/hooks/useWebviewTitle';

const headerTitle = '컬리멤버스 구독';

export default function MembershipPage({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.MEMBERSHIP_EVENT_DETAIL);
  useAppToken({ accessToken });

  const { webview } = useWebviewTitle({ headerTitle });

  return (
    <>
      <PageMetaData
        title={headerTitle}
        description="컬리멤버스 구독"
        url={MEMBERSHIP_PATH.membership.uri}
        keyword="컬리멤버스 구독"
      />
      {!webview && (
        <div id="header" className="header">
          {/* 레고 내 스크롤탭 컴포넌트 대응을 위한 div */}
          <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} />
        </div>
      )}
      <MembershipLegoView />
      <SubscribeBottomSheet />
    </>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
