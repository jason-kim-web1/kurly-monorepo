import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Radio from '../../../../shared/components/Input/Radio';

import { PaymentVendor } from '../../shared/interfaces';
import { OrderVendorCode } from '../../shared/interfaces/OrderVendorCode.interface';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
`;

const Benefit = styled.span`
  font-size: 13px;
  font-weight: 600;
  margin: 1px 0 0 6px;
  color: ${COLOR.pointText};
`;

const radio = css`
  width: 50%;
  padding: 16px 0 12px 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;

interface Props {
  selectedVendor: PaymentVendor;
  vendors: PaymentVendor[];
  onClick: (code: OrderVendorCode) => void;
}

export default function SimplePaymentMethods({ selectedVendor, vendors, onClick }: Props) {
  const handleChange = ({ value }: { value: string }) => {
    onClick(value as OrderVendorCode);
  };

  return (
    <Container>
      {vendors.map(({ code, name, hasEvent }) => (
        <Radio
          id={code}
          key={code}
          css={radio}
          selectedValue={selectedVendor.code}
          name={code}
          label={
            <Label>
              {name} {hasEvent && <Benefit>혜택</Benefit>}
            </Label>
          }
          value={code}
          onChange={handleChange}
        />
      ))}
    </Container>
  );
}
