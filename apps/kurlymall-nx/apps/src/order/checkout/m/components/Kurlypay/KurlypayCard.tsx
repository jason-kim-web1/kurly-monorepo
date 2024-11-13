import { isUndefined } from 'lodash';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import NextImage from '../../../../../shared/components/NextImage';
import SelectButtonWithModal from '../../../../../shared/components/Input/SelectButtonWithModal';
import { Installment } from '../../../../shared/shared/interfaces';
import { EasyPaymentCardType, EasyPaymentType, KurlypayVendor } from '../../../../../shared/interfaces';
import { useAppSelector } from '../../../../../shared/store';
import { selectVendor, setKurlypayCardInstallment } from '../../../shared/reducers/checkout-payment.slice';

import COLOR from '../../../../../shared/constant/colorset';
import PLCCkurlypayCard from '../../../../shared/shared/components/PLCCkurlypayCard';
import AddKurlypayCard from '../../../../shared/shared/components/AddKurlypayCard';
import { RESOURCE_URL } from '../../../../../shared/configs/config';
import { CardVenderCode, PaymentVenderName } from '../../../../../shared/constant';
import { isKurlycard } from '../../../../shared/shared/services';
import KurlycardAccruedPointText from './KurlycardAccruedPointText';
import HyundaiCardPoint from '../../../shared/components/HyundaiCardPoint';
import { zIndex } from '../../../../../shared/styles';

const Wrapper = styled.div`
  position: relative;
  height: 36.1111vw;
  border-radius: 6px;
`;

const Dimmed = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${zIndex.disableKurlypayCard};
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
`;

const DisableText = styled.p`
  color: ${COLOR.kurlyWhite};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  white-space: pre-line;
  text-align: center;
`;

const select = css`
  margin-top: 12px;
  font-size: 16px;
  height: 38px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 15px;
  bottom: 13px;
  font-size: 10px;
  line-height: 16px;
  color: ${COLOR.kurlyWhite};
`;
const CompanyName = styled.p`
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const MaskingNo = styled.p`
  padding-left: 7px;
  letter-spacing: 0.05em;
`;

interface Props {
  card?: KurlypayVendor;
  active: boolean;
}

const KurlypayCardFallbackImage = `${RESOURCE_URL}/kurly/payment/kurlycard_default_image.svg`;
export default function KurlypayCard({ card, active }: Props) {
  const dispatch = useDispatch();
  const { kurlypayInstallment, selectedVendor, selectedKurlypayVendor } = useAppSelector(({ checkoutPayment }) => ({
    kurlypayInstallment: checkoutPayment.kurlypayInstallment,
    selectedVendor: checkoutPayment.selectedVendor,
    selectedKurlypayVendor: checkoutPayment.selectedKurlypayVendor,
  }));
  const { isGiftCardOrder, kurlycardAccruedPoint, deviceId } = useAppSelector(({ checkout }) => ({
    isGiftCardOrder: checkout.isGiftCardOrder,
    kurlycardAccruedPoint: checkout.price.kurlycardAccruedPoint,
    deviceId: checkout.deviceId,
  }));

  const show = active && !card?.isDisabled;
  const visibleHyundaiPoint = selectedKurlypayVendor?.companyId === CardVenderCode.HYUNDAI_CARD;

  const getKurlypayCardImage = useCallback(() => {
    if (!card || !card.imageUrl) {
      return KurlypayCardFallbackImage;
    }
    return card.imageUrl;
  }, [card]);

  const handleSelectInstalment = (value: Installment) => {
    if (selectedVendor?.code !== PaymentVenderName.KURLYPAY) {
      dispatch(selectVendor('kurlypay'));
    }
    dispatch(setKurlypayCardInstallment(value));
  };

  if (isUndefined(card)) {
    return null;
  }

  if (card.paymentType === EasyPaymentType.ADD_PLCC) {
    return (
      <>
        <PLCCkurlypayCard />
        <KurlycardAccruedPointText accruedPoint={kurlycardAccruedPoint} />
      </>
    );
  }

  if (card.paymentType === EasyPaymentType.ADD_KURLYPAY) {
    return <AddKurlypayCard active={active} isGiftCardOrder={isGiftCardOrder} deviceId={deviceId} />;
  }

  return (
    <>
      <Wrapper>
        {card.isDisabled && (
          <Dimmed>
            <DisableText>{`해당 상품 구매 시\n선택하신 카드는 사용이 제한됩니다`}</DisableText>
          </Dimmed>
        )}
        <NextImage
          src={getKurlypayCardImage()}
          alt={card.companyName}
          layout="fill"
          fallbackImageSrc={KurlypayCardFallbackImage}
        />
        {!isKurlycard(card) && (
          <CardInfo>
            <CompanyName>{card.companyName}</CompanyName>
            <MaskingNo>{card.maskingNo}</MaskingNo>
          </CardInfo>
        )}
      </Wrapper>
      {show && card.cardType === EasyPaymentCardType.CREDIT_CARD && (
        <SelectButtonWithModal
          id="installment"
          title="할부 선택"
          css={select}
          placeholder="할부를 선택해주세요"
          value={kurlypayInstallment}
          options={card.installments}
          onSelect={handleSelectInstalment}
        />
      )}
      {show && isKurlycard(card) && <KurlycardAccruedPointText accruedPoint={kurlycardAccruedPoint} />}
      {show && visibleHyundaiPoint && <HyundaiCardPoint />}
    </>
  );
}
