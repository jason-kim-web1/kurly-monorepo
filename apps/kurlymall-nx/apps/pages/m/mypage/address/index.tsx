import type { InferGetStaticPropsType } from 'next';

import { AddressContextProvider } from '../../../../src/mypage/address/context/addressContext';
import MypageAddressContainer from '../../../../src/mypage/address/containers/m/Container';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';

export default function MypageMobileAddress({ page: { title } }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AddressContextProvider>
      <AuthContainer loginRequired>
        <MypageAddressContainer title={title} />
      </AuthContainer>
    </AddressContextProvider>
  );
}

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: '배송지 관리',
      },
    },
  };
}
