import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import KurlyPurpleBoxContainer from '../../../src/mypage/kurly-purple-box/pc/containers/KurlyPurpleBoxContainer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

export default function KurlyPurpleBoxPage() {
  return (
    <>
      <Header />
      <AuthContainer>
        <KurlyPurpleBoxContainer />
      </AuthContainer>
      <Footer />
    </>
  );
}
