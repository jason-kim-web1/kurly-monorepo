import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import FavoriteContainer from '../../../src/mypage/favorite/shared/containers/FavoriteContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function FavoriteListPage() {
  useScreenName(ScreenName.FREQUENTLY_PURCHASE_PRODUCT_HISTORY);

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="자주 사는 상품">
          <FavoriteContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
