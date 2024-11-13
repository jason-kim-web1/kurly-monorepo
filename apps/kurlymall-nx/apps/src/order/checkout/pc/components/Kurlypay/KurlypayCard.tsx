import { isUndefined } from 'lodash';

import styled from '@emotion/styled';

import { useCallback } from 'react';

import { EasyPaymentType, KurlypayVendor } from '../../../../../shared/interfaces';

import PLCCkurlypayCard from '../../../../shared/shared/components/PLCCkurlypayCard';
import AddKurlypayCard from '../../../../shared/shared/components/AddKurlypayCard';

import NextImage from '../../../../../shared/components/NextImage';
import { RESOURCE_URL } from '../../../../../shared/configs/config';
import { isKurlycard } from '../../../../shared/shared/services';
import COLOR from '../../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../../shared/store';
import { zIndex } from '../../../../../shared/styles';

const Wrapper = styled.div`
  position: relative;
  text-align: center;
  width: 206px;
  height: 130px;
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

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 15px;
  bottom: 13px;
  font-size: 10px;
  line-height: 16px;
  color: ${COLOR.kurlyWhite};
`;

const CompanyName = styled.p`
  font-weight: 700;
  letter-spacing: -0.5px;
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
  const isGiftCardOrder = useAppSelector(({ checkout }) => checkout.isGiftCardOrder);

  const getKurlypayCardImage = useCallback(() => {
    if (!card || !card.imageUrl) {
      return KurlypayCardFallbackImage;
    }
    return card.imageUrl;
  }, [card]);

  if (isUndefined(card)) {
    return null;
  }

  if (card.paymentType === EasyPaymentType.ADD_PLCC) {
    return <PLCCkurlypayCard />;
  }

  if (card.paymentType === EasyPaymentType.ADD_KURLYPAY) {
    return <AddKurlypayCard active={active} isGiftCardOrder={isGiftCardOrder} />;
  }

  return (
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
  );
}
