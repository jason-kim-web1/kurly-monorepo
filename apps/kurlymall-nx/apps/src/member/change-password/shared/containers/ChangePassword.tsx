import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { getCookieOnce } from '../../../../shared/services';
import { isPC } from '../../../../../util/window/getDevice';
import { redirectTo } from '../../../../shared/reducers/page';

import { USER_MENU_PATH, getPageUrl } from '../../../../shared/constant';

import { Divider } from '../../../../shared/components/Divider/Divider';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ChangePasswordSkip from '../components/ChangePasswordSkip';
import { passwordValidation } from '../../../../shared/validation/signup';

export const SKIP_COOKIE_NAME = 'skipChangePassword';

const initialFormValues = {
  originalPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const passwordValidationSchema = Yup.object().shape({
  originalPassword: Yup.string().required('현재 비밀번호를 입력 해주세요'),
  newPassword: passwordValidation.notOneOf([Yup.ref('originalPassword')], '현재 비밀번호와 다르게 입력 해주세요.'),
  newPasswordConfirm: Yup.string()
    .required('새 비밀번호와 동일한 비밀번호 입력')
    .oneOf([Yup.ref('newPassword'), null], '새 비밀번호와 동일한 비밀번호 입력 해주세요.'),
});

export default function ChangePasswordContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { return_url: returnUrl } = router.query as { return_url: string };

  useEffect(() => {
    const isSkip = getCookieOnce(SKIP_COOKIE_NAME);
    if (isSkip) {
      dispatch(redirectTo({ url: returnUrl || getPageUrl(USER_MENU_PATH.home), isExternal: true }));
    }
  }, [dispatch, returnUrl]);

  return (
    <>
      {!isPC && <Divider />}
      <Formik
        initialValues={initialFormValues}
        validationSchema={passwordValidationSchema}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(_, { setSubmitting }) => {
          setSubmitting(true);
        }}
      >
        <ChangePasswordForm />
      </Formik>
      <ChangePasswordSkip />
    </>
  );
}
