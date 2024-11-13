import styled from '@emotion/styled';

import { isNull } from 'lodash';

import HeaderTitle from '../../../../shared/components/layouts/HeaderTitle';
import COLOR from '../../../../shared/constant/colorset';
import MobileHeader from '../../../../shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../shared/components/layouts/HeaderButtons';
import UserMenu from '../../../../shared/components/layouts/UserMenu';
import BackButton from '../../../../shared/components/Button/BackButton';
import ListContainer from './ListContainer';
import useAddressEvents from '../../hooks/useAddressEvents';
import AddressIframe from '../../components/m/AddressIframe';
import useIframeAddressHandler from '../../hooks/useIframeAddressHandler';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${COLOR.kurlyWhite};
`;

const AddAddress = styled.button`
  padding: 0 20px;
  font-size: 16px;
  color: ${COLOR.kurlyPurple};
`;

export default function MypageAddressContainer({ title }: { title: string }) {
  const { isFullyData, handleShowIframe } = useIframeAddressHandler();

  useAddressEvents();

  return (
    <Container>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderButtons position="right">
          <AddAddress onClick={handleShowIframe} disabled={isNull(isFullyData)}>
            추가
          </AddAddress>
        </HeaderButtons>
      </MobileHeader>
      <ListContainer />
      <AddressIframe />
      <UserMenu />
    </Container>
  );
}
