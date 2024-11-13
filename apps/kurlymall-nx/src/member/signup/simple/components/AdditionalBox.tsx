import styled from '@emotion/styled';

import { css } from '@emotion/react';

import InputBox from '../../../../shared/components/Input/InputBox';
import Radio from '../../../../shared/components/Input/Radio';
import Button from '../../../../shared/components/Button/Button';
import useVerifyExistent from '../../hook/useVerifyExistent';

const Container = styled.div`
  margin: 8px 0 32px 0;
`;

const RadioWrap = styled.div`
  label {
    padding: 12px 0 12px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 4px;
`;

const GuideText = styled.p`
  font-size: 12px;
  color: #666666;
  line-height: 18px;
  margin-bottom: 8px;
`;

const AdditionalWrap = styled.div`
  display: flex;
  align-items: flex-end;
  > div {
    flex-grow: 1;
  }
`;

const button = css`
  margin-bottom: 12px;
  margin-left: 8px;
  flex-shrink: 0;
`;

interface Props {
  selectedValue: string;
  recommender: string;
  eventName: string;
  onChangeInput(e: any): void;
  onChangeRadio(params: { name: string; value: string }): void;
}

export default function AdditionalBox({ selectedValue, recommender, eventName, onChangeInput, onChangeRadio }: Props) {
  const { verified, isLoading, setMemberId, handleVerifyExistent, clearVerified } = useVerifyExistent();

  const handleChangeRadio = (value: { name: string; value: string }) => {
    clearVerified();
    onChangeRadio(value);
  };

  const handleChangeInput = (value: { name: string; value: string }) => {
    clearVerified();
    setMemberId(value.value);
    onChangeInput({ target: value });
  };

  return (
    <Container>
      <Label>추가입력 사항</Label>
      <GuideText>추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.</GuideText>
      <RadioWrap>
        <Radio
          label="추천인 아이디"
          value="RECOMMENDER_ID"
          id="input-recommender-id"
          name="additional"
          selectedValue={selectedValue}
          onChange={handleChangeRadio}
        />
        {selectedValue === 'RECOMMENDER_ID' && (
          <AdditionalWrap>
            <InputBox
              id="recommender"
              name="recommender"
              placeholder="추천인 아이디를 입력해주세요"
              value={recommender}
              onChange={handleChangeInput}
            />
            <Button
              css={button}
              radius={6}
              width={122}
              height={48}
              onClick={handleVerifyExistent}
              disabled={verified}
              isSubmitLoading={isLoading}
              theme="secondary"
              text="아이디 확인"
            />
          </AdditionalWrap>
        )}
        <Radio
          label="참여 이벤트명"
          value="EVENT_NAME"
          id="input-event-name"
          name="additional"
          selectedValue={selectedValue}
          onChange={handleChangeRadio}
        />
        {selectedValue === 'EVENT_NAME' && (
          <InputBox
            id="eventName"
            name="eventName"
            placeholder="참여 이벤트명을 입력해주세요"
            value={eventName}
            onChange={handleChangeInput}
          />
        )}
      </RadioWrap>
    </Container>
  );
}
