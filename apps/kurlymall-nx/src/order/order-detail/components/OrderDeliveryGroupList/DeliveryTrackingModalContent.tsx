import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import { Invoices } from '../../../common/interface/DeliveryGroup';
import { PACKING_TYPE_TEXT } from '../../../common/constants/PackingType';
import { PROVIDER_NAME_TEXT } from '../../../common/constants/ProviderName';

const Row = styled.div<{ justifyContent?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const ColoredTypography = styled(Typography)<{ color: string }>`
  color: ${({ color }) => color};
`;

const Anchor = styled.a`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 38px;
  font-size: ${vars.fontSize.$16};
  line-height: ${vars.lineHeight.$22};
  text-decoration-line: underline;
  color: ${vars.color.main.$primary};
`;

const DeliveryTrackingModalContent = ({ invoices }: { invoices: Invoices }) => {
  return (
    <>
      {invoices.map((invoice) => (
        <Row key={invoice.no} justifyContent="space-between">
          <ColoredTypography variant="$xlargeSemibold" color={vars.color.text.$secondary}>
            {PACKING_TYPE_TEXT[invoice.packingType]}
          </ColoredTypography>
          <Row>
            <ColoredTypography variant="$largeRegular" color={vars.color.text.$tertiary}>
              {PROVIDER_NAME_TEXT[invoice.courier]}
            </ColoredTypography>
            <Anchor href={invoice.trackingUrl} target="_blank">
              배송조회
            </Anchor>
          </Row>
        </Row>
      ))}
    </>
  );
};

export default DeliveryTrackingModalContent;
