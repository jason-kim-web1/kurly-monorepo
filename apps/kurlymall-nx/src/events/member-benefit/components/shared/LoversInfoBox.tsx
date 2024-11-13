import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import Info from '../../../../shared/icons/Info';
import { CLASS_NAME_DEVICE } from '../../../../mypage/membership/shared/constants';

const InfoBox = styled.div`
  display: flex;
  margin: 10px 20px 30px;
  padding: 14px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  background-color: ${COLOR.mykurlyBg};
  color: ${COLOR.benefitGray};
  gap: 4px;

  > svg {
    min-width: 14px;
    margin-top: 2px;
  }

  &.pc {
    margin: 0 0 50px;
  }
`;

export default function LoversInfoBox() {
  return (
    <InfoBox className={CLASS_NAME_DEVICE}>
      <Info width={14} height={14} fill={COLOR.kurlyGray800} />
      7월 1일(월) 러버스등급제가 폐지됩니다.
    </InfoBox>
  );
}
