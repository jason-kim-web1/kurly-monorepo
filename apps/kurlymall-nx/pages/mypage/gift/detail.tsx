import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import GiftOrderDetailContainer from '../../../src/mypage/gift/shared/containers/detail/GiftOrderDetailContainer';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function MypageGiftOrderDetailPage() {
  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="선물 내역 상세" hasPadding={false}>
          <GiftOrderDetailContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
