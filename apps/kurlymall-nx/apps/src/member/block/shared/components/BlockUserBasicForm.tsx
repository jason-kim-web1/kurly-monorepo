import styled from '@emotion/styled';

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import InputBox from '../../../../shared/components/Input/InputBox';
import { PHONE_PLACEHOLDER_TEXT, TEXT_DENY_REGEX } from '../../../../shared/constant';
import Button from '../../../../shared/components/Button/Button';
import InputGroup from '../../../../shared/components/InputGroup/m/InputGroup';
import {
  AUTH_STEP,
  AuthStepType,
  BLOCK_USER_ERROR_MESSAGE,
  BLOCK_USER_SUCCESS_MESSAGE,
  IBlockUser,
} from '../../interface/BlockUser.interface';
import COLOR from '../../../../shared/constant/colorset';
import PhoneNumberBox from '../../../../shared/components/Input/PhoneNumberBox';
import usePostSendVerificationNumber from '../queries/usePostSendVerificationNumber';
import usePostVerificationNumberVerification from '../queries/usePostVerificationNumberVerification';
import { useVerification } from '../../../../shared/hooks/useVerification';
import Alert from '../../../../shared/components/Alert/Alert';
import { InputGroupStyle, contentsStyle } from '../styled';
import { getLockedToken } from '../service';
import { redirectToLogin } from '../../../../shared/reducers/page';

const Count = styled.p`
  position: absolute;
  right: 16px;
  bottom: 23px;
  font-size: 15px;
  color: ${COLOR.invalidRed};
  line-height: 24px;
`;
const ButtonWrapper = styled.div<{ isPC: boolean }>`
  padding-top: ${({ isPC }) => (isPC ? '32px' : '16px')};
`;

interface Props {
  isPC: boolean;
  authStep: AuthStepType;
  onStepChange: (step: AuthStepType) => void;
}

