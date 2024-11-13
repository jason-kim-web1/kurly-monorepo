import { css } from '@emotion/react';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../../shared/store';
import KurlypayVendorIcon from '../../../../shared/shared/components/KurlypayVendorIcon';
import PaymentMethodCategoryButton from '../../../../shared/shared/components/PaymentMethodCategoryButton';
import { PaymentEvents, PaymentVendor, VendorCode, VendorCodes } from '../../../../shared/shared/interfaces';
import KurlypayCards from './KurlypayCards';
import KurlypayErrorButton from '../../../../shared/shared/components/KurlypayErrorButton';

const ButtonWrap = styled.div`
  display: flex;

  :not(:first-of-type) {
    margin-top: 10px;
  }
`;

const KurlypayButtonCSS = css`
  ~ button {
    margin-left: 8px;
  }

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

interface Props {
  selectedVendor?: PaymentVendor;
  event: PaymentEvents;
  onClickPaymentVendor: (vendor: VendorCode) => void;
}

export default function KurlypayButton({ selectedVendor, event, onClickPaymentVendor }: Props) {
  const hasKurlypayError = useAppSelector(({ checkoutPayment }) => checkoutPayment.hasKurlypayError);

  if (hasKurlypayError) {
    return <KurlypayErrorButton />;
  }

  return (
    <div>
      <ButtonWrap>
        <PaymentMethodCategoryButton
          css={KurlypayButtonCSS}
          testId="kurlypay-button"
          color={COLOR.kurlyPurple}
          active={selectedVendor?.code === VendorCodes.KURLYPAY}
          hasEvent={!!event.kurlypay}
          onClick={() => onClickPaymentVendor(VendorCodes.KURLYPAY)}
        >
          <KurlypayVendorIcon active={selectedVendor?.code === VendorCodes.KURLYPAY} />
        </PaymentMethodCategoryButton>
      </ButtonWrap>
      <KurlypayCards />
    </div>
  );
}
