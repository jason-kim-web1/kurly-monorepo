import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

import { SweetAlertResult } from 'sweetalert2';

import { isMobileWeb, isPC } from '../../../../../util/window/getDevice';

import { useAppSelector } from '../../../../shared/store';
import { setValue, validateCheckoutOrder, setPaymentButtonLoading } from '../reducers/checkout.slice';
import { submitCheckoutGiftOrder, submitCheckoutOrder } from '../../../shared/shared/reducers/payments.slice';

import { orderCheckoutKeys } from '../../../../mypage/order/shared/util/queryKeys';
import { getAmplitudePaymentMethod } from '../utils/getAmplitudePaymentMethod';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCheckout } from '../../../../shared/amplitude/events';

import { ReceiverInfo } from '../interfaces';

import Alert from '../../../../shared/components/Alert/Alert';
import ContinuityConfirm from '../../pc/components/ContinutyConfirm';
import ContinuityBottomSheet from '../../m/components/ContinutyBottomSheet';

export default function useCheckoutSubmit() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    reusablePackage: { selected },
    isGiftOrder,
    validateConfirmed,
    continuityPopupMessage,
    continuityPopupSubMessage,
    continuityPopupMessageBasicStyle,
    continuityPopupMessageReplaceStyles,
    isUseAllPoint,
    price,
  } = useAppSelector(({ checkout }) => checkout);
  const { selectedVendor, kurlypayPaymentType, kurlypayCreditCard, selectedKurlypayVendor } = useAppSelector(
    ({ checkoutPayment }) => ({
      selectedVendor: checkoutPayment.selectedVendor,
      selectedKurlypayVendor: checkoutPayment.selectedKurlypayVendor,
      kurlypayCreditCard: checkoutPayment.selectedKurlypayVendor?.companyId,
      kurlypayPaymentType: checkoutPayment.selectedKurlypayVendor?.paymentType,
    }),
  );

  const receiverInfo = queryClient.getQueryData<ReceiverInfo>(orderCheckoutKeys.orderer());

  const isUseOnlyFreePoint = isUseAllPoint && price.usedPaidPoint === 0;
  const isUseOnlyPaidPoint = isUseAllPoint && price.usedFreePoint === 0;

  const submitCheckout = () => {
    dispatch(setPaymentButtonLoading(true));

    if (selectedVendor) {
      amplitudeService.logEvent(
        new SelectCheckout({
          paymentMethod: getAmplitudePaymentMethod(
            selectedVendor,
            isUseAllPoint,
            kurlypayPaymentType,
            kurlypayCreditCard,
            selectedKurlypayVendor,
            isUseOnlyFreePoint,
            isUseOnlyPaidPoint,
          ),
          referrerEvent: amplitudeService.getWebviewReferrerEvent(),
        }),
      );
    } else {
      amplitudeService.logEvent(
        new SelectCheckout({
          paymentMethod: 'null',
          referrerEvent: amplitudeService.getWebviewReferrerEvent(),
        }),
      );
    }

    if (!receiverInfo) {
      dispatch(setPaymentButtonLoading(false));
      return;
    }

    dispatch(validateCheckoutOrder({ receiverInfo }));
  };

  useEffect(() => {
    (async function () {
      if (!validateConfirmed || !selectedVendor) {
        return;
      }

      dispatch(setValue({ validateConfirmed: false }));

      if (selected === 'PERSONAL') {
        const { isDismissed }: SweetAlertResult = await Alert({
          text: '포장 방법을 개인 보냉 박스로 선택하셨습니다. \n 개인 보냉 박스 이용 유의사항 및 책임 범위를 확인했으며 주문을 계속합니다.',
          showConfirmButton: true,
          showCancelButton: true,
        });

        if (isDismissed) {
          dispatch(setPaymentButtonLoading(false));
          return;
        }
      }

      if (continuityPopupMessage && !isGiftOrder) {
        if (isPC) {
          const { isDismissed }: SweetAlertResult = await ContinuityConfirm({
            message: continuityPopupMessage,
            subMessage: continuityPopupSubMessage,
            basicStyle: continuityPopupMessageBasicStyle,
            replaceStyles: continuityPopupMessageReplaceStyles,
          });

          if (isDismissed) {
            dispatch(setPaymentButtonLoading(false));
            return;
          }
        }

        if (isMobileWeb) {
          const { isDismissed }: SweetAlertResult = await ContinuityBottomSheet({
            message: continuityPopupMessage,
            subMessage: continuityPopupSubMessage,
            basicStyle: continuityPopupMessageBasicStyle,
            replaceStyles: continuityPopupMessageReplaceStyles,
          });

          if (isDismissed) {
            dispatch(setPaymentButtonLoading(false));
            return;
          }
        }
      }

      if (isGiftOrder) {
        dispatch(submitCheckoutGiftOrder(receiverInfo));
      } else {
        dispatch(submitCheckoutOrder());
      }
    })();
  }, [dispatch, isGiftOrder, selected, validateConfirmed]);

  return {
    submitCheckout,
  };
}
