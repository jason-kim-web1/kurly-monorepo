import * as Yup from 'yup';

const idMinLength = 1;
const idMaxLength = 40;

export const commonYup = {
  id: Yup.string()
    .required('가입 시 등록한 아이디를 입력해 주세요.')
    .min(idMinLength, `${idMinLength}자 이상 입력해 주세요.`)
    .max(idMaxLength, `${idMaxLength}자 이하 입력해 주세요.`),
};
