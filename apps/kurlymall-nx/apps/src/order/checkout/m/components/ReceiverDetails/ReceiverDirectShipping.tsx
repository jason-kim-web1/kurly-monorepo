import { ReceivePlace } from '../../../../../shared/enums';
import { ReceiverForm } from '../../../shared/interfaces';

import DeliveryCompleteField from './ReceiverField/DeliveryCompleteField';
import ReceivePlaceField from './ReceiverField/ReceivePlaceField';
import FrontDoorMethodField from './ReceiverField/FrontDoorMethodField';
import ReceivePlaceMessage from './ReceiverField/ReceivePlaceMessage';
import PickupDetailCategoryField from './ReceiverField/PickupDetailCategoryField';

interface Props {
  receiverForm: ReceiverForm;
  onChange: (params: { name: string; value: string }) => void;
}

export default function ReceiverDirectShipping({
  receiverForm: {
    receivePlace,
    frontDoorMethod,
    pickupDetail,
    pickupDetailCategory,
    frontDoorDetail,
    deliveryCompleteMessage,
    receiverTemplate,
  },
  onChange,
}: Props) {
  return (
    <>
      <ReceivePlaceField onChange={onChange} selectedValue={receivePlace} />
      {receivePlace === ReceivePlace.DOOR && (
        <FrontDoorMethodField onChange={onChange} frontDoorMethod={frontDoorMethod} frontDoorDetail={frontDoorDetail} />
      )}
      {receivePlace === ReceivePlace.ETC && (
        <PickupDetailCategoryField
          onChange={onChange}
          pickupDetailCategory={pickupDetailCategory}
          pickupDetail={pickupDetail}
        />
      )}
      <ReceivePlaceMessage
        receivePlace={receivePlace}
        frontDoorMethod={frontDoorMethod}
        pickupDetailCategory={pickupDetailCategory}
      />
      {deliveryCompleteMessage && receiverTemplate && (
        <DeliveryCompleteField
          onChange={onChange}
          selectedValue={deliveryCompleteMessage}
          receiverDetailTemplate={receiverTemplate}
        />
      )}
    </>
  );
}
