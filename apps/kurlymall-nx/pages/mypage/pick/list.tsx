import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import PickProductsContainer from '../../../src/mypage/pick/pc/containers/PickProductsContainer';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function PickListPage() {
  useScreenName(ScreenName.PICK_LIST);
  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="찜한 상품" description="찜한 상품은 최대 200개까지 저장됩니다.">
          <PickProductsContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
