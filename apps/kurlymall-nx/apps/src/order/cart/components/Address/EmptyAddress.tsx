import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import AddressChangeButton from './AddressChangeButton';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmptyAddressText = styled(Typography)`
  color: ${vars.color.main.$primary};
`;

export default function EmptyAddress() {
  return (
    <Wrapper>
      <EmptyAddressText variant={`$xlargeRegular`}>배송지를 입력해주세요</EmptyAddressText>
      <AddressChangeButton />
    </Wrapper>
  );
}
