import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const SectionDeliveryNotice = styled.div`
  padding: 50px 0;
  color: ${COLOR.kurlyGray600};
  text-align: center;
`;

const Title = styled.h5`
  font-weight: 600;
  font-size: 16px;
`;

const Paragraph = styled.p`
  padding: 13px 10px 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
`;

export default function DeliveryNotice() {
  return (
    <SectionDeliveryNotice>
      <Title>배송관련 안내</Title>
      <Paragraph>
        배송 과정 중 기상 악화 및 도로교통 상황에 따라
        <br />
        부득이하게 지연 배송이 발생될 수 있습니다.
      </Paragraph>
    </SectionDeliveryNotice>
  );
}
