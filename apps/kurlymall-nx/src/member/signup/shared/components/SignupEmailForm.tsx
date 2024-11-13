import { css } from '@emotion/react';

import EmailInputBox from '../../../../shared/components/Input/EmailInputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import useEmailDuplicate from '../../../../shared/hooks/useEmailDuplicate';
import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';

const styles = {
  input: css`
    padding-bottom: 0;
  `,
};

export default function SignupEmailForm() {
  const { inputGroupProps, email, loading, handleDuplicateEmail, handleChangeEmail } =
    useEmailDuplicate<NormalSignupFormInterface>();

  return (
    <InputGroup label={'이메일'} isRequired {...inputGroupProps}>
      <EmailInputBox
        id="email"
        name={'email'}
        value={email}
        placeholder="예: marketkurly"
        css={styles.input}
        required
        readOnly={loading}
        onChange={handleChangeEmail}
        onBlur={handleDuplicateEmail}
      />
    </InputGroup>
  );
}
