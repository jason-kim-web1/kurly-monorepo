import type { InferGetStaticPropsType } from 'next';

import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import { AddressContextProvider } from '../../../src/mypage/address/context/addressContext';
import MypageLayout from '../../../src/mypage/common/Layout';
import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import ListItemContainer from '../../../src/mypage/address/containers/shared/ListItemContainer';
import useAddressHandler from '../../../src/mypage/address/hooks/useAddressHandler';
import useAddressListQuery from '../../../src/mypage/address/hooks/useAddressListQuery';
import useAddressEvents from '../../../src/mypage/address/hooks/useAddressEvents';

import AddButton from '../../../src/mypage/common/AddButton';

export default function MypageAddress(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { openAddressModify, openInsertAddress } = useAddressHandler();
  const { addressCount } = useAddressListQuery();

  const { title, description } = props;

  useAddressEvents();

  return (
    <AddressContextProvider>
      <Header />
      <AuthContainer loginRequired>
        <MypageLayout
          title={title}
          description={description}
          headerAction={<AddButton name="새 배송지 추가" onClick={() => openInsertAddress(addressCount)} />}
        >
          <ListItemContainer modifyAddress={openAddressModify} />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </AddressContextProvider>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: '배송지 관리',
      description: '배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.',
    },
  };
}
