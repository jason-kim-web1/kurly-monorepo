import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';

import * as Yup from 'yup';
import { isNull } from 'lodash';

import { isPC } from '../../../../../util/window/getDevice';

import { Divider } from '../../../../shared/components/Divider/Divider';
import HeaderDivider from '../../pc/components/HeaderDivider';
import FooterDivider from '../../pc/components/FooterDivider';
import FormsContainer from './FormsContainer';
import TermsContainer from './TermsContainer';
import SubmitContainer from './SubmitContainer';
import { initialFormValues } from '../../interfaces/NormalSignupForm.interface';
import {
  birthDayValidation,
  birthMonthValidation,
  birthYearValidation,
  idValidation,
  passwordValidation,
} from '../../../../shared/validation/signup';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { ViewSignUp } from '../../../../shared/amplitude/events';
import { useScreenName } from '../../../../shared/hooks';

const signupValidationSchema = Yup.object().shape({
  memberId: idValidation,
  password: passwordValidation,
  birthYear: birthYearValidation,
  birthMonth: birthMonthValidation,
  birthDay: birthDayValidation,
  passwordConfirm: Yup.string()
    .required('비밀번호를 한번 더 입력해 주세요.')
    .oneOf([Yup.ref('password')], '동일한 비밀번호를 입력'),
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
  numberAddress: Yup.string().required('주소를 검색하여 입력해 주세요.'),
  mobileNumber: Yup.string().required('휴대폰 번호를 입력해 주세요.'),
});

const Container = styled.div<{ isPc: boolean | null }>`
  ${({ isPc }) =>
    isPc
      ? `
    width: 640px;
    margin: 0 auto;
  `
      : `
    width: 100%;
  `};
`;

const DividerContainer = styled.div`
  margin: 5px 0;
`;

export default function SignupContainer() {
  useScreenName(ScreenName.SIGN_UP);
  const router = useRouter();

  const [isAccessPC, setIsAccessPC] = useState<boolean | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setIsAccessPC(isPC);
      amplitudeService.logEvent(
        new ViewSignUp({
          joinPath: 'kurly',
        }),
      );
    }
  }, [router.isReady]);

  return (
    <Container isPc={isAccessPC}>
      {!isNull(isAccessPC) && (
        <Formik
          initialValues={initialFormValues}
          validationSchema={signupValidationSchema}
          validateOnChange={true}
          validateOnMount={true}
          onSubmit={(_, { setSubmitting }) => {
            setSubmitting(true);
          }}
        >
          {isAccessPC ? (
            <>
              <HeaderDivider />
              <FormsContainer />
              <FooterDivider />
              <TermsContainer />
              <SubmitContainer />
            </>
          ) : (
            <>
              <FormsContainer />
              <DividerContainer />
              <Divider />
              <TermsContainer />
              <SubmitContainer />
            </>
          )}
        </Formik>
      )}
    </Container>
  );
}
