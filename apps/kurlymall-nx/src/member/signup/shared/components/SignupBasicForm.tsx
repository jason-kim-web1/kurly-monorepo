import { css } from '@emotion/react';

import { useCallback, useState } from 'react';

import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { DuplicationKeys } from '../../../../shared/interfaces';
import { useDuplicateInfo } from '../../../../shared/hooks/useDuplicateInfo';
import { TEXT_DENY_REGEX } from '../../../../shared/constant';

const styles = {
  input: css`
    padding-bottom: 0;
  `,
  button: css`
    > span {
      font-size: 14px;
      font-weight: 500;
    }
  `,
};

export default function SignupBasicForm() {
  const {
    values: { memberId, password, passwordConfirm, name, isDuplicateCheckID },
    context: { setFieldValue },
    validationEvents,
    handleChange,
    errors,
  } = useFormEvent<NormalSignupFormInterface>();

  const { handleDuplicate, loading } = useDuplicateInfo();

  const [duplicateStatus, setDuplicateStatus] = useState<{
    status: null | 'success' | 'failed';
    message: null | string;
  }>({ status: null, message: null });

  const handleDuplicateID = useCallback(async () => {
    await handleDuplicate({
      value: memberId,
      key: DuplicationKeys.MEMBER_ID,
      validation: errors.memberId,
      onSuccess: () => setDuplicateStatus({ status: 'success', message: '사용 가능한 아이디입니다.' }),
      onFailure: () => setDuplicateStatus({ status: 'failed', message: '사용 불가능한 아이디 입니다.' }),
      onDuplicate: () => setFieldValue('isDuplicateCheckID', false),
      onNotDuplicate: () => {
        setFieldValue('isDuplicateCheckID', true);
      },
    });
  }, [errors.memberId, handleDuplicate, memberId, setFieldValue]);

  const handleChangeId = useCallback(
    (event: { name: string; value: string }) => {
      if (isDuplicateCheckID) {
        setFieldValue('isDuplicateCheckID', false);
        setDuplicateStatus({ status: null, message: null });
      }
      handleChange(event);
    },
    [handleChange, isDuplicateCheckID, setFieldValue],
  );

  return (
    <>
      <InputGroup
        label={'아이디'}
        isRequired
        {...validationEvents('memberId')}
        {...(duplicateStatus.status === 'failed' ? { validationMessage: duplicateStatus.message || '' } : {})}
        {...(duplicateStatus.status === 'success' ? { successMessage: duplicateStatus.message || '' } : {})}
      >
        <InputBox
          id="memberId"
          name="memberId"
          value={memberId}
          placeholder="아이디를 입력해주세요"
          css={styles.input}
          maxLength={17}
          required
          readOnly={loading}
          denyPattern={TEXT_DENY_REGEX}
          onChange={handleChangeId}
          onBlur={handleDuplicateID}
        />
      </InputGroup>
      <InputGroup label={'비밀번호'} isRequired {...validationEvents('password')}>
        <InputBox
          id="password"
          autoComplete="off"
          name={'password'}
          type={'password'}
          value={password}
          placeholder="비밀번호를 입력해주세요"
          css={styles.input}
          maxLength={16}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup label={'비밀번호확인'} isRequired {...validationEvents('passwordConfirm')}>
        <InputBox
          id="passwordConfirm"
          autoComplete="off"
          name={'passwordConfirm'}
          type={'password'}
          value={passwordConfirm}
          placeholder="비밀번호를 한번 더 입력해주세요"
          css={styles.input}
          maxLength={16}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup label={'이름'} isRequired {...validationEvents('name')}>
        <InputBox
          id="name"
          name={'name'}
          value={name}
          placeholder="이름을 입력해 주세요"
          css={styles.input}
          maxLength={20}
          required
          denyPattern={TEXT_DENY_REGEX}
          onChange={handleChange}
        />
      </InputGroup>
    </>
  );
}
