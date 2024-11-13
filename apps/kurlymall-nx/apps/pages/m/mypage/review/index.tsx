import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import ReviewTab from '../../../../src/mypage/review/components/shared/ReviewTab';

export default function MypageReviewPage() {
  return (
    <>
      <MobileNavigationBar
        title={'상품 후기'}
        leftButtonType={'back'}
        rightButtonTypes={['delivery', 'cart']}
        hideBottomLine
      />
      <AuthContainer loginRequired>
        <ReviewTab />
      </AuthContainer>
    </>
  );
}
