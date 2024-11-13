import React from 'react';

import styled from '@emotion/styled';

import CheckBoxInactive from '../../../shared/icons/CheckBoxInactive';
import COLOR from '../../../shared/constant/colorset';
import { useAppSelector } from '../../../shared/store';

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.p`
  margin-top: 24px;
  font-size: 20px;
`;

export default function SuccessResult() {
  const isChangePayment = useAppSelector(({ subscribeResult }) => subscribeResult.isChangePayment);

  return (
    <Wrapper>
      <CheckBoxInactive stroke={COLOR.kurlyPurple} width={50} height={50} strokeWidth={1} />
      <Title>{isChangePayment ? '결제수단 변경이' : '컬리멤버스 결제가'} 완료되었습니다.</Title>
    </Wrapper>
  );
}
