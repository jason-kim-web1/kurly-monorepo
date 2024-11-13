import type { Property } from 'csstype';
import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

import AddressCheckLayer from '../shared/AddressCheckLayer';

const Container = styled.div`
  min-width: 1050px;
`;

const Section = styled.div`
  max-width: 1050px;
  margin: 0 auto;
`;

function BodySection({
  children,
  backgroundColor,
}: {
  children: ReactNode;
  backgroundColor: Property.BackgroundColor;
}) {
  return (
    <div style={{ backgroundColor }}>
      <Section>{children}</Section>
    </div>
  );
}

const FullWidthImg = styled.img`
  width: 100%;
`;

export default function DeliveryGuide() {
  const [isLayerOpened, setLayerOpened] = useState(false);

  return (
    <Container>
      <FullWidthImg
        src="https://res.kurly.com/images/event/delivery_search/pc/delivery_search1_compression.png"
        title="마켓컬리 샛별 & 하루배송"
        alt="싱싱한 채소·과일도 지금 꼭 필요한 뷰티·리빙 용품도 다음날이면 우리집 문 앞에! 최적의 온도를 유지하는 포장과
        배송으로 전해드려요."
      />
      <BodySection backgroundColor="#eae6e2">
        <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/pc/delivery_search2_compression.png" />
      </BodySection>
      <BodySection backgroundColor="white">
        <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/pc/delivery_search11_compression.jpg" />
      </BodySection>
      <BodySection backgroundColor="#d8d1df">
        <button onClick={() => setLayerOpened(true)}>
          <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/pc/delivery_search4_compression.png" />
        </button>
      </BodySection>
      <BodySection backgroundColor="#e9e7f1">
        <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/pc/delivery_searc12_compression.jpg" />
      </BodySection>
      {isLayerOpened && <AddressCheckLayer isPC onClose={() => setLayerOpened(false)} />}
    </Container>
  );
}
