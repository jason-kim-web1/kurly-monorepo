import styled from '@emotion/styled';

import PlusIcon from '../../../../shared/components/icons/order/checkout/KurlypayCardPlusIcon';
import { KURLYPAY_PATH } from '../../../../shared/constant';

import COLOR from '../../../../shared/constant/colorset';
import useKurlypay, { KurlypayPage, KURLYPAY_PAGES } from '../../../../shared/hooks/useKurlypay';
import { isPC } from '../../../../../util/window/getDevice';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectAddPaymentMethod } from '../../../../shared/amplitude/events';

const Wrapper = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: ${isPC ? '130px' : '36.1111vw'};
  border-radius: 6px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  background-color: ${COLOR.kurlyGray150};
  color: ${COLOR.kurlyGray450};
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  margin-top: 7px;
`;

interface Props {
  active: boolean;
  isGiftCardOrder: boolean;
  deviceId?: string;
}

export default function AddKurlypayCard({ active, isGiftCardOrder, deviceId }: Props) {
  const { openKurlypayPage, getReturnUrl } = useKurlypay();

  const pageParams: { page: KurlypayPage; returnUrl: string; isGiftCardOrder: boolean; deviceId?: string } = {
    page: KURLYPAY_PAGES.registration,
    returnUrl: getReturnUrl(`${KURLYPAY_PATH.kurlypayDefaultCallback.uri}`),
    isGiftCardOrder,
    deviceId,
  };

  const handleClickCard = () => {
    if (!active) {
      return;
    }

    amplitudeService.logEvent(
      new SelectAddPaymentMethod({
        selectionType: 'addpayment',
      }),
    );

    openKurlypayPage(pageParams);
  };

  return (
    <Wrapper active={active} onClick={handleClickCard}>
      <PlusIcon />
      <Text>
        {isGiftCardOrder ? (
          '계좌 추가하기'
        ) : (
          <>
            카드 또는 계좌
            <br />
            추가하기
          </>
        )}
      </Text>
    </Wrapper>
  );
}
