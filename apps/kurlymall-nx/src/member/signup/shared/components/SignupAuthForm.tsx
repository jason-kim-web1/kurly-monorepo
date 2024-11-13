import { css } from '@emotion/react';

import { useCallback, useEffect, useMemo } from 'react';

import styled from '@emotion/styled';

import { useFormEvent } from '../../../../shared/hooks/useFormEvent';

import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';

import { isPC } from '../../../../../util/window/getDevice';

import { NUMBER_DENY_REGEX } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';

import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { useVerification } from '../../../../shared/hooks/useVerification';

const HintText = styled.span<{ color?: string }>`
  display: block;
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  ${({ color }) =>
    color
      ? `
    color: ${color};
    font-weight: 500;
  `
      : `
    color: ${COLOR.kurlyGray600}
  `};
`;

const RemainText = styled.span`
  color: ${COLOR.invalidRed};
`;

const HintTextInputGroupStyle = css`
  padding-top: 0;
  padding-bottom: 0;
  > div {
    padding: 0;
  }
`;

const styles = {
  input: css`
    padding-bottom: 0;
  `,
};

export default function SignupAuthForm() {
  const {
    values: { mobileNumber, authCode, isVerification },
    context: { setFieldValue },
    validationEvents,
    handleChange,
  } = useFormEvent<NormalSignupFormInterface>();

  const onSuccess = useCallback(() => {
    setFieldValue('isVerification', true);
  }, [setFieldValue]);

  const { timer, step, loading, setStep, handleCodeVerification, handleRequestVerification } = useVerification();

  const handleResetVerification = useCallback(() => {
    setStep('INITIAL');
    setFieldValue('isVerification', false);
    setFieldValue('mobileNumber', '');
  }, [setFieldValue, setStep]);

  const requestButton = useMemo(() => {
    if (isVerification) {
      return (
        <Button
          text={'다른번호 인증'}
          theme={'secondary'}
          isSubmitLoading={loading}
          disabled={!mobileNumber}
          onClick={handleResetVerification}
        />
      );
    } else {
      return (
        <Button
          text={'인증번호 받기'}
          theme={'secondary'}
          isSubmitLoading={step === 'INITIAL' && loading}
          disabled={!mobileNumber || step !== 'INITIAL'}
          onClick={() => handleRequestVerification({ path: 'sign-up', mobileNumber })}
        />
      );
    }
  }, [handleRequestVerification, handleResetVerification, isVerification, loading, mobileNumber, step]);

  useEffect(() => {
    if (step === 'INITIAL') {
      setFieldValue('authCode', '');
    }
  }, [setFieldValue, step]);

  return (
    <>
      <InputGroup
        label={'휴대폰'}
        isRequired
        action={requestButton}
        actionSize={isPC ? 'normal' : 'large'}
        {...validationEvents('mobileNumber')}
      >
        <InputBox
          type={'tel'}
          id="mobileNumber"
          name={'mobileNumber'}
          value={mobileNumber}
          placeholder="숫자만 입력해주세요."
          css={styles.input}
          maxLength={11}
          required
          readOnly={isVerification || step !== 'INITIAL'}
          denyPattern={NUMBER_DENY_REGEX}
          onChange={handleChange}
        />
      </InputGroup>
      {step === 'SENT' && (
        <>
          <InputGroup
            isEmptyLabel
            action={
              <Button
                text={'인증번호 확인'}
                theme={'secondary'}
                isSubmitLoading={step === 'SENT' && loading}
                disabled={!authCode}
                onClick={() =>
                  handleCodeVerification(
                    {
                      path: 'sign-up',
                      mobileNumber,
                      authCode,
                    },
                    onSuccess,
                  )
                }
              />
            }
            actionSize={isPC ? 'normal' : 'large'}
          >
            <InputBox
              name={'authCode'}
              value={authCode}
              css={styles.input}
              maxLength={11}
              required
              insideText={<RemainText>{timer}</RemainText>}
              denyPattern={NUMBER_DENY_REGEX}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup css={HintTextInputGroupStyle}>
            <HintText>
              인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리
              1644-1107)
            </HintText>
          </InputGroup>
        </>
      )}
    </>
  );
}
