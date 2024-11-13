import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../shared/store';

import { setValue } from '../../../checkout/shared/reducers/checkout.slice';

export default function useCheckoutGift() {
  const dispatch = useDispatch();
  const { recipientInfo } = useAppSelector(({ checkout }) => checkout);

  const changeGiftReceiverForm = (params: { name: string; value: string }) => {
    if (params.name === 'message-type') {
      dispatch(setValue({ notificationType: params.value }));
      return;
    }

    dispatch(
      setValue({
        recipientInfo: {
          ...recipientInfo,
          [params.name]: params.value,
        },
      }),
    );
  };

  const changeGiftContact = (params: { name: string; phone: string }) => {
    dispatch(
      setValue({
        recipientInfo: {
          ...recipientInfo,
          name: params.name,
          phone: params.phone,
        },
      }),
    );
  };

  return { changeGiftReceiverForm, changeGiftContact };
}
