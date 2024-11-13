import type { InferGetStaticPropsType } from 'next';

import Header from '../../../../src/header/components/Header';
import MypageLayout from '../../../../src/mypage/common/Layout';
import Footer from '../../../../src/footer/components/Footer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import BlankFallback from '../../../../src/shared/components/Fallback/BlankFallback';
import ListContainer from '../../../../src/mypage/inquiry/products/containers/shared/ListContainer';

const DesktopMyPageInquiryProductsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    page: { title },
  } = props;
  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title={title} hasPadding={false}>
          <ListContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
};

export default DesktopMyPageInquiryProductsPage;

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: '상품 문의',
        description: '',
      },
    },
  };
}
