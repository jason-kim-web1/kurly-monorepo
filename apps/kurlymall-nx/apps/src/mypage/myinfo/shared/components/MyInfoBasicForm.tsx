import { css } from '@emotion/react';

import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import InputBox from '../../../../shared/components/Input/InputBox';
import MyInfoNowPassword from './MyInfoNowPassword';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import { TEXT_DENY_REGEX } from '../../../../shared/constant';

const inputStyle = css`
  padding: 0;

  input {
    font-size: 14px;
  }
`;

export default function MyInfoBasicForm() {
  const {
    values: { newPassword, newPasswordConfirm, name, memberId },
    validationEvents,
    handleChange,
  } = useFormEvent<MypageInfoForm>();

  return (
    <>
      <InputGroup label="아이디" htmlFor="userId">
        <InputBox id="userId" name="userId" value={memberId} css={inputStyle} readOnly />
      </InputGroup>

      <MyInfoNowPassword />

      <InputGroup label="새 비밀번호" htmlFor="newPassword" {...validationEvents('newPassword')}>
        <InputBox
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="off"
          placeholder="새 비밀번호를 입력해 주세요"
          value={newPassword}
          onChange={handleChange}
          css={inputStyle}
          maxLength={16}
        />
      </InputGroup>
      <InputGroup label="새 비밀번호 확인" htmlFor="newPasswordConfirm" {...validationEvents('newPasswordConfirm')}>
        <InputBox
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          type="password"
          autoComplete="off"
          placeholder="새 비밀번호를 다시 입력해 주세요"
          value={newPasswordConfirm}
          onChange={handleChange}
          css={inputStyle}
          maxLength={16}
        />
      </InputGroup>
      <InputGroup label="이름" htmlFor="name" {...validationEvents('name')}>
        <InputBox
          id="name"
          name="name"
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={handleChange}
          css={inputStyle}
          denyPattern={TEXT_DENY_REGEX}
          maxLength={20}
        />
      </InputGroup>
    </>
  );
}
