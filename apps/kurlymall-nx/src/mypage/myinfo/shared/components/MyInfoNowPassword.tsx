import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useFormEvent } from '../../../../shared/hooks/useFormEvent';

import { postPasswordConfirm } from '../../services/myinfo.service';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';

import ErrorMessage from '../../../../shared/components/layouts/ErrorMessage';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import InputBox from '../../../../shared/components/Input/InputBox';

const ErrorMessageWrap = styled.div`
  padding: 10px 0;
`;

const inputStyle = css`
  padding: 0;

  input {
    font-size: 14px;
  }
`;

export default function MyInfoNowPassword() {
  const {
    values: { originalPassword, isVerifiedOriginalPassword },
    context: { setFieldValue, setSubmitting },
    handleChange,
  } = useFormEvent<MypageInfoForm>();

  const handleBlur = useCallback(async () => {
    if (originalPassword) {
      try {
        setSubmitting(true);
        await postPasswordConfirm(originalPassword);
        setFieldValue('isVerifiedOriginalPassword', true);
      } catch (e) {
        setFieldValue('isVerifiedOriginalPassword', false);
      }
    } else {
      setFieldValue('isVerifiedOriginalPassword', true);
    }
    setSubmitting(false);
  }, [originalPassword, setFieldValue, setSubmitting]);

  return (
    <InputGroup label="현재 비밀번호" htmlFor="originalPassword">
      <InputBox
        id="originalPassword"
        name="originalPassword"
        type="password"
        autoComplete="off"
        value={originalPassword}
        placeholder="비밀번호를 입력해 주세요"
        onChange={handleChange}
        onBlur={handleBlur}
        css={inputStyle}
      />
      {!isVerifiedOriginalPassword && (
        <ErrorMessageWrap>
          <ErrorMessage message="현재 비밀번호를 확인해주세요" />
        </ErrorMessageWrap>
      )}
    </InputGroup>
  );
}
