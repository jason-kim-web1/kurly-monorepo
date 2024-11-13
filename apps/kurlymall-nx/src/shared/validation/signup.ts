import * as Yup from 'yup';
import { isAfter, sub } from 'date-fns';

import {
  EXCEPT_KOREAN_SPECIAL_CHARACTERS_REGEX,
  KOREAN_REGEX,
  ONLY_NUMBER_REGEX,
  SPECIAL_CHARACTERS_REGEX,
} from '../constant';

export const passwordValidation = Yup.string()
  .min(10, '최소 10자 이상 입력')
  .test('password-consecutive', '동일한 숫자 3개 이상 연속 사용 불가', (value = '') => !/(\d)\1\1/.test(value))
  .test('password-pattern', '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합', (value = '') => {
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
  });

export const idValidation = Yup.string().test(
  'id-minAndPattern',
  '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',
  (value = '') => {
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

    return /[a-zA-Z]/.test(value) && new RegExp(ONLY_NUMBER_REGEX).test(value);
  },
);

export const birthYearValidation = Yup.number()
  .test('birthYear-length', '태어난 년도 4자리를 정확하게 입력해주세요.', (value, context) => {
    if (!context.parent.birthDay && !context.parent.birthMonth && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    return String(value).length >= 4;
  })
  .test('birthYear-max', '생년월일이 미래로 입력 되었습니다.', (value, context) => {
    if (!context.parent.birthDay && !context.parent.birthMonth && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    const nowYear = Number(new Date().getFullYear());

    return nowYear >= value;
  })
  .test('birthYear-pattern', '생년월일을 다시 확인해주세요.', (value, context) => {
    if (!context.parent.birthDay && !context.parent.birthMonth && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    const year = value;
    const nowYear = Number(new Date().getFullYear());

    return nowYear - year <= 100;
  });

export const birthMonthValidation = Yup.number().test(
  'birthMonth-max',
  '태어난 월을 정확하게 입력해주세요.',
  (value, context) => {
    if (!context.parent.birthYear && !context.parent.birthDay && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    return value >= 1 && value <= 12;
  },
);

export const birthDayValidation = Yup.number()
  .test('birthDay-max', '태어난 일을 정확하게 입력해주세요.', (value, context) => {
    if (!context.parent.birthYear && !context.parent.birthMonth && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    return value >= 1 && value <= 31;
  })
  .test('birthDay-min', '만 14세 미만은 가입이 불가합니다.', (value, context) => {
    if (!context.parent.birthYear && !context.parent.birthMonth && !value) {
      return true;
    } else if (!value) {
      return false;
    }

    const before14Years = sub(new Date(), {
      years: 14,
      days: -1,
    });

    return isAfter(
      new Date(before14Years.getFullYear(), before14Years.getMonth(), before14Years.getDate()),
      new Date(context.parent.birthYear, context.parent.birthMonth - 1, value),
    );
  });
