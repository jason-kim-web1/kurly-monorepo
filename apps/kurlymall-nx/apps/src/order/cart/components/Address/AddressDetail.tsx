import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { isEmpty } from 'lodash';

import React from 'react';

import useCurrentAddress from '../../../common/hooks/useCurrentAddress';

const Address = styled(Typography)`
  word-break: break-word;
`;

const WarningText = styled(Typography)`
  color: ${vars.color.main.$danger};
`;

export default function AddressDetail() {
  const { data: currentAddress } = useCurrentAddress();

  if (!currentAddress) {
    return null;
  }

  const { address, addressDetail, isRetiredAddress } = currentAddress;

  return (
    <div>
      <Address variant={`$xlargeRegular`}>
        {address} {addressDetail}
      </Address>
      {isEmpty(addressDetail) && <WarningText variant={`$xlargeRegular`}>상세주소를 입력해주세요</WarningText>}
      {isRetiredAddress && (
        <WarningText variant={`$xlargeRegular`}>위 주소지가 폐지되었습니다. 재등록 해주세요.</WarningText>
      )}
    </div>
  );
}
