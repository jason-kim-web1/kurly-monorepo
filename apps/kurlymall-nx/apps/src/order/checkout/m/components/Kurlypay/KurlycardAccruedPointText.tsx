import styled from '@emotion/styled';

import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';

const AccruedPointText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  .highlight {
    color: ${COLOR.loversLavender};
  }
`;

export default function KurlycardAccruedPointText({ accruedPoint }: { accruedPoint: number }) {
  if (!accruedPoint) {
    return null;
  }

  return (
    <AccruedPointText>
      컬리카드 결제 시 최대 <span className={'highlight'}>{addComma(accruedPoint)}원</span> 추가 적립
    </AccruedPointText>
  );
}
