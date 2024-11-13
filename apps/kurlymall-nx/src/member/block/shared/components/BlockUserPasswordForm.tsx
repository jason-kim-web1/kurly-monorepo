import { useState, FocusEvent, useMemo } from 'react';

import { reduce } from 'lodash';

import * as Yup from 'yup';

import styled from '@emotion/styled';

import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/m/InputGroup';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import {
  AUTH_STEP,
  AuthStepType,
  IBlockUser,
  IBlockUserPassword,
  IBlockUserPasswordError,
} from '../../interface/BlockUser.interface';
import ValidationMessage from '../../../../shared/components/layouts/ValidationMessage';
import { EXCEPT_KOREAN_SPECIAL_CHARACTERS_REGEX, SPECIAL_CHARACTERS_REGEX } from '../../../../shared/constant';
import ErrorMessage from '../../../../shared/components/layouts/ErrorMessage';
import BlockUserSubmit from './BlockUserSubmit';
import { InputGroupStyle } from '../styled';

const ValidationMessageWrapper = styled.p`
  margin: -6px 0 9px;
  div,
  p {
    padding: 1px 0;
  }
`;

const initPasswordSchema = {
  newPassword: { min: '', pattern: '', consecutive: '' },
  newPasswordConfirm: '',
};

const blockUserPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(10, '10자 이상 입력')
    .test('pattern', '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합', (value = '') => {
      if (/\s/.test(value)) {
        return false;
      }

      if (EXCEPT_KOREAN_SPECIAL_CHARACTERS_REGEX.test(value)) {
        return false;
      }

      if (SPECIAL_CHARACTERS_REGEX.test(value) && /[0-9]/.test(value)) {
        return true;
      }

      if (SPECIAL_CHARACTERS_REGEX.test(value) && /[a-zA-Z]/.test(value)) {
        return true;
      }

      if (/[a-zA-Z]/.test(value) && /[0-9]/.test(value)) {
        return true;
      }

      return false;
    })
    .test('consecutive', '동일한 숫자 3개 이상 연속 사용 불가', (value = '') => !/([0-9])\1\1/.test(value)),
  newPasswordConfirm: Yup.string().test(
    '새 비밀번호 확인',
    '동일한 비밀번호를 입력해 주세요.',
    (value, context) => !!value && value === context.parent.newPassword,
  ),
});

const validation = async (newValue: IBlockUserPassword) => {
  try {
    await blockUserPasswordSchema.validate(newValue, {
      abortEarly: false,
      strict: false,
    });
    return initPasswordSchema;
  } catch ({ inner }) {
    return reduce(
      inner as any,
      (acc, { path, type, message }) => {
        if (path === 'newPasswordConfirm') {
          return { ...acc, newPasswordConfirm: message };
        }

        return {
          ...acc,
          newPassword: { ...acc.newPassword, [type]: message },
        };
      },
      initPasswordSchema,
    );
  }
};

interface Props {
  onStepChange: (step: AuthStepType) => void;
}

export default function BlockUserPasswordForm({ onStepChange }: Props) {
  const {
    values: { newPassword, newPasswordConfirm },
    context: { setFieldValue, resetForm },
    validationEvents,
    touched,
  } = useFormEvent<IBlockUser>();

  const [errors, setErrors] = useState<IBlockUserPasswordError>(initPasswordSchema);
  const [visited, setVisited] = useState({
    newPassword: false,
    newPasswordConfirm: false,
  });
  const [dirty, setDirty] = useState({
    newPassword: false,
    newPasswordConfirm: false,
  });
  const isPossibleSubmit = useMemo(() => {
    return (
      !errors.newPassword.min &&
      !errors.newPassword.pattern &&
      !errors.newPassword.consecutive &&
      !errors.newPasswordConfirm
    );
  }, [errors]);

  const handleInputChange = (value: { name?: string; value: string }) => {
    setDirty({
      ...dirty,
      [value.name!]: true,
    });
    const newValue = {
      newPassword: value.name === 'newPassword' ? value.value : newPassword,
      newPasswordConfirm: value.name === 'newPasswordConfirm' ? value.value : newPasswordConfirm,
    };
    validation(newValue).then(setErrors);
    setFieldValue(value.name!, value.value);
  };
  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setVisited({
      ...visited,
      [e.target.name]: true,
    });
  };
  const handleResetForm = () => {
    onStepChange(AUTH_STEP.INITIAL);
    resetForm();
  };

  return (
    <>
      <InputGroup label={'새 비밀번호'} css={InputGroupStyle}>
        <InputBox
          type="password"
          id="newPassword"
          name="newPassword"
          autoComplete="off"
          placeholder="새 비밀번호를 입력해주세요."
          value={newPassword}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          maxLength={16}
          isError={!!errors.newPassword.min || !!errors.newPassword.pattern || !!errors.newPassword.consecutive}
        />
        <ValidationMessageWrapper>
          <ValidationMessage
            visited={visited.newPassword}
            dirty={dirty.newPassword}
            touched={touched.newPassword}
            message="10자 이상 입력"
            errorMessage={errors.newPassword.min}
          />
          <ValidationMessage
            visited={visited.newPassword}
            dirty={dirty.newPassword}
            touched={touched.newPassword}
            message="영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
            errorMessage={errors.newPassword.pattern}
          />
          <ValidationMessage
            visited={visited.newPassword}
            dirty={dirty.newPassword}
            touched={touched.newPassword}
            message="동일한 숫자 3개 이상 연속 사용 불가"
            errorMessage={errors.newPassword.consecutive}
          />
        </ValidationMessageWrapper>
      </InputGroup>
      <InputGroup label={'새 비밀번호 확인'} css={InputGroupStyle} {...validationEvents('newPasswordConfirm')}>
        <InputBox
          type="password"
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          autoComplete="off"
          placeholder="새 비밀번호를 한번 더 입력해주세요."
          value={newPasswordConfirm}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          maxLength={16}
          isError={dirty.newPasswordConfirm && visited.newPasswordConfirm && !!errors.newPasswordConfirm}
        />
        {dirty.newPasswordConfirm && visited.newPasswordConfirm && errors.newPasswordConfirm && (
          <ErrorMessage message={errors.newPasswordConfirm} />
        )}
      </InputGroup>

      <BlockUserSubmit isPossibleSubmit={isPossibleSubmit} handleResetForm={handleResetForm} />
    </>
  );
}
