import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { addComma } from '../../../../shared/services';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${vars.color.line.$line1};
  padding: ${vars.spacing.$16} ${vars.spacing.$0} ${vars.spacing.$4};
`;

export default function PaymentPrice({ paymentPrice }: { paymentPrice: number }) {
  return (
    <Wrapper>
      <Typography variant={`$xlargeRegular`}>결제예정금액</Typography>
      <Typography variant={`$accessibility1Bold`}>{addComma(paymentPrice)}원</Typography>
    </Wrapper>
  );
}
