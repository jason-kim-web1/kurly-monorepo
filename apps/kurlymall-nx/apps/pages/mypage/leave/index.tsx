import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import LeaveContainer from '../../../src/mypage/leave/shared/containers/LeaveContainer';
import Footer from '../../../src/footer/components/Footer';

export default function LeavePage() {
  return (
    <>
      <Header />
      <AuthContainer loginRequired>
        <LeaveContainer />
      </AuthContainer>
      <Footer />
    </>
  );
}
