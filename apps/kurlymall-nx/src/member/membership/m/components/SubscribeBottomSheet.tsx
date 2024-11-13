import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { MEMBERSHIP_PATH } from '../../../../shared/constant';
import { useTerms } from '../../shared/hooks/useTerms';
import { Agreed } from '../../shared/constants';
import TermsList from '../../shared/components/TermsList';
import BottomSheet from '../../../../shared/components/BottomSheet/BottomSheet';
import MembershipButton from '../../shared/components/MembershipButton';
import { useWebview } from '../../../../shared/hooks';
import appService from '../../../../shared/services/app.service';
import { redirectTo } from '../../../../shared/reducers/page';
import { zIndex } from '../../../../shared/styles';
import PaymentProcess from '../../../../order/checkout/shared/components/PaymentProcess';

const TermsContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 7px 12px;
  z-index: ${zIndex.membersBottomButton};

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(7px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(7px + env(safe-area-inset-bottom));
  }
`;

export default function SubscribeBottomSheet() {
  const { termsArray, didOpen, didClose, goToKurlyPay } = useTerms();
  const isWebView = useWebview();
  const dispatch = useDispatch();

  const goToTerms = useCallback(
    (key: Agreed) => () => {
      let url = window.location.origin;
      if (key === Agreed.terms) {
        url = `${url}${MEMBERSHIP_PATH.terms.uri}`;
      }

      if (url) {
        if (isWebView) {
          appService.setNavigationButton({
            buttonType: 'close',
          });
          appService.openWebview({
            url,
            title: '컬리멤버스 서비스 이용약관',
            is_modal: true,
          });
        } else {
          dispatch(
            redirectTo({
              url: MEMBERSHIP_PATH.terms.uri,
            }),
          );
        }
      }
    },
    [dispatch, isWebView],
  );

  const showSubscriptionTerms = useCallback(async () => {
    await BottomSheet({
      headerBar: false,
      showCancelButton: false,
      showConfirmButton: false,
      contents: <TermsList openTerms={goToTerms} termsArray={termsArray} onGoToPaySubscription={goToKurlyPay} />,
      didOpen,
      didClose,
    });
  }, [didClose, didOpen, termsArray, goToKurlyPay, goToTerms]);

  return (
    <>
      <TermsContainer>
        <MembershipButton isPC={false} showTermsPopup={showSubscriptionTerms} />
      </TermsContainer>
      <PaymentProcess />
    </>
  );
}
