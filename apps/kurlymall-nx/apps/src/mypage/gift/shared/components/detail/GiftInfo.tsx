import { useState } from 'react';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../../shared/store';

import { GiftProductItem } from '../../../../../shared/api/gift/gift';

import OrderItem from './OrderItem';
import Collapse from '../../../../../shared/components/Collapse/Collapse';
import { Divider } from '../../../../../shared/components/Divider/Divider';

const SelectableText = styled.span`
  user-select: text;
`;

export default function GiftInfo() {
  const [toggle, setToggle] = useState(true);
  const {
    orderDetails: { groupOrderNo, products, status },
  } = useAppSelector(({ mypageGift }) => mypageGift);

  const SubTitleText = (
    <>
      주문번호 <SelectableText>{groupOrderNo}</SelectableText>
    </>
  );

  return (
    <>
      <Collapse title={SubTitleText} summary="" onClick={() => setToggle((value: boolean) => !value)} opened={toggle}>
        {products.map((product: GiftProductItem) => {
          return <OrderItem key={product.contentsProductNo} product={product} status={status} />;
        })}
      </Collapse>
      <Divider />
    </>
  );
}
