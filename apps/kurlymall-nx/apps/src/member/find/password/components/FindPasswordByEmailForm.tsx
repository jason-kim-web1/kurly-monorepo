import { FormEvent } from 'react';

import styled from '@emotion/styled';

import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';
import ErrorMessage from '../../../../shared/components/layouts/ErrorMessage';

import { PasswordByEmailForm, PasswordByEmailFormError } from '../interfaces';
import { EMAIL_PLACEHOLDER_TEXT, ID_PLACEHOLDER_TEXT } from '../../../../shared/constant';

const Form = styled.form`
  padding: 24px 20px;
`;

const InputWrap = styled.div`
  :not(:first-of-type) {
    margin-top: 8px;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 18px;
`;

interface Props {
  form: PasswordByEmailForm;
  errors: PasswordByEmailFormError;
  isValid?: boolean;
  onChange(e: any): void;
  onBlur(e: any): void;
  onSubmit(): void;
}

export default function FindPasswordByEmailForm({ form, errors, isValid = true, onChange, onBlur, onSubmit }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  const handleChange = (value: { name?: string; value: string }) => {
    onChange({ target: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrap>
        <InputBox
          id="id"
          name="id"
          label="아이디"
          placeholder={ID_PLACEHOLDER_TEXT}
          hasDeleteButton={!!form.id}
          value={form.id}
          onChange={handleChange}
          onBlur={onBlur}
          type="text"
        />
        <ErrorMessage message={errors.id} />
      </InputWrap>

      <InputWrap>
        <InputBox
          id="email"
          name="email"
          label="이메일"
          hasDeleteButton={!!form.email}
          value={form.email}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={EMAIL_PLACEHOLDER_TEXT}
          type="email"
        />
        <ErrorMessage message={errors.email} />
      </InputWrap>

      <ButtonWrap>
        <Button disabled={!isValid} radius={4} text="확인" type="submit" />
      </ButtonWrap>
    </Form>
  );
}
