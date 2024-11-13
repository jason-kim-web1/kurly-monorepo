import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const VendorNameWrap = styled.div`
  margin-top: 8px;
`;

const VendorName = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;

const PaymentGuideText = styled.div`
  padding-bottom: 4px;
  margin-top: 10px;
  font-size: 12px;
  color: ${COLOR.kurlyGray500};
`;

const BenefitIcon = styled.span`
  margin-left: 4px;
  font-size: 13px;
  font-weight: 600;
  color: ${COLOR.pointText};
`;

interface Props {
  hasEvent: boolean;
}

export default function KakaoPayText({ hasEvent }: Props) {
  return (
    <>
      <VendorNameWrap>
        <VendorName>카카오페이</VendorName>

        {hasEvent && <BenefitIcon>혜택</BenefitIcon>}
      </VendorNameWrap>

      <PaymentGuideText>카카오페이 전용 쿠폰 사용 시, 카카오페이 결제만 가능합니다.</PaymentGuideText>
    </>
  );
}
