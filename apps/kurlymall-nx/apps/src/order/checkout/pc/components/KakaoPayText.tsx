import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  line-height: 24px;
`;

const Wrap = styled.div`
  padding-top: 5px;
`;

const VendorName = styled.span``;

const BenefitIcon = styled.span`
  margin-left: 4px;
  font-size: 13px;
  font-weight: 600;
  color: ${COLOR.pointText};
`;

const GuideText = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: ${COLOR.kurlyGray500};
`;

interface Props {
  hasEvent: boolean;
}

export default function KakaoPayText({ hasEvent }: Props) {
  return (
    <Container>
      <Wrap>
        <VendorName>카카오페이</VendorName>

        {hasEvent && <BenefitIcon>혜택</BenefitIcon>}
      </Wrap>

      <GuideText>카카오페이 전용 쿠폰 사용 시, 카카오페이 결제만 가능합니다.</GuideText>
    </Container>
  );
}
