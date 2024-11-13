import styled from '@emotion/styled';
import { useState } from 'react';

import AddressCheckLayer from '../shared/AddressCheckLayer';

const Container = styled.div``;

const FullWidthImg = styled.img`
  width: 100%;
`;

const TabContainer = styled.div`
  position: relative;
`;

const Tab = styled.div`
  position: absolute;
  width: 44vw;
  height: 13vw;
  top: 2.5vw;
`;

const LeftTab = styled(Tab)`
  left: 3.5vw;
`;

const RightTab = styled(Tab)`
  right: 3.5vw;
`;

export default function DeliveryGuide() {
  const [tab, setTab] = useState<'left' | 'right'>('left');
  const [isLayerOpened, setLayerOpened] = useState(false);
  return (
    <Container>
      <FullWidthImg
        src="https://res.kurly.com/images/event/delivery_search/m/delivery_search1_compression.png"
        title="마켓컬리 샛별 & 하루배송"
        alt="싱싱한 채소·과일도 지금 꼭 필요한 뷰티·리빙 용품도 다음날이면 우리집 문 앞에! 최적의 온도를 유지하는 포장과 배송으로 전해드려요."
      />
      <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/m/delivery_search2_compression.png" />
      <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/m/delivery_search11_compression.jpg" />

      <button onClick={() => setLayerOpened(true)}>
        <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/m/delivery_search4_compression.png" />
      </button>
      <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/m/delivery_search5_title_compression.png" />

      {tab === 'left' ? (
        <TabContainer>
          <FullWidthImg
            useMap="#image-map"
            src="https://res.kurly.com/images/event/delivery_search/m/delivery_search5_tab1_compression.png"
          />
          <RightTab onClick={() => setTab('right')} />
          <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/m/delivery_search12_1_compression.jpg" />
        </TabContainer>
      ) : (
        <TabContainer>
          <FullWidthImg
            useMap="#image-map"
            src="https://res.kurly.com/images/event/delivery_search/m/delivery_search5_tab2_compression.png"
          />
          <LeftTab onClick={() => setTab('left')} />
          <FullWidthImg src="https://res.kurly.com/images/event/delivery_search/m/delivery_search7_2_compression.jpg" />
        </TabContainer>
      )}
      {isLayerOpened && <AddressCheckLayer onClose={() => setLayerOpened(false)} />}
    </Container>
  );
}
