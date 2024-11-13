import { useEffect, useState } from 'react';

import { isWebview } from '../../../../../util/window/getDevice';

import appService from '../../../../shared/services/app.service';
import { useAppSelector } from '../../../../shared/store';
import { PERSONAL_INFO_THIRD_PARTIES_AGREE, TermsPolicy } from '../../../shared/shared/constants/terms';
import { TargetTerms, TermsInfo } from '../../../../shared/interfaces/UserTerms';
import { getTermsList } from '../../../shared/shared/utils';
import { termsUrlParse } from '../utils/termsUrlParse';
import useToggle from './useToggle';

interface Response {
  terms: TermsPolicy[];
  targetTermsModal: TargetTerms;
  isDynamicTerms: boolean;
  isVisibleThirdPartyAgree: boolean;
  personalInfo: TermsInfo[];
  isPickupOrder: boolean;
  onClickTerms: (code: string, key: string, url: string) => void;
  isOpen: boolean;
  close: () => void;
}

export default function useCheckoutTerms(): Response {
  const [terms, setTerms] = useState<TermsPolicy[]>([]);
  const [targetTermsModal, setTargetTermsModal] = useState({
    url: '',
    key: '',
  });
  const { isOpen, open, close } = useToggle();
  const [isDynamicTerms, setIsDynamicTerms] = useState(false);
  const { selectedVendor } = useAppSelector(({ checkoutPayment }) => ({
    selectedVendor: checkoutPayment.selectedVendor,
  }));
  const {
    isGiftOrder,
    isUseAllPoint,
    personalInfoAgreement: { isVisibleThirdPartyAgree, terms: personalInfo },
    isPickupOrder,
  } = useAppSelector(({ checkout }) => ({
    isGiftOrder: checkout.isGiftOrder,
    isUseAllPoint: checkout.isUseAllPoint,
    personalInfoAgreement: checkout.personalInfoAgreement,
    isPickupOrder: checkout.isPickupOrder,
  }));

  const onClickTerms = (code: string, url: string, key: string) => {
    const dynamicTerms =
      isVisibleThirdPartyAgree && personalInfo.length > 0 && code === PERSONAL_INFO_THIRD_PARTIES_AGREE.code;

    setIsDynamicTerms(dynamicTerms);

    if (isWebview() && !dynamicTerms) {
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

  useEffect(() => {
    if (!selectedVendor) {
      return;
    }

    const list = getTermsList({
      isGiftOrder,
      code: selectedVendor?.code,
      isUseAllPoint,
    });

    if (!isVisibleThirdPartyAgree) {
      const filterList = list.filter((el) => el.code !== PERSONAL_INFO_THIRD_PARTIES_AGREE.code);
      setTerms(filterList);
      return;
    }

    setTerms(list);
  }, [isGiftOrder, isUseAllPoint, isVisibleThirdPartyAgree, selectedVendor]);

  return {
    terms,
    targetTermsModal,
    isDynamicTerms,
    isVisibleThirdPartyAgree,
    personalInfo,
    isPickupOrder,
    onClickTerms,
    isOpen,
    close,
  };
}
