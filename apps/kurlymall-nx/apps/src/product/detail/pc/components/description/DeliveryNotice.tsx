import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const SectionDeliveryNotice = styled.div`
  display: flex;
  position: relative;
  padding: 14px 0 17px;
  border: 1px solid ${COLOR.lightGray};
  font-weight: 300;
  font-size: 16px;
  line-height: 27px;
`;

const Title = styled.strong`
  width: 179px;
  padding-left: 29px;
  font-weight: 500;
  font-size: 18px;
  color: ${COLOR.kurlyPurple};
`;

const Paragraph = styled.p``;

export default function DeliveryNotice() {
  return (
    <SectionDeliveryNotice>
      <Title>배송관련 안내</Title>
      <Paragraph>배송 과정 중 기상 악화 및 도로교통 상황에 따라 부득이하게 지연 배송이 발생될 수 있습니다.</Paragraph>
    </SectionDeliveryNotice>
  );
}
