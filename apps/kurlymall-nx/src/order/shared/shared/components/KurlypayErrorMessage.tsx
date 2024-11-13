import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';

import Info from '../../../../shared/icons/Info';
import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR.invalidRed};

  & svg:first-of-type {
    margin-right: 5px;
  }

  ${isPC
    ? css`
        margin-top: 14px;
        font-weight: 500;
      `
    : css`
        margin-top: 12px;
        padding-bottom: 4px;
        font-weight: 600;
      `}
`;

const Message = styled.p`
  font-size: 12px;
  line-height: ${isPC ? 16 : 14.4}px;
`;

export default function KurlypayErrorMessage() {
  return (
    <Wrapper>
      <Info width={11} height={11} fill={COLOR.invalidRed} />
      <Message>컬리페이 시스템 점검 중입니다. 다른 결제수단을 이용해 주세요.</Message>
    </Wrapper>
  );
}
