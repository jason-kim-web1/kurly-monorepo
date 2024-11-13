import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useEffect, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';

import Captcha from '../../shared/components/Captcha';
import { useLogin } from '../../shared/hooks/useLogin';
import useAuthAdult from '../../shared/hooks/useAuthAdult';
import { loadSessionStorage } from '../../../../shared/services/session.storage.service';
import { SESSION_PARTNER_ENTRY } from '../../../../partners/tuniverse/shared/constants';
import { PARTNERS_PATH } from '../../../../shared/constant';

const InputWrapper = styled.div<{ isAdultLogin: boolean }>`
  margin-top: ${({ isAdultLogin }) => (isAdultLogin ? '10px' : '30px')};
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 13px;
`;

const Link = styled.a`
  color: ${COLOR.kurlyGray800};
  cursor: pointer;
`;

const LinkSplitBar = styled.span`
  width: 1px;
  height: 10px;
  margin: 3px 6px 0;
  background-color: ${COLOR.kurlyGray800};
`;

const CaptchaWrapper = styled.div`
  margin-top: 28px;
`;

const ButtonWrapper = styled.div`
  margin-top: 28px;
  button:last-of-type {
    margin-top: 10px;
  }
`;

const inputStyle = css`
  input {
    height: 54px;
    font-size: 14px;
  }
  &:first-of-type {
    margin-bottom: 5px;
  }
`;

const AdultInformation = styled.div`
  text-align: center;
  color: ${COLOR.invalidRed};
  margin: 30px 0 20px;
`;

export default function LoginForm() {
  const {
    form: { id, password, captcha },
    isCaptcha,
    refreshCaptchaHash,
    moveToFindId,
    moveToFindPassword,
    moveToSignup,
    onChange,
    onSubmitForm,
  } = useLogin();

  const { isAdultLogin } = useAuthAdult();
  const [isPartnerLogin, setIsPartnerLogin] = useState<boolean>(false);

  useEffect(() => {
    const partnerEntry = loadSessionStorage<string>(SESSION_PARTNER_ENTRY) ?? '';
    setIsPartnerLogin(Object.keys(PARTNERS_PATH).includes(partnerEntry));
  }, []);

  return (
    <form onSubmit={onSubmitForm}>
      {isAdultLogin && <AdultInformation>본 상품은 만 19세 미만의 청소년이 이용할 수 없습니다.</AdultInformation>}
      <InputWrapper isAdultLogin={isAdultLogin}>
        <InputBox name={'id'} placeholder="아이디를 입력해주세요" css={inputStyle} value={id} onChange={onChange} />
        <InputBox
          name={'password'}
          placeholder="비밀번호를 입력해주세요"
          type={'password'}
          autoComplete="off"
          css={inputStyle}
          value={password}
          onChange={onChange}
        />
      </InputWrapper>

      {!isPartnerLogin && (
        <LinkWrapper>
          <Link onClick={moveToFindId}>아이디 찾기</Link>
          <LinkSplitBar />
          <Link onClick={moveToFindPassword}>비밀번호 찾기</Link>
        </LinkWrapper>
      )}

      {isCaptcha && (
        <CaptchaWrapper>
          <Captcha key={refreshCaptchaHash} value={captcha} onChange={onChange} />
        </CaptchaWrapper>
      )}

      <ButtonWrapper>
        <Button type="submit" text="로그인" onClick={onSubmitForm} height={54} radius={3} />
        <Button text="회원가입" onClick={moveToSignup} theme={'secondary'} height={54} radius={3} />
      </ButtonWrapper>
    </form>
  );
}
