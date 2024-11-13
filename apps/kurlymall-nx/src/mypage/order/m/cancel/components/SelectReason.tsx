import styled from '@emotion/styled';

import Radio from '../../../../../shared/components/Input/Radio';
import MessageArea from '../../../../../shared/components/Message/MessageTextArea';

const Wrapper = styled.div`
  padding: 18px 20px;
`;

const Title = styled.h3`
  padding-bottom: 17px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const SelectOption = styled.div`
  label {
    padding-bottom: 12px;
  }
`;

interface Props {
  list: string[];
  selectedValue: string;
  etcValue: string;
  onChangeEtc: (value: string) => void;
  onChange(props: { name: string; value: string }): void;
}

export default function SelectReason({ list, selectedValue, etcValue, onChange, onChangeEtc }: Props) {
  return (
    <Wrapper>
      <Title>취소 사유 선택</Title>
      {list.map((value) => {
        return (
          <SelectOption key={value}>
            <Radio
              id={`kurly-cancel-reason-${value}`}
              name="kurly-cancel-reason"
              label={value}
              value={value}
              selectedValue={selectedValue}
              onChange={onChange}
            />
          </SelectOption>
        );
      })}
      <MessageArea
        id="cancel-reason-etc"
        placeholder="기타 사유를 작성해 주세요 (필수)"
        value={etcValue}
        maxLength={250}
        onChange={onChangeEtc}
      />
    </Wrapper>
  );
}
