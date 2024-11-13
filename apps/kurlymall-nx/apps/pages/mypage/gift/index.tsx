import { useGiftRelease } from '../../../src/mypage/gift/shared/hooks/useGiftRelease';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import GiftOrderListContainer from '../../../src/mypage/gift/shared/containers/list/GiftOrderListContainer';
import Loading from '../../../src/shared/components/Loading/Loading';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function MypageGiftOrderPage() {
  const { isReleased } = useGiftRelease();

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="선물 내역" hasPadding={false}>
          {isReleased ? <GiftOrderListContainer /> : <Loading />}
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
