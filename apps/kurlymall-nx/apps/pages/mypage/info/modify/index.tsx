import Header from '../../../../src/header/components/Header';
import MypageLayout from '../../../../src/mypage/common/Layout';
import Footer from '../../../../src/footer/components/Footer';

import MyInfoModifyContainer from '../../../../src/mypage/myinfo/shared/containers/MyInfoModifyContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import BlankFallback from '../../../../src/shared/components/Fallback/BlankFallback';

export default function MyInfoModifyPage() {
  useScreenName(ScreenName.ACCOUNT_EDIT);

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="개인 정보 수정">
          <MyInfoModifyContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
