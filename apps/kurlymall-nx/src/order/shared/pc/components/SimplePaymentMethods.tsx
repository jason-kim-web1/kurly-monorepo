import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Radio from '../../../../shared/components/Input/Radio';

import { PaymentVendor, VendorCode } from '../../shared/interfaces';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  display: grid;
  grid-template-columns: 213px auto;
  margin-top: 21px;
`;

const Wrap = styled.div`
  :nth-of-type(2) ~ div {
    margin-top: 13px;
  }
`;

const Benefit = styled.span`
  font-size: 13px;
  color: ${COLOR.pointText};
  margin: 1px 0 0 6px;
`;

const radio = css`
  display: inline-flex;
  padding: 0;
  cursor: pointer;
  > span:last-of-type {
    font-size: 14px;
    margin-left: 16px;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;

interface Props {
  selectedVendor: PaymentVendor;
  vendors: PaymentVendor[];
  onClick: (code: VendorCode) => void;
}

export default function SimplePaymentMethods({ selectedVendor, vendors, onClick }: Props) {
  const handleChange = ({ value }: { value: string }) => {
    onClick(value as VendorCode);
  };

  return (
    <Container>
      {vendors.map(({ code, name, hasEvent }) => (
        <Wrap key={code}>
          <Radio
            id={code}
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
        </Wrap>
      ))}
    </Container>
  );
}
