import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { useTerms } from '../../shared/hooks/useTerms';
import { Agreed } from '../../shared/constants';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import TermsList from '../../shared/components/TermsList';
import Alert, { closeAlert } from '../../../../shared/components/Alert/Alert';
import MembershipButton from '../../shared/components/MembershipButton';
import { zIndex } from '../../../../shared/styles';
import PaymentProcess from '../../../../order/checkout/shared/components/PaymentProcess';

const TermsContainer = styled.div`
  position: sticky;
  bottom: -60px;
  height: 130px;
  margin-top: -130px;
  z-index: ${zIndex.membersBottomButton};
  button {
    margin: 0 auto;
  }
`;

export default function SubscribeBottomSheet() {
  const [hasModalUrl, setHasModalUrl] = useState<{ key: Agreed; url: string } | undefined>(undefined);

  const { termsArray, didOpen, didClose, goToKurlyPay } = useTerms();

  const openTermsModal = (key: Agreed, url: string) => () => {
    closeAlert();

    setHasModalUrl({
      key,
      url,
    });
  };

  const closeTermsModal = () => {
    setHasModalUrl(undefined);
  };

  const showSubscriptionTerms = useCallback(async () => {
    await Alert({
      contentsStyle: `
        .swal2-popup {
          max-width: 440px;
        }

        .popup-content {
          padding: 30px;
        }
      `,
      showCancelButton: false,
      showConfirmButton: false,
      contents: (
        <TermsList
          openTerms={openTermsModal}
          termsArray={termsArray}
          onCancel={closeAlert}
          onGoToPaySubscription={goToKurlyPay}
        />
      ),
      didOpen,
      didClose,
    });
  }, [didOpen, didClose, goToKurlyPay, termsArray]);

  return (
    <>
      <TermsContainer>
        <MembershipButton isPC showTermsPopup={showSubscriptionTerms} />
        {!!hasModalUrl && (
          <TermsViewModal open onClose={closeTermsModal} params={{ key: hasModalUrl.key, url: hasModalUrl.url }} />
        )}
      </TermsContainer>
      <PaymentProcess />
    </>
  );
}
