import { css } from '@emotion/react';

import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import EmailInputBox from '../../../../shared/components/Input/EmailInputBox';
import useEmailDuplicate from '../../../../shared/hooks/useEmailDuplicate';

const inputStyle = css`
  padding: 0;

  input {
    font-size: 14px;
  }
`;

export default function MyInfoEmailForm() {
  const { inputGroupProps, email, loading, handleDuplicateEmail, handleChangeEmail } =
    useEmailDuplicate<MypageInfoForm>();

  return (
    <>
      <InputGroup label="이메일" htmlFor="email" {...inputGroupProps}>
        <EmailInputBox
          id="email"
          name="email"
          placeholder="예: marketkurly"
          value={email}
          onChange={handleChangeEmail}
          css={inputStyle}
          readOnly={loading}
          onBlur={handleDuplicateEmail}
        />
      </InputGroup>
    </>
  );
}
