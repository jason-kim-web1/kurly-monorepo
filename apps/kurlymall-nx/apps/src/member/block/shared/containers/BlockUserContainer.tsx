import { Formik } from 'formik';

import * as Yup from 'yup';

import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';
import { AUTH_STEP, AuthStepType, IBlockUser } from '../../interface/BlockUser.interface';
import BlockUserBasicForm from '../components/BlockUserBasicForm';
import BlockUserPasswordForm from '../components/BlockUserPasswordForm';
import TitleWithBlockReason from '../components/TitleWithBlockReason';
import { amplitudeService } from '../../../../shared/amplitude';
import { phoneValidate } from '../../../../shared/utils';
import { deleteLockedToken, setLockedToken } from '../service';
import { isWebview } from '../../../../../util/window/getDevice';
import Alert from '../../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../../shared/reducers/page';
import { USER_MENU_PATH } from '../../../../shared/constant';

const BlockUserContainerWrapper = styled.div<{ isPC: boolean }>`
  ${({ isPC }) =>
    isPC
      ? `
      width: 400px;
      margin: 60px auto 80px;
      padding: 30px;
      background-color: ${COLOR.kurlyWhite};
    `
      : `
      padding: 30px 20px 46px;
    `}
`;

const initialFormValues: IBlockUser = {
  memberId: '',
  mobileNo: '',
  verificationNumber: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const validationSchema = Yup.object().shape({
  memberId: Yup.string().required('가입 시 등록한 아이디를 입력해 주세요.'),
  mobileNo: Yup.string()
    .required('가입 시 등록한 휴대폰 번호를 입력해 주세요.')
    .test('mobileNo', '휴대폰 번호를 정확히 입력해 주세요.', (value = '') => phoneValidate(value)),
  verificationNumber: Yup.string()
    .required('인증번호를 입력해 주세요.')
    .test('인증번호', '7자리를 입력해 주세요', (value = '') => value.length === 7),
});

interface Props {
  isPC: boolean;
  isNormalUser: boolean;
  accessToken?: string;
}

export default function BlockUserContainer({ isPC = true, isNormalUser, accessToken }: Props) {
  const dispatch = useDispatch();
  const [authStep, setAuthStep] = useState<AuthStepType>(AUTH_STEP.INITIAL);
  const handleStepChange = (step: AuthStepType) => setAuthStep(step);

  useEffect(() => {
    if (isNormalUser) {
      Alert({
        text: '이미 인증이 완료되었습니다.',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(redirectTo({ url: USER_MENU_PATH.home.uri, replace: true }));
        }
      });
    }
  }, [dispatch, isNormalUser]);

  useEffect(() => {
    return () => {
      amplitudeService.clearUserProperties();
      deleteLockedToken();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isWebview() && accessToken) {
      setLockedToken(accessToken);
    }
  }, [accessToken, dispatch]);

  return (
    <BlockUserContainerWrapper isPC={isPC}>
      <TitleWithBlockReason isPC={isPC} />
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(_, { setSubmitting }) => {
          setSubmitting(true);
        }}
      >
        <>
          <BlockUserBasicForm isPC={isPC} authStep={authStep} onStepChange={handleStepChange} />
          {authStep === AUTH_STEP.SUCCESS && <BlockUserPasswordForm onStepChange={handleStepChange} />}
        </>
      </Formik>
    </BlockUserContainerWrapper>
  );
}
