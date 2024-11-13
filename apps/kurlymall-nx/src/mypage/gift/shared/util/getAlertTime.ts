import { DeliveryCompleteMessageTextMap } from '../../../../shared/constant';
import { DeliveryCompleteType } from '../../../../shared/enums';

interface Props {
  deliveryMessageTimeType: DeliveryCompleteType;
}

export const getAlertTime = ({ deliveryMessageTimeType }: Props) => {
  const deliveryAlertTime = DeliveryCompleteMessageTextMap[deliveryMessageTimeType];

  return {
    subject: '메세지 전송시점',
    contents: deliveryAlertTime,
  };
};
