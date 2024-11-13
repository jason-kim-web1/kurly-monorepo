import styled from '@emotion/styled';

import { getFormattedDate } from '../../../shared/utils/productDetailState';
import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';

const GuideText = styled.div`
  color: ${COLOR.kurlyPurple};
  line-height: 1.43;
  white-space: pre-line;
  margin-top: 10px;
`;

interface Props {
  newbieLimitDatetime: string;
  newbieMinPrice: number;
}

export default function MemberCouponGuide({ newbieLimitDatetime, newbieMinPrice }: Props) {
  return (
    <GuideText>
      {getFormattedDate(newbieLimitDatetime, 'MM월 dd일 HH시 mm분')}까지 구매 가능{'\n'}
      {addComma(newbieMinPrice)}원 이상 결제 시 구매 가능
    </GuideText>
  );
}
