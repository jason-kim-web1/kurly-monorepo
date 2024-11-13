import styled from '@emotion/styled';
import * as Yup from 'yup';

import { Formik } from 'formik';

import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';

import MyInfoSubTitle from '../components/MyInfoSubTitle';
import MyInfoPasswordCheckForm from '../components/MyInfoPasswordCheckForm';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('비밀번호를 입력해 주세요.'),
});

const Container = styled.div`
  width: 100%;

  ${isPC
    ? css`
        margin: 0 auto 20px;
      `
    : css`
        padding: 18px 20px;
        overflow: hidden;
      `}
`;

export default function PasswordConfirmContainer() {
  return (
    <Container>
      <MyInfoSubTitle />
      <Formik
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(_, { setSubmitting }) => {
          setSubmitting(true);
        }}
      >
        <MyInfoPasswordCheckForm />
      </Formik>
    </Container>
  );
}
