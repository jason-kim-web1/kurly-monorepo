import { memo } from 'react';

import styled from '@emotion/styled';

import Radio from '../../../shared/components/Input/Radio';
import InputBox from '../../../shared/components/Input/InputBox';
import PhoneNumberBox from '../../../shared/components/Input/PhoneNumberBox';

import { TEXT_DENY_REGEX } from '../../../shared/constant/regex';

import { Receiver } from '../../../order/shared/shared/interfaces';

const Container = styled.div`
  margin-top: 14px;
`;

const RadioWrap = styled.div`
  padding-right: 90px;
  display: flex;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  > div {
    margin-top: 15px;
    padding-bottom: 6px;
  }
`;

const GuideText = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: #999999;
`;

interface Props {
  receiver: Receiver;
  onChange: (receiver: Receiver) => void;
}

function ReceiverArea({ receiver, onChange }: Props) {
  const { name, phone, method } = receiver;
  const handleChange = (params: { name: string; value: any }) => {
    onChange({
      ...receiver,
      [params.name]: params.value,
    });
  };

  return (
    <Container>
      <RadioWrap>
        <Radio
          label="카카오톡"
          value="KAKAO_TALK"
          id="send-via-Kakao"
          name="method"
          selectedValue={method}
          onChange={handleChange}
        />
        <Radio
          label="연락처"
          value="SMS"
          id="send-via-SMS"
          name="method"
          selectedValue={method}
          onChange={handleChange}
        />
      </RadioWrap>
      <GuideText>
        {method === 'KAKAO_TALK'
          ? '카카오톡 친구에게 직접 메시지를 발송할 수 있습니다.'
          : '컬리 카톡 채널로 안내되며 미설치 시 문자 발송됩니다.'}
      </GuideText>
      <InputWrap>
        <InputBox
          id="receiver-name"
          name="name"
          label="받으실 분 이름"
          value={name}
          denyPattern={TEXT_DENY_REGEX}
          onChange={handleChange}
          placeholder="이름을 입력해주세요"
          maxLength={20}
          hasDeleteButton={name.length > 0}
          required
        />
        {method === 'SMS' && (
          <PhoneNumberBox
            id="receiver-phone-number"
            name="phone"
            label="받으실 분 연락처"
            value={phone}
            onChange={handleChange}
            placeholder="숫자만 입력해주세요"
            maxLength={11}
            hasDeleteButton={phone.length > 0}
            required
          />
        )}
      </InputWrap>
    </Container>
  );
}

export default memo(ReceiverArea);
