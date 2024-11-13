import { FocusEvent, FormEvent, useState } from 'react';

import styled from '@emotion/styled';

import { FormikTouched } from 'formik';

import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';

import { ResetForm } from '../interfaces';
import ValidationMessage from '../../../../shared/components/layouts/ValidationMessage';

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
  form: ResetForm;
  errors: any;
  touched: FormikTouched<ResetForm>;
  isValid?: boolean;
  onChange(e: any): void;
  onBlur(e: any): void;
  onSubmit(): void;
}

export default function PasswordResetForm({
  form,
  errors,
  touched,
  isValid = true,
  onChange,
  onBlur,
  onSubmit,
}: Props) {
  const [visitedState, setVisitedState] = useState({
    password: false,
    passwordConfirm: false,
  });
  const [dirty, setDirty] = useState({
    password: false,
    passwordConfirm: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  const handleChange = (value: { name?: string; value: string }) => {
    setDirty({
      ...dirty,
      [value.name!]: true,
    });

    onChange({ target: value });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setVisitedState({
      ...visitedState,
      [e.target.name]: true,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrap>
        <InputBox
          id="password"
          name="password"
          label="새 비밀번호 등록"
          placeholder="새 비밀번호를 입력해 주세요"
          maxLength={16}
          hasDeleteButton={!!form.password}
          value={form.password}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={onBlur}
          type="password"
        />
        <ValidationMessage
          visited={visitedState.password}
          dirty={dirty.password}
          touched={touched.password}
          message="10자 이상 입력"
          errorMessage={errors.password?.min}
        />
        <ValidationMessage
          visited={visitedState.password}
          dirty={dirty.password}
          touched={touched.password}
          message="영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
          errorMessage={errors.password?.pattern}
        />
        <ValidationMessage
          visited={visitedState.password}
          dirty={dirty.password}
          touched={touched.password}
          message="동일한 숫자 3개 이상 연속 사용 불가"
          errorMessage={errors.password?.consecutive}
        />
      </InputWrap>

      <InputWrap>
        <InputBox
          id="passwordConfirm"
          name="passwordConfirm"
          label="새 비밀번호 확인"
          maxLength={16}
          hasDeleteButton={!!form.passwordConfirm}
          value={form.passwordConfirm}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="새 비밀번호를 한 번 더 입력해 주세요"
          type="password"
        />
        <ValidationMessage
          visited={visitedState.passwordConfirm}
          touched={touched.passwordConfirm}
          dirty={dirty.passwordConfirm}
          message="동일한 비밀번호를 입력해 주세요."
          errorMessage={errors.passwordConfirm}
        />
      </InputWrap>

      <ButtonWrap>
        <Button disabled={!isValid} radius={4} text="확인" type="submit" />
      </ButtonWrap>
    </Form>
  );
}
