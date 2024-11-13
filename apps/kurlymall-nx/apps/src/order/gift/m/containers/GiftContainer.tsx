import { useAppSelector } from '../../../../shared/store';

import { Panel } from '../../../../shared/components/Panel';
import { Divider } from '../../../../shared/components/Divider/Divider';

import GiftReceiverInfo from '../components/GiftReceiverInfo';
import GiftMessageForm from '../components/GiftMessageForm';

import useCheckoutGift from '../../shared/hook/useCheckoutGift';

export default function GiftContainer() {
  const { recipientInfo, notificationType } = useAppSelector(({ checkout }) => ({
    recipientInfo: checkout.recipientInfo,
    notificationType: checkout.notificationType,
  }));
  const { changeGiftReceiverForm, changeGiftContact } = useCheckoutGift();

  return (
    <>
      <Panel title="받으실 분" />
      <GiftReceiverInfo
        recipientInfo={recipientInfo}
        notificationType={notificationType}
        onChange={changeGiftReceiverForm}
        onChangeContact={changeGiftContact}
      />
      <Divider />
      <GiftMessageForm recipientInfo={recipientInfo} onChange={changeGiftReceiverForm} />
      <Divider />
    </>
  );
}
