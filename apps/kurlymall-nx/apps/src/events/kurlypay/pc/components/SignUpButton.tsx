import styled from '@emotion/styled';

import { css } from '@emotion/react';

import useKurlyPayLink from '../../shared/hooks/useKurlyPayLink';

const SignUp = styled.button<{ keyVisual?: boolean }>`
  position: absolute;
  left: 416px;
  bottom: 128px;
  width: 380px;
  height: 74px;
  font-size: 0;

  ${({ keyVisual }) =>
    keyVisual &&
    css`
      bottom: 93px;
      width: 305px;
    `}
`;

export default function SignUpButton({ keyVisual }: { keyVisual?: boolean }) {
  const { goToKurlyPayMain: handleClickSignUp } = useKurlyPayLink();

  return (
    <SignUp onClick={handleClickSignUp} keyVisual={keyVisual}>
      컬리페이 가입하기
    </SignUp>
  );
}
