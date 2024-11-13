import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { Agreed, CONFIRM_BUTTON_ARRAY, getMembershipQueryData, termsArray } from '../constants';
import { useAppSelector } from '../../../../shared/store';
import { MEMBERS_PRODUCT_CODE } from '../../../../shared/constant';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectMembershipSubscribeConfirm } from '../../../../shared/amplitude/events/membership';
import { createMemberSession } from '../../../../mypage/membership/shared/service';
import Alert, { closeAlert } from '../../../../shared/components/Alert/Alert';
import { setPaymentLoading } from '../../../../order/subscribe/reducers/subscribeCheckout.slice';
import useOpenPayment from '../../../../order/subscribe/hooks/useOpenPayment';
import { PAYMENT_TYPE } from '../../../../order/subscribe/interfaces';

export function useTerms() {
  const isSmsAgreed = useAppSelector(({ member }) => member.subscription.agreeSMS);
  const dispatch = useDispatch();
  const { query } = useRouter();

  const updatedTermsArray = termsArray.reduce(
    (
      acc: {
        id: Agreed;
        label: string;
        total: boolean;
        required: boolean;
        link: string;
        circleCheckbox: boolean;
      }[],
      ele,
    ) => {
      const { id, total } = ele;
      if (isSmsAgreed) {
        if (id !== Agreed.marketing && !total) {
          return [...acc, { ...ele, circleCheckbox: true }];
        }
        return acc;
      }
      return [...acc, { ...ele, circleCheckbox: total }];
    },
    [],
  );

  const isChecked = (id: string) => {
    const activeCheckbox = document.getElementById(`${id}CheckboxActive`);

    if (activeCheckbox) {
      const styles = window.getComputedStyle(activeCheckbox);

      return styles.display !== 'none' && styles.visibility !== 'hidden';
    }

    return false;
  };

  const toggleCheckbox = (id: string, active: boolean) => {
    const activeCheckbox = document.getElementById(`${id}CheckboxActive`);
    const inactiveCheckbox = document.getElementById(`${id}CheckboxInactive`);

    if (active) {
      activeCheckbox?.setAttribute('style', 'display: block');
      inactiveCheckbox?.setAttribute('style', 'display: none');
    } else {
      activeCheckbox?.setAttribute('style', 'display: none');
      inactiveCheckbox?.setAttribute('style', 'display: block');
    }
  };

  const toggleAllCheckbox = (value: boolean) => {
    toggleCheckbox(Agreed.termsAll, value);
    toggleCheckbox(Agreed.terms, value);
    toggleCheckbox(Agreed.marketing, value);
  };

  const activateConfirmButton = (newActive: boolean) => {
    CONFIRM_BUTTON_ARRAY.forEach(({ id, active, loading }) => {
      if (loading) {
        document.getElementById(id)?.setAttribute('style', 'display: none');
      } else {
        document.getElementById(id)?.setAttribute('style', `display: ${active === newActive ? 'block' : 'none'}`);
      }
    });
  };

  const handleCheckEvent = (key: Agreed) => () => {
    const checkbox = document.getElementById(key) as HTMLInputElement;

    if (checkbox) {
      const value = !isChecked(key);

      if (key === Agreed.termsAll) {
        toggleAllCheckbox(value);
        activateConfirmButton(value);
      } else {
        const { required } = updatedTermsArray.find(({ id }) => id === key) || { required: false };

        const checkedAnd = updatedTermsArray.reduce((acc, { id, total }) => {
          if (!total && key !== id) {
            return acc && isChecked(id);
          }
          return acc;
        }, true);

        const totalValue = checkedAnd && value;

        toggleCheckbox(key, value);
        toggleCheckbox(Agreed.termsAll, totalValue);

        if (required) {
          activateConfirmButton(value);
        }
      }
    }
  };

  const didOpen = () => {
    toggleAllCheckbox(false);
    activateConfirmButton(false);

    updatedTermsArray.forEach(({ id }) => {
      document.getElementById(id)?.addEventListener('change', handleCheckEvent(id));
    });
  };

  const didClose = () => {
    updatedTermsArray.forEach(({ id }) => {
      document.getElementById(id)?.removeEventListener('change', handleCheckEvent(id));
    });
  };

  const handlePaymentError = async (error: AxiosError | Error) => {
    const message = `정기결제 신청에 실패하였습니다.\n다시 시도해주세요.`;

    console.error(error);

    await Alert({ text: message });

    dispatch(setPaymentLoading(false));
  };

  const { openSubscribePayment } = useOpenPayment(handlePaymentError);

  const goToKurlyPay = async () => {
    CONFIRM_BUTTON_ARRAY.filter(({ active }) => active).forEach(({ id, loading }) => {
      document.getElementById(id)?.setAttribute('style', `display: ${loading ? 'block' : 'none'}`);
    });

    await createMemberSession({ marketingAgreement: isSmsAgreed || isChecked(Agreed.marketing) });

    amplitudeService.logEvent(new SelectMembershipSubscribeConfirm());

    closeAlert();

    const paymentMethodId = getMembershipQueryData(query).paymentMethodId;

    openSubscribePayment({
      productCode: MEMBERS_PRODUCT_CODE,
      paymentMethodId,
      paymentMethodType: PAYMENT_TYPE.KURLY_PAY,
    });
  };

  return {
    termsArray: updatedTermsArray,
    didOpen,
    didClose,
    goToKurlyPay,
  };
}
