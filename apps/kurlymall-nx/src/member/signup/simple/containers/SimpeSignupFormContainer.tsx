import { useState, useEffect, ChangeEvent } from 'react';

import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';

import { reduce } from 'lodash';

import { KOREAN_REGEX, SPECIAL_CHARACTERS_REGEX } from '../../../../shared/constant/regex';

import SimpleSignupForm from '../components/SimpleSignupForm';

import { SignupForm, SignupFormError } from '../../interfaces';

import { submitSignupForm, requestConfirmDuplicateId, updateDuplicate, changeSignupForm } from '../../reducers/slice';
import { notify, notifyAndFocus } from '../../../../shared/reducers/page';

import { AppState } from '../../../../shared/store';
import { ID_PLACEHOLDER_TEXT } from '../../../../shared/constant';

const schema = Yup.object().shape({
  id: Yup.string().test('minAndPattern', '6자 이상의 영문 혹은 영문과 숫자를 조합', (value = '') => {
    if (/\s/.test(value)) {
      return false;
    }

    if (value.length < 6 || value.length > 16) {
      return false;
    }

    if (SPECIAL_CHARACTERS_REGEX.test(value)) {
      return false;
    }

    if (KOREAN_REGEX.test(value)) {
      return false;
    }

    if (/[a-zA-Z]/.test(value)) {
      return true;
    }

    if (/[a-zA-Z]/.test(value) && /[0-9]/.test(value)) {
      return true;
    }

    return false;
  }),
  password: Yup.string()
    .min(10, '10자 이상 입력')
    .test('pattern', '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합', (value = '') => {
      if (/\s/.test(value)) {
        return false;
      }

      if (/[^a-zA-Z0-9!@#$%^&*<>(){}[\]`~'",.=_+|:;?\\/-]/.test(value)) {
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

const validation = async (form: SignupForm) => {
  try {
    await schema.validate(form, {
      abortEarly: false,
      strict: false,
    });
    return {
      id: { minAndPattern: '' },
      password: { min: '', pattern: '', consecutive: '' },
      passwordConfirm: '',
    };
  } catch ({ inner }) {
    return reduce(
      inner as any,
      (acc, { path, type, message }) => {
        if (path === 'passwordConfirm') {
          return { ...acc, passwordConfirm: message };
        }

        if (path === 'id') {
          return {
            ...acc,
            id: { ...acc.id, [type]: message },
          };
        }

        return {
          ...acc,
          password: { ...acc.password, [type]: message },
        };
      },
      {
        id: { minAndPattern: '' },
        password: { min: '', pattern: '', consecutive: '' },
        passwordConfirm: '',
      },
    );
  }
};

export default function SimpleSignupFormContainer() {
  const dispatch = useDispatch();

  const { duplicate, form } = useSelector(({ social }: AppState) => social.signup);

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState<SignupFormError>({
    id: { minAndPattern: '' },
    password: { min: '', pattern: '', consecutive: '' },
    passwordConfirm: '',
  });

  useEffect(() => {
    validation(form).then(setErrors);
  }, [form]);

  const handleClick = () => {
    if (!form.id) {
      dispatch(notifyAndFocus({ message: ID_PLACEHOLDER_TEXT, documentId: 'id' }));
      return;
    }
    if (errors.id.minAndPattern) {
      dispatch(notify('아이디는 6자 이상의 영문 또는 숫자의 조합만 사용할 수 있어요.'));
      return;
    }
    dispatch(requestConfirmDuplicateId(form.id));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'id') {
      dispatch(updateDuplicate(true));
    }
    dispatch(changeSignupForm(event.target));
  };

  const handleSubmit = () => {
    dispatch(submitSignupForm({ provider: 'kakao', errors }));
  };

  const handleBlur = (event: any) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

  return (
    <SimpleSignupForm
      form={form}
      touched={touched}
      errors={errors}
      duplicate={duplicate}
      onChange={handleChange}
      onClick={handleClick}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
}
