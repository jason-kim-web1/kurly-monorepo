import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import InputBox from '../../../../shared/components/Input/InputBox';
import { NUMBER_DENY_REGEX } from '../../../../shared/constant';
import { getCaptchaImageBase64 } from '../../../../shared/api/auth/token';

const Wrapper = styled.div`
  padding: 20px;
  background-color: ${COLOR.bgLightGray};
  text-align: center;
`;

const CaptchaInfo = styled.span`
  color: ${COLOR.kurlyGray600};
  font-size: 13px;
  line-height: 20px;
`;

const CaptchaImage = styled.div`
  margin: 10px 0;
  > img {
    height: 34px;
  }
`;

interface Props {
  value: string;
  onChange(params: { name?: string; value: string }): void;
}

export default function Captcha({ value, onChange }: Props) {
  const [captchaImage, setCaptchaImage] = useState('');

  useEffect(() => {
    (async () => {
      const { image } = await getCaptchaImageBase64();
      setCaptchaImage(image);
    })();
  }, []);

  return (
    <Wrapper>
      <CaptchaInfo>아래 인증번호를 입력해주세요</CaptchaInfo>
      <CaptchaImage>{captchaImage && <img src={captchaImage} alt="숫자이미지" />}</CaptchaImage>
      <InputBox
        name="captcha"
        value={value}
        placeholder={'인증번호 입력'}
        denyPattern={NUMBER_DENY_REGEX}
        maxLength={4}
        onChange={onChange}
      />
    </Wrapper>
  );
}
