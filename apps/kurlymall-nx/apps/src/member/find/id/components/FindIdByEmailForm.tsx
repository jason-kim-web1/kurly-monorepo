import { FormEvent } from 'react';

import styled from '@emotion/styled';

import { TEXT_DENY_REGEX, EMAIL_PLACEHOLDER_TEXT, NAME_PLACEHOLDER_TEXT } from '../../../../shared/constant';

import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';
import ErrorMessage from '../../../../shared/components/layouts/ErrorMessage';

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
  form: {
    name: string;
    email: string;
  };
  errors: {
    name: string;
    email: string;
  };
  isValid?: boolean;
  onChange(e: any): void;
  onBlur(e: any): void;
  onSubmit(): void;
}

export default function FindIdByEmailForm({ form, errors, isValid = true, onChange, onBlur, onSubmit }: Props) {
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
          id="name"
          name="name"
          label="이름"
          hasDeleteButton={!!form.name}
          placeholder={NAME_PLACEHOLDER_TEXT}
          denyPattern={TEXT_DENY_REGEX}
          value={form.name}
          onChange={handleChange}
          onBlur={onBlur}
          maxLength={20}
          type="text"
        />
        <ErrorMessage message={errors.name} />
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
