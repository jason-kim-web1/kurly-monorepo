import { GetServerSideProps } from 'next';

const MyPageInquiryProductsDetailDesktopPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/mypage/inquiry/products',
      permanent: false,
    },
  };
};

export default MyPageInquiryProductsDetailDesktopPage;
