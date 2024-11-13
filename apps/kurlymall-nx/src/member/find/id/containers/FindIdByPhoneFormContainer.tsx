import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { reduce } from 'lodash';

import moment from 'moment';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import FindIdByPhoneForm from '../components/FindIdByPhoneForm';

import { AppState } from '../../../../shared/store';
import { requestVerificationNumber, submitFindIdByPhone } from '../../reducers/find.slice';

import Alert from '../../../../shared/components/Alert/Alert';
import { phoneValidate } from '../../../../shared/utils';

import { IdByPhoneFormError } from '../interfaces';

export default function FindByPhoneFormContainer() {
  const [remainTime, setRemainTime] = useState('03:00');

  const dispatch = useDispatch();
  const { idByPhone } = useSelector((state: AppState) => state.find);

  const schema = Yup.object().shape({
    name: Yup.string().required('가입 시 등록한 이름을 입력해 주세요.'),
    phone: Yup.string()
      .required('가입 시 등록한 휴대폰 번호를 입력해 주세요.')
      .test('phone', '휴대폰 번호를 정확히 입력해 주세요.', (value = '') => phoneValidate(value)),
    verificationNumber: Yup.string()
      .test('인증번호', '인증번호를 입력해 주세요', (value = '') => idByPhone.status !== 'SENT' || !!value)
      .test('인증번호', '7자리를 입력해 주세요', (value = '') => idByPhone.status !== 'SENT' || value.length === 7),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      verificationNumber: '',
    },
    initialTouched: {},
    validationSchema: schema,
    onSubmit: (values) => {
      if (idByPhone.status === 'INITIAL') {
        dispatch(requestVerificationNumber(values));
        return;
      }

      dispatch(submitFindIdByPhone(values));
    },
  });

  const {
    isValid,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    dirty,
    validateForm,
    setFieldValue,
  } = formik;

  const err: IdByPhoneFormError = useMemo(
    () =>
      reduce(
        errors,
        (acc, cur: any, key: any) => ({
          ...acc,
          [key]: (touched as any)[key] ? cur : '',
        }),
        {
          name: '',
          phone: '',
          verificationNumber: '',
        },
      ),
    [touched, errors],
  );

  const handleClickResend = () => {
    dispatch(requestVerificationNumber(values));
  };

  useEffect(() => {
    if (!idByPhone.endTime) {
      return undefined;
    }

    setFieldValue('verificationNumber', '');

    const interval = setInterval(() => {
      const diff = moment(idByPhone.endTime).diff(moment());
      if (diff < 0) {
        clearInterval(interval);
        setRemainTime('00:00');

        Alert({
          text: `유효 시간이 만료되었습니다.
  재발송 후 다시 시도해 주세요.`,
        });
        return;
      }

      const duration = moment.duration(diff);
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      setRemainTime(`${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [idByPhone.endTime]);

  useEffect(() => {
    if (idByPhone.status === 'SENT') {
      validateForm();
    }
  }, [idByPhone.status]);

  return (
    <FindIdByPhoneForm
      form={values}
      errors={err}
      remainTime={remainTime}
      isValid={dirty && isValid}
      status={idByPhone.status}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      onClickResend={handleClickResend}
    />
  );
}
