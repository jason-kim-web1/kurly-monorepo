import styled from '@emotion/styled';

import { Title } from '../components/Title';
import PickupTerms from '../components/PickupTerms';

import { PICKUP_PLACE_INFOMATION_TEXT } from '../../../shared/shared/constants';
import SelectedPickupPlace from '../components/PickupDetails/SelectedPickupPlace';
import COLOR from '../../../../shared/constant/colorset';
import useSelectedPickupContents from '../../shared/hooks/pickup/useSelectedPickupContents';
import SelectPickupPlaceButton from '../components/PickupDetails/SelectPickupPlaceButton';
import useToggle from '../../shared/hooks/useToggle';
import PickupDetailDialog from '../components/PickupDetails/PickupDetailDialog';

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${COLOR.bg};
`;

export default function PickupContainer() {
  const { selectedPickupContents } = useSelectedPickupContents();
  const { isOpen, open, close } = useToggle();

  return (
    <Wrapper id="pickup-container">
      <Title title={PICKUP_PLACE_INFOMATION_TEXT} />
      {!selectedPickupContents ? (
        <SelectPickupPlaceButton openDialog={open} />
      ) : (
        <SelectedPickupPlace contents={selectedPickupContents} openDialog={open} />
      )}
      <PickupDetailDialog isOpen={isOpen} close={close} />
      <Divider />
      <PickupTerms />
    </Wrapper>
  );
}
