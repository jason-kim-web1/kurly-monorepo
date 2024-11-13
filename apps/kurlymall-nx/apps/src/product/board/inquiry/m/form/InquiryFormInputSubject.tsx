import styled from '@emotion/styled';

import { css } from '@emotion/react';

import InputBox from '../../../../../shared/components/Input/InputBox';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  margin-top: 16px;
`;

const inputBox = css`
  input {
    height: 48px;
    ::placeholder {
      font-size: 15px;
      color: ${COLOR.disabled};
    }
  }
`;

interface Props {
  value: string;
  onChange(e: any): void;
}

export default function InquiryFormInputSubject({ value, onChange }: Props) {
  const handleChange = (params: { name?: string; value: string }) => {
    onChange({ target: params });
  };

  return (
    <Container>
      <InputBox
        css={inputBox}
        id="InquiryFormSubject"
        name="subject"
        placeholder="제목을 입력해 주세요"
        maxLength={50}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}
