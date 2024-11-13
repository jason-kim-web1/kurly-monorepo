import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useRouter } from 'next/router';

import Button from '../../../shared/components/Button/Button';
import { isPC } from '../../../../util/window/getDevice';
import { BORDER_RADIUS } from '../constants';
import { useAppSelector } from '../../../shared/store';
import useResultButton from '../hooks/useResultButton';

const Wrapper = styled.div`
  ${isPC
    ? css`
        margin-top: 20px;
        > button {
          margin-top: 12px;
        }
      `
    : css`
        position: fixed;
        bottom: 8px;
        display: flex;
        left: 12px;
        right: 12px;
        column-gap: 7px;
        @supports (bottom: constant(safe-area-inset-bottom)) {
          bottom: calc(8px + constant(safe-area-inset-bottom));
        }
        @supports (bottom: env(safe-area-inset-bottom)) {
          bottom: calc(8px + env(safe-area-inset-bottom));
        }
      `};
`;

export default function SuccessAction() {
  const { isReady } = useRouter();
  const isQuickSubscribe = useAppSelector(({ subscribeResult }) => subscribeResult.isQuickSubscribe);
  const { handleClickMyMembership, handleClickGoToShopping, handleClickGoToOrder } = useResultButton();

  if (!isReady) {
    return null;
  }

  if (isQuickSubscribe) {
    return (
      <Wrapper>
        <Button text="멤버스 혜택받고 주문하기" radius={BORDER_RADIUS} onClick={handleClickGoToOrder} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Button theme="tertiary" text="쇼핑하러 가기" radius={BORDER_RADIUS} onClick={handleClickGoToShopping} />
      <Button text="확인" radius={BORDER_RADIUS} onClick={handleClickMyMembership} />
    </Wrapper>
  );
}
