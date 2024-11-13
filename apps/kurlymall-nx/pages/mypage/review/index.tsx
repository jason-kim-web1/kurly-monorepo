import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import { ReviewDialogProvider } from '../../../src/mypage/review/contexts/ReviewDialogContext';
import { ReviewInstructionDialog } from '../../../src/mypage/review/components/pc/InstructionDialog';
import { BenefitGuideDialog } from '../../../src/mypage/review/components/pc/BenefitGuideDialog';
import { RegistrationFormDialog } from '../../../src/mypage/review/components/pc/RegistrationFormDialog';
import { useBlockContextMenu } from '../../../src/product/board/review/hooks/useBlockContextMenu';
import ReviewTab from '../../../src/mypage/review/components/shared/ReviewTab';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function ProductReview() {
  useBlockContextMenu();

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="상품 후기" hasPadding={false}>
          <ReviewDialogProvider>
            <ReviewTab />
            <ReviewInstructionDialog />
            <BenefitGuideDialog />
            <RegistrationFormDialog />
          </ReviewDialogProvider>
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
