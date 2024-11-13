import { memo } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ArrowRight from '../icons/ArrowRight';

const TermsButtonWrap = styled.div`
  margin-top: 12px;
`;

const Button = styled.button`
  width: 100%;
  height: 36px;
  position: relative;
  text-align: left;
  background-color: transparent;
  border: none;
`;

const DimText = styled.span`
  color: #333333;
`;

const arrow = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;

interface Props {
  isCreditCardPayment?: boolean;
  onClickPersonalTerms(): void;
  onClickPaymentTerms(): void;
  onClickKurlyTerms(): void;
}

function Terms({ isCreditCardPayment = false, onClickPersonalTerms, onClickPaymentTerms, onClickKurlyTerms }: Props) {
  return (
    <>
      <TermsButtonWrap>
        <Button type="button" onClick={onClickPersonalTerms}>
          개인정보 수집∙이용 및 처리 동의 <DimText>(필수)</DimText>
          <ArrowRight css={arrow} />
        </Button>
        {isCreditCardPayment && (
          <Button type="button" onClick={onClickPaymentTerms}>
            결제대행 서비스 약관 동의 <DimText>(필수)</DimText>
            <ArrowRight css={arrow} />
          </Button>
        )}
        <Button type="button" onClick={onClickKurlyTerms}>
          전자지급 결제대행 서비스 이용약관 동의 <DimText>(필수)</DimText>
          <ArrowRight css={arrow} />
        </Button>
      </TermsButtonWrap>
    </>
  );
}

export default memo(Terms);
