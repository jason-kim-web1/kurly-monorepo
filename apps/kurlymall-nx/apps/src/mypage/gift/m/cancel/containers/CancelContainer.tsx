import styled from '@emotion/styled';

import useCheckoutCancel from '../../../shared/hooks/useCheckoutCancel';

import COLOR from '../../../../../shared/constant/colorset';

import PriceSummary from '../components/PriceSummary';
import RefundRequest from '../../../shared/components/cancel/RefundRequest';
import { Divider } from '../../../../../shared/components/Divider/Divider';
import Loading from '../../../../../shared/components/Loading/Loading';
import SelectReason from '../../../../order/m/cancel/components/SelectReason';

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Description = styled.p`
  padding: 18px 20px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  word-break: break-all;
`;

export default function CancelContainer() {
  const {
    isLoading,
    cancelInfo: { summary, price },
    cancelReason: { list, selectedReason, etcValue },
    changeReason,
    changeReasonEtc,
    submitCancel,
  } = useCheckoutCancel();

  if (isLoading) {
    return (
      <Wrapper>
        <Loading isAbsolute />
      </Wrapper>
    );
  }

  return (
    <>
      <Description>{summary} 상품의 주문을 취소합니다.</Description>
      <Divider />
      <SelectReason
        list={list}
        selectedValue={selectedReason}
        etcValue={etcValue}
        onChange={changeReason}
        onChangeEtc={changeReasonEtc}
      />
      <Divider />
      <PriceSummary price={price} />
      <Divider />
      <RefundRequest onClick={submitCancel} />
    </>
  );
}
