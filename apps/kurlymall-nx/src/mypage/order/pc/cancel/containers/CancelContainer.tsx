import React from 'react';

import styled from '@emotion/styled';

import useCheckoutCancel from '../../../shared/hooks/useCheckoutCancel';

import COLOR from '../../../../../shared/constant/colorset';

import SelectReason from '../components/SelectReason';
import PriceSummary from '../components/PriceSummary';
import RefundRequest from '../components/RefundRequest';
import Loading from '../../../../../shared/components/Loading/Loading';

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  background-color: ${COLOR.kurlyWhite};
`;

const LoadingWrapper = styled.div`
  position: relative;
  min-height: 1280px;
`;

const Description = styled.p`
  padding: 28px 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border-bottom: 1px solid ${COLOR.bg};
  word-break: break-all;
`;

export default function CancelContainer() {
  const {
    isLoading,
    isCanceling,
    productsSummary,
    cancelInfo,
    cancelReason: { list, selectedReason, etcValue },
    changeReason,
    changeReasonEtc,
    submitCancel,
  } = useCheckoutCancel();

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading isAbsolute theme="white" />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Description>{productsSummary} 상품의 주문을 취소합니다.</Description>
      <SelectReason
        list={list}
        selectedValue={selectedReason}
        etcValue={etcValue}
        onChange={changeReason}
        onChangeEtc={changeReasonEtc}
      />
      <div>
        <PriceSummary price={cancelInfo} />
      </div>
      <RefundRequest isCanceling={isCanceling} onClick={submitCancel} />
    </Wrapper>
  );
}
