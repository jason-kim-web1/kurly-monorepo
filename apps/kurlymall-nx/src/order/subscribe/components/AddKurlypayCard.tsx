import React from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import Card from '../../../shared/icons/Card';
import { isPC } from '../../../../util/window/getDevice';
import { useAppSelector } from '../../../shared/store';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${isPC ? '130px' : '36.111vw'};
  border-radius: 6px;
  background: ${COLOR.kurlyGray150};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
`;

const Emphasis = styled.span`
  color: ${COLOR.loversWhite};
`;

export default function AddKurlypayCard() {
  const isChangePayment = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.isChangePayment);

  return (
    <Wrapper>
      <Card />
      <p>
        카드·계좌를 추가하시려면
        <br />
        하단의 <Emphasis>{isChangePayment ? '변경하기' : '결제하기'} 버튼</Emphasis>을 눌러주세요
      </p>
    </Wrapper>
  );
}
