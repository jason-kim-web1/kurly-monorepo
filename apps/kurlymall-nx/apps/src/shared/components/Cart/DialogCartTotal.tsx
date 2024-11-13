import styled from '@emotion/styled';

import { addComma } from '../../services';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalPayment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalTitle = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`;

const TotalPrice = styled.span`
  font-size: 24px;
  font-weight: 500;
  line-height: 24px;
`;

const TotalUnit = styled.span`
  margin-left: 3px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  vertical-align: 3px;
`;

interface Props {
  totalPrice: number;
}

export default function DialogCartTotal({ totalPrice }: Props) {
  return (
    <Container>
      <TotalPayment>
        <TotalTitle>합계</TotalTitle>
        <div>
          <TotalPrice>{addComma(totalPrice)}</TotalPrice>
          <TotalUnit>원</TotalUnit>
        </div>
      </TotalPayment>
    </Container>
  );
}
