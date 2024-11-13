import { useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { reduce } from 'lodash';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import FindPasswordByEmailForm from '../components/FindPasswordByEmailForm';

import { submitFindPasswordByEmail } from '../../reducers/find.slice';

import { PasswordByEmailForm, PasswordByEmailFormError } from '../interfaces';
import { commonYup } from '../constants';

const schema = Yup.object().shape({
  ...commonYup,
  email: Yup.string().email('올바른 이메일 형식을 입력해 주세요').required('가입 시 등록한 이메일을 입력해 주세요.'),
});

export default function FindPasswordByEmailFormContainer() {
  const dispatch = useDispatch();
  const formik = useFormik<PasswordByEmailForm>({
    initialValues: {
      id: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(submitFindPasswordByEmail(values));
    },
  });

  const { isValid, values, touched, errors, handleChange, handleBlur, handleSubmit, dirty } = formik;

  const err: PasswordByEmailFormError = useMemo(
    () =>
      reduce(
        errors,
        (acc, cur: any, key: any) => ({
          ...acc,
          [key]: (touched as any)[key] ? cur : '',
        }),
        {
          id: '',
          email: '',
        },
      ),
    [touched, errors],
  );

  return (
    <FindPasswordByEmailForm
      form={values}
      errors={err}
      isValid={dirty && isValid}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
}
