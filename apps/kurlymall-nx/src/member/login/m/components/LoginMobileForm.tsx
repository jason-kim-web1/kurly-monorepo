import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { saveLocalStorageKey, useLogin } from '../../shared/hooks/useLogin';

import { loadLocalStorage } from '../../../../shared/services/storage.service';

import InputBox from '../../../../shared/components/Input/InputBox';
import Checkbox from '../../../../shared/components/Input/Checkbox';
import Button from '../../../../shared/components/Button/Button';
import COLOR from '../../../../shared/constant/colorset';
import Captcha from '../../shared/components/Captcha';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectJoinButton } from '../../../../shared/amplitude/events/signup/SelectJoinButton';
import { loadSessionStorage } from '../../../../shared/services/session.storage.service';
import useAuthAdult from '../../shared/hooks/useAuthAdult';
import { PARTNERS_PATH } from '../../../../shared/constant/common-path';
import { SESSION_PARTNER_ENTRY } from '../../../../partners/tuniverse/shared/constants';
import { removeSocialLoginTokenFromSessionStorage } from '../../services/login.services';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  margin-top: 4px;
  label {
    font-size: 14px;
    &:first-of-type {
      margin-right: 20px;
    }
  }
`;

const CaptchaWrapper = styled.div`
  margin: 24px 0 28px;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  button:last-of-type {
    margin-top: 10px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const Link = styled.a`
  color: ${COLOR.kurlyGray450};
`;

const LinkSplitBar = styled.span`
  width: 1px;
  height: 13px;
  margin: 3px 8px 0;
  background-color: ${COLOR.lightGray};
`;

const KakaoLoginWrapper = styled.div`
  margin-top: 30px;
  border-top: 1px solid ${COLOR.kurlyGray150};
`;

const KakaoText = styled.p`
  margin-top: 24px;
  margin-bottom: 25px;
  text-align: center;
  font-size: 15px;
  strong {
    color: ${COLOR.kurlyPurple};
    font-weight: 500;
  }
`;

const KakaoButton = styled(Button)`
  background-color: #fee500;
  border: 1px solid #fee500;
  color: #191919;
  border-radius: 6px;
`;

const inputStyle = css`
  input {
    position: relative;
    height: 48px;
    &:focus {
      z-index: 10;
    }
  }
  padding-bottom: 0;
  &:first-of-type {
    margin-bottom: -1px;
    input {
      border-radius: 6px 6px 0 0;
    }
  }
  &:last-of-type {
    input {
      border-radius: 0 0 6px 6px;
    }
  }
`;

const kakaoIcon = {
  src: 'https://res.kurly.com/kurly/ico/2021/kakao_19_20_c000.svg',
  css: css`
    width: 19px;
    height: 20px;
    margin-right: 6px;
  `,
};

const AdultInformation = styled.div`
  text-align: center;
  color: ${COLOR.invalidRed};
  margin-bottom: 10px;
`;

export default function LoginMobileForm() {
  const router = useRouter();
  const [isPartnerLogin, setIsPartnerLogin] = useState<boolean>(false);

  const {
    form: { id, password, captcha, checkboxSaveID },
    isCaptcha,
    refreshCaptchaHash,
    moveToFindId,
    moveToFindPassword,
    moveToSignup,
    onChange,
    onSubmitForm,
    onChangeCheckbox,
  } = useLogin();

  const { isAdultLogin } = useAuthAdult();

  useEffect(() => {
    const partnerEntry = loadSessionStorage<string>(SESSION_PARTNER_ENTRY) ?? '';
    setIsPartnerLogin(Object.keys(PARTNERS_PATH).includes(partnerEntry));
  }, []);

  // 로컬 호스트에 저장된 값이 있을경우 가져와서 설정
  useEffect(() => {
    onChange({ name: 'id', value: loadLocalStorage(saveLocalStorageKey) ?? '' });
  }, [onChange]);

  const handleKakaoLogin = () => {
    const kakao = window.Kakao;
    removeSocialLoginTokenFromSessionStorage();

    if (!kakao) {
      return;
    }

    const redirectUri = `${window.location.origin}/m2/mem/kakao_login_callback.php`;

    const parsedQuery = router.query;

    const manipulatedQuery = ([queryKey, queryValue]: [string, string | string[] | undefined]) => {
      if (['internalUrl', 'externalUrl', 'returnUrl', 'return_url'].includes(queryKey)) {
        if (typeof queryValue === 'string' && !!queryValue) {
          try {
            const url = new URL(queryValue);

            const searchParams = new URLSearchParams(url.search);

            const decodedParams = Array.from(searchParams.keys())
              .map((key) => {
                if (searchParams.get(key)) {
                  return `${key}=${searchParams.get(key)}`;
                }

                return '';
              })
              .filter((param) => !!param)
              .join('&');

            const newUrl = `${url.origin}${url.pathname}${decodedParams ? `?${decodedParams}` : ''}`;

            return `return_url=${newUrl}`;
          } catch (err) {
            console.error(err);

            return `return_url=${queryValue}`;
          }
        }
      }
      return `${queryKey}=${queryValue}`;
    };

    const queryString = Object.entries(parsedQuery).map(manipulatedQuery).join('&');

    amplitudeService.logEvent(
      new SelectJoinButton({
        joinPath: 'kakao',
      }),
    );

    kakao.Auth.authorize({
      redirectUri,
      state: queryString,
    });
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        {isAdultLogin && <AdultInformation>본 상품은 만 19세 미만의 청소년이 이용할 수 없습니다.</AdultInformation>}
        <InputWrapper>
          <InputBox name={'id'} placeholder="아이디 입력" css={inputStyle} value={id} onChange={onChange} />
          <InputBox
            name={'password'}
            placeholder="비밀번호 입력"
            autoComplete="off"
            css={inputStyle}
            type={'password'}
            value={password}
            onChange={onChange}
          />
        </InputWrapper>
        {!isPartnerLogin && (
          <CheckboxWrapper>
            <Checkbox label="아이디 저장" checked={checkboxSaveID} onChange={() => onChangeCheckbox('save')} />
          </CheckboxWrapper>
        )}
        {isCaptcha && (
          <CaptchaWrapper>
            <Captcha key={refreshCaptchaHash} value={captcha} onChange={onChange} />
          </CaptchaWrapper>
        )}
        <ButtonWrapper>
          <Button type="submit" text="로그인" onClick={onSubmitForm} height={48} radius={6} />
          <Button text="회원가입" theme={'secondary'} height={48} onClick={moveToSignup} radius={6} />
        </ButtonWrapper>
        {!isPartnerLogin && (
          <LinkWrapper>
            <Link onClick={moveToFindId}>아이디 찾기</Link>
            <LinkSplitBar />
            <Link onClick={moveToFindPassword}>비밀번호 찾기</Link>
          </LinkWrapper>
        )}
        <KakaoLoginWrapper>
          <KakaoText>
            카카오로 <strong>간편하게 시작</strong>하세요
          </KakaoText>
          <KakaoButton text={'카카오로 시작하기'} styleIcon={kakaoIcon} onClick={handleKakaoLogin} />
        </KakaoLoginWrapper>
      </form>
    </>
  );
}