export default function BlockUserBasicForm({ isPC = true, authStep, onStepChange }: Props) {
  const {
    values: { memberId, mobileNo, verificationNumber },
    context: { dirty, errors, handleSubmit, setFieldValue },
    touched,
    validationEvents,
    handleChange,
  } = useFormEvent<IBlockUser>();
  const { timer, setStep, setRemainSeconds } = useVerification(BLOCK_USER_ERROR_MESSAGE.EXPIRED_NUMBER);

  const { mutate: sendVerificationNumber } = usePostSendVerificationNumber();
  const { mutate: isAvailableVerificationNumber } = usePostVerificationNumberVerification();
  const lockedToken = getLockedToken();

  const dispatch = useDispatch();

  const handleFocus = () => {
    if (errors.memberId) handleSubmit();
  };

  const handleSendVerificationNumber = () => {
    sendVerificationNumber(
      {
        memberId,
        mobileNo,
        lockedToken,
      },
      {
        async onSuccess() {
          setStep(AUTH_STEP.SENT);
          setRemainSeconds(180);
          onStepChange(AUTH_STEP.SENT);
          const { isConfirmed } = await Alert({
            text: BLOCK_USER_SUCCESS_MESSAGE.SEND_VERIFICATION_NUMBER,
            showConfirmButton: true,
            contentsStyle,
          });
          if (isConfirmed) {
            document.getElementById('verificationNumber')?.focus();
          }
        },
        onError(err) {
          const { message } = err as Error;
          if (message === BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED) {
            dispatch(
              redirectToLogin({
                message,
              }),
            );

            return;
          }

          Alert({
            text: message,
            showConfirmButton: true,
            contentsStyle,
          }).then(() => {
            if (message === BLOCK_USER_ERROR_MESSAGE.EXCEED_COUNT) {
              onStepChange(AUTH_STEP.EXCEED);
            }
          });
        },
      },
    );
  };

  const handleClickVerificationButton = () => {
    if (authStep === AUTH_STEP.INITIAL) {
      handleSendVerificationNumber();
    }
    if (authStep === AUTH_STEP.SENT || authStep === AUTH_STEP.EXCEED) {
      isAvailableVerificationNumber(
        {
          verificationNumber,
          mobileNo,
          lockedToken,
        },
        {
          async onSuccess(data) {
            const { token } = data.data;
            setFieldValue('unblockToken', token);
            setStep(AUTH_STEP.SUCCESS);
            onStepChange(AUTH_STEP.SUCCESS);

            const { isConfirmed } = await Alert({
              text: BLOCK_USER_SUCCESS_MESSAGE.PASS_CERTIFICATION,
              showConfirmButton: true,
              contentsStyle,
            });
            if (isConfirmed) {
              document.getElementById('newPassword')?.focus();
            }
          },
          onError(err) {
            const { message } = err as Error;
            if (message === BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED) {
              dispatch(
                redirectToLogin({
                  message,
                }),
              );
              return;
            }

            Alert({
              text: message,
              showConfirmButton: true,
              contentsStyle,
            }).then(() => {
              if (message === BLOCK_USER_ERROR_MESSAGE.EXCEED_COUNT) {
                onStepChange(AUTH_STEP.EXCEED);
              }
            });
          },
        },
      );
    }
  };

  const isInvalidSubmit = useMemo(() => {
    return (
      !!(!dirty || errors.memberId || errors.mobileNo) || !!(authStep === AUTH_STEP.SENT && errors.verificationNumber)
    );
  }, [authStep, errors, dirty]);

  return (
    <>
      <InputGroup label={'아이디'} css={InputGroupStyle} {...validationEvents('memberId')}>
        <InputBox
          id="memberId"
          name={'memberId'}
          value={memberId}
          placeholder="아이디를 입력해주세요"
          maxLength={17}
          required
          denyPattern={TEXT_DENY_REGEX}
          onChange={handleChange}
          isError={!!errors.memberId && touched.memberId}
          disabled={authStep !== AUTH_STEP.INITIAL}
        />
      </InputGroup>

      <InputGroup label={'휴대폰 번호'} css={InputGroupStyle} {...validationEvents('mobileNo')}>
        <PhoneNumberBox
          id="mobileNo"
          name="mobileNo"
          value={mobileNo}
          maxLength={11}
          hasDeleteButton={!!mobileNo}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder={PHONE_PLACEHOLDER_TEXT}
          isError={!!errors.mobileNo && touched.mobileNo}
          disabled={authStep !== AUTH_STEP.INITIAL}
        />
      </InputGroup>

      {authStep !== AUTH_STEP.INITIAL && (
        <>
          <InputGroup
            label={'인증번호'}
            css={InputGroupStyle}
            action={
              authStep !== AUTH_STEP.SUCCESS && (
                <Button
                  width={92}
                  radius={4}
                  theme="tertiary"
                  text="재발송"
                  disabled={authStep === AUTH_STEP.EXCEED}
                  onClick={handleSendVerificationNumber}
                />
              )
            }
            {...validationEvents('verificationNumber')}
          >
            <PhoneNumberBox
              id="verificationNumber"
              name="verificationNumber"
              maxLength={7}
              value={verificationNumber}
              onChange={handleChange}
              placeholder="인증번호 7자리"
              isError={!!errors.verificationNumber && touched.verificationNumber}
              disabled={authStep === AUTH_STEP.SUCCESS || authStep === AUTH_STEP.EXCEED}
            />
            {authStep !== AUTH_STEP.SUCCESS && <Count>{timer}</Count>}
          </InputGroup>
        </>
      )}

      {authStep !== AUTH_STEP.SUCCESS && (
        <ButtonWrapper isPC={isPC}>
          <Button
            height={isPC ? 56 : 48}
            text={authStep !== AUTH_STEP.INITIAL ? '확인' : '인증번호 받기'}
            type="submit"
            onClick={handleClickVerificationButton}
            disabled={isInvalidSubmit}
          />
        </ButtonWrapper>
      )}
    </>
  );
}
