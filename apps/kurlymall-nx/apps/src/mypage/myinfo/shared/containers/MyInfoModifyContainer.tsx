import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Formik } from 'formik';

import * as Yup from 'yup';

import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';

import MyInfoForms from '../components/MyInfoForms';
import { initialMypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import { birthDayValidation, birthMonthValidation, birthYearValidation } from '../../../../shared/validation/signup';
import {
  EXCEPT_KOREAN_SPECIAL_CHARACTERS_REGEX,
  ONLY_NUMBER_REGEX,
  SPECIAL_CHARACTERS_REGEX,
} from '../../../../shared/constant';

const Container = styled.div`
  overflow: hidden;

  ${isPC
    ? css`
        padding: 7px 0 20px;
      `
    : css`
        padding: 0 20px;
      `}
`;

const infoModifyValidation = Yup.object().shape({
  newPassword: Yup.string()
    .test('password-min', '10자 이상 입력', (value = '') => {
      if (!value) {
        return true;
      }

      return value.length >= 10;
    })
    .test('password-consecutive', '동일한 숫자 3개 이상 연속 사용 불가', (value = '') => {
      if (!value) {
        return true;
      }

      return !/(\d)\1\1/.test(value);
    })
    .test('password-pattern', '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합', (value = '') => {
      if (!value) {
        return true;
      }

      if (/\s/.test(value)) {
        return false;
      }

      if (EXCEPT_KOREAN_SPECIAL_CHARACTERS_REGEX.test(value)) {
        return false;
      }

      if (SPECIAL_CHARACTERS_REGEX.test(value) && new RegExp(ONLY_NUMBER_REGEX).test(value)) {
        return true;
      }

      if (SPECIAL_CHARACTERS_REGEX.test(value) && /[a-zA-Z]/.test(value)) {
        return true;
      }

      if (/[a-zA-Z]/.test(value) && new RegExp(ONLY_NUMBER_REGEX).test(value)) {
        return true;
      }

      return false;
    })
    .test('password-not-same', '현재 비밀번호와 다르게 입력', (value, context) => {
      if (!context.parent.originalPassword && !value) {
        return true;
      }

      if (context.parent.originalPassword !== value) {
        return true;
      }

      return false;
    }),
  newPasswordConfirm: Yup.string().test('password-confirm', '동일한 비밀번호를 입력해주세요.', (value, context) => {
    if (!context.parent.newPassword && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    return context.parent.newPassword === value;
  }),
  name: Yup.string().required('이름을 입력해 주세요.'),
  email: Yup.string()
    .test('no-email-id', '이메일을 입력해 주세요.', (value = '') => {
      const [emailId] = value?.split('@') || [];
      return !!emailId;
    })
    .test('no-email-domain', '이메일 형식으로 입력해 주세요.', (value = '') => {
      const [, emailDomain] = value?.split('@') || [];
      return !!emailDomain;
    })
    .email('이메일 형식으로 입력해 주세요.'),
  mobileNumber: Yup.string().required('휴대폰 번호를 입력해 주세요.'),
  birthYear: birthYearValidation,
  birthMonth: birthMonthValidation,
  birthDay: birthDayValidation,
});

export default function MyInfoModifyContainer() {
  const router = useRouter();

  return (
    <Container>
      <Formik
        initialValues={initialMypageInfoForm}
        validationSchema={infoModifyValidation}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(_, { setSubmitting }) => {
          setSubmitting(true);
        }}
      >
        {router.isReady && <MyInfoForms />}
      </Formik>
    </Container>
  );
}
