import styled from '@emotion/styled';

import appService from '../../../../src/shared/services/app.service';

import Address from '../../../../src/shared/components/Address/Address';
import { BaseAddressType, DeliveryProps } from '../../../../src/shared/interfaces/ShippingAddress';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default function ShippingAddressPage() {
  const onSubmit = async (result: DeliveryProps) => {
    appService.postAddressResult({
      code: 'WVA5000',
      base_address_type: result.baseAddressType === BaseAddressType.road ? 'R' : 'J',
      zipcode: result.zipcode,
      address: result.address,
      road_zonecode: result.roadZoneCode,
      road_address: result.roadAddress,
    });
  };

  return (
    <Wrapper>
      <Address onSubmit={onSubmit} />
    </Wrapper>
  );
}
