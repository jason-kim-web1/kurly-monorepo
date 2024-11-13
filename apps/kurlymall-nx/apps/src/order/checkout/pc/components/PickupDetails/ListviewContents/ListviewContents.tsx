import styled from '@emotion/styled';

import ListviewInformation from '../../../../shared/components/PickupDetails/ListviewContents/ListviewInformation';
import PickupPlaceList from './PickupPlaceList';
import usePickupIntersect from '../../../../shared/hooks/pickup/usePickupIntersect';
import { usePickupDetail } from '../../../../shared/context/PickupDetailContext';

const Wrapper = styled.div`
  overflow-y: auto;
  padding-top: 8px;
  height: 506px;
`;

export default function ListviewContents() {
  const { keyword } = usePickupDetail();
  const { ref, pickupPlaces, total, isLoading } = usePickupIntersect({ keyword });

  return (
    <Wrapper>
      <ListviewInformation isLoading={isLoading} keyword={keyword} total={total} />
      <PickupPlaceList ref={ref} isLoading={isLoading} places={pickupPlaces} />
    </Wrapper>
  );
}
