import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';

import SignupBasicForm from '../components/SignupBasicForm';
import SignupEmailForm from '../components/SignupEmailForm';
import SignupAuthForm from '../components/SignupAuthForm';
import SignupAddressForm from '../../pc/components/SignupAddressForm';
import MobileSignupAddressForm from '../../m/components/SignupAddressForm';
import SignupGenderForm from '../components/SignupGenderForm';
import SignupBirthdayForm from '../components/SignupBirthdayForm';
import AdditionalFormContainer from './AdditionalFormContainer';

const Container = styled.div`
  padding: ${isPC ? '0' : '0 20px'};
`;

export default function FormsContainer() {
  return (
    <Container>
      <SignupBasicForm />
      <SignupEmailForm />
      <SignupAuthForm />

      {isPC ? (
        <>
          <SignupAddressForm />
          <SignupGenderForm />
          <SignupBirthdayForm />
        </>
      ) : (
        <>
          <MobileSignupAddressForm />
          <SignupBirthdayForm />
          <SignupGenderForm />
        </>
      )}

      <AdditionalFormContainer />
    </Container>
  );
}
