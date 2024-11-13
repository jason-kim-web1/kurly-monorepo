import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  text-align: center;

  ${isPC
    ? css`
        padding: 100px 0 60px;
      `
    : css`
        padding: 40px 0;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `};
`;

const SaveSuccessfulIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.p`
  ${isPC
    ? css`
        margin-top: 24px;
        font-weight: 500;
        font-size: 20px;
      `
    : css`
        margin-top: 24px;
        font-size: 18px;
      `};
`;

export default function SaveProfile() {
  return (
    <Wrapper>
      <SaveSuccessfulIcon src="https://res.kurly.com/mobile/service/order/1909/img_success_order_end.gif" alt="" />
      <Title>프로필 저장이 완료되었습니다.</Title>
    </Wrapper>
  );
}
