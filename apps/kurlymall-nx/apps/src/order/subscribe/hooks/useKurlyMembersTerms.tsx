import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../../../shared/store';
import { PAYMENT_TERMS_ID, PaymentTermsArray, PaymentTermsId } from '../constants';
import useToggle from '../../checkout/shared/hooks/useToggle';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { termsUrlParse } from '../../checkout/shared/utils/termsUrlParse';
import { setChangeTermsState } from '../reducers/subscribeCheckout.slice';

export default function useKurlyMembersTerms() {
  const dispatch = useDispatch();
  const [allCheckState, setAllCheckState] = useState(false);
  const isSmsAgreed = useAppSelector(({ member }) => member.subscription.agreeSMS);
  const termsState = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.terms);

  useEffect(() => {
    dispatch(setChangeTermsState([{ id: PAYMENT_TERMS_ID.MARKETING, state: isSmsAgreed }]));
  }, [dispatch, isSmsAgreed]);

  const termsArray = useMemo(
    () => (isSmsAgreed ? PaymentTermsArray.filter(({ id }) => id !== PAYMENT_TERMS_ID.MARKETING) : PaymentTermsArray),
    [isSmsAgreed],
  );
  const [targetTermsModal, setTargetTermsModal] = useState({
    url: '',
    key: '',
  });
  const { isOpen, open, close } = useToggle();

  const handleTermsView = ({ url, key }: { url: string; key: PaymentTermsId }) => {
    if (isWebview()) {
      appService.openWebViewPopUp({
        url: encodeURI(termsUrlParse(url)),
      });

      return;
    }

    setTargetTermsModal({
      url: termsUrlParse(url),
      key,
    });

    open();
  };

  const handleAllCheckbox = () => {
    setAllCheckState((prev) => {
      const updateAllCheckState = !prev;
      const updateTermsState = termsArray.map(({ id }) => ({ state: updateAllCheckState, id }));

      dispatch(setChangeTermsState(updateTermsState));

      return updateAllCheckState;
    });
  };

  const handleCheckbox = (id: PaymentTermsId) => {
    const termsCopy = { ...termsState, [id]: !termsState[id] };

    dispatch(setChangeTermsState({ state: termsCopy[id], id }));

    const allState = Object.entries(termsCopy).some(([, state]) => !state);
    setAllCheckState(!allState);
  };

  return {
    paymentTermsList: termsArray,
    termsState,
    allCheckState,
    targetTermsModal,
    modalIsOpen: isOpen,
    modalClose: close,
    handleTermsView,
    handleAllCheckbox,
    handleCheckbox,
  };
}
