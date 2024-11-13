import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { FormikErrors } from 'formik';

import { isEmpty } from 'lodash';

import Button from '../../../../../shared/components/Button/Button';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  border-top: 1px solid ${COLOR.bg};
  text-align: center;
  padding-top: 20px;
  button {
    width: 160px;
    height: 56px;
    border-radius: 3px;
  }
`;

const disabledSubmitButton = css`
  background-color: ${COLOR.lightGray};
`;

interface Error {
  subject: string;
  content: string;
}

interface Props {
  onClickCancel(): void;
  onClickSubmit(): void;
  errors: FormikErrors<Error>;
}

export default function RegisterFormBottom({ onClickSubmit, onClickCancel, errors }: Props) {
  const isValid = isEmpty(Object.keys(errors));

  return (
    <Container>
      <Button text="취소" theme="tertiary" onClick={onClickCancel} />
      <Button text="등록" css={isValid ? null : disabledSubmitButton} onClick={onClickSubmit} disabled={!isValid} />
    </Container>
  );
}
