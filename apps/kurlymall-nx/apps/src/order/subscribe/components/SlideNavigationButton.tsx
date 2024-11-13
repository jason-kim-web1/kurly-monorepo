import { css } from '@emotion/react';
import styled from '@emotion/styled';

import NavigationArrowKurlypay from '../../../shared/components/icons/order/checkout/NavigationArrowKurlypay';
import { SlideNavigationButtonProps } from '../interfaces';

const NavigationButton = styled.button<{ isNextButton?: boolean }>`
  position: absolute;
  top: 50%;
  left: -25px;
  margin-top: -25px;
  width: 50px;
  height: 50px;
  z-index: 1;

  ${({ isNextButton }) =>
    isNextButton &&
    css`
      left: auto;
      right: -25px;
      transform: rotate(180deg);
    `}
`;

export default function SlideNavigationButton({
  navigationButton,
  handleClickPrevButton,
  handleClickNextButton,
}: SlideNavigationButtonProps) {
  if (!navigationButton) {
    return null;
  }

  const { showPrevButton, showNextButton } = navigationButton;

  return (
    <>
      {showPrevButton && (
        <NavigationButton onClick={handleClickPrevButton}>
          <NavigationArrowKurlypay />
        </NavigationButton>
      )}
      {showNextButton && (
        <NavigationButton isNextButton onClick={handleClickNextButton}>
          <NavigationArrowKurlypay />
        </NavigationButton>
      )}
    </>
  );
}
