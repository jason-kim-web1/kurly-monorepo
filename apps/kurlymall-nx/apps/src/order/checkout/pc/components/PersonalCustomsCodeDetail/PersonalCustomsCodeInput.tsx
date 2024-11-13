import styled from '@emotion/styled';

import { KURLY_REGEX } from '../../../../../shared/constant';
import InputBox from '../../../../../shared/components/Input/InputBox';
import COLOR from '../../../../../shared/constant/colorset';

const Label = styled.div`
  margin-bottom: 8px;
`;

const Icon = styled.span`
  color: ${COLOR.loversTag};
`;

interface Props {
  value: string;
  onChange: (params: { name?: string | undefined; value: string }) => void;
}

const PersonalCustomsCodeInput = ({ value, onChange }: Props) => {
  return (
    <>
      <Label>
        받으실 분의 개인통관고유부호<Icon>*</Icon>
      </Label>
      <InputBox
        id="addressDetail"
        name="addressDetail"
        placeholder="P로 시작하는 13자리를 입력해주세요."
        maxLength={13}
        denyPattern={KURLY_REGEX} /**TODO 정규식은 추후 변경 예정입니다. */
        height={44}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default PersonalCustomsCodeInput;
