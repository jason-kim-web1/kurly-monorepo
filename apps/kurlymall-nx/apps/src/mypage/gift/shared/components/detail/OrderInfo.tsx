import styled from '@emotion/styled';
import moment from 'moment';

import { useState } from 'react';

import { useAppSelector } from '../../../../../shared/store';

import MultiColumns from './MultiColumn';
import Collapse from '../../../../../shared/components/Collapse/Collapse';
import { Divider } from '../../../../../shared/components/Divider/Divider';

const Wrapper = styled.div`
  position: relative;
  padding: 13px 20px 20px;
`;

export default function OrderInfo() {
  const {
    groupOrderNo,
    ordererName,
    payment: { paymentCompletedAt },
  } = useAppSelector(({ mypageGift }) => mypageGift.orderDetails);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Collapse title="주문정보" summary="" onClick={() => setToggle((value: boolean) => !value)} opened={toggle}>
        <Wrapper>
          <MultiColumns
            columns={[
              {
                subject: '주문번호',
                contents: groupOrderNo,
              },
              {
                subject: '보내는 분',
                contents: ordererName,
              },
              {
                subject: '결제일시',
                contents: moment(paymentCompletedAt).format('YYYY-MM-DD HH:mm:ss'),
              },
            ]}
          />
        </Wrapper>
      </Collapse>
      <Divider />
    </>
  );
}
