import React from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import NextImage from '../../../shared/components/NextImage';
import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';
import { isKurlycard } from '../../shared/shared/services';
import { EasyPaymentCompanyId } from '../../../shared/interfaces';

const Wrapper = styled.div`
  position: relative;
  height: ${isPC ? '130px' : '36.111vw'};
  border-radius: 6px;
`;

const Info = styled.div`
  position: absolute;
  bottom: 4.4vw;
  left: 4.8vw;
  color: ${COLOR.kurlyWhite};
  font-size: 10px;
  letter-spacing: 0.5px;
  font-weight: 600;

  ${isPC &&
  css`
    bottom: 13px;
    left: 15px;
  `}
`;

const MaskingNumber = styled.span`
  margin-left: 7px;
`;

const CurrentPaymentMethod = styled.span`
  position: absolute;
  top: 13px;
  right: 0;
  font-size: 12px;
  background: ${COLOR.kurlyGray900};
  color: ${COLOR.kurlyWhite};
  border-radius: 100px 0 0 100px;
  line-height: 25px;
  z-index: 1;
  padding: 0 8px;
`;

interface KurlypayMethodProps {
  companyCode: EasyPaymentCompanyId;
  companyName: string;
  maskingNo: string;
  imageUrl: string;
  isCurrentPaymentMethod?: boolean;
}
export default function KurlypayPaymentMethod({
  companyCode,
  companyName,
  maskingNo,
  imageUrl,
  isCurrentPaymentMethod,
}: KurlypayMethodProps) {
  return (
    <Wrapper>
      {isCurrentPaymentMethod && <CurrentPaymentMethod>현재 결제수단</CurrentPaymentMethod>}
      <NextImage src={imageUrl} layout="fill" objectFit="cover" alt={`${companyName}카드`} />
      {!isKurlycard({ companyId: companyCode }) && (
        <Info>
          {companyName}
          <MaskingNumber>{maskingNo}</MaskingNumber>
        </Info>
      )}
    </Wrapper>
  );
}
