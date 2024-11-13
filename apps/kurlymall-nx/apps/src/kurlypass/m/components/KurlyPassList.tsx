import styled from '@emotion/styled';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';

import COLOR from '../../../shared/constant/colorset';
import { addComma } from '../../../shared/services';

import Loading from '../../../shared/components/Loading/Loading';
import { BillingHistory } from '../../../shared/interfaces';

const Wrapper = styled.div<{ emptyReceipt?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  ${({ emptyReceipt = false }) =>
    emptyReceipt &&
    `
    height: 100%;
    padding-bottom: 0;
    justify-content: center;
  `}
`;

const List = styled.ul`
  padding: 10px 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 21px 20px 18px;
  background: ${COLOR.kurlyWhite};

  + li {
    border-top: 10px solid ${COLOR.bg};
  }
`;

const Title = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyGray800};
`;

const Text = styled.span`
  display: block;
  padding-top: 8px;
  color: ${COLOR.kurlyGray600};
`;

const Price = styled.span<{ isRefund?: boolean }>`
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  ${({ isRefund }) => isRefund && `color: ${COLOR.kurlyPassRefund}`};
`;

const Description = styled.p`
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.kurlyGray450};
  text-align: center;
`;

interface Props {
  list: BillingHistory[];
  loading: boolean;
}

export default function KurlyPassList({ list, loading }: Props) {
  if (isEmpty(list)) {
    return (
      <Wrapper emptyReceipt>
        {loading && <Loading />}
        {!loading && <Description>월 정기결제 내역이 없습니다.</Description>}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {loading && <Loading />}
      <List>
        {list?.map(({ seq, detail, date, paymentPrice, status }) => (
          <Item key={seq}>
            <Title>
              {detail}
              <Text>결제일 {format(new Date(date), 'yyyy.MM.dd')}</Text>
            </Title>
            <Price isRefund={status === 'REFUND'}>{addComma(paymentPrice)}원</Price>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}
