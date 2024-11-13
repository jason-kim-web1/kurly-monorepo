import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import ListviewInformation from '../../../../shared/components/PickupDetails/ListviewContents/ListviewInformation';
import PickupPlaceList from './PickupPlaceList';
import usePickupIntersect from '../../../../shared/hooks/pickup/usePickupIntersect';
import { usePickupDetail } from '../../../../shared/context/PickupDetailContext';
import { isWebview } from '../../../../../../../util/window/getDevice';

const Wrapper = styled.div<{ isWebviewPage: boolean; visualViewportHeight: number }>`
  overflow-y: auto;
  height: ${({ visualViewportHeight, isWebviewPage }) =>
    `calc(${Boolean(visualViewportHeight) ? `${visualViewportHeight}px` : '100vh'} - ${isWebviewPage ? 64 : 108}px)`};
`;

export default function ListviewContents() {
  const { keyword } = usePickupDetail();
  const { ref, pickupPlaces, total, isLoading } = usePickupIntersect({ keyword });
  const [visualViewportHeight, setVisualViewportHeight] = useState(0);

  useEffect(() => {
    const handleVisualViewportResize = () => {
      if (visualViewport) {
        setVisualViewportHeight(visualViewport.height);
      }
    };

    window?.visualViewport?.addEventListener('resize', handleVisualViewportResize);

    return () => window?.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
  }, []);

  return (
    <Wrapper isWebviewPage={isWebview()} visualViewportHeight={visualViewportHeight}>
      <ListviewInformation isLoading={isLoading} keyword={keyword} total={total} />
      <PickupPlaceList ref={ref} isLoading={isLoading} places={pickupPlaces} />
    </Wrapper>
  );
}
