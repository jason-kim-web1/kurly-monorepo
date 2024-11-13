import styled from '@emotion/styled';

import COLOR from '../../../../src/shared/constant/colorset';

import { useAppSelector } from '../../../../src/shared/store';
import useShippingAddress from '../../../../src/cart/shared/hooks/useShippingAddress';

import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import AddressList from '../../../../src/shared/components/Address/m/AddressList';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Container = styled.div`
  height: calc(100vh - 44px);
`;

const AddAddressButton = styled.button`
  padding: 0 20px;
  font-size: 16px;
  line-height: 44px;
  color: ${COLOR.kurlyPurple};
`;

export default function ShippingAddressListPage() {
  useScreenName(ScreenName.SIMPLE_SHIPPING_ADDRESS_LIST);

  const { loading, addressList } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const { updateRecentAddress, moveAddressModifyPage, moveAddressAddPage } = useShippingAddress();

  return (
    <Wrapper>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>배송지 관리</HeaderTitle>
        <HeaderButtons position="right">
          <AddAddressButton type="button" onClick={moveAddressAddPage}>
            추가
          </AddAddressButton>
        </HeaderButtons>
      </MobileHeader>
      <Container>
        <AddressList
          loading={loading}
          list={addressList}
          handleChecked={updateRecentAddress}
          handleUpdate={moveAddressModifyPage}
        />
      </Container>
    </Wrapper>
  );
}
