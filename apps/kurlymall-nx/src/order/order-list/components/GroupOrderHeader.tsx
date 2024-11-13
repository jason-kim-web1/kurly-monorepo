import styled from '@emotion/styled';

import { Icon, Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import Link from 'next/link';

import { getFormattedDate } from '../../../board/util';
import { MYPAGE_PATH } from '../../../shared/constant';
import { useClickCopyOrderNo } from '../../common/hooks/useClickCopyOrderNo';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderInfo = styled.div`
  flex-shrink: 0;
`;

const OrderAt = styled(Typography)`
  padding-bottom: 2px;
  color: ${vars.color.main.$secondary};
`;

const OrderNo = styled(Typography)`
  color: ${vars.color.text.$tertiary};
  padding-right: ${vars.spacing.$4};
`;

const OrderNoCopyWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const OrderDetailLink = styled.a`
  width: 100%;
  height: 40px;
  text-align: right;
  margin: 0 -6px 0 10px;
`;

interface Props {
  paymentCompletedAt: string;
  groupOrderNo: number;
}

export default function GroupOrderHeader({ paymentCompletedAt, groupOrderNo }: Props) {
  const { handleClickCopyOrderNo } = useClickCopyOrderNo();

  return (
    <Wrapper>
      <OrderInfo>
        <OrderAt variant="$xxlargeSemibold">{getFormattedDate(paymentCompletedAt)}</OrderAt>
        <OrderNoCopyWrapper onClick={() => handleClickCopyOrderNo(groupOrderNo)}>
          <OrderNo variant="$largeRegular"> {`주문번호 ${groupOrderNo}`} </OrderNo>
          <Icon type="Copy" size={16} ratio="1:1" fill={vars.color.background.$background5} style="fill" />
        </OrderNoCopyWrapper>
      </OrderInfo>
      <Link href={`${MYPAGE_PATH.orderList.uri}/${groupOrderNo}`} passHref prefetch={false}>
        <OrderDetailLink>
          <Icon type="ArrowRight" size={40} ratio="1:2" fill={vars.color.main.$secondary} />
        </OrderDetailLink>
      </Link>
    </Wrapper>
  );
}
