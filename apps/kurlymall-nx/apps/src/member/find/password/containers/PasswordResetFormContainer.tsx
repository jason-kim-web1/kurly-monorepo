import { useDispatch } from 'react-redux';

import { reduce } from 'lodash';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import PasswordResetForm from '../components/PasswordResetForm';

import { submitPasswordResetForm } from '../../reducers/find.slice';

import { ResetForm } from '../interfaces';

import { EXCEPT_KOREAN_SPECIAL_CHARACTERS_REGEX, SPECIAL_CHARACTERS_REGEX } from '../../../../shared/constant/regex';

// 10자리 이상
// 16자리 이하
// 영문+숫자
// 영문+특수문자
// 숫자+특수문자
// 같은 숫자 3자리 연속은 안됨
// 공백은 안됨
const schema = Yup.object().shape({
  password: Yup.string()
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
  passwordConfirm: Yup.string().test(
    '새 비밀번호 확인',
    '동일한 비밀번호를 입력해 주세요.',
    (value, context) => !!value && value === context.parent.password,
  ),
});

export default function PasswordResetFormContainer() {
  const dispatch = useDispatch();
  const formik = useFormik<ResetForm>({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validate: async (values) => {
      try {
        await schema.validate(values, {
          abortEarly: false,
          strict: false,
        });
        return {};
      } catch ({ inner }) {
        return reduce(
          inner as any,
          (acc, { path, type, message }) => {
            if (path === 'passwordConfirm') {
              return { ...acc, passwordConfirm: message };
            }

            return {
              ...acc,
              password: { ...acc.password, [type]: message },
            };
          },
          {
            password: { min: '', pattern: '', consecutive: '' },
            passwordConfirm: '',
          },
        );
      }
    },
    onSubmit: (values) => {
      dispatch(submitPasswordResetForm(values.password));
    },
    validateOnChange: true,
  });

  const { isValid, values, touched, errors, handleChange, handleBlur, handleSubmit, dirty } = formik;

  return (
    <PasswordResetForm
      form={values}
      errors={errors}
      touched={touched}
      isValid={dirty && isValid}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
}
