import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import PersonalInquiryListContainer from '../../../src/mypage/personal-inquiry/list/container/PersonalInquiryListContainer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import PersonalInquiryList from '../../../src/mypage/personal-inquiry/list/component/pc/PersonalInquiryList';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import BoardLayout from '../../../src/board/common/BoardLayout';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function PersonalInquiryListPage() {
  useScreenName(ScreenName.PERSONAL_INQUIRY_HISTORY);

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <BoardLayout title="1:1 문의">
          <PersonalInquiryListContainer>
            <PersonalInquiryList />
          </PersonalInquiryListContainer>
        </BoardLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
