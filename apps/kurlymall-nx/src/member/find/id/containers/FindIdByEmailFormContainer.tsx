import { useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { reduce } from 'lodash';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import FindIdByEmailForm from '../components/FindIdByEmailForm';

import { submitFindIdByEmail } from '../../reducers/find.slice';

const schema = Yup.object().shape({
  name: Yup.string().required('가입 시 등록한 이름을 입력해 주세요.'),
  email: Yup.string().email('올바른 이메일 형식을 입력해 주세요').required('가입 시 등록한 이메일을 입력해 주세요.'),
});

export default function FindIdByEmailFormContainer() {
  const dispatch = useDispatch();
  const formik = useFormik<{ name: string; email: string }>({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(submitFindIdByEmail(values));
    },
  });

  const { isValid, values, touched, errors, handleChange, handleBlur, handleSubmit, dirty } = formik;

  const err: { name: string; email: string } = useMemo(
    () =>
      reduce(
        errors,
        (acc, cur: any, key: any) => ({
          ...acc,
          [key]: (touched as any)[key] ? cur : '',
        }),
        {
          name: '',
          email: '',
        },
      ),
    [touched, errors],
  );

  return (
    <FindIdByEmailForm
      form={values}
      errors={err}
      isValid={dirty && isValid}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
}
