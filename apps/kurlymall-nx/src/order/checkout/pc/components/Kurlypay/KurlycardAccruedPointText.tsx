import styled from '@emotion/styled';

import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';

const AccruedPointText = styled.p`
  margin-top: 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
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
