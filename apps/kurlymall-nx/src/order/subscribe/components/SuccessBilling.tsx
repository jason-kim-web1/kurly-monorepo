import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { addComma } from '../../../shared/services';
import { useAppSelector } from '../../../shared/store';

const Wrapper = styled.div`
  border-top: 1px solid ${COLOR.bg};
  padding: 16px 0 24px;
  font-size: 16px;
  margin-top: 56px;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ~ div {
    margin-top: 10px;
  }
`;

const Price = styled.strong`
  font-size: 20px;
  font-weight: 700;
  margin-right: 4px;
`;

export default function SuccessBilling() {
  const { price, date, isChangePayment } = useAppSelector(({ subscribeResult }) => ({
    price: subscribeResult.price,
    date: subscribeResult.date,
    isChangePayment: subscribeResult.isChangePayment,
  }));

  return (
    <Wrapper>
      {!isChangePayment && (
        <InnerWrapper>
          <div>결제금액</div>
          {price && (
            <div>
              <Price>{addComma(price)}</Price>원
            </div>
          )}
        </InnerWrapper>
      )}
      <InnerWrapper>
        <div>다음 자동결제 예정일</div>
        {date && <div>{date}</div>}
      </InnerWrapper>
    </Wrapper>
  );
}
