import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import SelectedPickupContents from '../../../shared/components/PickupDetails/SelectedPickupContents';
import { usePickupDetail } from '../../../shared/context/PickupDetailContext';
import { placeSearchType } from '../../../shared/interfaces';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${COLOR.kurlyWhite};
  width: 100%;
`;

export default function SelectedPickupPlacePopup() {
  const { placeState, isKeywordType } = usePickupDetail();
  const selected = placeState[placeSearchType.MAP];

  if (!selected) {
    return null;
  }

  return (
    <Wrapper>
      <SelectedPickupContents pickupPlace={selected} isKeywordType={isKeywordType} />
    </Wrapper>
  );
}
