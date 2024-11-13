import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { addComma } from '../../../shared/services';

import Loading from '../../../shared/components/Loading/Loading';
import { BillingHistory } from '../../../shared/interfaces';
import { useKurlyPassReceipt } from '../../shared/hooks/useKurlyPassReceipt';

const Wrapper = styled.div<{ emptyReceipt?: boolean }>`
  position: relative;
  width: 100%;
  height: 450px;
  flex-grow: 1;
  background: ${COLOR.bg};
  ${({ emptyReceipt = false }) =>
    emptyReceipt &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 32px 0 20px;
  font-size: 14px;
  line-height: 50px;
  color: ${COLOR.kurlyGray800};
  background: ${COLOR.kurlyWhite};
  border-bottom: 2px solid ${COLOR.bg};
`;

const Container = styled.div`
  overflow-y: auto;
  height: 398px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 32px 0 20px;
  font-size: 14px;
  line-height: 50px;
  color: ${COLOR.kurlyGray800};
  background: ${COLOR.kurlyWhite};

  + li {
    border-top: 2px solid ${COLOR.bg};
  }

  &:first-of-type + li {
    border-top: 2px solid ${COLOR.lightGray};
  }
`;

const Title = styled.span`
  display: flex;
  flex-grow: 1;
`;

const Text = styled.span`
  width: 115px;
  flex-shrink: 0;
`;

const HeaderPrice = styled.span`
  width: 75px;
  flex-shrink: 0;
`;

const Price = styled.span<{ isRefund?: boolean }>`
  width: 55px;
  flex-shrink: 0;
  font-weight: 700;
  ${({ isRefund }) => isRefund && `color: ${COLOR.kurlyPassRefund}`};
`;

const Description = styled.p`
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.kurlyGray450};
  text-align: center;
`;

const IntersectionPoint = styled.div`
  width: 1px;
  height: 1px;
`;

interface Props {
  list: BillingHistory[];
  loading: boolean;
  onNextPage: () => void;
}

export default function KurlyPassList({ list, loading, onNextPage }: Props) {
  const { ref } = useKurlyPassReceipt({ loading, onNextPage });

  if (isEmpty(list)) {
    return (
      <Wrapper emptyReceipt>
        {loading && <Loading isAbsolute />}
        {!loading && <Description>월 정기결제 내역이 없습니다.</Description>}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {loading && <Loading isAbsolute />}
      {!loading && (
        <>
          <Header>
            <Text>결제일</Text>
            <Title>내용</Title>
            <HeaderPrice>금액</HeaderPrice>
          </Header>
          <Container>
            {list?.map(({ seq, detail, date, paymentPrice, status }) => (
              <Item key={seq}>
                <Text>{format(new Date(date), 'yy.MM.dd')}</Text>
                <Title>{detail}</Title>
                <Price isRefund={status === 'REFUND'}>{addComma(paymentPrice)}원</Price>
              </Item>
            ))}
            <IntersectionPoint ref={ref} />
          </Container>
        </>
      )}
    </Wrapper>
  );
}
