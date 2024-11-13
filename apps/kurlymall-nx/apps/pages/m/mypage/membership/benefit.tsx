import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../src/server/webview';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import BenefitLegoView from '../../../../src/mypage/membership/containers/BenefitLegoView';
import { BUTTON_TYPE } from '../../../../src/shared/services';

const headerTitle = '컬리멤버스 혜택';

export default function MembershipBenefitPage({ accessToken }: WebviewServerSideProps) {
  return (
    <>
      <div id="header" className="header">
        <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} />
      </div>
      <AuthContainer loginRequired appToken={accessToken}>
        <BenefitLegoView />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
