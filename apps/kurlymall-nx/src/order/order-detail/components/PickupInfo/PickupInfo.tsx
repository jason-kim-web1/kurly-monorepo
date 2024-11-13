import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { PickupOrderMeta } from '../../../common/interface/PickupOrderMeta';
import Accordion from '../../../common/components/Accordion';
import BaseWrapper from '../../../common/components/BaseWrapper';
import usePickupInfo from '../../hooks/usePickupInfo';
import SelectedPickupPlace from '../../../checkout/m/components/PickupDetails/SelectedPickupPlace';
import { OrderDetail } from '../../interface/OrderDetail';
import BottomButton from './BottomButton';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$4};
  margin-bottom: ${vars.spacing.$8};
`;

interface PickupInformationProps {
  groupOrderNo: OrderDetail['groupOrderNo'];
  pickupOrderMeta: PickupOrderMeta;
}

const TITLE = '픽업정보';

export default function PickupInfo({ groupOrderNo, pickupOrderMeta }: PickupInformationProps) {
  const { pickupStrategy, pickupStatus } = pickupOrderMeta;
  const { isOpen, toggleWithAmplitude, isLoading, handleClick, pickupPlaceText } = usePickupInfo({
    groupOrderNo,
    pickupOrderMeta,
  });

  return (
    <Accordion title={TITLE} isOpen={isOpen} onClick={() => toggleWithAmplitude(TITLE)}>
      <Wrapper>
        <SelectedPickupPlace contents={pickupPlaceText} showMap />
        <BottomButton
          isLoading={isLoading}
          pickupStrategy={pickupStrategy}
          pickupStatus={pickupStatus}
          onClick={handleClick}
        />
      </Wrapper>
    </Accordion>
  );
}
