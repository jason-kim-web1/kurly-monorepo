import { FormEvent } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PasswordByPhoneForm, PasswordByPhoneFormError } from '../interfaces';
import COLOR from '../../../../shared/constant/colorset';
import { ID_PLACEHOLDER_TEXT, PHONE_PLACEHOLDER_TEXT } from '../../../../shared/constant';

import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';
import ErrorMessage from '../../../../shared/components/layouts/ErrorMessage';
import PhoneNumberBox from '../../../../shared/components/Input/PhoneNumberBox';

const Form = styled.form`
  padding: 24px 20px;
`;

const InputWrap = styled.div`
  :not(:first-of-type) {
    margin-top: 8px;
  }
`;

const VerificationWrap = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  > div {
    flex-grow: 1;
  }
`;

const Count = styled.p`
  position: absolute;
  right: 112px;
  bottom: 23px;
  font-size: 15px;
  color: ${COLOR.invalidRed};
  line-height: 24px;
`;

const ButtonWrap = styled.div`
  margin-top: 18px;
`;

const button = css`
  margin-bottom: 12px;
  margin-left: 12px;
  flex-shrink: 0;
`;

const input = css`
  button {
    right: 58px;
  }
`;

interface Props {
  form: PasswordByPhoneForm;
  errors: PasswordByPhoneFormError;
  isValid?: boolean;
  status: 'INITIAL' | 'SENT' | 'SUCCESS' | 'EXCEED';
  remainTime: string;
  onChange(e: any): void;
  onBlur(e: any): void;
  onSubmit(): void;
  onClickResend(): void;
}

export default function FindPasswordByPhoneForm({
  form,
  errors,
  isValid = true,
  status,
  remainTime,
  onChange,
  onBlur,
  onSubmit,
  onClickResend,
}: Props) {
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
          disabled={status !== 'INITIAL'}
          hasDeleteButton={!!form.id}
          value={form.id}
          onChange={handleChange}
          onBlur={onBlur}
          type="text"
        />
        <ErrorMessage message={errors.id} />
      </InputWrap>

      <InputWrap>
        <PhoneNumberBox
          id="phone"
          name="phone"
          label="휴대폰 번호"
          maxLength={11}
          disabled={status !== 'INITIAL'}
          hasDeleteButton={!!form.phone}
          value={form.phone}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={PHONE_PLACEHOLDER_TEXT}
        />
        <ErrorMessage message={errors.phone} />
      </InputWrap>

      {status !== 'INITIAL' && (
        <div>
          <VerificationWrap>
            <PhoneNumberBox
              css={input}
              id="verification-number"
              name="verificationNumber"
              label="인증번호"
              hasDeleteButton={!!form.verificationNumber}
              value={form.verificationNumber}
              onBlur={onBlur}
              onChange={handleChange}
              placeholder="인증번호 7자리"
              maxLength={7}
            />
            <Button
              css={button}
              width={88}
              height={48}
              radius={4}
              disabled={status === 'EXCEED'}
              theme="tertiary"
              text="재발송"
              onClick={onClickResend}
            />
            <Count>{remainTime}</Count>
          </VerificationWrap>
          <ErrorMessage message={errors.verificationNumber} />
        </div>
      )}

      <ButtonWrap>
        <Button
          disabled={!isValid || status === 'EXCEED'}
          radius={4}
          text={status === 'INITIAL' ? '인증번호 받기' : '확인'}
          type="submit"
        />
      </ButtonWrap>
    </Form>
  );
}
