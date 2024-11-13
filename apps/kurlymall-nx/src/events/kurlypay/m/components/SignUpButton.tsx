import styled from '@emotion/styled';

import useKurlyPayLink from '../../shared/hooks/useKurlyPayLink';

const SignUp = styled.button<{ bottom: number }>`
  position: absolute;
  left: 0;
  bottom: ${({ bottom }) => bottom ?? 0}vw;
  width: 100%;
  height: 19vw;
  font-size: 0;
`;

export default function SignUpButton({ bottom }: { bottom: number }) {
  const { goToKurlyPayMain: handleClickSignUp } = useKurlyPayLink();

  return (
    <SignUp onClick={handleClickSignUp} bottom={bottom}>
      컬리페이 가입하기
    </SignUp>
  );
}
