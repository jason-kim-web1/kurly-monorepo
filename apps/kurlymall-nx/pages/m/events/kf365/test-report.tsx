import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import KurlyFreshTestReportContainer from '../../../../src/events/kf365/containers/m/KurlyFreshTestReportContainer';
import { useWebview } from '../../../../src/shared/hooks';
import Footer from '../../../../src/footer/components/m/Footer';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';

export default function KurlyFreshDetailPage() {
  const webview = useWebview();

  return (
    <>
      <MobileNavigationBar title="안전성 검사 / 품질 안전 실사" leftButtonType="back" rightButtonTypes={['cart']} />
      <KurlyFreshTestReportContainer />
      {!webview && (
        <>
          <Footer />
          <UserMenu />
        </>
      )}
    </>
  );
}
