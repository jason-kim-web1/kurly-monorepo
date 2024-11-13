import { FocusEvent, FormEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { FormikTouched } from 'formik';

import InputBox from '../../../../shared/components/Input/InputBox';
import Button from '../../../../shared/components/Button/Button';
import ValidationMessage from '../../../../shared/components/layouts/ValidationMessage';

import AddressContainer from '../containers/AddressContainer';
import AdditionalInputContainer from '../containers/AdditionalInputContainer';

import { SignupForm } from '../../interfaces';
import { TEXT_DENY_REGEX } from '../../../../shared/constant';

const Form = styled.form`
  padding: 20px;
`;

const VerificationWrap = styled.div`
  display: flex;
  align-items: flex-end;
  > div {
    flex-grow: 1;
  }
`;

const button = css`
  margin-bottom: 12px;
  margin-left: 8px;
  flex-shrink: 0;
`;

const ErrorWrap = styled.div``;
const InputWrap = styled.div``;

interface Props {
  form: SignupForm;
  errors: any;
  duplicate: boolean;
  touched: FormikTouched<SignupForm>;
  onChange(e: any): void;
  onClick(): void;
  onBlur(e: any): void;
  onSubmit(): void;
}

export default function SimpleSignupForm({
  form,
  errors,
  duplicate,
  touched,
  onChange,
  onClick,
  onBlur,
  onSubmit,
}: Props) {
  const [visitedState, setVisitedState] = useState({
    id: false,
    password: false,
    passwordConfirm: false,
  });
  const [dirty, setDirty] = useState({
    id: false,
    password: false,
    passwordConfirm: false,
  });

  useEffect(() => {
    setVisitedState({ ...visitedState, id: !!form.id });
    setDirty({ ...dirty, id: !!form.id });
  }, [form.id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  const handleChange = (value: { name: string; value: string }) => {
    setDirty({
      ...dirty,
      [value.name]: true,
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
    <Form onSubmit={handleSubmit} noValidate>
      <InputWrap>
        <VerificationWrap>
          <InputBox
            id="id"
            name="id"
            label="아이디"
            placeholder="예 : marketkurly12"
            required
            denyPattern={/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g}
            value={form.id}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={onBlur}
            maxLength={17}
          />
          <Button css={button} radius={6} width={88} height={48} onClick={onClick} theme="secondary" text="중복확인" />
        </VerificationWrap>
        <ErrorWrap>
          <ValidationMessage
            visited={visitedState.id}
            dirty={dirty.id}
            touched={touched.id}
            message="6자 이상의 영문 혹은 영문과 숫자를 조합"
            errorMessage={errors.id?.minAndPattern}
          />
          <ValidationMessage
            visited={visitedState.id}
            dirty={dirty.id}
            touched={touched.id}
            message="아이디 중복 확인"
            errorMessage={duplicate ? '아이디 중복 확인' : ''}
          />
        </ErrorWrap>
      </InputWrap>

      <InputWrap>
        <InputBox
          id="name"
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          required
          denyPattern={TEXT_DENY_REGEX}
          value={form.name}
          onChange={handleChange}
          maxLength={20}
        />
      </InputWrap>

      <InputWrap>
        <InputBox
          id="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          required
          value={form.password}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={onBlur}
          maxLength={16}
          type="password"
        />
        <ErrorWrap>
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
        </ErrorWrap>
      </InputWrap>

      <InputWrap>
        <InputBox
          id="passwordConfirm"
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          required
          value={form.passwordConfirm}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={onBlur}
          maxLength={16}
          type="password"
        />
        <ErrorWrap>
          <ValidationMessage
            visited={visitedState.passwordConfirm}
            touched={touched.passwordConfirm}
            dirty={dirty.passwordConfirm}
            message="동일한 비밀번호를 입력해 주세요."
            errorMessage={errors.passwordConfirm}
          />
        </ErrorWrap>
      </InputWrap>

      <AddressContainer />
      <AdditionalInputContainer />

      <Button radius={6} height={48} text="가입하기" type="submit" />
    </Form>
  );
}
