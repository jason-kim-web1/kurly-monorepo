import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button from '../../../shared/components/Button/Button';
import COLOR from '../../../shared/constant/colorset';
import { isMobileDevice, isPC } from '../../../../util/window/getDevice';
import { BORDER_RADIUS } from '../constants';
import { useAppSelector } from '../../../shared/store';
import useResultButton from '../hooks/useResultButton';

const Wrapper = styled.div`
  ${isMobileDevice &&
  css`
    position: fixed;
    bottom: 8px;
    left: 12px;
    right: 12px;
    @supports (bottom: constant(safe-area-inset-bottom)) {
      bottom: calc(8px + constant(safe-area-inset-bottom));
    }
    @supports (bottom: env(safe-area-inset-bottom)) {
      bottom: calc(8px + env(safe-area-inset-bottom));
    }
  `}
`;

const Notice = styled.p`
  margin: ${isPC ? '100px 0 24px' : '0 0 20px'};
  color: ${COLOR.kurlyGray450};
  line-height: 19px;
`;

export default function FailAction() {
  const { isChangePayment, isQuickSubscribe } = useAppSelector(({ subscribeResult }) => ({
    isChangePayment: subscribeResult.isChangePayment,
    isQuickSubscribe: subscribeResult.isQuickSubscribe,
  }));
  const { handleClickGoToOrder, handleClickMyMembership, handleClickMembership } = useResultButton();

  const handleClickCheckButton = () => {
    if (isQuickSubscribe) {
      handleClickGoToOrder();
      return;
    }

    if (isChangePayment) {
      handleClickMyMembership();
      return;
    }

    handleClickMembership();
  };

  return (
    <Wrapper>
      <Notice>
        문의가 있을 경우,
        <br />
        1:1 문의에 남겨주시면 신속히 해결해드리겠습니다.
      </Notice>
      <Button text="확인" radius={BORDER_RADIUS} onClick={handleClickCheckButton} />
    </Wrapper>
  );
}
