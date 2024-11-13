import { ONLY_KOREAN_ENGLISH_NUMBER_REGEX } from '../../../../../../shared/constant';

import InputBox from '../../../../../../shared/components/Input/InputBox';
import PhoneNumberBox from '../../../../../../shared/components/Input/PhoneNumberBox';
import { InputBoxMobileStyles } from '../../../../shared/constants/receiverDetails';

interface Props {
  name: string;
  phone: string;
  onChange: (params: { name: string; value: string }) => void;
}

export default function ReceiverField({ name, phone, onChange }: Props) {
  const handleChange = (params: { name: string; value: string }) => {
    onChange(params);
  };

  return (
    <>
      <InputBox
        id="receiver-name"
        name="name"
        label="받으실 분"
        placeholder="이름을 입력해 주세요"
        type="text"
        denyPattern={ONLY_KOREAN_ENGLISH_NUMBER_REGEX}
        maxLength={20}
        onChange={handleChange}
        value={name}
        height={48}
        required
        css={{
          ...InputBoxMobileStyles,
          paddingBottom: '25px',
        }}
        hasFocusDeleteButton={name?.length > 0}
      />
      <PhoneNumberBox
        id="receiver-phone"
        name="phone"
        label="휴대폰"
        placeholder="숫자만 입력해 주세요"
        onChange={handleChange}
        value={phone}
        height={48}
        required
        css={{
          ...InputBoxMobileStyles,
          paddingBottom: '25px',
        }}
        hasFocusDeleteButton={phone?.length > 0}
      />
    </>
  );
}