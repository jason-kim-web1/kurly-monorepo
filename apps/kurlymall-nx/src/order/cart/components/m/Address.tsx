import styled from '@emotion/styled';

import { memo } from 'react';

import { vars } from '@thefarmersfront/kpds-css';

import { useAppSelector } from '../../../../shared/store';
import useCurrentAddressQuery from '../../queries/useCurrentAddressQuery';
import useMobileCartAddress from '../../hooks/useMobileCartAddress';
import AddressContents from '../Address/AddressContents';

const Wrapper = styled.button`
  width: 100%;
  text-align: left;
  padding: ${vars.spacing.$12} ${vars.spacing.$16} ${vars.spacing.$16};
  background-color: ${vars.color.background.$background1};
`;

const Address = () => {
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const { isLoading } = useCurrentAddressQuery();
  const { handleClickCartAddress } = useMobileCartAddress();

  if (isGuest || isLoading) {
    return null;
  }

  return (
    <Wrapper onClick={handleClickCartAddress}>
      <AddressContents />
    </Wrapper>
  );
};

export default memo(Address);
