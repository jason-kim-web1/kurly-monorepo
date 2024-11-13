import styled from '@emotion/styled';

import { KURLY_REGEX } from '../../../../../shared/constant';
import InputBox from '../../../../../shared/components/Input/InputBox';
import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  margin-top: 24px;
  input {
    color: ${COLOR.kurlyGray800};
    font-size: 14px;
    ::placeholder {
      color: ${COLOR.kurlyGray350};
    }
  }
`;

interface Props {
  value: string;
  onChange: (params: { name?: string | undefined; value: string }) => void;
}

const PersonalCustomsCodeInput = ({ value, onChange }: Props) => {
  return (
    <Wrapper>
      <InputBox
        id="addressDetail"
        name="addressDetail"
        placeholder="P로 시작하는 13자리를 입력해주세요."
        maxLength={13}
        denyPattern={KURLY_REGEX} /**TODO 정규식은 추후 변경 예정입니다. */
        height={49}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default PersonalCustomsCodeInput;
